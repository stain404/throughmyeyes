// ============================================================================
// TME.Ch2_Restaurant — Chapter 2, "Back To The Road"
//
// Registered as "Ch2_Restaurant" (see main.js). Cinematic chapter: the player
// never moves, [E] carries the whole thing.
//
// Al Broaster King, Millat Nagar. Open street-side shop — the pavement with
// the orange plastic chairs IS the seating, and the road is at the bottom of
// frame, behind the camera's shoulder. Zaeem and his cousin are at the far
// left table. Bisma is at the right table facing the road, with her friend
// sitting to her right. Hamza walks in from the
// left, greets Zaeem first, then crosses over to their table.
//
// Beat order (this.state):
//   intro_narration -> settle -> banter -> notice_pan -> notice ->
//   hamza_enter -> greeting -> hamza_cross -> turn -> angel ->
//   cousin_beat -> watching -> fading -> narration_end -> end card
//
// All text lives in js/data_ch2.js. Nothing here needs editing to rewrite it.
// ============================================================================
window.TME = window.TME || {};

TME.Ch2_Restaurant = {
  name: "Ch2_Restaurant",

  enter(){
    const W = TME.CANVAS_W, H = TME.CANVAS_H;
    this.W = W; this.H = H;

    const D = TME.DataCh2;

    // SWAP REAL SPRITES HERE — fetched by name from the shared cache in
    // js/sprite.js, so this scene can be entered in any order.
    const sheets = {
      cousin: TME.sheet("cousin",     D.SHEETS.COUSIN),
      bisma:  TME.sheet("bisma",      D.SHEETS.BISMA),
      friend: TME.sheet("bismaFriend", D.SHEETS.FRIEND),
      hamza:  TME.sheet("hamza",      D.SHEETS.HAMZA)
    };

    // ---- cast -----------------------------------------------------------
    // Zaeem reuses the Chapter 1 sheet built in main.js.
    this.zaeem  = new TME.AnimatedSprite(TME.zaeemSheet,  92, 352, 46, 62, D.COLORS.ZAEEM);
    this.cousin = new TME.AnimatedSprite(sheets.cousin,  158, 352, 46, 62, D.COLORS.COUSIN);
    this.bisma  = new TME.AnimatedSprite(sheets.bisma,   580, 320, 46, 62, D.COLORS.BISMA);
    // broader build than the others — the placeholder scales to w/h
    this.friend = new TME.AnimatedSprite(sheets.friend,  642, 320, 58, 62, D.COLORS.FRIEND);
    this.hamza  = new TME.AnimatedSprite(sheets.hamza,   -60, 366, 46, 62, D.COLORS.HAMZA);

    this.zaeem.setAnimation("idle");
    this.cousin.setAnimation("idle");
    // Facing the road, so Zaeem can see her from his table the whole time.
    this.bisma.setAnimation("idle");
    this.friend.setAnimation("idle");
    this.hamza.setAnimation("walk-right");   // he comes in from the left

    this.leftTable  = { cx: 146, cy: 412, rx: 62, ry: 16 };
    this.rightTable = { cx: 668, cy: 378, rx: 66, ry: 17 };
    this.greetX = 238;                        // where Hamza stops at their table
    this.crossTo = { x: 718, y: 344 };        // where he ends up, at hers

    // ---- camera ---------------------------------------------------------
    this.cam       = { zoom: 1, fx: W / 2, fy: H / 2 };
    this.camTarget = { zoom: 1, fx: W / 2, fy: H / 2 };

    // ---- narration ------------------------------------------------------
    this.narrList = D.narration_intro;
    this.narrIndex = 0;
    this.narrTimer = 0;
    this.state = "intro_narration";
    this.timer = 0;
    this.dialogueBox = TME.dialogueBox;

    // Chapter 1 leaves the screen already black. Park the fader there and
    // hang the opening narration on it (fadeOut's holdDraw hook) rather than
    // fading in first — the time-jump cards come before the scene appears.
    TME.Fader.fadeOut(1, null, (ctx, w, h) => this._drawNarration(ctx, w, h));
  },

  exit(){},

  update(dt){
    const D = TME.DataCh2;
    const WALK = 128;

    if (this.state === "intro_narration" || this.state === "narration_end"){
      this.narrTimer += dt;
    }

    else if (this.state === "settle"){
      this.timer += dt;
      if (this.timer > 1.2){
        this.state = "banter";
        this.dialogueBox.show(D.banter, {
          mode: "speech",
          onComplete: () => { this.state = "notice_pan"; this.timer = 0; }
        });
      }
    }

    // -- he clocks the table on the right ---------------------------------
    else if (this.state === "notice_pan"){
      this.camTarget = { zoom: 1.14, fx: 690, fy: 360 };
      this.timer += dt;
      if (this.timer > 1.6){
        this.state = "notice";
        this.dialogueBox.show(D.monologue_notice, {
          mode: "thought",
          onComplete: () => {
            this.state = "hamza_enter";
            this.camTarget = { zoom: 1, fx: this.W / 2, fy: this.H / 2 };
          }
        });
      }
    }

    // -- Hamza comes in from the left and hits their table first ----------
    else if (this.state === "hamza_enter"){
      this.hamza.setAnimation("walk-right");
      this.hamza.x += WALK * dt;
      if (this.hamza.x >= this.greetX){
        this.hamza.x = this.greetX;
        this.hamza.setAnimation("idle");
        this.state = "greeting";
        this.dialogueBox.show(D.hamza_greeting, {
          mode: "speech",
          onComplete: () => { this.state = "hamza_cross"; }
        });
      }
    }

    // -- he crosses to their table; a beat, then the angel monologue -------
    else if (this.state === "hamza_cross"){
      if (this._moveToward(this.hamza, this.crossTo.x, this.crossTo.y, WALK, dt)){
        this.hamza.setAnimation("idle");
        this.state = "turn";
        this.timer = 0;
        this.camTarget = { zoom: 1.2, fx: 690, fy: 356 };
      }
    }

    else if (this.state === "turn"){
      this.timer += dt;
      if (this.timer > 1.0){
        this.state = "angel";
        this.dialogueBox.show(D.monologue_angel, {
          mode: "thought",
          onComplete: () => {
            this.state = "cousin_beat";
            this.camTarget = { zoom: 1.05, fx: this.W / 2, fy: this.H / 2 };
            this.dialogueBox.show(D.cousin_catches, {
              mode: "speech",
              onComplete: () => {
                this.state = "watching";
                this.dialogueBox.show(D.monologue_watching, {
                  mode: "thought",
                  onComplete: () => {
                    // settle back onto her for the quiet beat before the fade
                    this.state = "romantic";
                    this.camTarget = { zoom: 1.22, fx: 686, fy: 352 };
                    this.dialogueBox.show(D.monologue_romantic, {
                      mode: "thought",
                      onComplete: () => this._startEnding()
                    });
                  }
                });
              }
            });
          }
        });
      }
    }

    // -- keep the "talk" pose on whoever is speaking ----------------------
    if (this.dialogueBox.active){
      const speaker = this.dialogueBox.getCurrentSpeaker();
      const C = D.CHAR;
      this.zaeem.setAnimation(speaker === C.ZAEEM ? "talk" : "idle");
      this.cousin.setAnimation(speaker === C.COUSIN ? "talk" : "idle");
      if (this.state === "greeting") this.hamza.setAnimation(speaker === C.HAMZA ? "talk" : "idle");
    }

    this._updateCamera(dt);
    this.zaeem.update(dt);
    this.cousin.update(dt);
    this.bisma.update(dt);
    this.friend.update(dt);
    this.hamza.update(dt);
  },

  _startEnding(){
    const D = TME.DataCh2;
    this.state = "fading";
    TME.Fader.fadeOut(1600, () => {
      this.state = "narration_end";
      this.narrList = D.narration_end;
      this.narrIndex = 0;
      this.narrTimer = 0;
    }, (ctx, w, h) => this._drawNarration(ctx, w, h));
  },

  // [E] drives both narration blocks. Reachable only when the dialogue box
  // is closed, so main.js's input router hands the key to the scene.
  handleKey(e){
    const narrating = this.state === "intro_narration" || this.state === "narration_end";
    if (!narrating) return;
    const k = e.key.toLowerCase();
    if (k !== "e" && k !== " " && k !== "enter") return;
    e.preventDefault();

    this.narrIndex++;
    this.narrTimer = 0;
    if (this.narrIndex < this.narrList.length) return;

    if (this.state === "intro_narration"){
      // cards done — now let the shopfront fade up
      this.state = "settle";
      this.timer = 0;
      TME.Fader.fadeIn(1100);
    } else {
      const D = TME.DataCh2;
      this.state = "ending";
      TME.EndCard.show({
        title: D.chapterEndTitle,
        subtitle: D.chapterEndSubtitle,
        onDone: () => TME.goToChapter("Ch3_GroupChat")
      });
    }
  },

  // ---- helpers ---------------------------------------------------------
  _moveToward(sprite, tx, ty, speed, dt){
    const dx = tx - sprite.x, dy = ty - sprite.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 2){ sprite.x = tx; sprite.y = ty; return true; }
    const step = Math.min(dist, speed * dt);
    sprite.x += (dx / dist) * step;
    sprite.y += (dy / dist) * step;
    sprite.setAnimation(
      Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "walk-right" : "walk-left")
                                  : (dy > 0 ? "walk-down"  : "walk-up")
    );
    return false;
  },

  _updateCamera(dt){
    const t = Math.min(1, dt * 2.2);
    this.cam.zoom += (this.camTarget.zoom - this.cam.zoom) * t;
    this.cam.fx   += (this.camTarget.fx   - this.cam.fx)   * t;
    this.cam.fy   += (this.camTarget.fy   - this.cam.fy)   * t;
  },

  render(ctx){
    ctx.save();
    ctx.translate(this.cam.fx, this.cam.fy);
    ctx.scale(this.cam.zoom, this.cam.zoom);
    ctx.translate(-this.cam.fx, -this.cam.fy);

    this._drawBackground(ctx);

    // a spare table out in the middle of the pavement, like the photo
    this._drawChairBack(ctx, 372, 350, 40);
    this._drawChairLegs(ctx, 372, 410);
    this._drawChairBack(ctx, 440, 350, 40);
    this._drawChairLegs(ctx, 440, 410);
    this._drawTable(ctx, { cx: 406, cy: 396, rx: 58, ry: 15 });

    // right table: chair legs behind, people, then the chair backs across
    // their shoulders (they're sitting with their backs to us), then table
    this._drawChairLegs(ctx, 603, 386);
    this._drawChairLegs(ctx, 671, 386);
    this._drawChairBack(ctx, 603, 358, 40);
    this._drawChairBack(ctx, 671, 358, 48);
    this.bisma.draw(ctx);
    this.friend.draw(ctx);
    if (this.state === "turn" || this.state === "angel" ||
        this.state === "cousin_beat" || this.state === "watching" ||
        this.state === "romantic" || this.state === "fading" ||
        this.state === "narration_end" || this.state === "ending"){
      this.hamza.draw(ctx);   // standing at their table by now
    }
    this._drawTable(ctx, this.rightTable);

    // Hamza is out in the open while walking
    if (this.state === "hamza_enter" || this.state === "greeting" || this.state === "hamza_cross"){
      this.hamza.draw(ctx);
    }

    // left table (nearer the camera, so drawn last). These two face each
    // other, so their chair backs sit behind them.
    this._drawChairBack(ctx, 115, 368, 40);
    this._drawChairBack(ctx, 181, 368, 40);
    this._drawChairLegs(ctx, 115, 418);
    this._drawChairLegs(ctx, 181, 418);
    this.zaeem.draw(ctx);
    this.cousin.draw(ctx);
    this._drawTable(ctx, this.leftTable);

    ctx.restore();
  },

  // ========================================================================
  // #EDIT-BACKGROUND / SWAP REAL TILESET HERE
  // Everything below is a procedural stand-in for the real shopfront:
  // the black ABK board, the corrugated awning, the open shop with the
  // freezer and the glass display, the laundry board on the left pillar,
  // the general store on the right, and the green astroturf pavement.
  // Replace with drawImage() calls once you have real art or a tileset.
  // ========================================================================
  _drawBackground(ctx){
    this._drawSign(ctx);
    this._drawAwning(ctx);
    this._drawShopfront(ctx);
    this._drawPavement(ctx);

    // evening wash over everything, so the open shop stays the one bright
    // thing in frame. #EDIT: raise/lower the alpha to change the hour.
    ctx.save();
    ctx.fillStyle = "rgba(14,18,38,0.34)";
    ctx.fillRect(0, 0, this.W, this.H);
    ctx.restore();
  },

  _drawSign(ctx){
    const S = TME.DataCh2.sign;

    // neighbouring shop boards either side, cropped by the frame. Lit boards
    // at night, so they stay readable while everything around them is dark.
    ctx.fillStyle = "#22364d"; ctx.fillRect(0, 0, 92, 150);
    ctx.fillStyle = "#31506e";
    for (let y = 12; y < 140; y += 26) ctx.fillRect(8, y, 76, 18);
    ctx.fillStyle = "#7a4711"; ctx.fillRect(876, 0, 84, 150);
    ctx.fillStyle = "#b57c28"; ctx.fillRect(884, 16, 68, 110);

    // the black board
    ctx.fillStyle = "#141519";
    ctx.fillRect(92, 6, 784, 140);
    ctx.strokeStyle = "#6d5a3c"; ctx.lineWidth = 4;
    ctx.strokeRect(92, 6, 784, 140);

    // Devanagari shop name — falls back silently if no Indic font is present
    ctx.save();
    ctx.fillStyle = "#f2efe6";
    ctx.font = "24px 'Nirmala UI', 'Mangal', 'Noto Sans Devanagari', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(S.hindi, 112, 42);

    // ABK + the burger, chef roundel, English name
    ctx.font = "22px 'Press Start 2P', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(S.short, 112, 96);

    ctx.fillStyle = "#e8b44c"; ctx.fillRect(206, 74, 62, 12);     // bun
    ctx.fillStyle = "#7fae4e"; ctx.fillRect(206, 86, 62, 5);      // lettuce
    ctx.fillStyle = "#8a4a2a"; ctx.fillRect(206, 91, 62, 8);      // patty
    ctx.fillStyle = "#e8b44c"; ctx.fillRect(206, 99, 62, 11);     // base

    ctx.fillStyle = "#f2efe6";
    ctx.beginPath(); ctx.arc(320, 92, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#141519";
    ctx.beginPath(); ctx.arc(320, 86, 11, 0, Math.PI * 2); ctx.fill();  // chef head
    ctx.fillRect(309, 96, 22, 12);                                       // chef body

    ctx.font = "15px 'Press Start 2P', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(S.english, 380, 94);

    ctx.font = "11px 'Press Start 2P', monospace";
    ctx.fillText(S.delivery.split(" ").slice(0, 2).join(" "), 664, 74);
    ctx.fillText(S.delivery.split(" ").slice(2).join(" "), 664, 96);
    ctx.restore();

    // white address strip along the bottom of the board
    ctx.fillStyle = "#efece2"; ctx.fillRect(96, 126, 776, 18);
    ctx.save();
    ctx.fillStyle = "#2a2a2a";
    ctx.font = "7px 'Press Start 2P', monospace";
    ctx.fillText(TME.DataCh2.sign.address, 104, 139);
    ctx.restore();
  },

  _drawAwning(ctx){
    // corrugated sheet, only lit from below by the shop's tube lights
    for (let x = 92; x < 876; x += 10){
      ctx.fillStyle = ((x / 10) | 0) % 2 ? "#33302a" : "#2a2823";
      ctx.fillRect(x, 146, 10, 32);
    }
    ctx.fillStyle = "#2d2a24"; ctx.fillRect(92, 146, 784, 5);
    // the green-yellow beam under it
    ctx.fillStyle = "#48521e"; ctx.fillRect(92, 178, 784, 10);
    ctx.fillStyle = "#333a15"; ctx.fillRect(92, 186, 784, 4);

    // tube lights along the underside — the reason anything out here is
    // visible at all at this hour
    for (let i = 0; i < 3; i++){
      const x = 180 + i * 260;
      ctx.fillStyle = "#fff6d8"; ctx.fillRect(x, 190, 180, 5);
      ctx.save();
      ctx.globalAlpha = 0.07; ctx.fillStyle = "#ffe9a8";
      ctx.beginPath(); ctx.ellipse(x + 90, 208, 150, 46, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // support posts down to the pavement
    ctx.fillStyle = "#26231e";
    ctx.fillRect(294, 188, 8, 142);
    ctx.fillRect(592, 188, 8, 142);
  },

  _drawShopfront(ctx){
    // weathered concrete face, in shadow at this hour
    ctx.fillStyle = "#332e28"; ctx.fillRect(0, 188, 960, 142);
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    for (let y = 188; y < 330; y += 22) ctx.fillRect(0, y, 960, 2);

    // ---- the open shop: lit up, and the only real light source here ----
    ctx.fillStyle = "#6d5734"; ctx.fillRect(296, 196, 300, 134);
    ctx.fillStyle = "#8a6d3d"; ctx.fillRect(302, 196, 288, 44);   // strip-lit back wall
    ctx.fillStyle = "#fff4d0"; ctx.fillRect(320, 202, 250, 5);    // the tube inside

    // guy standing in the doorway, backlit
    ctx.fillStyle = "#7a2f28"; ctx.fillRect(408, 232, 26, 42);
    ctx.fillStyle = "#2e211a"; ctx.fillRect(408, 274, 26, 48);
    ctx.fillStyle = "#b98963"; ctx.fillRect(414, 218, 15, 16);

    // glass display / drinks fridge, lit from within
    ctx.fillStyle = "#2c3740"; ctx.fillRect(516, 214, 72, 116);
    ctx.fillStyle = "#6f8ea3";
    for (let y = 222; y < 322; y += 22) ctx.fillRect(520, y, 64, 3);

    // ice cream freezer, white with a red band
    ctx.fillStyle = "#cec8bd"; ctx.fillRect(302, 250, 92, 80);
    ctx.fillStyle = "#a52d26"; ctx.fillRect(302, 262, 92, 20);
    ctx.fillStyle = "#ded8cd"; ctx.fillRect(306, 288, 84, 38);

    // ---- left pillar: the laundry board and the man sat under it ----
    ctx.fillStyle = "#2c2721"; ctx.fillRect(92, 188, 204, 142);
    ctx.fillStyle = "#8b8579"; ctx.fillRect(100, 208, 74, 92);
    ctx.strokeStyle = "#4a4034"; ctx.lineWidth = 2;
    ctx.strokeRect(100, 208, 74, 92);
    ctx.fillStyle = "#8a4467"; ctx.fillRect(104, 212, 66, 12);
    ctx.fillStyle = "#6e7488";
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 3; c++) ctx.fillRect(106 + c * 22, 230 + r * 17, 18, 13);

    ctx.fillStyle = "#26304a"; ctx.fillRect(104, 286, 30, 34);   // seated man
    ctx.fillStyle = "#9c7657"; ctx.fillRect(111, 270, 16, 17);
    ctx.fillStyle = "#1c1410"; ctx.fillRect(110, 266, 18, 8);

    // ---- right side: general store, poles, bucket, concrete block ----
    ctx.fillStyle = "#282320"; ctx.fillRect(600, 188, 360, 142);
    // its own strip light, so the hanging packets still read
    ctx.fillStyle = "#fff4d0"; ctx.fillRect(676, 192, 200, 4);
    const packs = ["#a83b2e", "#b8993a", "#3a6fa8", "#4a8a3e", "#a8628a"];
    for (let c = 0; c < 7; c++){
      for (let r = 0; r < 5; r++){
        ctx.fillStyle = packs[(c + r) % packs.length];
        ctx.fillRect(690 + c * 24, 200 + r * 17, 18, 13);
      }
    }
    ctx.fillStyle = "#8f2c21"; ctx.fillRect(736, 200, 6, 120); ctx.fillRect(756, 200, 6, 120);
    ctx.fillStyle = "#25539c"; ctx.fillRect(782, 282, 58, 44);   // blue bucket
    ctx.fillStyle = "#3769b0"; ctx.fillRect(782, 282, 58, 8);
    ctx.fillStyle = "#453c32"; ctx.fillRect(866, 296, 78, 60);   // concrete block
    ctx.fillStyle = "#372f27"; ctx.fillRect(866, 296, 78, 8);
  },

  _drawPavement(ctx){
    const H = this.H;
    // astroturf, dark except where the shop light reaches it
    ctx.fillStyle = "#1e2714"; ctx.fillRect(0, 330, 960, 200);
    ctx.fillStyle = "rgba(0,0,0,0.10)";
    for (let x = 0; x < 960; x += 7) ctx.fillRect(x, 330, 3, 200);

    // pool of warm light spilling out of the open shop
    ctx.save();
    const spill = ctx.createRadialGradient(446, 330, 20, 446, 330, 250);
    spill.addColorStop(0, "rgba(255,220,150,0.20)");
    spill.addColorStop(1, "rgba(255,220,150,0)");
    ctx.fillStyle = spill;
    ctx.fillRect(0, 330, 960, 200);
    ctx.restore();

    ctx.fillStyle = "rgba(255,255,255,0.03)";
    for (let y = 336; y < 530; y += 12) ctx.fillRect(0, y, 960, 2);

    // kerb, then the road itself — she has her back to this
    ctx.fillStyle = "#33302a"; ctx.fillRect(0, 530, 960, 14);
    ctx.fillStyle = "#131211"; ctx.fillRect(0, 544, 960, H - 544);
    ctx.fillStyle = "rgba(255,240,200,0.07)";
    for (let x = 20; x < 960; x += 90) ctx.fillRect(x, 572, 46, 4);
  },

  // SWAP REAL SPRITES HERE — round table with a dark laminate top.
  _drawTable(ctx, t){
    ctx.fillStyle = "#3a352e";
    ctx.beginPath(); ctx.ellipse(t.cx, t.cy + 4, t.rx, t.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#5a5147";
    ctx.beginPath(); ctx.ellipse(t.cx, t.cy, t.rx, t.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#6b6154";
    ctx.beginPath(); ctx.ellipse(t.cx, t.cy - 2, t.rx - 8, t.ry - 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#2f2b26";
    ctx.fillRect(t.cx - 4, t.cy + 8, 8, 34);
    ctx.fillRect(t.cx - 22, t.cy + 38, 44, 5);
  },

  // SWAP REAL SPRITES HERE — the orange plastic chairs, split into legs
  // (drawn behind whoever's sitting) and backrest (drawn in front, since
  // this table has its back to us).
  _drawChairLegs(ctx, cx, footY){
    ctx.fillStyle = "#8f8f92";
    ctx.fillRect(cx - 17, footY - 26, 4, 28);
    ctx.fillRect(cx + 13, footY - 26, 4, 28);
  },

  // Kept low and narrow so a seated character's head and shoulders stay
  // clear above it — the backrest should read as a chair, not a wall.
  _drawChairBack(ctx, cx, topY, w){
    const hw = (w || 40) / 2;
    ctx.fillStyle = "#a83a14";
    ctx.fillRect(cx - hw, topY + 20, w || 40, 6);      // shadowed lower lip
    ctx.fillStyle = "#e8541f";
    ctx.fillRect(cx - hw, topY, w || 40, 20);
    ctx.fillStyle = "rgba(255,255,255,0.14)";          // moulded ridge
    ctx.fillRect(cx - hw + 4, topY + 3, (w || 40) - 8, 3);
    ctx.fillStyle = "rgba(0,0,0,0.18)";                // slot in the plastic
    ctx.fillRect(cx - hw + 6, topY + 11, (w || 40) - 12, 3);
  },

  // ---- narration cards held over the black (Fader's holdDraw hook) ------
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
