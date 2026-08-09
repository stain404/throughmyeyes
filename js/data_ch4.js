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

  cafeName: "LOVE & LATTE",

  // --------------------------------------------------------------------
  // #EDIT-NARRATION — opening cards, over black, before the cafe fades in.
  // --------------------------------------------------------------------
  narration_intro: [
    "Then one day she texted him first.",
    "Not a roast, not a threat, not a reply to something in the group. Just: are you free, can we meet.",
    "Love and Latte. He was early. He walked past it once to avoid being early."
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 1: Alfiya is there too, briefly.
  // --------------------------------------------------------------------
  alfiya_table: [
    { speaker: "Bisma",  text: "Zaeem — this is Alfiya." },
    { speaker: "Alfiya", text: "Hi! Maine bohot suna hai tumhare baare mein." },
    { speaker: "Zaeem",  text: "Good things?" },
    { speaker: "Alfiya", text: "I said what I said." },
    { speaker: "Bisma",  text: "She's not going to tell you. Don't try." },
    { speaker: "Alfiya", text: "Ye sandwich actually acha hai. Bisma tu kyun nahi le rahi?" },
    { speaker: "Bisma",  text: "Main coffee pe hoon." },
    { speaker: "Alfiya", text: "Achha main nikalti hoon, mummy ka call aa gaya. Bye Bisma. Bye Zaeem!" },
    { speaker: "Zaeem",  text: "Bye—" }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 2: and then it's just the two of them.
  // --------------------------------------------------------------------
  monologue_alone: [
    { speaker: "Zaeem (thinking)", text: "...and then it was just us." },
    { speaker: "Zaeem (thinking)", text: "Ye wahi ladki hai jo group mein roz mujhe maarne ki dhamki deti hai." },
    { speaker: "Zaeem (thinking)", text: "Aur abhi wo apne cup ka handle ghuma rahi hai aur mujhse aankh nahi milaa rahi." },
    { speaker: "Zaeem (thinking)", text: "wow. she's so beautiful." },
    { speaker: "Zaeem (thinking)", text: "Don't say that out loud. Do NOT say that out loud." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 3: what they're actually into.
  // --------------------------------------------------------------------
  interests: [
    { speaker: "Bisma", text: "Okay so what do you actually do. Jab tu online annoying nahi ho raha hota." },
    { speaker: "Zaeem", text: "That IS the hobby." },
    { speaker: "Bisma", text: "Seriously." },
    { speaker: "Zaeem", text: "I draw. Badly. Bohot music sunta hoon. Tu bata?" },
    { speaker: "Bisma", text: "Painting obviously. Aur padhti hoon — main bohot ajeeb cheezein padhti hoon." },
    { speaker: "Zaeem", text: "Define ajeeb." },
    { speaker: "Bisma", text: "Not yet. Pehle thoda trust build karte hain." },
    { speaker: "Zaeem", text: "That's the most threatening thing you've ever said to me and you once offered to beat me up in front of my mother." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 4: the small boy who adopted their table.
  // --------------------------------------------------------------------
  child_arrives: [
    { speaker: "Small boy", text: "Hi." },
    { speaker: "Zaeem",     text: "...hi." },
    { speaker: "Small boy", text: "Ye aapki behen hai?" },
    { speaker: "Bisma",     text: "Nahi." },
    { speaker: "Small boy", text: "Ohh." }
  ],

  child_returns: [
    { speaker: "Small boy", text: "Aapke paas phone hai?" },
    { speaker: "Bisma",     text: "Hai. Billi ke video dekhega?" },
    { speaker: "Small boy", text: "HAAN" }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 5: cats, then Harry Potter, then the piano.
  // --------------------------------------------------------------------
  cats_and_potter: [
    { speaker: "Bisma", text: "Mujhe ek cat chahiye. Bohot buri tarah se chahiye." },
    { speaker: "Zaeem", text: "Toh le le." },
    { speaker: "Bisma", text: "Ghar pe allowed nahi hai." },
    { speaker: "Zaeem", text: "Chupke se le le." },
    { speaker: "Bisma", text: "That is genuinely the worst advice anyone has ever—" },
    { speaker: "Bisma", text: "Ruk. Ye sound. Ye Harry Potter wala hai na?" },
    { speaker: "Zaeem", text: "Wait. Are you a Potter person?" },
    { speaker: "Bisma", text: "Obviously. Ravenclaw. Argument nahi karna." },
    { speaker: "Zaeem", text: "I wasn't going to." },
    { speaker: "Bisma", text: "Main chhoti thi na, maine piano pe theme seekha tha. Hedwig's Theme." },
    { speaker: "Zaeem", text: "You did NOT." },
    { speaker: "Bisma", text: "Abhi bhi bajaa sakti hoon. Shayad. Thoda sa." },
    { speaker: "Zaeem", text: "Thoda sa is enough. Thoda sa is plenty." }
  ],

  monologue_piano: [
    { speaker: "Zaeem (thinking)", text: "She learnt Hedwig's Theme when she was nine and said it like it was nothing." },
    { speaker: "Zaeem (thinking)", text: "Ek din wo mere liye bajayegi. Maine decide kar liya hai." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 6: Hamid, of all people.
  // --------------------------------------------------------------------
  hamid_talk: [
    { speaker: "Bisma", text: "Achha ek minute — tu Hamid ko jaanta hai na?" },
    { speaker: "Zaeem", text: "Hamid? Burgman wala Hamid?" },
    { speaker: "Bisma", text: "Haan! Family friend hai mera. Bachpan se." },
    { speaker: "Zaeem", text: "HAMID is your family friend." },
    { speaker: "Bisma", text: "Kyun, kya hua?" },
    { speaker: "Zaeem", text: "Bisma wo Millat Nagar ka gunda hai." },
    { speaker: "Bisma", text: "HAAN WO GUNDA HI HAI. Main bhi yahi keh rahi hoon!" },
    { speaker: "Bisma", text: "Ghar mein sabko lagta hai wo sharif bachcha hai. Poora Millat jaanta hai wo kya cheez hai." },
    { speaker: "Zaeem", text: "Aunty ko koi bataata kyun nahi." },
    { speaker: "Bisma", text: "Kaun bataayega? Uski maa se? Tu bataayega?" },
    { speaker: "Zaeem", text: "...nahi." }
  ],

  monologue_millat: [
    { speaker: "Zaeem (thinking)", text: "Yahan har koi sabko jaanta hai. Main bhoolta rehta hoon." },
    { speaker: "Zaeem (thinking)", text: "Poora saal wo mere phone mein thi. Do gali door rehti thi." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 7: leaving.
  // --------------------------------------------------------------------
  leaving: [
    { speaker: "Bisma", text: "Achha yaar late ho raha hai, mummy call karegi." },
    { speaker: "Zaeem", text: "Main chhod deta hoon." },
    { speaker: "Bisma", text: "Zaeem it's literally two minutes." },
    { speaker: "Zaeem", text: "Toh two minutes lagenge." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — beat 8: the walk. Two or three minutes, stretched.
  // --------------------------------------------------------------------
  walk_home: [
    { speaker: "Bisma", text: "Tu hamesha itna dheere chalta hai?" },
    { speaker: "Zaeem", text: "Haan. Medical condition hai." },
    { speaker: "Bisma", text: "Jhoot." },
    { speaker: "Zaeem", text: "Haan jhoot hai." },
    { speaker: "Bisma", text: "...ye wali building hai meri." },
    { speaker: "Zaeem", text: "Already?" },
    { speaker: "Bisma", text: "Bola tha na. Two minutes." },
    { speaker: "Zaeem", text: "Bad building. Should've been further." },
    { speaker: "Bisma", text: "Goodnight Zaeem." },
    { speaker: "Zaeem", text: "Goodnight Bisma." }
  ],

  monologue_after: [
    { speaker: "Zaeem (thinking)", text: "..." },
    { speaker: "Zaeem (thinking)", text: "Mera ghar pandrah minute door hai." },
    { speaker: "Zaeem (thinking)", text: "Main chalees lagaunga." }
  ],

  // --------------------------------------------------------------------
  // #EDIT-NARRATION — closing cards over the fade to black.
  // --------------------------------------------------------------------
  narration_end: [
    "Two or three minutes. That's how far she lived. He'd worked the route out in his head before either of them had stood up, and it was still only two or three minutes.",
    "He walked her home anyway. Slowly. Like a man trying to make a short street longer.",
    "Outside Al Broaster King he'd had her name and nothing else at all.",
    "Tonight he had Hedwig's Theme learnt at nine years old, and a small boy's opinion of cats, and the fact that Hamid — Hamid — was somebody's family friend.",
    "He never did bring the painting. She never once asked about it.",
    "He went home the long way, for no reason he'd have admitted to."
  ],

  chapterEndTitle: "END OF CHAPTER 4",
  chapterEndSubtitle: "Two Or Three Minutes."
};
