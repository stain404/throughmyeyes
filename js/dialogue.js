// ============================================================================
// TME.DialogueBox — reusable across every scene and every future chapter.
// Two visual modes:
//   "speech"  - normal spoken dialogue, shows a speaker name label
//   "thought" - internal monologue (Zaeem's private thoughts), italic,
//               no speaker name, dashed border
// ============================================================================
window.TME = window.TME || {};

TME.DialogueBox = class DialogueBox {
  constructor(rootEl){
    this.root = rootEl;
    this.speakerEl = rootEl.querySelector(".dlg-speaker");
    this.textEl = rootEl.querySelector(".dlg-text");
    this.queue = [];
    this.active = false;
    this.mode = "speech";
    this.onComplete = null;
    this.currentLine = null;
  }

  // lines: array of {speaker, text} ("speaker" optional/ignored in thought mode)
  // opts: { mode: "speech"|"thought", onComplete: fn }
  show(lines, opts){
    opts = opts || {};
    this.queue = lines.slice();
    this.mode = opts.mode || "speech";
    this.onComplete = opts.onComplete || null;
    this.active = true;
    this.root.classList.remove("speech", "thought");
    this.root.classList.add("show", this.mode);
    this._advance();
  }

  _advance(){
    if (!this.queue.length){
      this.hide();
      if (this.onComplete) this.onComplete();
      return;
    }
    this.currentLine = this.queue.shift();
    if (this.mode === "thought"){
      this.speakerEl.style.display = "none";
    } else {
      this.speakerEl.style.display = "";
      this.speakerEl.textContent = this.currentLine.speaker || "";
    }
    this.textEl.textContent = this.currentLine.text;
  }

  advance(){
    if (!this.active) return;
    this._advance();
  }

  hide(){
    this.active = false;
    this.currentLine = null;
    this.root.classList.remove("show");
  }

  getCurrentSpeaker(){
    return this.currentLine ? this.currentLine.speaker : null;
  }

  handleKey(e){
    const k = e.key.toLowerCase();
    if (k === "e" || k === " " || k === "enter"){
      e.preventDefault();
      this.advance();
    }
  }
};
