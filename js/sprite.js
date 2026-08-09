// ============================================================================
// TME.SpriteSheet / TME.AnimatedSprite
// Reusable sprite + animation system shared by every character in every
// chapter. See #EDIT-SPRITESHEETS in data.js for where to plug in the real
// zaeem_spritesheet.png / samaara_spritesheet.png once you have them, and
// what frame width/height/columns/rows to set.
//
// Until a real sheet image loads successfully, AnimatedSprite falls back to
// drawing a colored rectangle that still bobs while walking, tilts/squashes
// for "idle-slumped", and blips while "talk"-ing, so animation states are
// still readable during development.
// ============================================================================
window.TME = window.TME || {};

TME.SpriteSheet = class SpriteSheet {
  constructor({ src, frameWidth, frameHeight, columns, rows, animations }){
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.columns = columns;
    this.rows = rows;
    this.animations = animations; // { name: {row, frames, fps, loop} }
    this.loaded = false;
    this.image = new Image();
    this.image.onload = () => { this.loaded = true; };
    this.image.onerror = () => { this.loaded = false; }; // fine — falls back to placeholder rect
    this.image.src = src;
  }

  getAnim(name){
    return this.animations[name] || this.animations.idle;
  }
};

TME.AnimatedSprite = class AnimatedSprite {
  constructor(sheet, x, y, w, h, placeholderColor){
    this.sheet = sheet;
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.placeholderColor = placeholderColor || "#8fd3ff";
    // Optional silhouette for the procedural placeholder. Set it after
    // constructing, e.g. sprite.outfit = "abaya" for a full-length robe and
    // headscarf instead of the default shirt/trousers. Ignored entirely once
    // a real sprite sheet loads.
    this.outfit = null;
    this.currentAnim = "idle";
    this.frameIndex = 0;
    this.frameTimer = 0;
    this._bobTimer = Math.random() * Math.PI * 2; // desync placeholder bob between characters
  }

  // Falls back to "idle" if the requested animation isn't defined on this
  // character's sheet (e.g. "idle-slumped" before you've drawn that frame).
  // While no sheet has loaded, the name is always kept: the procedural
  // placeholder can draw every pose itself, so the Scene B "sigh" slump
  // shows up without needing art first.
  setAnimation(name){
    const resolved = (!this.sheet.loaded || this.sheet.animations[name]) ? name : "idle";
    if (this.currentAnim !== resolved){
      this.currentAnim = resolved;
      this.frameIndex = 0;
      this.frameTimer = 0;
    }
  }

  update(dt){
    const anim = this.sheet.getAnim(this.currentAnim);
    this.frameTimer += dt;
    const frameDuration = 1 / (anim.fps || 8);
    if (this.frameTimer >= frameDuration){
      this.frameTimer -= frameDuration;
      this.frameIndex++;
      if (this.frameIndex >= anim.frames){
        this.frameIndex = anim.loop === false ? anim.frames - 1 : 0;
      }
    }
    this._bobTimer += dt;
  }

  draw(ctx){
    if (this.sheet.loaded){
      const anim = this.sheet.getAnim(this.currentAnim);
      const sx = this.frameIndex * this.sheet.frameWidth;
      const sy = anim.row * this.sheet.frameHeight;
      ctx.drawImage(
        this.sheet.image,
        sx, sy, this.sheet.frameWidth, this.sheet.frameHeight,
        this.x, this.y, this.w, this.h
      );
      return;
    }
    this._drawPlaceholder(ctx);
  }

  // ------------------------------------------------------------------------
  // Procedural stand-in character, drawn on a 16x22 "pixel" grid scaled to
  // this sprite's w/h. It's a real little person — hair, face, shirt, arms,
  // legs, shoes — so scenes read properly before any art exists:
  //
  //   walk-*        legs stride, arms swing, body bobs, the trailing arm is
  //                 shaded so you can tell which way they're facing
  //   walk-up       drawn from behind (back of the head, no face)
  //   idle          slow breathing bob
  //   idle-slumped  head drops, shoulders sag, whole body tilts
  //   talk          mouth opens and closes
  //
  // Shirt color comes from placeholderColor; skin and hair are picked from
  // small palettes seeded by that same color, so characters look like
  // different people instead of recolors of one guy. All of this disappears
  // the moment a real sheet loads — see draw().
  // ------------------------------------------------------------------------
  _drawPlaceholder(ctx){
    const t = this._bobTimer;
    const anim = this.currentAnim;
    const walking = anim.indexOf("walk") === 0;
    const back = anim === "walk-up" || anim.indexOf("back") !== -1;
    const slumped = anim === "idle-slumped";
    const talking = anim === "talk";
    const facing = anim === "walk-left" ? -1 : (anim === "walk-right" ? 1 : 0);
    const abaya = this.outfit === "abaya";   // full-length robe + headscarf

    const pal = this._palette();
    const stride = walking ? Math.sin(t * 10) : 0;
    const bob = walking ? -Math.abs(Math.sin(t * 10)) * 0.7 : Math.sin(t * 2) * 0.25;
    const headDrop = slumped ? 1.1 : 0;
    const tilt = slumped ? 0.05 : 0;
    const squash = slumped ? 0.94 : 1;

    // ---- soft ground shadow (drawn untransformed, at the feet) ----
    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.ellipse(this.x + this.w / 2, this.y + this.h - 1, this.w * 0.34, this.h * 0.045, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ---- body space: pivot at the feet so tilt/squash look like posture ----
    const GW = 16, GH = 22;
    const sx = this.w / GW, sy = this.h / GH;

    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h);
    ctx.rotate(tilt);
    ctx.scale(1, squash);
    ctx.translate(-this.w / 2, -this.h);

    // grid-space rect: gx/gy in 16x22 units, plus the global bob
    const px = (gx, gy, gw, gh, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(gx * sx, (gy + bob) * sy, gw * sx, gh * sy);
    };

    // ---- dark silhouette behind everything, so the character stays
    // readable against dark backgrounds without outlining every part.
    // The narrow gaps between these blocks and the parts drawn on top are
    // what separate arms from torso and leg from leg. ----
    px(3.6, 1.1, 8.8, 8.5, pal.edge);                        // head
    px(2.4, 9.6, 11.2, 6.6, pal.edge);                       // torso + arms
    px(abaya ? 3.4 : 4.2, 15.4, abaya ? 9.2 : 7.6, 6.8, pal.edge);  // lower body

    // ---- legs + shoes (drawn first so the shirt overlaps the waist) ----
    const lLegX = 4.6 + stride * 1.1;
    const rLegX = 8.4 - stride * 1.1;
    if (abaya){
      // the robe covers the legs entirely; only the shoes show beneath it
      px(5.0, 20.2, 2.6, 1.8, pal.shoe);
      px(8.4, 20.2, 2.6, 1.8, pal.shoeShade);
    } else {
      px(lLegX, 15.8, 3, 4.2, pal.pants);
      px(rLegX, 15.8, 3, 4.2, pal.pantsShade);
      px(lLegX, 20, 3, 2, pal.shoe);
      px(rLegX, 20, 3, 2, pal.shoeShade);
    }

    // ---- arms: narrow, and set off the torso by a sliver of the dark
    // silhouette. The trailing one is shaded to sell the facing. ----
    const lArmY = 10.3 - stride * 0.9;
    const rArmY = 10.3 + stride * 0.9;
    const sleeve = abaya ? pal.robe : pal.shirt;
    const sleeveShade = abaya ? pal.robeShade : pal.shirtShade;
    px(2.8,  lArmY, 1.6, 4.8, facing > 0 ? sleeveShade : sleeve);
    px(11.6, rArmY, 1.6, 4.8, facing < 0 ? sleeveShade : sleeve);
    px(2.8,  lArmY + 4.8, 1.6, 1, pal.skinShade);   // hands
    px(11.6, rArmY + 4.8, 1.6, 1, pal.skinShade);

    // ---- torso (or the robe, which runs shoulder to ankle) ----
    if (abaya){
      px(4.4, 10, 7.2, 7, pal.robe);          // body
      px(4.0, 16.4, 8, 3.2, pal.robe);        // flare
      px(3.6, 19, 8.8, 1.4, pal.robeShade);   // hem
      px(4.4, 10, 7.2, 0.8, pal.robeShade);   // shoulder line
    } else {
      px(4.5, 10, 7, 5.8, pal.shirt);
      px(4.5, 14.9, 7, 0.9, pal.shirtShade);  // hem shading
      px(6.2, 10, 3.6, 0.8, pal.shirtShade);  // collar
    }

    // ---- head ----
    const hy = headDrop;                      // slumped = head hangs lower
    if (!abaya) px(7.2, 9 + hy, 1.6, 1.1, pal.skinShade); // neck

    if (abaya){
      // headscarf covering the hair and framing the face
      px(3.7, 1.3 + hy, 8.6, 8.4, pal.scarf);
      px(3.7, 8.6 + hy, 8.6, 2.6, pal.scarf);   // drape over the shoulders
      if (!back){
        px(5.0, 3.3 + hy, 6.0, 5.4, pal.skin);  // the opening
        px(9.6, 3.3 + hy, 1.4, 5.4, pal.skinShade);
        if (facing === 0){
          px(6.2, 5.2 + hy, 1.0, 1.2, pal.eye);
          px(8.9, 5.2 + hy, 1.0, 1.2, pal.eye);
        } else {
          px(facing < 0 ? 5.8 : 9.2, 5.2 + hy, 1.0, 1.2, pal.eye);
        }
        if (talking){
          const openA = Math.sin(t * 11) > 0 ? 1.2 : 0.45;
          px(7.2, 7.2 + hy, 1.6, openA, pal.mouth);
        }
      }
    } else if (back){
      // seen from behind — all hair, no face
      px(4.5, 1.6, 7, 7.5, pal.hair);
      px(3.8, 2.3, 0.7, 5.5, pal.hair);
      px(11.5, 2.3, 0.7, 5.5, pal.hair);
    } else {
      px(4.5, 3.4 + hy, 7, 5.7, pal.skin);        // face
      px(10.4, 3.4 + hy, 1.1, 5.7, pal.skinShade); // cheek in shadow
      px(4.5, 1.6 + hy, 7, 2.4, pal.hair);         // hair + fringe
      px(3.8, 2.3 + hy, 0.7, 4.5, pal.hair);       // sides
      px(11.5, 2.3 + hy, 0.7, 4.5, pal.hair);

      if (facing === 0){
        px(6.2, 5.2 + hy, 1.1, 1.3, pal.eye);
        px(9.1, 5.2 + hy, 1.1, 1.3, pal.eye);
      } else {
        // profile: one visible eye, and a nose breaking the face outline
        px(facing < 0 ? 5.4 : 9.5, 5.2 + hy, 1.1, 1.3, pal.eye);
        px(facing < 0 ? 3.9 : 11.5, 6.1 + hy, 0.7, 0.9, pal.skin);
        px(facing < 0 ? 10.8 : 4.5, 1.6 + hy, 0.7, 6, pal.hair); // hair behind
      }

      if (talking){
        const open = Math.sin(t * 11) > 0 ? 1.3 : 0.45;
        px(facing < 0 ? 6.2 : 7.2, 7.3 + hy, 1.8, open, pal.mouth);
      } else if (slumped){
        px(7.2, 7.5, 1.8, 0.45, pal.mouth);   // flat, resigned line
      }
    }

    ctx.restore();
  }

  // Skin/hair chosen deterministically from the shirt color, so a given
  // character always looks the same but different characters differ.
  _palette(){
    if (this._pal) return this._pal;

    const hex = this.placeholderColor;
    const seed = (parseInt(hex.slice(1), 16) || 0);
    const SKINS = ["#eab98c", "#d9a273", "#c78a5c", "#f2cba6"];
    const HAIRS = ["#241a16", "#3a2419", "#191922", "#4a2f1e"];

    const skin = SKINS[seed % SKINS.length];
    const hair = HAIRS[(seed >> 4) % HAIRS.length];

    this._pal = {
      shirt:      hex,
      shirtShade: this._shade(hex, -0.28),
      skin:       skin,
      skinShade:  this._shade(skin, -0.16),
      hair:       hair,
      // used only when outfit === "abaya": a deep version of the character's
      // own color so she still reads as herself at a glance
      robe:       this._shade(hex, -0.62),
      robeShade:  this._shade(hex, -0.74),
      scarf:      this._shade(hex, -0.70),
      pants:      "#3d4160",
      pantsShade: "#2f3249",
      shoe:       "#201c1a",
      shoeShade:  "#181513",
      eye:        "#171420",
      mouth:      "#8c4a4a",
      edge:       "rgba(10,8,16,0.55)"
    };
    return this._pal;
  }

  // amt < 0 darkens, amt > 0 lightens. Accepts "#rgb" or "#rrggbb".
  _shade(hex, amt){
    let h = hex.replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    const n = parseInt(h, 16);
    const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => {
      const out = amt < 0 ? v * (1 + amt) : v + (255 - v) * amt;
      return Math.max(0, Math.min(255, Math.round(out)));
    });
    return "rgb(" + ch[0] + "," + ch[1] + "," + ch[2] + ")";
  }
};
