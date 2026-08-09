// ============================================================================
// TME.EndCard — the "End of Chapter 1" text card and its handoff hook.
// ============================================================================
window.TME = window.TME || {};

TME.EndCard = {
  active: false,

  init(el){
    this.el = el;
    this.titleEl = el.querySelector(".endcard-title");
    this.subtitleEl = el.querySelector(".endcard-subtitle");
    this._onDone = null;
  },

  // show()                            -> Chapter 1's card (js/data.js)
  // show({ title, subtitle, onDone }) -> any later chapter's card
  show(opts){
    opts = opts || {};
    this.titleEl.textContent = opts.title || TME.Data.chapterEndTitle;
    this.subtitleEl.textContent = opts.subtitle || TME.Data.chapterEndSubtitle;
    this._onDone = opts.onDone || null;
    this.el.classList.add("show");
    this.active = true;
  },

  hide(){
    this.el.classList.remove("show");
    this.active = false;
  },

  handleKey(){
    this.hide();
    const cb = this._onDone;
    this._onDone = null;
    if (cb) cb();
    else TME.onChapterEnd();
  }
};

// ============================================================================
// #EDIT-CHAPTER-2-HOOK
// Called once the player presses a key on the "End of Chapter 1" card.
// Wire Chapter 2 in here later, e.g.:
//
//   TME.SceneManager.register("chapter2_sceneA", TME.Chapter2SceneA);
//   TME.onChapterEnd = function(){
//     TME.SceneManager.goTo("chapter2_sceneA");
//   };
// ============================================================================
TME.onChapterEnd = function(){
  console.log("Chapter 1 complete — hook Chapter 2 here (see #EDIT-CHAPTER-2-HOOK in js/endCard.js).");
};
