// ============================================================================
// TME.SceneManager — tiny scene-registration/switching pattern.
//
// To add Chapter 2 later: create js/scenes/chapter2_sceneX.js following the
// same shape as sceneA_road.js (enter/exit/update/render/handleKey), then in
// main.js add:
//   TME.SceneManager.register("chapter2_sceneA", TME.Chapter2SceneA);
// and call TME.SceneManager.goTo("chapter2_sceneA") from wherever Chapter 1
// should hand off (see #EDIT-CHAPTER-2-HOOK in endCard.js).
// ============================================================================
window.TME = window.TME || {};

TME.SceneManager = {
  scenes: {},
  current: null,
  currentName: null,

  register(name, scene){
    this.scenes[name] = scene;
  },

  goTo(name, data){
    const next = this.scenes[name];
    if (!next){ console.warn("TME.SceneManager: unknown scene '" + name + "'"); return; }
    if (this.current && this.current.exit) this.current.exit();
    this.current = next;
    this.currentName = name;
    if (this.current.enter) this.current.enter(data);
  },

  update(dt){
    if (this.current && this.current.update) this.current.update(dt);
  },
  render(ctx){
    if (this.current && this.current.render) this.current.render(ctx);
  },
  handleKey(e){
    if (this.current && this.current.handleKey) this.current.handleKey(e);
  },
  handleKeyUp(e){
    if (this.current && this.current.handleKeyUp) this.current.handleKeyUp(e);
  }
};
