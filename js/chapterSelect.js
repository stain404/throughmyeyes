// ============================================================================
// TME.ChapterSelect — the chapter menu. Shown at startup, and reachable at
// any time with [Esc]. Same shape as TME.EndCard: init(el) / show() / hide()
// / handleKey(e) with an `active` flag the input router in main.js checks.
//
// The list itself lives in js/chapters.js — add a chapter there and it turns
// up here on its own.
// ============================================================================
window.TME = window.TME || {};

TME.ChapterSelect = {
  active: false,
  index: 0,

  init(el){
    this.el = el;
    this.listEl = el.querySelector(".chapsel-list");

    this.rows = TME.CHAPTERS.map((ch, i) => {
      const row = document.createElement("div");
      row.className = "chapsel-row";

      const num = document.createElement("div");
      num.className = "chapsel-num";
      num.textContent = ch.num;

      const body = document.createElement("div");
      body.className = "chapsel-body";

      const title = document.createElement("div");
      title.className = "chapsel-title";
      title.textContent = ch.title;

      const blurb = document.createElement("div");
      blurb.className = "chapsel-blurb";
      blurb.textContent = ch.blurb;

      body.appendChild(title);
      body.appendChild(blurb);
      row.appendChild(num);
      row.appendChild(body);

      row.addEventListener("click", () => { this.index = i; this._highlight(); this.choose(); });
      this.listEl.appendChild(row);
      return row;
    });

    this._highlight();
  },

  show(){
    this.el.classList.add("show");
    this.active = true;
    this._highlight();
  },

  hide(){
    this.el.classList.remove("show");
    this.active = false;
  },

  _highlight(){
    this.rows.forEach((r, i) => r.classList.toggle("selected", i === this.index));
    const el = this.rows[this.index];
    if (el) el.scrollIntoView({ block: "nearest" });
  },

  move(delta){
    this.index = Math.max(0, Math.min(this.rows.length - 1, this.index + delta));
    this._highlight();
  },

  // Jump to the highlighted chapter, clearing anything the scene we're
  // leaving had on screen — a half-finished dialogue box, an open phone
  // overlay, a fade that was mid-flight.
  choose(){
    const ch = TME.CHAPTERS[this.index];
    if (!ch) return;
    if (!TME.SceneManager.scenes[ch.scene]){
      console.warn("ChapterSelect: scene '" + ch.scene + "' isn't registered (see js/main.js).");
      return;
    }

    this.hide();
    TME.dialogueBox.hide();
    TME.PhoneUI.closeList();
    TME.PhoneUI.closeProfile();
    TME.Fader.reset(ch.fromBlack ? 1 : 0);
    TME.SceneManager.goTo(ch.scene);
  },

  handleKey(e){
    const k = e.key.toLowerCase();

    if (k === "arrowdown" || k === "s"){ e.preventDefault(); this.move(1); }
    else if (k === "arrowup" || k === "w"){ e.preventDefault(); this.move(-1); }
    else if (k === "e" || k === "enter" || k === " "){ e.preventDefault(); this.choose(); }
    else if (k === "escape"){
      // only closeable once something is actually running behind it
      if (TME.SceneManager.current) this.hide();
    }
    else if (k >= "1" && k <= "9"){
      const i = parseInt(k, 10) - 1;
      if (i < TME.CHAPTERS.length){ this.index = i; this._highlight(); this.choose(); }
    }
  }
};
