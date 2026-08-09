// ============================================================================
// EDITABLE CONTENT FOR CHAPTER 1 — this is the only file you should need to
// touch to rewrite dialogue, swap in real sprite sheets, or edit the fake
// Instagram following list. None of this affects game logic.
// ============================================================================
window.TME = window.TME || {};

TME.Data = {

  // --------------------------------------------------------------------
  // #EDIT-CHARACTERS — display names. These must exactly match the
  // "speaker" field used in the dialogue arrays below (used to decide
  // which sprite plays the "talk" animation).
  // --------------------------------------------------------------------
  CHAR: {
    ZAEEM: "Zaeem",
    SAMAARA: "Samaara"
  },

  // --------------------------------------------------------------------
  // #EDIT-SPRITESHEETS
  // Once you have the real zaeem_spritesheet.png / samaara_spritesheet.png,
  // drop them into images/, then update frameWidth/frameHeight/columns/rows
  // and the per-animation "row" numbers to match their actual grid layout.
  // Until then, TME.AnimatedSprite silently falls back to a placeholder
  // colored rectangle, so the game runs fine with these values as-is.
  //
  // "frames" = how many columns of that animation to play (starting at
  // column 0 of that row). "fps" = playback speed. "loop: false" freezes on
  // the last frame instead of looping.
  // --------------------------------------------------------------------
  ZAEEM_SHEET: {
    src: "images/zaeem_spritesheet.png",
    frameWidth: 64,
    frameHeight: 64,
    columns: 6,
    rows: 6,
    animations: {
      "idle":         { row: 0, frames: 4, fps: 5,  loop: true },
      "walk-down":    { row: 1, frames: 6, fps: 10, loop: true },
      "walk-up":      { row: 2, frames: 6, fps: 10, loop: true },
      "walk-left":    { row: 3, frames: 6, fps: 10, loop: true },
      "walk-right":   { row: 4, frames: 6, fps: 10, loop: true },
      "talk":         { row: 5, frames: 4, fps: 6,  loop: true }
      // "idle-slumped": { row: 6, frames: 2, fps: 3, loop: true }
      // #EDIT: uncomment above (and add a row to the sheet) once you've
      // drawn a slumped-shoulders idle frame for the Scene B "sigh" beat.
      // Until then it automatically falls back to the normal idle frame.
    }
  },
  SAMAARA_SHEET: {
    src: "images/samaara_spritesheet.png",
    frameWidth: 64,
    frameHeight: 64,
    columns: 6,
    rows: 6,
    animations: {
      "idle":       { row: 0, frames: 4, fps: 5,  loop: true },
      "walk-down":  { row: 1, frames: 6, fps: 10, loop: true },
      "walk-up":    { row: 2, frames: 6, fps: 10, loop: true },
      "walk-left":  { row: 3, frames: 6, fps: 10, loop: true },
      "walk-right": { row: 4, frames: 6, fps: 10, loop: true },
      "talk":       { row: 5, frames: 4, fps: 6,  loop: true }
    }
  },

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — Scene A: "The Road"
  // --------------------------------------------------------------------
  sceneA_greeting: [
    { speaker: "Samaara", text: "Wait... Zaeem?? Oh my god, is that you?" },
    { speaker: "Zaeem",   text: "Samaara! No way, it's actually been years." },
    { speaker: "Samaara", text: "I know! How are you? What have you been up to?" },
    { speaker: "Zaeem",   text: "Honestly just been busy with life, you know how it is. You?" },
    { speaker: "Samaara", text: "Same, same. Time just disappeared, didn't it?" },
    { speaker: "Zaeem",   text: "Fr. Also — did you unfollow me on Insta or something? I noticed you weren't there anymore." },
    { speaker: "Samaara", text: "Wait what, no way, let me check—" },
    { speaker: "Samaara", text: "Oh my god you're right, that's so weird. Following you right now, hold on." }
  ],

  sceneA_notification: "samaara_ig started following you",

  sceneA_goodbye: [
    { speaker: "Samaara", text: "It was so good seeing you though, seriously." },
    { speaker: "Zaeem",   text: "Same here. We should catch up properly sometime." },
    { speaker: "Samaara", text: "Definitely. Bye Zaeem!" },
    { speaker: "Zaeem",   text: "Bye!" }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — Scene B: "Home"
  // "thought" lines are Zaeem's internal monologue — never spoken aloud,
  // rendered in the dialogue box's italic/dashed "thought" style.
  // --------------------------------------------------------------------
  // Split into three arrays (intro / age reveal / final) so the game can
  // trigger the sigh particle + slumped-pose visual cue right after the age
  // is revealed and before the last resigned line, per the original design.
  sceneB_monologue_intro: [
    { speaker: "Zaeem (thinking)", text: "...huh, who's this?" },
    { speaker: "Zaeem (thinking)", text: "...okay wow, she's drop dead gorjus." },
    { speaker: "Zaeem (thinking)", text: "Should I... follow her or something? AH shes too pretty to give me a follow back." }
  ],
  sceneB_monologue_ageReveal: [
    { speaker: "Zaeem (thinking)", text: "*sees her age*" },
    { speaker: "Zaeem (thinking)", text: "...she's like 2-3 years older than me." }
  ],
  sceneB_monologue_final: [
    { speaker: "Zaeem (thinking)", text: "Yeah she probably sees me as a kid lol." },
    { speaker: "Zaeem (thinking)", text: "*sighs*...never mind." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-AVATARS — the fake Instagram "following" list shown in Scene B.
  // Only the entry with isSpecial:true is actually clickable/leads anywhere
  // (per the design, the rest are just believable filler). To use a real
  // photo instead of a colored circle, drop a PNG at
  // images/avatars/<username>.png — it's picked up automatically.
  // --------------------------------------------------------------------
  igFollowingList: [
    { username: "sara_k22",      color: "#8fd3ff" },
    { username: "mike.travels",  color: "#f2e58c" },
    { username: "the_realdanny", color: "#9be39b" },
    { username: "noor.codes",    color: "#e3a1c9" },
    { username: "bisma_",        color: "#ff8fb8", isSpecial: true },
    { username: "kzhang99",      color: "#8a8aa8" },
    { username: "jrmartinez",    color: "#c9a86b" },
    { username: "lily.writes",   color: "#f2c14e" },
    { username: "devon_b",       color: "#8fe3ff" },
    { username: "ash.moon",      color: "#e8dcb5" }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — end of chapter card
  // --------------------------------------------------------------------
  chapterEndTitle: "END OF CHAPTER 1",
  chapterEndSubtitle: "[Placeholder subtitle / chapter recap line]"
};
