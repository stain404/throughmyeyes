// ============================================================================
// EDITABLE CONTENT FOR CHAPTER 4 — "Two Or Three Minutes"
// Love and Latte, then the walk back to her building. This is the only file
// you need to edit to rewrite Chapter 4's dialogue, monologue or narration.
// ============================================================================
window.TME = window.TME || {};

TME.DataCh4 = {

  // --------------------------------------------------------------------
  // #EDIT-CHARACTERS — must match the "speaker" fields used below.
  // --------------------------------------------------------------------
  CHAR: {
    ZAEEM:  "Zaeem",
    BISMA:  "Bisma",
    ALFIYA: "Alfiya",
    CHILD:  "Small boy"
  },

  // --------------------------------------------------------------------
  // #EDIT-SPRITESHEETS — SWAP REAL SPRITES HERE
  // Zaeem reuses the Chapter 1 sheet; Bisma reuses the Chapter 2 sheet.
  // Alfiya is drawn with outfit:"abaya" (see js/sprite.js) — a real sheet
  // should show the robe and headscarf directly.
  // --------------------------------------------------------------------
  SHEETS: {
    ALFIYA: {
      src: "images/alfiya_spritesheet.png",
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
    CHILD: {
      src: "images/child_spritesheet.png",
      frameWidth: 48, frameHeight: 48, columns: 6, rows: 6,
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
    ZAEEM:  "#9fd8ff",
    BISMA:  "#ff8fb8",
    ALFIYA: "#c98aa0",   // darkened into the abaya + scarf by js/sprite.js
    CHILD:  "#8fe3c0"
  },

  // #EDIT-SIGN — the shopfront board. Devanagari renders through a system
  // font fallback (Nirmala UI on Windows).
  sign: {
    hindi:   "लव अँन्ड लाते",
    english: "Love & Latte"
  },

  // --------------------------------------------------------------------
  // #EDIT-NARRATION — opening cards, over black, before the cafe fades in.
  // --------------------------------------------------------------------
  narration_intro: [
    "Then one day she texted him first.",
    "Not a roast, not a threat, not a reply to something in the group. Just: are you free, can we meet.",
    "Love and Latte, a little past nine. He was early, so he walked past it once to avoid being early."
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 1: Alfiya is there too, briefly.
  // --------------------------------------------------------------------
  alfiya_table: [
    { speaker: "Bisma",  text: "Zaeem — this is Alfiya." },
    { speaker: "Alfiya", text: "Hi! I've heard a lot about you." },
    { speaker: "Zaeem",  text: "Good things?" },
    { speaker: "Alfiya", text: "I said what I said." },
    { speaker: "Bisma",  text: "She's not going to tell you. Don't try." },
    { speaker: "Alfiya", text: "This sandwich is actually good. Bisma, why aren't you getting one?" },
    { speaker: "Bisma",  text: "I'm on coffee." },
    { speaker: "Alfiya", text: "Okay, I'm heading off, my mum's calling. Bye Bisma. Bye Zaeem!" },
    { speaker: "Zaeem",  text: "Bye—" }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 2: and then it's just the two of them.
  // --------------------------------------------------------------------
  monologue_alone: [
    { speaker: "Zaeem (thinking)", text: "...and then it was just us." },
    { speaker: "Zaeem (thinking)", text: "This is the same girl who threatens to beat me up in the group chat every day." },
    { speaker: "Zaeem (thinking)", text: "And right now she's turning her cup handle round and round and not looking at me." },
    { speaker: "Zaeem (thinking)", text: "wow. she's so beautiful." },
    { speaker: "Zaeem (thinking)", text: "Don't say that out loud. Do NOT say that out loud." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 3: what they're actually into. The small boy is
  // already doing laps between his parents' table and theirs while this runs.
  // --------------------------------------------------------------------
  interests: [
    { speaker: "Bisma", text: "Okay, so what do you actually do? When you're not being annoying online." },
    { speaker: "Zaeem", text: "That IS the hobby." },
    { speaker: "Bisma", text: "Seriously." },
    { speaker: "Zaeem", text: "I draw. Badly. I listen to a lot of music. You?" },
    { speaker: "Bisma", text: "Painting. And reading. I read really strange things." },
    { speaker: "Zaeem", text: "Define strange." },
    { speaker: "Bisma", text: "Not yet. Let's build some trust first." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 4: she notices the boy doing laps, and hands him
  // her phone unprompted.
  // --------------------------------------------------------------------
  boy_and_phone: [
    { speaker: "Bisma",     text: "That's the third time this kid has come over." },
    { speaker: "Zaeem",     text: "His parents are sitting right there. He's decided our table is more interesting." },
    { speaker: "Bisma",     text: "Hey. Do you like cats?" },
    { speaker: "Small boy", text: "YES" },
    { speaker: "Bisma",     text: "Here. Sit." },
    { speaker: "Small boy", text: "more please" }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 5: Harry Potter, and the piano.
  // --------------------------------------------------------------------
  potter: [
    { speaker: "Bisma", text: "Listen to that sound. That's the Harry Potter one, isn't it?" },
    { speaker: "Zaeem", text: "Wait. Are you a Potter person?" },
    { speaker: "Bisma", text: "Obviously. Ravenclaw. Don't argue." },
    { speaker: "Zaeem", text: "I wasn't going to." },
    { speaker: "Bisma", text: "When I was little I learnt the theme on piano. Hedwig's Theme." },
    { speaker: "Zaeem", text: "You did NOT." },
    { speaker: "Bisma", text: "I can still play it. Probably. A little." }
  ],

  monologue_piano: [
    { speaker: "Zaeem (thinking)", text: "She learnt Hedwig's Theme at nine and said it like it was nothing." },
    { speaker: "Zaeem (thinking)", text: "One day she's going to play it for me. I've decided that." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 6: history.
  // --------------------------------------------------------------------
  history: [
    { speaker: "Bisma", text: "I really like history. Like, actually like it." },
    { speaker: "Zaeem", text: "School history?" },
    { speaker: "Bisma", text: "No, no. The real kind. How people lived, what they wore, what they ate." },
    { speaker: "Bisma", text: "There's a whole story behind every small thing. That's the part I love." },
    { speaker: "Zaeem", text: "You talk about dead people like they're neighbours." },
    { speaker: "Bisma", text: "So?" }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 7: he points out where he lives.
  // --------------------------------------------------------------------
  my_building: [
    { speaker: "Zaeem", text: "Look over there. On the corner of the lane." },
    { speaker: "Bisma", text: "Which one?" },
    { speaker: "Zaeem", text: "The cream one. You can see the water tank on the roof. That's where I live." },
    { speaker: "Bisma", text: "That close?!" },
    { speaker: "Zaeem", text: "The whole year. You were in the group chat and I was two streets away." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 8: Hamid, and the thing about his dad.
  // --------------------------------------------------------------------
  hamid_talk: [
    { speaker: "Bisma", text: "Wait, you know Hamid, right?" },
    { speaker: "Zaeem", text: "Millat Nagar's Hamid? Everyone knows him." },
    { speaker: "Bisma", text: "He's a close friend of mine. Since we were kids." },
    { speaker: "Zaeem", text: "...ah." },
    { speaker: "Bisma", text: "Say it. What is it?" },
    { speaker: "Zaeem", text: "My dad caught him doing something once. He even apologised for it." },
    { speaker: "Zaeem", text: "He's hated my dad ever since. He apologised himself, and he still hates him." },
    { speaker: "Bisma", text: "Yeah, that's just how he is." },
    { speaker: "Bisma", text: "Don't tell him that's your dad. Leave it. It's better that way." },
    { speaker: "Zaeem", text: "Yeah. Let's leave it." }
  ],

  monologue_millat: [
    { speaker: "Zaeem (thinking)", text: "Everyone here knows everyone. I keep forgetting that." },
    { speaker: "Zaeem (thinking)", text: "She was in my phone the whole year. She lived two streets away." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 7: leaving.
  // --------------------------------------------------------------------
  leaving: [
    { speaker: "Bisma", text: "It's getting late, my mum's going to call." },
    { speaker: "Zaeem", text: "I'll walk you." },
    { speaker: "Bisma", text: "Zaeem it's literally two minutes." },
    { speaker: "Zaeem", text: "Then it'll take two minutes." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 8: the walk. Two or three minutes, stretched.
  // --------------------------------------------------------------------
  walk_home: [
    { speaker: "Bisma", text: "Do you always walk this slowly?" },
    { speaker: "Zaeem", text: "Yes. It's a medical condition." },
    { speaker: "Bisma", text: "Liar." },
    { speaker: "Bisma", text: "...this one's my building." },
    { speaker: "Zaeem", text: "Already?" },
    { speaker: "Bisma", text: "I told you. Two minutes." },
    { speaker: "Zaeem", text: "Bad building. Should've been further." },
    { speaker: "Bisma", text: "Goodnight Zaeem." },
    { speaker: "Zaeem", text: "Goodnight Bisma." }
  ],

  monologue_after: [
    { speaker: "Zaeem (thinking)", text: "..." },
    { speaker: "Zaeem (thinking)", text: "My house is fifteen minutes away." },
    { speaker: "Zaeem (thinking)", text: "I'm going to take forty." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-NARRATION — closing cards over the fade to black.
  // --------------------------------------------------------------------
  narration_end: [
    "Two or three minutes. That's how far she lived. He'd worked the route out in his head before either of them had stood up, and it was still only two or three minutes.",
    "He walked her home anyway. Slowly. Like a man trying to make a short street longer.",
    "Outside Al Broaster King, eight months ago, he'd had her name and nothing else at all.",
    "Tonight he had Hedwig's Theme learnt at nine years old, and a small boy's opinion of cats, and a story about his father he'd never told anyone who mattered.",
    "He went home the long way, for no reason he'd have admitted to."
  ],

  chapterEndTitle: "END OF CHAPTER 4",
  chapterEndSubtitle: "Two Or Three Minutes."
};
