// ============================================================================
// TME.Ch3_GroupChat — Chapter 3, "Maaf Kiya"
//
// Registered as "Ch3_GroupChat" (see main.js). Not a movement scene: the whole
// chapter is a chat log. [E] (or Space/Enter) posts the next entry from
// TME.DataCh3.CH3_CHAT and auto-scrolls to the bottom.
//
// The log is DOM rather than canvas — same reason TME.PhoneUI is DOM (it needs
// real scrolling) — and it reuses that system's .phone-overlay / .phone-header
// styling so it reads as the same phone from Chapter 1.
//
// All text lives in js/data_ch3.js. Nothing here needs editing to rewrite it.
// ============================================================================
window.TME = window.TME || {};

TME.Ch3_GroupChat = {
  name: "Ch3_GroupChat",

  enter(){
    const D = TME.DataCh3;
    this.W = TME.CANVAS_W;
    this.H = TME.CANVAS_H;

    TME.Fader.fadeIn(600);

    this.overlayEl = document.getElementById("chat-overlay");
    this.logEl     = this.overlayEl.querySelector(".chat-log");
    this.titleEl   = this.overlayEl.querySelector(".chat-title");

    this.logEl.innerHTML = "";
    this.titleEl.textContent = D.groupTitle;

    this.index = 0;
    this.lastFrom = null;
    this.state = "chatting";

    // .show flips display:none -> flex; .visible then fades the opacity in,
    // since the canvas Fader can't touch a DOM overlay sitting above it.
    this.overlayEl.classList.add("show");
    requestAnimationFrame(() => this.overlayEl.classList.add("visible"));

    this._pushNext();
  },

  exit(){
    this._hideOverlay();
  },

  update(){},

  render(ctx){
    // Dark room behind the phone. The overlay covers nearly all of it, but
    // this is what shows during the fades either side of the chapter.
    const g = ctx.createRadialGradient(this.W / 2, this.H / 2, 40, this.W / 2, this.H / 2, this.H);
    g.addColorStop(0, "#1a1826");
    g.addColorStop(1, "#08070c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.W, this.H);
  },

  handleKey(e){
    if (this.state !== "chatting") return;
    const k = e.key.toLowerCase();
    if (k !== "e" && k !== " " && k !== "enter") return;
    e.preventDefault();
    if (!this._pushNext()) this._finish();
  },

  // Posts the next visible entry. "thread" entries only relabel the header,
  // so they're consumed silently — one keypress always produces one message.
  // Returns false once the chapter's script is exhausted.
  _pushNext(){
    const list = TME.DataCh3.CH3_CHAT;
    while (this.index < list.length){
      const entry = list[this.index++];
      if (entry.type === "thread"){ this._applyThread(entry); continue; }
      this._renderEntry(entry);
      this.logEl.scrollTop = this.logEl.scrollHeight;
      return true;
    }
    return false;
  },

  _applyThread(entry){
    this.titleEl.textContent = entry.title;
    this.lastFrom = null;

    const divider = document.createElement("div");
    divider.className = "chat-divider";
    divider.textContent = entry.title;
    this.logEl.appendChild(divider);
  },

  _renderEntry(entry){
    if (entry.type === "narration"){
      const el = document.createElement("div");
      el.className = "chat-narration";
      el.textContent = entry.text;
      this.logEl.appendChild(el);
      this.lastFrom = null;
      return;
    }

    // unknown senders fall back to a neutral color rather than breaking
    const person = TME.DataCh3.CHAT_PEOPLE[entry.from] || { color: "#8f95b3" };

    const msg = document.createElement("div");
    msg.className = "chat-msg" + (person.self ? " me" : "");

    // consecutive messages from the same person share one name label
    if (this.lastFrom !== entry.from){
      const sender = document.createElement("div");
      sender.className = "chat-sender";
      sender.textContent = entry.from;
      sender.style.color = person.color;
      msg.appendChild(sender);
    }

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = entry.text;
    if (!person.self){
      bubble.style.borderLeftColor = person.color;
      bubble.style.borderLeftWidth = "4px";
    }
    msg.appendChild(bubble);

    this.logEl.appendChild(msg);
    this.lastFrom = entry.from;
  },

  _hideOverlay(){
    if (!this.overlayEl) return;
    this.overlayEl.classList.remove("visible");
    this.overlayEl.classList.remove("show");
  },

  _finish(){
    const D = TME.DataCh3;
    this.state = "ending";
    this._hideOverlay();
    TME.Fader.fadeOut(1000, () => {
      TME.EndCard.show({
        title: D.chapterEndTitle,
        subtitle: D.chapterEndSubtitle,
        // Chapter 4 hands off here. TME.goToChapter() logs and no-ops if
        // "Ch4_Cafe" hasn't been registered yet (see main.js).
        onDone: () => TME.goToChapter("Ch4_Cafe")
      });
    });
  }
};
