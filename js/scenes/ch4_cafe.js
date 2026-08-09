// ============================================================================
// TME.Ch4_Cafe — Chapter 4, "Two Or Three Minutes"
//
// Registered as "Ch4_Cafe" (see main.js). Cinematic; [E] carries it.
//
// Two stages in one scene (this.stage):
//   "cafe"   — Love and Latte. Bisma is there with Alfiya, who eats and goes.
//              Then it's just the two of them, until a small boy adopts their
//              table, borrows her phone for cat reels, and accidentally starts
//              the conversation that runs the rest of the evening.
//   "street" — the walk back to her building. Two or three minutes, stretched
//              as far as it will go.
//
// Beat order (this.state):
//   intro_narration -> settle -> alfiya -> alfiya_leaves -> alone ->
//   interests -> child_in -> child_talk -> child_away -> child_back ->
//   phone -> cats -> piano -> hamid -> millat -> leaving -> to_street ->
//   walk -> at_door -> after -> fading -> narration_end -> end card
//
// All text lives in js/data_ch4.js.
// ============================================================================
window.TME = window.TME || {};

TME.Ch4_Cafe = {
  name: "Ch4_Cafe",

  enter(){
    const W = TME.CANVAS_W, H = TME.CANVAS_H;
    this.W = W; this.H = H;
    const D = TME.DataCh4;

    // SWAP REAL SPRITES HERE
    TME.ch4Sheets = TME.ch4Sheets || {
      alfiya: new TME.SpriteSheet(D.SHEETS.ALFIYA),
      child:  new TME.SpriteSheet(D.SHEETS.CHILD)
    };
    // Bisma's sheet comes from Chapter 2 if that chapter has run; build it
    // here otherwise so this scene can be started on its own.
    if (!TME.ch2Sheets) TME.ch2Sheets = { bisma: new TME.SpriteSheet(TME.DataCh2.SHEETS.BISMA) };

    this.zaeem  = new TME.AnimatedSprite(TME.zaeemSheet,       372, 300, 46, 62, D.COLORS.ZAEEM);
    this.bisma  = new TME.AnimatedSprite(TME.ch2Sheets.bisma,  498, 300, 46, 62, D.COLORS.BISMA);
    // a little broader, and in an abaya — see `outfit` in js/sprite.js
    this.alfiya = new TME.AnimatedSprite(TME.ch4Sheets.alfiya, 556, 300, 56, 62, D.COLORS.ALFIYA);
    this.alfiya.outfit = "abaya";
    // small: the placeholder scales to w/h, so a short sprite reads as a kid
    this.child  = new TME.AnimatedSprite(TME.ch4Sheets.child,  980, 336, 32, 44, D.COLORS.CHILD);

    this.zaeem.setAnimation("walk-right");
    this.bisma.setAnimation("idle");
    this.alfiya.setAnimation("idle");
    this.child.setAnimation("walk-left");

    this.table   = { cx: 452, cy: 372, rx: 60, ry: 16 };
    this.childSeat = { x: 556, y: 322 };   // Alfiya's chair, once she's gone
    this.parentsX  = 812;                   // the boy's family, background right

    // street stage: where they stop, and the gate she disappears into
    this.gateX      = 596;
    this.gateStopX  = 556;
    this.doorX      = 640;

    this.stage = "cafe";
    this.state = "intro_narration";
    this.timer = 0;
    this.childHasPhone = false;
    this.doorOpen = 0;
    this._walkSaid = false;

    this.cam       = { zoom: 1, fx: W / 2, fy: H / 2 };
    this.camTarget = { zoom: 1, fx: W / 2, fy: H / 2 };

    this.narrList = D.narration_intro;
    this.narrIndex = 0;
    this.narrTimer = 0;
    this.dialogueBox = TME.dialogueBox;

    // Chapter 3 leaves the screen black; hang the opening cards on it.
    TME.Fader.fadeOut(1, null, (ctx, w, h) => this._drawNarration(ctx, w, h));
  },

  exit(){},

  // Small helper: play a dialogue block, then move to the next state.
  _say(lines, mode, nextState, after){
    this.dialogueBox.show(lines, {
      mode: mode,
      onComplete: () => { this.state = nextState; this.timer = 0; if (after) after(); }
    });
  },

  update(dt){
    const D = TME.DataCh4;
    const WALK = 118;

    if (this.state === "intro_narration" || this.state === "narration_end"){
      this.narrTimer += dt;
    }

    // ---- cafe ------------------------------------------------------------
    else if (this.state === "settle"){
      // Zaeem walks to the table and sits
      if (this.zaeem.x < 372){ this.zaeem.x += WALK * dt; }
      else {
        this.zaeem.x = 372;
        this.zaeem.setAnimation("idle");
        this.timer += dt;
        if (this.timer > 0.8){ this.state = "alfiya"; this._say(D.alfiya_table, "speech", "alfiya_leaves"); }
      }
    }

    else if (this.state === "alfiya_leaves"){
      this.alfiya.setAnimation("walk-right");
      this.alfiya.x += WALK * dt;
      if (this.alfiya.x > this.W + 40){
        this.state = "alone";
        this.camTarget = { zoom: 1.12, fx: 470, fy: 340 };
        this._say(D.monologue_alone, "thought", "interests_pre");
      }
    }

    else if (this.state === "interests_pre"){
      this.camTarget = { zoom: 1, fx: this.W / 2, fy: this.H / 2 };
      this.timer += dt;
      if (this.timer > 0.5){ this.state = "interests"; this._say(D.interests, "speech", "child_in"); }
    }

    // ---- the small boy ---------------------------------------------------
    else if (this.state === "child_in"){
      this.child.setAnimation("walk-left");
      this.child.x -= WALK * dt;
      if (this.child.x <= this.childSeat.x){
        this.child.x = this.childSeat.x;
        this.child.y = this.childSeat.y;
        this.child.setAnimation("idle");
        this.state = "child_talk";
        this._say(D.child_arrives, "speech", "child_away");
      }
    }

    else if (this.state === "child_away"){
      // trots back to his parents, then straight back again
      if (this._moveToward(this.child, this.parentsX, 300, WALK, dt)){
        this.timer += dt;
        if (this.timer > 0.7) this.state = "child_back";
      }
    }

    else if (this.state === "child_back"){
      if (this._moveToward(this.child, this.childSeat.x, this.childSeat.y, WALK, dt)){
        this.child.setAnimation("idle");
        this.state = "phone";
        this._say(D.child_returns, "speech", "cats", () => { this.childHasPhone = true; });
      }
    }

    else if (this.state === "cats"){
      this._say(D.cats_and_potter, "speech", "piano");
      this.state = "cats_playing";
    }
    else if (this.state === "piano"){
      this.camTarget = { zoom: 1.14, fx: 476, fy: 336 };
      this._say(D.monologue_piano, "thought", "hamid");
      this.state = "piano_playing";
    }
    else if (this.state === "hamid"){
      this.camTarget = { zoom: 1, fx: this.W / 2, fy: this.H / 2 };
      this._say(D.hamid_talk, "speech", "millat");
      this.state = "hamid_playing";
    }
    else if (this.state === "millat"){
      this._say(D.monologue_millat, "thought", "leaving");
      this.state = "millat_playing";
    }
    else if (this.state === "leaving"){
      this._say(D.leaving, "speech", "to_street");
      this.state = "leaving_playing";
    }

    // ---- out to the street -----------------------------------------------
    else if (this.state === "to_street"){
      this.state = "street_fade";
      TME.Fader.fadeOut(900, () => {
        this.stage = "street";
        this.zaeem.x = 250; this.zaeem.y = 372;
        this.bisma.x = 320; this.bisma.y = 372;
        this.zaeem.setAnimation("walk-right");
        this.bisma.setAnimation("walk-right");
        this.cam = { zoom: 1, fx: this.W / 2, fy: this.H / 2 };
        this.camTarget = { zoom: 1, fx: this.W / 2, fy: this.H / 2 };
        this.state = "walk";
        this.timer = 0;
        TME.Fader.fadeIn(900);
      });
    }

    else if (this.state === "walk"){
      // They dawdle up to her gate and stop there, however fast or slow the
      // player advances the conversation.
      const SLOW = 34;
      if (this.bisma.x < this.gateStopX){
        this.bisma.x = Math.min(this.gateStopX, this.bisma.x + SLOW * dt);
        this.zaeem.x = Math.min(this.gateStopX - 70, this.zaeem.x + SLOW * dt);
        this.bisma.setAnimation("walk-right");
        this.zaeem.setAnimation("walk-right");
      } else if (!this.dialogueBox.active){
        this.bisma.setAnimation("idle");
        this.zaeem.setAnimation("idle");
      }
      this.timer += dt;
      if (this.timer > 1.4 && !this.dialogueBox.active && !this._walkSaid){
        this._walkSaid = true;
        this._say(D.walk_home, "speech", "at_door");
      }
    }

    else if (this.state === "at_door"){
      // she goes in through the gate
      this._moveToward(this.bisma, this.doorX, 292, 44, dt);
      this.doorOpen = Math.min(1, this.doorOpen + dt * 0.8);
      this.zaeem.setAnimation("idle");
      this.timer += dt;
      if (this.timer > 2.4){
        this.state = "after";
        this._say(D.monologue_after, "thought", "fading");
        this.state = "after_playing";
      }
    }

    else if (this.state === "fading"){
      this.state = "fading_done";
      TME.Fader.fadeOut(1700, () => {
        this.state = "narration_end";
        this.narrList = D.narration_end;
        this.narrIndex = 0;
        this.narrTimer = 0;
      }, (ctx, w, h) => this._drawNarration(ctx, w, h));
    }

    // ---- talk poses ------------------------------------------------------
    // They talk while they walk, so the street stage deliberately keeps its
    // walk cycle instead of switching to the talk pose.
    if (this.dialogueBox.active && this.state !== "walk"){
      const s = this.dialogueBox.getCurrentSpeaker();
      const C = D.CHAR;
      this.zaeem.setAnimation(s === C.ZAEEM ? "talk" : "idle");
      if (this.stage === "cafe"){
        this.bisma.setAnimation(s === C.BISMA ? "talk" : "idle");
        this.alfiya.setAnimation(s === C.ALFIYA ? "talk" : "idle");
        this.child.setAnimation(s === C.CHILD ? "talk" : "idle");
      } else if (this.state !== "at_door"){
        this.bisma.setAnimation(s === C.BISMA ? "talk" : "idle");
      }
    }

    this._updateCamera(dt);
    this.zaeem.update(dt);
    this.bisma.update(dt);
    this.alfiya.update(dt);
    this.child.update(dt);
  },

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
      this.state = "settle";
      this.timer = 0;
      this.zaeem.x = 250;                 // walks in from the door
      this.zaeem.setAnimation("walk-right");
      TME.Fader.fadeIn(1100);
    } else {
      const D = TME.DataCh4;
      this.state = "ending";
      TME.EndCard.show({
        title: D.chapterEndTitle,
        subtitle: D.chapterEndSubtitle,
        onDone: () => TME.goToChapter("Ch5")
      });
    }
  },

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

    if (this.stage === "cafe"){
      this._drawCafe(ctx);
      this.zaeem.draw(ctx);
      this.bisma.draw(ctx);
      if (this.state === "alfiya" || this.state === "settle" || this.state === "alfiya_leaves"){
        this.alfiya.draw(ctx);
      }
      if (this._childVisible()) this.child.draw(ctx);
      this._drawTable(ctx, this.table);
      if (this.childHasPhone) this._drawChildPhone(ctx);
    } else {
      this._drawStreet(ctx);
      this.zaeem.draw(ctx);
      if (this.doorOpen < 0.95) this.bisma.draw(ctx);
    }

    ctx.restore();
  },

  _childVisible(){
    const s = this.state;
    return s === "child_in" || s === "child_talk" || s === "child_away" ||
           s === "child_back" || s === "phone" || s === "cats" || s === "cats_playing" ||
           s === "piano" || s === "piano_playing" || s === "hamid" || s === "hamid_playing" ||
           s === "millat" || s === "millat_playing" || s === "leaving" ||
           s === "leaving_playing" || s === "to_street";
  },

  // ========================================================================
  // #EDIT-BACKGROUND / SWAP REAL TILESET HERE — Love and Latte interior.
  // ========================================================================
  _drawCafe(ctx){
    const W = this.W, H = this.H;

    // walls: warm brick, panelled lower half
    ctx.fillStyle = "#5a4436"; ctx.fillRect(0, 0, W, 330);
    ctx.fillStyle = "#6b5140";
    for (let y = 0; y < 214; y += 22){
      for (let x = (y / 22) % 2 ? -26 : 0; x < W; x += 52) ctx.fillRect(x + 2, y + 2, 48, 18);
    }
    ctx.fillStyle = "#4a3a2e"; ctx.fillRect(0, 214, W, 116);
    ctx.fillStyle = "#3d3026";
    for (let x = 0; x < W; x += 46) ctx.fillRect(x, 214, 3, 116);

    // hanging pendant lights
    for (let i = 0; i < 5; i++){
      const x = 120 + i * 180;
      ctx.fillStyle = "#2b211a"; ctx.fillRect(x - 1, 0, 2, 46);
      ctx.fillStyle = "#3a2c22";
      ctx.beginPath(); ctx.moveTo(x - 18, 68); ctx.lineTo(x + 18, 68); ctx.lineTo(x + 9, 46); ctx.lineTo(x - 9, 46);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#ffdc9a";
      ctx.beginPath(); ctx.arc(x, 72, 5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.10; ctx.fillStyle = "#ffdc9a";
      ctx.beginPath(); ctx.arc(x, 76, 40, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    // chalkboard menu + the cafe name
    ctx.fillStyle = "#1e2420"; ctx.fillRect(96, 86, 208, 108);
    ctx.strokeStyle = "#8a6a45"; ctx.lineWidth = 5; ctx.strokeRect(96, 86, 208, 108);
    ctx.save();
    ctx.font = "11px 'Press Start 2P', monospace"; ctx.fillStyle = "#e9dfc6"; ctx.textAlign = "center";
    ctx.fillText(TME.DataCh4.cafeName, 200, 116);
    ctx.font = "7px 'Press Start 2P', monospace"; ctx.fillStyle = "#a9b8a0";
    ctx.fillText("LATTE      120", 200, 142);
    ctx.fillText("MOCHA      140", 200, 158);
    ctx.fillText("SANDWICH   180", 200, 174);
    ctx.restore();

    // counter with a coffee machine and a barista
    ctx.fillStyle = "#7a5a3c"; ctx.fillRect(640, 214, 320, 26);
    ctx.fillStyle = "#5f452e"; ctx.fillRect(640, 240, 320, 90);
    ctx.fillStyle = "#c9c3b8"; ctx.fillRect(700, 168, 54, 46);
    ctx.fillStyle = "#8f8a80"; ctx.fillRect(708, 180, 38, 8);
    ctx.fillStyle = "#3a4d63"; ctx.fillRect(860, 158, 26, 58);   // barista
    ctx.fillStyle = "#c99a72"; ctx.fillRect(864, 142, 18, 18);
    ctx.fillStyle = "#241a16"; ctx.fillRect(863, 138, 20, 8);

    // shelf of jars
    ctx.fillStyle = "#4a3a2e"; ctx.fillRect(340, 120, 240, 8);
    const jars = ["#c98a5c", "#8fae6a", "#c9a86b", "#a07a5c", "#7f8fae"];
    for (let i = 0; i < 6; i++){
      ctx.fillStyle = jars[i % jars.length];
      ctx.fillRect(352 + i * 38, 96, 22, 24);
    }

    // plant in the corner
    ctx.fillStyle = "#8a5a3c"; ctx.fillRect(28, 262, 44, 46);
    ctx.fillStyle = "#4d7a3a";
    for (let i = 0; i < 5; i++){
      ctx.beginPath();
      ctx.ellipse(50 + (i - 2) * 13, 244 - Math.abs(i - 2) * 9, 11, 20, (i - 2) * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // floor
    ctx.fillStyle = "#6b5946"; ctx.fillRect(0, 330, W, H - 330);
    ctx.fillStyle = "rgba(0,0,0,0.13)";
    for (let x = -40; x < W; x += 64) ctx.fillRect(x, 330, 4, H - 330);
    for (let y = 330; y < H; y += 30) ctx.fillRect(0, y, W, 2);

    // the boy's parents, at a table in the background
    ctx.fillStyle = "#6a4f7a"; ctx.fillRect(this.parentsX - 18, 268, 24, 34);
    ctx.fillStyle = "#c99a72"; ctx.fillRect(this.parentsX - 14, 252, 16, 16);
    ctx.fillStyle = "#4a5f7a"; ctx.fillRect(this.parentsX + 24, 268, 24, 34);
    ctx.fillStyle = "#c99a72"; ctx.fillRect(this.parentsX + 28, 252, 16, 16);
    ctx.fillStyle = "#4a3a2e";
    ctx.beginPath(); ctx.ellipse(this.parentsX + 15, 312, 44, 11, 0, 0, Math.PI * 2); ctx.fill();
  },

  // SWAP REAL SPRITES HERE — cafe table with two cups on it.
  _drawTable(ctx, t){
    ctx.fillStyle = "#3a2f26";
    ctx.beginPath(); ctx.ellipse(t.cx, t.cy + 4, t.rx, t.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#6b5340";
    ctx.beginPath(); ctx.ellipse(t.cx, t.cy, t.rx, t.ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#7d6349";
    ctx.beginPath(); ctx.ellipse(t.cx, t.cy - 2, t.rx - 8, t.ry - 5, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#efe9dd"; ctx.fillRect(t.cx - 34, t.cy - 12, 15, 12);   // her cup
    ctx.fillRect(t.cx + 20, t.cy - 12, 15, 12);                              // his
    ctx.fillStyle = "#6b4630";
    ctx.fillRect(t.cx - 32, t.cy - 10, 11, 4);
    ctx.fillRect(t.cx + 22, t.cy - 10, 11, 4);

    ctx.fillStyle = "#2f2620";
    ctx.fillRect(t.cx - 4, t.cy + 8, 8, 32);
    ctx.fillRect(t.cx - 20, t.cy + 36, 40, 5);
  },

  // the phone he's been handed, glowing in his lap
  _drawChildPhone(ctx){
    const x = this.child.x + 6, y = this.child.y + 34;
    ctx.fillStyle = "#d8d8e0"; ctx.fillRect(x, y, 18, 12);
    ctx.fillStyle = `rgba(180,210,255,${0.55 + Math.sin(performance.now() / 260) * 0.25})`;
    ctx.fillRect(x + 2, y + 2, 14, 8);
  },

  // ========================================================================
  // #EDIT-BACKGROUND / SWAP REAL TILESET HERE — the lane back to her building.
  // ========================================================================
  _drawStreet(ctx){
    const W = this.W, H = this.H;

    const sky = ctx.createLinearGradient(0, 0, 0, 250);
    sky.addColorStop(0, "#10131f"); sky.addColorStop(1, "#242942");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, 250);

    // apartment blocks with lit windows
    const blocks = [[-20, 60, 200, 190], [200, 24, 168, 226], [392, 74, 150, 176], [560, 40, 190, 210], [770, 88, 210, 162]];
    blocks.forEach((b, bi) => {
      ctx.fillStyle = bi % 2 ? "#1c2033" : "#222741";
      ctx.fillRect(b[0], b[1], b[2], b[3]);
      for (let y = b[1] + 14; y < b[1] + b[3] - 16; y += 30){
        for (let x = b[0] + 12; x < b[0] + b[2] - 20; x += 32){
          const lit = ((x * 7 + y * 13 + bi * 31) % 11) < 5;
          ctx.fillStyle = lit ? "#e8c98a" : "#141728";
          ctx.fillRect(x, y, 16, 14);
        }
      }
    });

    // ground floor: shuttered shops under the flats, closed for the night.
    // (Also stops a gap opening up between the blocks and the pavement.)
    ctx.fillStyle = "#191c2b"; ctx.fillRect(0, 250, W, 80);
    ctx.fillStyle = "#212537";
    for (let x = 0; x < W; x += 104){
      ctx.fillRect(x + 8, 262, 88, 68);
      ctx.fillStyle = "#171a28";
      for (let sy = 266; sy < 328; sy += 8) ctx.fillRect(x + 8, sy, 88, 3);
      ctx.fillStyle = "#212537";
    }

    // her building: gate + doorway, dead centre-right
    const gx = this.gateX;
    ctx.fillStyle = "#2b3048"; ctx.fillRect(gx, 150, 128, 180);
    ctx.fillStyle = "#3d4468"; ctx.fillRect(gx - 8, 142, 144, 12);
    const glow = 0.35 + this.doorOpen * 0.65;
    ctx.fillStyle = `rgba(255,214,150,${glow})`;
    ctx.fillRect(gx + 40, 226, 48, 104);
    ctx.fillStyle = "#1a1d2e"; ctx.fillRect(gx + 40, 226, 48 * (1 - this.doorOpen), 104);
    ctx.save();
    ctx.font = "7px 'Press Start 2P', monospace"; ctx.fillStyle = "#c9d0e8"; ctx.textAlign = "center";
    ctx.fillText("MILLAT NAGAR", gx + 64, 176);
    ctx.restore();

    // street lamps
    [140, 470, 820].forEach(x => {
      ctx.fillStyle = "#3a3f55"; ctx.fillRect(x, 156, 5, 176);
      ctx.beginPath(); ctx.arc(x + 2, 150, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#ffd98f"; ctx.fill();
      ctx.globalAlpha = 0.10;
      ctx.beginPath(); ctx.arc(x + 2, 154, 62, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    });

    // pavement + road
    ctx.fillStyle = "#3c4052"; ctx.fillRect(0, 330, W, 96);
    ctx.fillStyle = "#33374a";
    for (let x = 0; x < W; x += 58) ctx.fillRect(x, 330, 2, 96);
    ctx.fillStyle = "#4a4e60"; ctx.fillRect(0, 426, W, 12);
    ctx.fillStyle = "#232634"; ctx.fillRect(0, 438, W, H - 438);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    for (let x = 30; x < W; x += 96) ctx.fillRect(x, 486, 50, 4);

    // a couple of parked bikes, because Millat Nagar
    [90, 880].forEach(x => {
      ctx.fillStyle = "#1c1f2b";
      ctx.beginPath(); ctx.arc(x, 396, 12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 42, 396, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#59304a"; ctx.fillRect(x + 4, 372, 36, 14);
    });
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
