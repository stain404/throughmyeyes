// ============================================================================
// TME.SceneB — "Home"
// Player walks Zaeem around a simple room (WASD), interacts with a phone on
// the desk (E), browses a retro Instagram-style following list, opens
// bisma_'s profile, which triggers an internal-monologue sequence ending in
// a "sigh" beat and a fade to the end-of-chapter card.
// ============================================================================
window.TME = window.TME || {};

TME.SceneB = {
  name: "sceneB",

  enter(){
    const W = TME.CANVAS_W, H = TME.CANVAS_H;
    this.W = W; this.H = H;

    TME.Fader.fadeIn(700);

    this.zaeem = new TME.AnimatedSprite(TME.zaeemSheet, 200, 420, 48, 64, "#9fd8ff");
    this.zaeem.setAnimation("idle");

    this.desk = { x: 680, y: 340, w: 200, h: 60 };
    this.phone = { x: 760, y: 350, w: 26, h: 18 };
    this.bounds = { x: 60, y: 320, w: 800, h: 240 };

    this.keys = {};
    this.state = "explore"; // explore -> profile_monologue -> sigh -> monologue_final -> ending
    this.sighTimer = 0;
    this.particles = [];

    TME.PhoneUI.onProfileOpen = (entry) => {
      if (!entry.isSpecial) return;
      this.state = "profile_monologue";
      // small pause so the profile view is visible before the thoughts start
      setTimeout(() => {
        this.dialogueBox.show(TME.Data.sceneB_monologue_intro, {
          mode: "thought",
          onComplete: () => {
            this.dialogueBox.show(TME.Data.sceneB_monologue_ageReveal, {
              mode: "thought",
              onComplete: () => this._startSigh()
            });
          }
        });
      }, 500);
    };

    this.dialogueBox = TME.dialogueBox;
  },

  exit(){
    TME.PhoneUI.onProfileOpen = null;
  },

  _startSigh(){
    TME.PhoneUI.closeProfile();
    this.state = "sigh";
    this.sighTimer = 0;
    this.zaeem.setAnimation("idle-slumped");
    for (let i = 0; i < 4; i++){
      this.particles.push({
        x: this.zaeem.x + this.zaeem.w / 2, y: this.zaeem.y - 4,
        vy: -12 - Math.random() * 8,
        life: 1.4 + Math.random() * 0.6, maxLife: 2,
        delay: i * 0.35,
        size: 6 + Math.random() * 4
      });
    }
  },

  update(dt){
    if (this.state === "explore"){
      if (!TME.PhoneUI.isAnyOpen() && !this.dialogueBox.active){
        this._updateMovement(dt);
      }
    }
    else if (this.state === "sigh"){
      this.sighTimer += dt;
      this.particles.forEach(p => {
        if (p.delay > 0){ p.delay -= dt; return; }
        p.y += p.vy * dt;
        p.life -= dt;
      });
      this.particles = this.particles.filter(p => p.life > 0 || p.delay > 0);

      if (this.sighTimer > 1.4){
        this.state = "monologue_final";
        this.dialogueBox.show(TME.Data.sceneB_monologue_final, {
          mode: "thought",
          onComplete: () => {
            this.state = "ending";
            TME.Fader.fadeOut(1200, () => TME.EndCard.show());
          }
        });
      }
    }

    this.zaeem.update(dt);
  },

  _updateMovement(dt){
    const SPEED = 160;
    let ix = 0, iy = 0;
    const k = this.keys;
    if (k["w"] || k["arrowup"]) iy -= 1;
    if (k["s"] || k["arrowdown"]) iy += 1;
    if (k["a"] || k["arrowleft"]) ix -= 1;
    if (k["d"] || k["arrowright"]) ix += 1;

    if (ix || iy){
      const len = Math.hypot(ix, iy);
      ix /= len; iy /= len;
      const dir = Math.abs(ix) > Math.abs(iy) ? (ix > 0 ? "walk-right" : "walk-left") : (iy > 0 ? "walk-down" : "walk-up");
      this.zaeem.setAnimation(dir);
    } else {
      this.zaeem.setAnimation("idle");
    }

    const nx = this.zaeem.x + ix * SPEED * dt;
    const ny = this.zaeem.y + iy * SPEED * dt;
    const b = this.bounds;
    const clampedX = Math.max(b.x, Math.min(b.x + b.w - this.zaeem.w, nx));
    const clampedY = Math.max(b.y, Math.min(b.y + b.h - this.zaeem.h, ny));

    const testX = { x: clampedX, y: this.zaeem.y, w: this.zaeem.w, h: this.zaeem.h };
    if (!this._overlapsDesk(testX)) this.zaeem.x = clampedX;
    const testY = { x: this.zaeem.x, y: clampedY, w: this.zaeem.w, h: this.zaeem.h };
    if (!this._overlapsDesk(testY)) this.zaeem.y = clampedY;
  },

  _overlapsDesk(r){
    const d = this.desk;
    return r.x < d.x + d.w && r.x + r.w > d.x && r.y < d.y + d.h && r.y + r.h > d.y;
  },

  _distToPhone(){
    const cx = this.zaeem.x + this.zaeem.w / 2, cy = this.zaeem.y + this.zaeem.h / 2;
    const p = this.phone;
    const px = Math.max(p.x, Math.min(cx, p.x + p.w));
    const py = Math.max(p.y, Math.min(cy, p.y + p.h));
    return Math.hypot(cx - px, cy - py);
  },

  handleKey(e){
    if (this.state !== "explore" || TME.PhoneUI.isAnyOpen()) return;
    const k = e.key.toLowerCase();
    this.keys[k] = true;
    if (k === "e" && this._distToPhone() < 70){
      TME.PhoneUI.openList(TME.Data.igFollowingList);
      this.keys = {}; // don't let a held movement key carry over once the phone UI closes
    }
  },
  handleKeyUp(e){
    this.keys[e.key.toLowerCase()] = false;
  },

  render(ctx){
    this._drawBackground(ctx);
    this.zaeem.draw(ctx);
    this._drawSighParticles(ctx);
    this._drawInteractHint(ctx);
  },

  _drawInteractHint(ctx){
    if (this.state !== "explore" || TME.PhoneUI.isAnyOpen()) return;
    if (this._distToPhone() > 70) return;
    ctx.save();
    ctx.font = "10px 'Press Start 2P', monospace";
    ctx.fillStyle = "#fff6c9";
    ctx.textAlign = "center";
    const bob = Math.sin(performance.now() / 220) * 3;
    ctx.fillText("[E]", this.phone.x + this.phone.w / 2, this.phone.y - 14 + bob);
    ctx.restore();
  },

  _drawSighParticles(ctx){
    this.particles.forEach(p => {
      if (p.delay > 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife) * 0.6;
      ctx.fillStyle = "#dfe6ff";
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  },

  // #EDIT-BACKGROUND: replace this with a drawImage() call once you have
  // real background art for "Home".
  _drawBackground(ctx){
    const W = this.W, H = this.H;
    ctx.fillStyle = "#2b3040"; ctx.fillRect(0, 0, W, 340); // wall
    ctx.fillStyle = "#4a3b2e"; ctx.fillRect(0, 340, W, H - 340); // floor
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    for (let x = 0; x < W; x += 48){ ctx.beginPath(); ctx.moveTo(x, 340); ctx.lineTo(x, H); ctx.stroke(); }

    // window
    ctx.fillStyle = "#12121c";
    ctx.fillRect(80, 60, 140, 100);
    ctx.strokeStyle = "#55506e"; ctx.lineWidth = 6;
    ctx.strokeRect(80, 60, 140, 100);

    // desk
    const d = this.desk;
    ctx.fillStyle = "#5b4636";
    ctx.fillRect(d.x, d.y, d.w, d.h);
    ctx.fillStyle = "#3f3226";
    ctx.fillRect(d.x, d.y + d.h - 8, d.w, 8);

    // phone (glowing screen)
    const p = this.phone;
    ctx.fillStyle = "#d8d8e0";
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = `rgba(180,210,255,${0.5 + Math.sin(performance.now() / 500) * 0.2})`;
    ctx.fillRect(p.x + 2, p.y + 2, p.w - 4, p.h - 4);
  }
};
