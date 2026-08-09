// ============================================================================
// TME main — canvas setup, shared post-processing, sprite sheet loading,
// scene registration, global input routing, and the game loop.
// ============================================================================
window.TME = window.TME || {};

(function(){
  "use strict";

  TME.CANVAS_W = 960;
  TME.CANVAS_H = 600;

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // ---- responsive scaling (design space stays a fixed 960x600) ----
  const stage = document.getElementById("stage");
  function resize(){
    const scale = Math.min(window.innerWidth / TME.CANVAS_W, window.innerHeight / TME.CANVAS_H);
    stage.style.transform = `translate(-50%,-50%) scale(${scale})`;
  }
  window.addEventListener("resize", resize);
  resize();

  // ---- shared post-processing: scanlines + vignette on every scene ----
  const vignetteCanvas = document.createElement("canvas");
  vignetteCanvas.width = TME.CANVAS_W; vignetteCanvas.height = TME.CANVAS_H;
  (function buildVignette(){
    const c = vignetteCanvas.getContext("2d");
    const g = c.createRadialGradient(
      TME.CANVAS_W / 2, TME.CANVAS_H / 2, TME.CANVAS_H * 0.3,
      TME.CANVAS_W / 2, TME.CANVAS_H / 2, TME.CANVAS_H * 0.8
    );
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.7, "rgba(0,0,0,0.18)");
    g.addColorStop(1, "rgba(0,0,0,0.6)");
    c.fillStyle = g;
    c.fillRect(0, 0, TME.CANVAS_W, TME.CANVAS_H);
  })();

  const scanlineCanvas = document.createElement("canvas");
  scanlineCanvas.width = TME.CANVAS_W; scanlineCanvas.height = TME.CANVAS_H;
  (function buildScanlines(){
    const c = scanlineCanvas.getContext("2d");
    c.fillStyle = "rgba(0,0,0,0.45)";
    for (let y = 0; y < TME.CANVAS_H; y += 3) c.fillRect(0, y, TME.CANVAS_W, 1);
  })();

  function drawPostProcessing(){
    ctx.save(); ctx.globalAlpha = 0.5; ctx.drawImage(vignetteCanvas, 0, 0); ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.09; ctx.drawImage(scanlineCanvas, 0, 0); ctx.restore();
  }

  // ---- sprite sheets (see #EDIT-SPRITESHEETS in js/data.js) ----
  TME.zaeemSheet = new TME.SpriteSheet(TME.Data.ZAEEM_SHEET);
  TME.samaaraSheet = new TME.SpriteSheet(TME.Data.SAMAARA_SHEET);

  // ---- shared UI singletons ----
  TME.dialogueBox = new TME.DialogueBox(document.getElementById("dialogue-box"));
  TME.PhoneUI.init({
    notif: document.getElementById("phone-notification"),
    listOverlay: document.getElementById("ig-list-overlay"),
    profileOverlay: document.getElementById("ig-profile-overlay")
  });
  TME.EndCard.init(document.getElementById("end-card"));

  // ---- register scenes & start Chapter 1 ----
  TME.SceneManager.register("sceneA", TME.SceneA);   // Ch1 - The Road
  TME.SceneManager.register("sceneB", TME.SceneB);   // Ch1 - Home
  TME.SceneManager.register("Ch2_Restaurant", TME.Ch2_Restaurant);
  TME.SceneManager.register("Ch3_GroupChat",  TME.Ch3_GroupChat);
  TME.SceneManager.register("Ch4_Cafe",       TME.Ch4_Cafe);
  // #NEXT-CHAPTER: register Ch5 here once it exists —
  //   TME.SceneManager.register("Ch5", TME.Ch5);
  // Chapter 4's end card already hands off to it via TME.goToChapter().

  TME.SceneManager.goTo("sceneA");

  // ---- chapter chain: Ch1 (sceneA -> sceneB) -> Ch2_Restaurant -> ... ----
  // Chapter 1 hands off through the hook left in js/endCard.js; later
  // chapters pass their own onDone straight to TME.EndCard.show().
  TME.onChapterEnd = function(){
    TME.goToChapter("Ch2_Restaurant");
  };

  // Like SceneManager.goTo, but says so instead of silently stalling on the
  // current scene when the next chapter hasn't been written yet.
  TME.goToChapter = function(key){
    if (TME.SceneManager.scenes[key]) TME.SceneManager.goTo(key);
    else console.log("Next chapter '" + key + "' isn't registered yet (see #NEXT-CHAPTER in js/main.js).");
  };

  // ---- global input router ----
  // Priority: end card > dialogue box > phone UI > current scene.
  // Dialogue (including an internal monologue shown over the phone
  // profile view, e.g. Scene B) must always be able to receive [E] to
  // advance, even while a phone overlay is technically still open behind it.
  window.addEventListener("keydown", (e) => {
    if (TME.EndCard.active){ TME.EndCard.handleKey(e); return; }
    if (TME.dialogueBox.active){ TME.dialogueBox.handleKey(e); return; }
    if (TME.PhoneUI.isAnyOpen()){ TME.PhoneUI.handleKey(e); return; }
    TME.SceneManager.handleKey(e);
  });
  window.addEventListener("keyup", (e) => {
    TME.SceneManager.handleKeyUp(e);
  });

  // ---- main loop ----
  let last = performance.now();
  function loop(now){
    let dt = (now - last) / 1000;
    last = now;
    dt = Math.min(dt, 0.05);

    TME.SceneManager.update(dt);
    TME.Fader.update(dt);

    ctx.clearRect(0, 0, TME.CANVAS_W, TME.CANVAS_H);
    TME.SceneManager.render(ctx);
    drawPostProcessing();
    TME.Fader.render(ctx, TME.CANVAS_W, TME.CANVAS_H);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
