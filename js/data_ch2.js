// ============================================================================
// EDITABLE CONTENT FOR CHAPTER 2 — "Back To The Road"
// Same role as js/data.js (Chapter 1), kept in its own file so Chapter 1's
// content is never touched. This is the only file you need to edit to rewrite
// Chapter 2's narration, dialogue, monologue or placeholder colors.
//
// Setting: Al Broaster King, Millat Nagar / Oshiwara. Open street-side shop,
// orange plastic chairs on the pavement, the road right there behind you.
// ============================================================================
window.TME = window.TME || {};

TME.DataCh2 = {

  // --------------------------------------------------------------------
  // #EDIT-CHARACTERS — display names. These must exactly match the
  // "speaker" field used in the dialogue arrays below (used to decide
  // which sprite plays the "talk" animation).
  // --------------------------------------------------------------------
  CHAR: {
    ZAEEM:  "Zaeem",
    COUSIN: "Cousin",   // #EDIT: swap in his real name
    HAMZA:  "Hamza",
    BISMA:  "Bisma"     // she has no lines this chapter — he never speaks to her
  },

  // --------------------------------------------------------------------
  // #EDIT-SPRITESHEETS — SWAP REAL SPRITES HERE
  // Zaeem reuses the Chapter 1 sheet (TME.zaeemSheet, built in main.js).
  // These four are new. Drop real LPC/Kenney sheets into images/ and update
  // frameWidth/frameHeight/columns/rows + the per-animation "row" numbers.
  // Until then the procedural placeholder character in js/sprite.js draws
  // them, including the "idle-back" pose this chapter depends on.
  // --------------------------------------------------------------------
  SHEETS: {
    COUSIN: {
      src: "images/cousin_spritesheet.png",
      frameWidth: 64, frameHeight: 64, columns: 6, rows: 6,
      animations: {
        "idle":       { row: 0, frames: 4, fps: 5,  loop: true },
        "walk-down":  { row: 1, frames: 6, fps: 10, loop: true },
        "walk-up":    { row: 2, frames: 6, fps: 10, loop: true },
        "walk-left":  { row: 3, frames: 6, fps: 10, loop: true },
        "walk-right": { row: 4, frames: 6, fps: 10, loop: true },
        "talk":       { row: 5, frames: 4, fps: 6,  loop: true }
      }
    },
    BISMA: {
      src: "images/bisma_spritesheet.png",
      frameWidth: 64, frameHeight: 64, columns: 6, rows: 6,
      animations: {
        "idle":       { row: 0, frames: 4, fps: 5,  loop: true },
        "walk-down":  { row: 1, frames: 6, fps: 10, loop: true },
        "walk-up":    { row: 2, frames: 6, fps: 10, loop: true },
        "walk-left":  { row: 3, frames: 6, fps: 10, loop: true },
        "walk-right": { row: 4, frames: 6, fps: 10, loop: true },
        "talk":       { row: 5, frames: 4, fps: 6,  loop: true }
        // "idle-back": { row: 6, frames: 2, fps: 4, loop: true }
        // #EDIT: this chapter opens with her seen from behind. Until you draw
        // that row, the procedural placeholder renders the back view itself.
      }
    },
    FRIEND: {
      src: "images/bisma_friend_spritesheet.png",
      frameWidth: 64, frameHeight: 64, columns: 6, rows: 6,
      animations: {
        "idle":       { row: 0, frames: 4, fps: 5,  loop: true },
        "walk-down":  { row: 1, frames: 6, fps: 10, loop: true },
        "walk-up":    { row: 2, frames: 6, fps: 10, loop: true },
        "walk-left":  { row: 3, frames: 6, fps: 10, loop: true },
        "walk-right": { row: 4, frames: 6, fps: 10, loop: true },
        "talk":       { row: 5, frames: 4, fps: 6,  loop: true }
      }
    },
    HAMZA: {
      src: "images/hamza_spritesheet.png",
      frameWidth: 64, frameHeight: 64, columns: 6, rows: 6,
      animations: {
        "idle":       { row: 0, frames: 4, fps: 5,  loop: true },
        "walk-down":  { row: 1, frames: 6, fps: 10, loop: true },
        "walk-up":    { row: 2, frames: 6, fps: 10, loop: true },
        "walk-left":  { row: 3, frames: 6, fps: 10, loop: true },
        "walk-right": { row: 4, frames: 6, fps: 10, loop: true },
        "talk":       { row: 5, frames: 4, fps: 6,  loop: true }
      }
    }
  },

  // --------------------------------------------------------------------
  // #EDIT-PLACEHOLDER-COLORS — shirt colors for the procedural characters
  // (js/sprite.js picks skin + hair from these deterministically). Bisma's
  // is the same rose used for bisma_ in Chapter 1's following list.
  // --------------------------------------------------------------------
  COLORS: {
    ZAEEM:  "#9fd8ff",
    COUSIN: "#b9e3a6",
    BISMA:  "#ff8fb8",
    FRIEND: "#e3c2ff",
    HAMZA:  "#f2d18c"
  },

  // --------------------------------------------------------------------
  // #EDIT-SIGN — the shopfront board. Devanagari renders through a system
  // font fallback (Nirmala UI on Windows); it degrades to blank if missing.
  // --------------------------------------------------------------------
  sign: {
    hindi:   "अल ब्रॉस्टर किंग",
    english: "Al Broaster King",
    short:   "ABK",
    delivery:"FREE HOME DELIVERY",
    address: "Shop No. 11, Kohinoor Co-Op Soc, Millat Nagar, Oshiwara, Andheri (W)"
  },

  // --------------------------------------------------------------------
  // #EDIT-NARRATION — opening cards, shown over black before the scene
  // fades in. Advanced with [E]. Covers the year between chapters.
  // --------------------------------------------------------------------
  narration_intro: [
    "Almost a year passed after Samaara.",
    "Someone added him to a group chat on Instagram. He knew the names in it. Bisma was one of them — he'd read it a hundred times and never once typed anything to her. He talked to Alisha instead, and left it at that.",
    "Then one evening, a little after eight, he was sitting outside Al Broaster King with his cousin, and none of that mattered."
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 1: killing time with the cousin at the left table.
  // --------------------------------------------------------------------
  banter: [
    { speaker: "Cousin", text: "I told you we should have sat inside. The mosquitoes are eating me alive." },
    { speaker: "Zaeem",  text: "The fan doesn't work inside. At least there's air out here." },
    { speaker: "Cousin", text: "Air. This is Oshiwara, bhai. There's no air here, there's traffic." },
    { speaker: "Zaeem",  text: "Same thing." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 2: he notices the table on the right. She has her
  // back to the road; he can't even see her face yet.
  // --------------------------------------------------------------------
  monologue_notice: [
    { speaker: "Zaeem (thinking)", text: "...who is that?" },
    { speaker: "Zaeem (thinking)", text: "Back to the road. Doesn't even know anyone's looking." },
    { speaker: "Zaeem (thinking)", text: "I can't even see her face and I'm still looking. Great. Very normal." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 3: Hamza walks in from the left and hits their
  // table first, because of course he does.
  // --------------------------------------------------------------------
  hamza_greeting: [
    { speaker: "Hamza",  text: "Assalamualaikum, bhai!" },
    { speaker: "Zaeem",  text: "Walaikum assalam! Hamza, what are you doing here?" },
    { speaker: "Hamza",  text: "Just came to see them. How have you been?" },
    { speaker: "Zaeem",  text: "Good, man. You?" },
    { speaker: "Hamza",  text: "All good. Listen, I'll catch you later, they're waiting for me." },
    { speaker: "Zaeem",  text: "Yeah, yeah. Go." },
    { speaker: "Cousin", text: "Your broast is going cold." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 4: she turns to greet Hamza. This is the first
  // time Zaeem actually sees her face.
  // --------------------------------------------------------------------
  monologue_angel: [
    { speaker: "Zaeem (thinking)", text: "...oh." },
    { speaker: "Zaeem (thinking)", text: "She turned around." },
    { speaker: "Zaeem (thinking)", text: "...she's looking like an actual angel." },
    { speaker: "Zaeem (thinking)", text: "...people this pretty live in Millat? Wild." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 5: he just watches. The cousin clocks it.
  // --------------------------------------------------------------------
  cousin_catches: [
    { speaker: "Cousin", text: "Bhai." },
    { speaker: "Cousin", text: "Bhai. What are you staring at?" },
    { speaker: "Zaeem",  text: "Nothing." },
    { speaker: "Cousin", text: "'Nothing' always means something." },
    { speaker: "Zaeem",  text: "Just eat. Quietly." }
  ],

  monologue_watching: [
    { speaker: "Zaeem (thinking)", text: "She's laughing at something Hamza said." },
    { speaker: "Zaeem (thinking)", text: "I'm sitting here. She's sitting there. That's the whole thing." },
    { speaker: "Zaeem (thinking)", text: "...and I'm still looking." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 6: the quiet one, right before the fade. He still
  // has no idea who he's looking at, which is the whole point of the last
  // line here landing against the closing narration.
  // --------------------------------------------------------------------
  monologue_romantic: [
    { speaker: "Zaeem (thinking)", text: "The shop light is falling straight onto her table. Of course it is." },
    { speaker: "Zaeem (thinking)", text: "She just tucked her hair behind her ear and I forgot how breathing works." },
    { speaker: "Zaeem (thinking)", text: "I'm going to go home and not be able to forget this. I already know it." },
    { speaker: "Zaeem (thinking)", text: "Maybe one day I'll ask her name." },
    { speaker: "Zaeem (thinking)", text: "...I won't. That's just how I am." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-NARRATION — closing cards, shown over the fade to black.
  // The joke of the chapter: he already had her name the whole time.
  // --------------------------------------------------------------------
  narration_end: [
    "He knew her name.",
    "He'd known it for months. Bisma — sitting in a group chat between everyone else's names, weighing absolutely nothing.",
    "He just didn't know he'd spent the last twenty minutes staring at her.",
    "He didn't know that in a few months he'd say something careless about a painting and spend two days sick about it.",
    "For now she was just a girl with her back to the road, at a plastic table outside Al Broaster King. And he was just a boy letting his broast go cold.",
    "Some stories start with a proper hello. This one started with a name he already had — and a girl who turned around once that afternoon, and not for him."
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — end of chapter card
  // --------------------------------------------------------------------
  chapterEndTitle: "END OF CHAPTER 2",
  chapterEndSubtitle: "Not Yet, But Soon."
};
