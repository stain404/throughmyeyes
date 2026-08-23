// ============================================================================
// EDITABLE CONTENT FOR CHAPTER 5 — "Four Flowers"
//
// >>> READ THIS FIRST <<<
// The MECHANICS here are what you asked for and are finished:
//   - walk the flower stall, [E] to pick, you must choose exactly 4
//   - every flower carries its own hidden message, revealed at the end
//     based on which four you actually picked
//   - [W] to ride the bike; nothing advances until you do
//   - a different background for coming back and picking the two of them up
//   - optional [E] prompts (look, laugh) that aren't just "advance text"
//
// The WORDS are placeholders, because I don't know the real story. Every
// line below is safe to rewrite and nothing in js/scenes/ch5_flowers.js
// needs touching when you do. The things I had to guess at are marked
// #GUESS — those are the ones worth fixing first:
//   #GUESS the occasion (why flowers at all)
//   #GUESS who Ayaan is (written as a friend with his own bike)
//   #GUESS where the four of you are going
//   #GUESS the six flowers and all six hidden messages
// ============================================================================
window.TME = window.TME || {};

TME.DataCh5 = {

  // --------------------------------------------------------------------
  // #EDIT-CHARACTERS — must match the "speaker" fields used below.
  // --------------------------------------------------------------------
  CHAR: {
    ZAEEM: "Zaeem",
    AYAAN: "Ayaan",
    BISMA: "Bisma",
    HAMZA: "Hamza"
  },

  // --------------------------------------------------------------------
  // #EDIT-SPRITESHEETS — SWAP REAL SPRITES HERE
  // Zaeem/Bisma/Hamza reuse sheets from earlier chapters via TME.sheet().
  // Ayaan is the only new one.
  // --------------------------------------------------------------------
  SHEETS: {
    AYAAN: {
      src: "images/ayaan_spritesheet.png",
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

  // #EDIT-PLACEHOLDER-COLORS
  COLORS: {
    ZAEEM: "#9fd8ff",
    AYAAN: "#c9b06b",
    BISMA: "#ff8fb8",
    HAMZA: "#f2d18c"
  },

  // How many flowers the player must pick before the chapter moves on.
  pickCount: 4,

  // --------------------------------------------------------------------
  // #EDIT-FLOWERS / #GUESS — the stall. Add or remove entries freely; the
  // scene lays them out along the stall automatically and only requires
  // `pickCount` of them.
  //
  //   name    shown in the HUD and on the reveal card
  //   petal   / center — placeholder colors, no art needed
  //   pick    the thought when he picks it up
  //   hidden  the hidden message, shown at the end ONLY if this one
  //           was among the four he chose
  // --------------------------------------------------------------------
  FLOWERS: [
    {
      name: "Red rose",
      petal: "#c9304a", center: "#f2d18c",
      pick: "The obvious one. Everyone picks this one.",
      hidden: "He almost left it because it was the obvious one, and then took it anyway. Some things are obvious because they're true."
    },
    {
      name: "Sunflower",
      petal: "#e8b430", center: "#6b4a24",
      pick: "This one just looks like it's in a good mood.",
      hidden: "Because she turns towards whatever light is in the room without ever noticing she's doing it."
    },
    {
      name: "Marigold",
      petal: "#e8801f", center: "#b85c12",
      pick: "Every festival he'd ever been to smelled like these.",
      hidden: "The flower from every wedding, every Eid, every front door in Millat Nagar. He picked home, and called it a flower."
    },
    {
      name: "Mogra",
      petal: "#f2efe2", center: "#d8d2b8",
      pick: "You smell these before you see them.",
      hidden: "Small, white, easy to miss, and you always know when it's there. Like her laugh from the other side of a room."
    },
    {
      name: "White lily",
      petal: "#eef0f5", center: "#e0c46a",
      pick: "...too formal? Probably too formal.",
      hidden: "For the part of her he hadn't earned yet, and knew he hadn't."
    },
    {
      name: "Daisy",
      petal: "#f4f4ee", center: "#f0c93f",
      pick: "Nothing dramatic about this one.",
      hidden: "Nothing dramatic. Just something small that looked happy to be there. He needed one of those in the bunch."
    }
  ],

  // --------------------------------------------------------------------
  // #EDIT-NARRATION — opening cards over black.
  // --------------------------------------------------------------------
  narration_intro: [
    "Some time after Love and Latte.",           // #GUESS when this happens
    "Ayaan had the bikes out before Zaeem had even finished getting ready.",
    "There was one stop to make first."           // #GUESS the occasion
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — at the flower stall, before you can pick.
  // --------------------------------------------------------------------
  shop_intro: [
    { speaker: "Ayaan", text: "Go on then. You're the one who wanted to stop." },
    { speaker: "Zaeem", text: "Two minutes." },
    { speaker: "Ayaan", text: "It is never two minutes with you." }
  ],

  // Shown once, the first time the player gets near the flowers.
  hint_pick: "Walk with A / D, press [E] to pick. Choose four.",

  // #EDIT-DIALOGUE — after the fourth flower goes in the bunch.
  picked_done: [
    { speaker: "Ayaan", text: "Four." },
    { speaker: "Zaeem", text: "Four's a good number." },
    { speaker: "Ayaan", text: "Four is a number. Get on the bike." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — the ride. Plays while you're actually moving.
  // --------------------------------------------------------------------
  ride_prompt: "Hold [W] to go",

  riding: [
    { speaker: "Ayaan", text: "You're holding those like they're going to run away." },
    { speaker: "Zaeem", text: "I'm holding them so they don't get wrecked." },
    { speaker: "Ayaan", text: "Right. That's why." },
    { speaker: "Ayaan", text: "You know she's going to say something about it and you're going to go completely quiet." },
    { speaker: "Zaeem", text: "I will not." },
    { speaker: "Ayaan", text: "You will. I've watched you do it." }
  ],

  // An optional beat — the prompt shows, and it's fine to ignore it.
  laugh_prompt: "[E] laugh",
  laugh_line: { speaker: "Zaeem", text: "...okay, that one was fair." },
  laugh_skipped: { speaker: "Ayaan", text: "Nothing? Fine. Tough crowd." },

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — picking the two of them up. Ayaan sorts out the
  // seating, which he considers his job. Kept in Hindi on purpose, and
  // Bisma is addressed with "tum", not "tu".
  // --------------------------------------------------------------------
  pickup: [
    { speaker: "Ayaan", text: "Aa gaye! Chalo chalo, late ho rahe hain." },
    { speaker: "Ayaan", text: "Bisma, tum mere saath baitho." },
    { speaker: "Ayaan", text: "Hamza, tu Zaeem ke peeche baith jaa." },
    { speaker: "Hamza", text: "Why do I get the slow one?" },
    { speaker: "Zaeem", text: "Walk, then." },
    { speaker: "Hamza", text: "...I'll take the slow one." }
  ],

  // #EDIT-DIALOGUE — he hands them over.
  give_flowers: [
    { speaker: "Bisma", text: "...what are those." },
    { speaker: "Zaeem", text: "Flowers." },
    { speaker: "Bisma", text: "I can see that they're flowers, Zaeem." },
    { speaker: "Zaeem", text: "Then why did you ask." },
    { speaker: "Ayaan", text: "Told you. Completely quiet." }
  ],

  // Card shown just before the hidden messages of the four chosen flowers.
  reveal_lead: "He never told her why he picked those four.",

  // --------------------------------------------------------------------
  // #EDIT-NARRATION — closing cards over the fade to black.
  // --------------------------------------------------------------------
  narration_end: [
    "There was a whole reason behind every one of them, and he said none of it out loud.",
    "She put them in water that night, and he found that out eleven days later, by accident, from somebody else."
  ],

  chapterEndTitle: "END OF CHAPTER 5",
  chapterEndSubtitle: "Four Flowers."
};
