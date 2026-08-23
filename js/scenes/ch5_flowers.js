// ============================================================================
// TME.Ch5_Flowers — Chapter 5, "Four Flowers"
//
// Registered as "Ch5_Flowers" (see main.js). The most interactive chapter:
//
//   stage "shop"   walk the stall with A/D, [E] to pick a flower. You must
//                  pick exactly TME.DataCh5.pickCount of them; which four you
//                  take is remembered and changes the ending.
//   stage "ride"   hold [W] to actually ride. Nothing advances until you do —
//                  Ayaan's lines only play while the bike is moving.
//   stage "pickup" a different street, and the two of them get on the bikes.
//                  Ends by revealing the hidden message behind each of the
//                  four flowers the player chose.
//
// All text and the flower list live in js/data_ch5.js.
// ============================================================================
window.TME = window.TME || {};

TME.Ch5_Flowers = {
  name: "Ch5_Flowers",

  enter(){
    const W = TME.CANVAS_W, H = TME.CANVAS_H;
    this.W = W; this.H = H;
    const D = TME.DataCh5;

    // SWAP REAL SPRITES HERE — by name from the shared cache in js/sprite.js
    const ayaanSheet = TME.sheet("ayaan", D.SHEETS.AYAAN);
    const bismaSheet = TME.sheet("bisma", TME.DataCh2.SHEETS.BISMA);
    const hamzaSheet = TME.sheet("hamza", TME.DataCh2.SHEETS.HAMZA);

    this.zaeem = new TME.AnimatedSprite(TME.zaeemSheet, 300, 356, 46, 62, D.COLORS.ZAEEM);
    this.ayaan = new TME.AnimatedSprite(ayaanSheet,     760, 356, 46, 62, D.COLORS.AYAAN);
    this.bisma = new TME.AnimatedSprite(bismaSheet,     700, 344, 46, 62, D.COLORS.BISMA);
    this.hamza = new TME.AnimatedSprite(hamzaSheet,     772, 344, 46, 62, D.COLORS.HAMZA);
    this.zaeem.setAnimation("idle");
    this.ayaan.setAnimation("idle");

    // ---- the stall: one bucket per flower, laid out automatically ----
    const n = D.FLOWERS.length;
    const spread = 620;
    this.buckets = D.FLOWERS.map((f, i) => ({
      flower: f,
      x: 180 + (i * spread) / (n - 1),
      y: 330,
      taken: false
    }));

    this.picked = [];              // the flowers actually chosen, in order
    this.keys = {};
    this.walkBounds = { min: 120, max: 840 };

    // ---- ride ----
    this.rideDist = 0;
    this.rideTarget = 900;         // "distance" that counts as arriving
    this.scroll = 0;
    this.rideSaid = false;
    this.laughOffered = false;
    this.laughDone = false;

    this.stage = "shop";
    this.state = "intro_narration";
    this.timer = 0;
    this.hintTimer = 0;

    this.narrList = D.narration_intro;
    this.narrIndex = 0;
    this.narrTimer = 0;
    this.revealIndex = 0;
    this.dialogueBox = TME.dialogueBox;

    // Chapter 4 leaves the screen black; hang the opening cards on it.
    TME.Fader.fadeOut(1, null, (ctx, w, h) => this._drawNarration(ctx, w, h));
  },

  exit(){ this.keys = {}; },

  _say(lines, mode, nextState, after){
    this.dialogueBox.show(lines, {
      mode: mode,
      onComplete: () => { this.state = nextState; this.timer = 0; if (after) after(); }
    });
  },

  update(dt){
    const D = TME.DataCh5;

    if (this.state === "intro_narration" || this.state === "narration_end" || this.state === "reveal"){
      this.narrTimer += dt;
    }

    // ---------------- stage: the flower stall ----------------
    else if (this.state === "shop_intro"){
      this.timer += dt;
      if (this.timer > 0.7){ this.state = "shop_talk"; this._say(D.shop_intro, "speech", "picking"); }
    }

    else if (this.state === "picking"){
      this.hintTimer += dt;
      this._walk(dt);
      if (this.picked.length >= D.pickCount){
        this.state = "picked_talk";
        this._say(D.picked_done, "speech", "to_ride");
      }
    }

    else if (this.state === "to_ride"){
      this.state = "ride_fade";
      TME.Fader.fadeOut(800, () => {
        this.stage = "ride";
        this.state = "ride_wait";
        this.zaeem.setAnimation("idle");
        TME.Fader.fadeIn(800);
      });
    }

    // ---------------- stage: the ride ----------------
    // The bike only moves while W is held, and Ayaan only talks while the
    // bike is moving, so the chapter genuinely waits on the player here.
    else if (this.state === "ride_wait" || this.state === "riding"){
      const moving = !!(this.keys["w"] || this.keys["arrowup"]);
      if (moving){
        this.rideDist += 150 * dt;
        this.scroll += 150 * dt;
        if (this.state === "ride_wait"){ this.state = "riding"; }
      }

      if (this.state === "riding"){
        // first line starts once he's actually rolling
        if (!this.rideSaid && this.rideDist > 40){
          this.rideSaid = true;
          this._say(D.riding, "speech", "laugh_offer");
        }
      }
    }

    else if (this.state === "laugh_offer"){
      // optional beat: take it or leave it
      if (!this.laughOffered){ this.laughOffered = true; this.timer = 0; }
      const moving = !!(this.keys["w"] || this.keys["arrowup"]);
      if (moving){ this.rideDist += 150 * dt; this.scroll += 150 * dt; }
      this.timer += dt;
      if (this.timer > 3.4 && !this.laughDone){
        this.laughDone = true;
        this._say([D.laugh_skipped], "speech", "ride_finish");
      }
    }

    else if (this.state === "ride_finish"){
      const moving = !!(this.keys["w"] || this.keys["arrowup"]);
      if (moving){ this.rideDist += 150 * dt; this.scroll += 150 * dt; }
      if (this.rideDist >= this.rideTarget){
        this.state = "arrive_fade";
        TME.Fader.fadeOut(900, () => {
          this.stage = "pickup";
          this.state = "pickup_talk";
          this.zaeem.x = 250; this.zaeem.y = 356;
          this.ayaan.x = 420; this.ayaan.y = 356;
          this._say(D.pickup, "speech", "give_talk");
          TME.Fader.fadeIn(900);
        });
      }
    }

    // ---------------- stage: the pickup ----------------
    else if (this.state === "give_talk"){
      this._say(D.give_flowers, "speech", "to_reveal");
      this.state = "give_playing";
    }

    else if (this.state === "to_reveal"){
      this.state = "reveal_fade";
      TME.Fader.fadeOut(1400, () => {
        // build the reveal from the four he actually picked
        const D2 = TME.DataCh5;
        this.narrList = [D2.reveal_lead].concat(this.picked.map(f => f.name + " — " + f.hidden));
        this.narrIndex = 0;
        this.narrTimer = 0;
        this.state = "reveal";
      }, (ctx, w, h) => this._drawNarration(ctx, w, h));
    }

    // ---- talk poses ----
    if (this.dialogueBox.active){
      const s = this.dialogueBox.getCurrentSpeaker();
      const C = D.CHAR;
      this.zaeem.setAnimation(s === C.ZAEEM ? "talk" : "idle");
      this.ayaan.setAnimation(s === C.AYAAN ? "talk" : "idle");
      if (this.stage === "pickup"){
        this.bisma.setAnimation(s === C.BISMA ? "talk" : "idle");
        this.hamza.setAnimation(s === C.HAMZA ? "talk" : "idle");
      }
    }

    this.zaeem.update(dt);
    this.ayaan.update(dt);
    this.bisma.update(dt);
    this.hamza.update(dt);
  },

  _walk(dt){
    const SPEED = 150;
    let ix = 0;
    if (this.keys["a"] || this.keys["arrowleft"]) ix -= 1;
    if (this.keys["d"] || this.keys["arrowright"]) ix += 1;

    if (ix){
      this.zaeem.x = Math.max(this.walkBounds.min,
                     Math.min(this.walkBounds.max, this.zaeem.x + ix * SPEED * dt));
      this.zaeem.setAnimation(ix > 0 ? "walk-right" : "walk-left");
    } else {
      this.zaeem.setAnimation("idle");
    }
  },

  // nearest un-taken bucket within reach, or null
  _nearBucket(){
    const cx = this.zaeem.x + this.zaeem.w / 2;
    let best = null, bestD = 62;
    this.buckets.forEach(b => {
      if (b.taken) return;
      const d = Math.abs(cx - b.x);
      if (d < bestD){ bestD = d; best = b; }
    });
    return best;
  },

  handleKey(e){
    const k = e.key.toLowerCase();
    this.keys[k] = true;

    // --- narration / reveal cards ---
    if (this.state === "intro_narration" || this.state === "narration_end" || this.state === "reveal"){
      if (k !== "e" && k !== " " && k !== "enter") return;
      e.preventDefault();
      this.narrIndex++;
      this.narrTimer = 0;
      if (this.narrIndex < this.narrList.length) return;

      if (this.state === "intro_narration"){
        this.state = "shop_intro";
        this.timer = 0;
        TME.Fader.fadeIn(1000);
      } else if (this.state === "reveal"){
        // straight into the closing cards, still over black
        this.narrList = TME.DataCh5.narration_end;
        this.narrIndex = 0;
        this.narrTimer = 0;
        this.state = "narration_end";
      } else {
        const D = TME.DataCh5;
        this.state = "ending";
        TME.EndCard.show({
          title: D.chapterEndTitle,
          subtitle: D.chapterEndSubtitle,
          onDone: () => TME.goToChapter("Ch6")
        });
      }
      return;
    }

    // --- [E] to pick a flower ---
    if (this.state === "picking" && k === "e"){
      const b = this._nearBucket();
      if (b){
        b.taken = true;
        this.picked.push(b.flower);
        TME.dialogueBox.show([{ speaker: "Zaeem (thinking)", text: b.flower.pick }], { mode: "thought" });
      }
      return;
    }

    // --- [E] to laugh (optional) ---
    if (this.state === "laugh_offer" && k === "e" && !this.laughDone){
      this.laughDone = true;
      this._say([TME.DataCh5.laugh_line], "speech", "ride_finish");
    }
  },

  handleKeyUp(e){ this.keys[e.key.toLowerCase()] = false; },

  render(ctx){
    if (this.stage === "shop"){
      this._drawStreet(ctx, "#2b2f42", "#3b4258");
      this._drawStall(ctx);
      this.zaeem.draw(ctx);
      this.ayaan.draw(ctx);
      this._drawBike(ctx, 700, 402, TME.DataCh5.COLORS.AYAAN, null);
      this._drawPickHud(ctx);
    }
    else if (this.stage === "ride"){
      this._drawRide(ctx);
      this._drawRidePrompt(ctx);
    }
    else {
      // #EDIT-BACKGROUND — deliberately a different street from the ride
      this._drawPickupStreet(ctx);
      this._drawBike(ctx, 250, 402, TME.DataCh5.COLORS.ZAEEM, this.zaeem);
      this._drawBike(ctx, 420, 402, TME.DataCh5.COLORS.AYAAN, this.ayaan);
      this.bisma.draw(ctx);
      this.hamza.draw(ctx);
      this._drawBouquet(ctx, this.zaeem.x + 40, this.zaeem.y + 26, 0.9);
    }
  },

  // ---- HUD ------------------------------------------------------------
  _drawPickHud(ctx){
    const D = TME.DataCh5;
    if (this.state !== "picking") return;

    ctx.save();
    ctx.font = "10px 'Press Start 2P', monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = "#e8c170";
    ctx.fillText("PICKED  " + this.picked.length + " / " + D.pickCount, 28, 42);

    ctx.font = "8px 'Press Start 2P', monospace";
    ctx.fillStyle = "#8f95b3";
    this.picked.forEach((f, i) => ctx.fillText("- " + f.name, 28, 64 + i * 16));

    // the one-time control hint
    if (this.hintTimer < 7){
      ctx.textAlign = "center";
      ctx.globalAlpha = Math.max(0, Math.min(1, (7 - this.hintTimer) / 1.5));
      ctx.fillStyle = "#8fe3ff";
      ctx.fillText(D.hint_pick, this.W / 2, 470);
      ctx.globalAlpha = 1;
    }

    // [E] over whichever bucket is in reach
    const b = this._nearBucket();
    if (b){
      ctx.textAlign = "center";
      ctx.font = "10px 'Press Start 2P', monospace";
      ctx.fillStyle = "#fff6c9";
      const bob = Math.sin(performance.now() / 220) * 3;
      ctx.fillText("[E]", b.x, b.y - 78 + bob);
    }
    ctx.restore();
  },

  _drawRidePrompt(ctx){
    const D = TME.DataCh5;
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "10px 'Press Start 2P', monospace";

    if (this.state === "ride_wait"){
      ctx.globalAlpha = 0.35 + Math.abs(Math.sin(performance.now() / 420)) * 0.65;
      ctx.fillStyle = "#8fe3ff";
      ctx.fillText(D.ride_prompt, this.W / 2, 452);
    } else if (this.state === "laugh_offer" && !this.laughDone){
      ctx.globalAlpha = 0.4 + Math.abs(Math.sin(performance.now() / 300)) * 0.6;
      ctx.fillStyle = "#ffb0d0";
      ctx.fillText(D.laugh_prompt, this.W / 2, 452);
    }

    // distance bar, so "hold W" has visible feedback
    if (this.stage === "ride"){
      ctx.globalAlpha = 1;
      const w = 240, x = this.W / 2 - w / 2, y = 42;
      ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(x, y, w, 8);
      ctx.fillStyle = "#e8c170";
      ctx.fillRect(x, y, w * Math.min(1, this.rideDist / this.rideTarget), 8);
    }
    ctx.restore();
  },

  // ========================================================================
  // #EDIT-BACKGROUND / SWAP REAL TILESET HERE
  // ========================================================================
  _drawStreet(ctx, skyTop, skyBottom){
    const W = this.W, H = this.H;
    const sky = ctx.createLinearGradient(0, 0, 0, 260);
    sky.addColorStop(0, skyTop); sky.addColorStop(1, skyBottom);
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, 260);

    // building band
    ctx.fillStyle = "#232838"; ctx.fillRect(0, 120, W, 140);
    ctx.fillStyle = "#e8c98a";
    for (let x = 20; x < W; x += 46){
      for (let y = 136; y < 244; y += 28){
        if (((x * 3 + y) % 7) < 3) ctx.fillRect(x, y, 14, 12);
      }
    }
    ctx.fillStyle = "#1a1e2b"; ctx.fillRect(0, 260, W, 60);

    // pavement + road
    ctx.fillStyle = "#4a4f63"; ctx.fillRect(0, 320, W, 90);
    ctx.fillStyle = "#3d4152";
    for (let x = 0; x < W; x += 56) ctx.fillRect(x, 320, 2, 90);
    ctx.fillStyle = "#2a2c36"; ctx.fillRect(0, 410, W, H - 410);
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    for (let x = 20; x < W; x += 110) ctx.fillRect(x, 470, 56, 5);
  },

  // SWAP REAL SPRITES HERE — the flower stall.
  _drawStall(ctx){
    // awning over the whole stall
    ctx.fillStyle = "#7a2f3a"; ctx.fillRect(120, 176, 760, 26);
    for (let x = 120; x < 880; x += 44){
      ctx.fillStyle = ((x / 44) | 0) % 2 ? "#a63e4c" : "#efe6d8";
      ctx.fillRect(x, 202, 44, 16);
    }
    ctx.fillStyle = "#4a3a2e"; ctx.fillRect(126, 202, 8, 160);
    ctx.fillStyle = "#4a3a2e"; ctx.fillRect(866, 202, 8, 160);

    // trestle
    ctx.fillStyle = "#5b4636"; ctx.fillRect(120, 352, 760, 16);
    ctx.fillStyle = "#3f3226"; ctx.fillRect(120, 368, 760, 8);

    this.buckets.forEach(b => this._drawBucket(ctx, b));
  },

  _drawBucket(ctx, b){
    const f = b.flower;
    // zinc bucket
    ctx.fillStyle = "#6f7480"; ctx.fillRect(b.x - 22, b.y - 4, 44, 44);
    ctx.fillStyle = "#878d9a"; ctx.fillRect(b.x - 22, b.y - 4, 44, 7);

    if (b.taken){
      ctx.save();
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = "#3d4152";
      ctx.fillRect(b.x - 16, b.y - 30, 32, 30);
      ctx.restore();
      return;
    }

    // stems
    ctx.fillStyle = "#3f6529";
    for (let i = -1; i <= 1; i++) ctx.fillRect(b.x + i * 11 - 2, b.y - 44, 4, 46);

    // blooms
    for (let i = -1; i <= 1; i++){
      const cx = b.x + i * 11, cy = b.y - 50 - Math.abs(i) * 4;
      ctx.fillStyle = f.petal;
      for (let p = 0; p < 6; p++){
        const a = (p / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(cx + Math.cos(a) * 7, cy + Math.sin(a) * 7, 5, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = f.center;
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
    }

    // name card on the trestle
    ctx.save();
    ctx.font = "7px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#efe6d8"; ctx.fillRect(b.x - 34, b.y + 44, 68, 14);
    ctx.fillStyle = "#2a2a2a";
    ctx.fillText(f.name.slice(0, 10), b.x, b.y + 54);
    ctx.restore();
  },

  // Scrolling road for the ride stage.
  _drawRide(ctx){
    const W = this.W, H = this.H;
    const s = this.scroll;

    const sky = ctx.createLinearGradient(0, 0, 0, 250);
    sky.addColorStop(0, "#1b2036"); sky.addColorStop(1, "#38405e");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, 250);

    // far parallax
    ctx.fillStyle = "#242a3d";
    for (let i = -1; i < 8; i++){
      const x = ((i * 160 - s * 0.25) % (W + 320)) - 160;
      ctx.fillRect(x, 150, 120, 110);
    }
    // near parallax with lit windows
    for (let i = -1; i < 10; i++){
      const x = ((i * 130 - s * 0.6) % (W + 260)) - 130;
      ctx.fillStyle = i % 2 ? "#2c3348" : "#333b54";
      ctx.fillRect(x, 118, 104, 142);
      ctx.fillStyle = "#e8c98a";
      for (let y = 132; y < 244; y += 26){
        if (((i * 5 + y) % 9) < 4) ctx.fillRect(x + 14, y, 13, 11);
      }
    }

    ctx.fillStyle = "#4a4f63"; ctx.fillRect(0, 260, W, 60);
    ctx.fillStyle = "#2a2c36"; ctx.fillRect(0, 320, W, H - 320);

    // road dashes streaming past
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    for (let i = -1; i < 12; i++){
      const x = ((i * 120 - s * 1.6) % (W + 240)) - 120;
      ctx.fillRect(x, 452, 66, 6);
    }

    // the two bikes, bobbing when moving
    const moving = !!(this.keys["w"] || this.keys["arrowup"]);
    const bob = moving ? Math.sin(performance.now() / 70) * 2 : 0;
    this._drawBike(ctx, 300, 392 + bob, TME.DataCh5.COLORS.ZAEEM, null, true);
    this._drawBike(ctx, 560, 386 - bob, TME.DataCh5.COLORS.AYAAN, null, true);
    this._drawBouquet(ctx, 268, 356 + bob, 0.8);
  },

  // #EDIT-BACKGROUND — the pickup street, deliberately different from the
  // ride: daylight-ish, low buildings, her gate on the right.
  _drawPickupStreet(ctx){
    const W = this.W, H = this.H;
    const sky = ctx.createLinearGradient(0, 0, 0, 250);
    sky.addColorStop(0, "#3a3352"); sky.addColorStop(1, "#7a5a63");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, 250);

    ctx.fillStyle = "#2e2a3c";
    [[0, 150, 190, 110], [210, 120, 170, 140], [400, 160, 150, 100]].forEach(b => {
      ctx.fillRect(b[0], b[1], b[2], b[3]);
    });

    // her building + gate on the right
    ctx.fillStyle = "#413a52"; ctx.fillRect(600, 96, 300, 164);
    ctx.fillStyle = "#584f6e"; ctx.fillRect(592, 88, 316, 12);
    ctx.fillStyle = "#f0d9a8"; ctx.fillRect(690, 178, 56, 82);
    ctx.fillStyle = "#e8c98a";
    for (let x = 620; x < 890; x += 44){
      for (let y = 112; y < 168; y += 26) ctx.fillRect(x, y, 16, 13);
    }

    ctx.fillStyle = "#1e1b28"; ctx.fillRect(0, 260, W, 60);
    ctx.fillStyle = "#5a5468"; ctx.fillRect(0, 320, W, 90);
    ctx.fillStyle = "#4c4759";
    for (let x = 0; x < W; x += 56) ctx.fillRect(x, 320, 2, 90);
    ctx.fillStyle = "#33303c"; ctx.fillRect(0, 410, W, H - 410);
  },

  // SWAP REAL SPRITES HERE — scooter/bike. Pass a sprite to seat a rider.
  _drawBike(ctx, x, y, color, rider, riding){
    ctx.save();
    ctx.fillStyle = "#16181f";
    ctx.beginPath(); ctx.arc(x - 26, y, 13, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 30, y, 13, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#4a4f63";
    ctx.beginPath(); ctx.arc(x - 26, y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 30, y, 5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = color;
    ctx.fillRect(x - 24, y - 22, 54, 16);
    ctx.fillStyle = "#22252f";
    ctx.fillRect(x - 12, y - 30, 30, 10);          // seat
    ctx.fillRect(x + 26, y - 40, 6, 20);           // handlebar stem
    ctx.fillRect(x + 16, y - 42, 26, 5);           // bars
    ctx.restore();

    if (rider){ rider.y = y - 92; rider.x = x - 18; rider.draw(ctx); }
    else if (riding){
      // simple seated rider so the ride reads without a full sprite
      ctx.fillStyle = color;
      ctx.fillRect(x - 10, y - 62, 24, 34);
      ctx.fillStyle = "#c99a72"; ctx.fillRect(x - 5, y - 80, 16, 18);
      ctx.fillStyle = "#241a16"; ctx.fillRect(x - 6, y - 84, 18, 8);
    }
  },

  // the bunch he's carrying — drawn from whichever flowers were picked
  _drawBouquet(ctx, x, y, scale){
    if (!this.picked.length) return;
    ctx.save();
    ctx.translate(x, y); ctx.scale(scale, scale);
    ctx.fillStyle = "#3f6529"; ctx.fillRect(-3, 0, 6, 26);
    this.picked.forEach((f, i) => {
      const a = -0.6 + i * 0.4;
      const cx = Math.sin(a) * 15, cy = -12 - Math.cos(a) * 8;
      ctx.fillStyle = f.petal;
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = f.center;
      ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
  },

  _drawNarration(ctx, w, h){
    const text = this.narrList && this.narrList[this.narrIndex];
    if (!text) return;
    const appear = Math.min(1, this.narrTimer / 0.55);

    ctx.save();
    ctx.font = "11px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.globalAlpha = appear;

    const lines = this._wrapText(ctx, text, 700);
    const lineHeight = 30;
    const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2;
    ctx.fillStyle = "#d9cfe6";
    lines.forEach((line, i) => ctx.fillText(line, w / 2, startY + i * lineHeight));

    ctx.globalAlpha = appear * (0.35 + Math.abs(Math.sin(performance.now() / 500)) * 0.65);
    ctx.font = "9px 'Press Start 2P', monospace";
    ctx.fillStyle = "#8fe3ff";
    ctx.fillText("[E]", w / 2, h - 64);
    ctx.restore();
  },

  _wrapText(ctx, text, maxWidth){
    const words = text.split(" ");
    const lines = [];
    let line = "";
    words.forEach(word => {
      const test = line ? line + " " + word : word;
      if (line && ctx.measureText(test).width > maxWidth){ lines.push(line); line = word; }
      else line = test;
    });
    if (line) lines.push(line);
    return lines;
  }
};
