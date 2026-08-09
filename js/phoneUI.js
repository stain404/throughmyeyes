// ============================================================================
// TME.PhoneUI — the phone-notification popup and the retro Instagram-style
// "following list" / profile mockup overlays. Pure DOM (not canvas) since it
// needs scrolling + click interaction.
// ============================================================================
window.TME = window.TME || {};

TME.PhoneUI = {
  init(els){
    this.notifEl = els.notif;
    this.notifTextEl = els.notif.querySelector(".notif-text");

    this.listOverlayEl = els.listOverlay;
    this.listEl = els.listOverlay.querySelector(".ig-list");

    this.profileOverlayEl = els.profileOverlay;
    this.profileAvatarEl = els.profileOverlay.querySelector(".ig-profile-avatar");
    this.profileNameEl = els.profileOverlay.querySelector(".ig-profile-name");

    this.entries = [];
    this.rows = [];
    this.selectedIndex = 0;

    // Set by whichever scene is using the phone (e.g. sceneB_home.js) to
    // react when the player opens a particular profile.
    this.onProfileOpen = null;

    this.listOverlayEl.querySelector(".ig-close").addEventListener("click", () => this.closeList());
    this.profileOverlayEl.querySelector(".ig-close").addEventListener("click", () => this.closeProfile());
  },

  // ---- notification popup ----
  showNotification(text, durationMs){
    this.notifTextEl.textContent = text;
    this.notifEl.classList.add("show");
    clearTimeout(this._notifTimeout);
    this._notifTimeout = setTimeout(() => this.notifEl.classList.remove("show"), durationMs || 2000);
  },

  // ---- following list ----
  // entries: [{ username, color, isSpecial? }] — see #EDIT-DIALOGUE data.js
  openList(entries){
    this.entries = entries;
    this.selectedIndex = 0;
    this.listEl.innerHTML = "";
    this.rows = entries.map((entry, i) => {
      const row = document.createElement("div");
      row.className = "ig-row";

      const avatar = document.createElement("div");
      avatar.className = "ig-avatar";
      avatar.style.background = entry.color;
      avatar.textContent = entry.username[0].toUpperCase();
      // #EDIT-AVATARS: drop a real image at images/avatars/<username>.png
      // and it will automatically replace the colored-circle placeholder.
      const img = new Image();
      img.onload = () => { avatar.style.backgroundImage = `url(${img.src})`; avatar.textContent = ""; };
      img.src = `images/avatars/${entry.username}.png`;

      const name = document.createElement("div");
      name.className = "ig-username";
      name.textContent = entry.username;

      row.appendChild(avatar);
      row.appendChild(name);
      row.addEventListener("click", () => this._selectRow(i));
      this.listEl.appendChild(row);
      return row;
    });
    this._highlight();
    this.listOverlayEl.classList.add("show");
  },

  closeList(){
    this.listOverlayEl.classList.remove("show");
  },

  _highlight(){
    this.rows.forEach((r, i) => r.classList.toggle("selected", i === this.selectedIndex));
    const el = this.rows[this.selectedIndex];
    if (el) el.scrollIntoView({ block: "nearest" });
  },

  moveSelection(delta){
    this.selectedIndex = Math.max(0, Math.min(this.rows.length - 1, this.selectedIndex + delta));
    this._highlight();
  },

  confirmSelection(){
    this._selectRow(this.selectedIndex);
  },

  _selectRow(i){
    this.selectedIndex = i;
    this._highlight();
    const entry = this.entries[i];
    // Only the "special" entry (bisma_) leads anywhere — the rest are just
    // flavor/filler for a believable-looking list, per the design.
    if (entry.isSpecial){
      this.closeList();
      this.openProfile(entry);
    }
  },

  // ---- profile view ----
  openProfile(entry){
    this.profileNameEl.textContent = entry.username;
    this.profileAvatarEl.style.background = entry.color;
    this.profileAvatarEl.style.backgroundImage = "";
    this.profileAvatarEl.textContent = entry.username[0].toUpperCase();
    // #EDIT-AVATARS
    const img = new Image();
    img.onload = () => { this.profileAvatarEl.style.backgroundImage = `url(${img.src})`; this.profileAvatarEl.textContent = ""; };
    img.src = `images/avatars/${entry.username}.png`;

    this.profileOverlayEl.classList.add("show");
    if (this.onProfileOpen) this.onProfileOpen(entry);
  },

  closeProfile(){
    this.profileOverlayEl.classList.remove("show");
  },

  isAnyOpen(){
    return this.listOverlayEl.classList.contains("show") || this.profileOverlayEl.classList.contains("show");
  },

  handleKey(e){
    const k = e.key.toLowerCase();
    if (this.listOverlayEl.classList.contains("show")){
      if (k === "arrowdown"){ e.preventDefault(); this.moveSelection(1); }
      else if (k === "arrowup"){ e.preventDefault(); this.moveSelection(-1); }
      else if (k === "e" || k === "enter"){ e.preventDefault(); this.confirmSelection(); }
      else if (k === "escape"){ this.closeList(); }
    } else if (this.profileOverlayEl.classList.contains("show")){
      if (k === "escape") this.closeProfile();
    }
  }
};
