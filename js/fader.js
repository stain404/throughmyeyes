// ============================================================================
// TME.Fader — simple full-canvas fade-to-black / fade-in used for every
// scene transition in every chapter. Drawn on top of everything else in the
// main render loop (see main.js).
// ============================================================================
window.TME = window.TME || {};

TME.Fader = {
  alpha: 0,           // 0 = fully visible, 1 = fully black
  _target: 0,
  _speed: 0,
  _onDone: null,
  _holdDraw: null,    // optional function(ctx,w,h) drawn while alpha is fully 1

  fadeOut(durationMs, onDone, holdDraw){
    this._target = 1;
    this._speed = 1 / (durationMs / 1000);
    this._onDone = onDone || null;
    this._holdDraw = holdDraw || null;
  },

  fadeIn(durationMs, onDone){
    this._target = 0;
    this._speed = 1 / (durationMs / 1000);
    this._onDone = onDone || null;
    this._holdDraw = null;
  },

  update(dt){
    if (this.alpha === this._target) return;
    const dir = this._target > this.alpha ? 1 : -1;
    this.alpha += dir * this._speed * dt;
    if ((dir > 0 && this.alpha >= this._target) || (dir < 0 && this.alpha <= this._target)){
      this.alpha = this._target;
      const cb = this._onDone;
      this._onDone = null;
      if (cb) cb();
    }
  },

  render(ctx, w, h){
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    if (this.alpha >= 0.999 && this._holdDraw) this._holdDraw(ctx, w, h);
    ctx.restore();
  }
};
