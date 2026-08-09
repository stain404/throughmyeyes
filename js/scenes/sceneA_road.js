// ============================================================================
// TME.SceneA — "The Road"
// Scripted cutscene: Samaara walks in from the right, a catch-up dialogue
// plays, a phone notification pops up, a goodbye exchange plays, she walks
// off, then the screen fades into Scene B.
// ============================================================================
window.TME = window.TME || {};

TME.SceneA = {
  name: "sceneA",

  enter(){
    const W = TME.CANVAS_W, H = TME.CANVAS_H;
    this.W = W; this.H = H;

    this.zaeem = new TME.AnimatedSprite(TME.zaeemSheet, W * 0.38, 360, 48, 64, "#9fd8ff");
    this.samaara = new TME.AnimatedSprite(TME.samaaraSheet, W + 40, 360, 48, 64, "#ff9ecb");
    this.zaeem.setAnimation("idle");
    this.samaara.setAnimation("walk-left");

    this.targetX = W * 0.38 + 90; // where Samaara stops next to Zaeem
    this.state = "waiting";
    this.timer = 0;
    this._walkHomeTimer = 0;

    this.dialogueBox = TME.dialogueBox;
  },

  exit(){},

  update(dt){
    const WALK_SPEED = 140;

    if (this.state === "waiting"){
      this.timer += dt;
      if (this.timer > 1.2) this.state = "samaara_walking";
    }

    else if (this.state === "samaara_walking"){
      this.samaara.x -= WALK_SPEED * dt;
      if (this.samaara.x <= this.targetX){
        this.samaara.x = this.targetX;
        this.samaara.setAnimation("idle");
        this.state = "dialogue1";
        this.dialogueBox.show(TME.Data.sceneA_greeting, {
          mode: "speech",
          onComplete: () => { this.state = "notification"; }
        });
      }
    }

    else if (this.state === "notification"){
      TME.PhoneUI.showNotification(TME.Data.sceneA_notification, 2000);
      this.state = "notification_wait";
      this.timer = 0;
    }
    else if (this.state === "notification_wait"){
      this.timer += dt;
      if (this.timer > 2.3){
        this.state = "dialogue2";
        this.dialogueBox.show(TME.Data.sceneA_goodbye, {
          mode: "speech",
          onComplete: () => { this.state = "samaara_leaving"; }
        });
      }
    }

    else if (this.state === "samaara_leaving"){
      this.samaara.setAnimation("walk-right");
      this.samaara.x += WALK_SPEED * dt;
      if (this.samaara.x > this.W + 60){
        this.state = "fading";
        TME.Fader.fadeOut(900, () => {
          TME.SceneManager.goTo("sceneB");
        }, (ctx, w, h) => this._drawWalkHome(ctx, w, h));
      }
    }

    // sync "talk" animation to whoever is currently speaking
    if (this.dialogueBox.active){
      const speaker = this.dialogueBox.getCurrentSpeaker();
      this.zaeem.setAnimation(speaker === TME.Data.CHAR.ZAEEM ? "talk" : "idle");
      this.samaara.setAnimation(speaker === TME.Data.CHAR.SAMAARA ? "talk" : "idle");
    }

    this.zaeem.update(dt);
    this.samaara.update(dt);
    this._walkHomeTimer += dt;
  },

  // Small looping walk-cycle silhouette shown during the fade-to-black hold,
  // simulating Zaeem's walk home between Scene A and Scene B.
  _drawWalkHome(ctx, w, h){
    const bob = Math.sin(this._walkHomeTimer * 10) * 3;
    ctx.save();
    ctx.translate(w / 2 - 16, h / 2 - 24 + bob);
    ctx.fillStyle = "#3a3d55";
    ctx.fillRect(0, 0, 32, 44);
    ctx.restore();
  },

  render(ctx){
    this._drawBackground(ctx);
    this.zaeem.draw(ctx);
    this.samaara.draw(ctx);
  },

  // #EDIT-BACKGROUND: replace this with a drawImage() call once you have
  // real background art for "The Road" (a street corner at dusk). Load the
  // image the same way TME.SpriteSheet does and draw it here instead of
  // these flat shapes.
  _drawBackground(ctx){
    const W = this.W, H = this.H;

    const sky = ctx.createLinearGradient(0, 0, 0, 260);
    sky.addColorStop(0, "#1c1e3a");
    sky.addColorStop(1, "#3a3560");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, 260);

    ctx.fillStyle = "#232544";
    ctx.fillRect(0, 140, 140, 120);
    ctx.fillRect(760, 100, 200, 160);
    ctx.fillRect(600, 180, 120, 80);

    ctx.fillStyle = "#4a4560"; // sidewalk
    ctx.fillRect(0, 260, W, 120);
    ctx.fillStyle = "#3a3552"; // road
    ctx.fillRect(0, 380, W, H - 380);

    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 16]);
    ctx.beginPath(); ctx.moveTo(0, 470); ctx.lineTo(W, 470); ctx.stroke();
    ctx.setLineDash([]);

    // lamp post
    ctx.fillStyle = "#55506e";
    ctx.fillRect(120, 220, 6, 150);
    ctx.beginPath(); ctx.arc(123, 215, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#e8c170";
    ctx.fill();
  }
};
