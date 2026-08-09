// ============================================================================
// EDITABLE CONTENT FOR CHAPTER 3 — "Maaf Kiya"
// A chat-log chapter: no movement, no sprites. The whole chapter is the
// CH3_CHAT array below — the scene walks it one entry per [E] press.
//
// Entry types:
//   { type:"chat",      from:"Bisma", text:"..." }  a chat bubble
//   { type:"narration", text:"..." }                centered narration card
//   { type:"thread",    title:"..." }               relabels the chat header
//
// "from" must match a key in CHAT_PEOPLE below. Anyone flagged self:true
// renders right-aligned in the player's bubble style.
//
// Note: Aarti's confession happens in the GROUP, not a DM — everyone can see
// it. That's what makes the silence afterwards land.
// ============================================================================
window.TME = window.TME || {};

TME.DataCh3 = {

  // --------------------------------------------------------------------
  // #EDIT-CHARACTERS — who can speak, and the color of their name label.
  // Hamid is mentioned in the narration only; he needs no entry.
  // --------------------------------------------------------------------
  CHAT_PEOPLE: {
    "Zaeem":  { color: "#9fd8ff", self: true },
    "Bisma":  { color: "#ff8fb8" },
    "Aarti":  { color: "#f2d18c" },
    "Alisha": { color: "#9be39b" }
  },

  // --------------------------------------------------------------------
  // #EDIT-CHAT-TITLE — the header label for the group thread.
  // --------------------------------------------------------------------
  groupTitle: "GROUP - 4 members",

  // --------------------------------------------------------------------
  // #EDIT-CHAT — the entire chapter, in order. Rewrite freely.
  // --------------------------------------------------------------------
  CH3_CHAT: [

    // ---- beat 1: Alisha decides Zaeem and Aarti are a thing ----------
    { type: "narration", text: "It started because of Alisha. She decided Zaeem and Aarti were a thing before the two of them had said ten words to each other." },
    { type: "chat", from: "Alisha", text: "ZAEEM. aarti. you two would honestly be so cute together" },
    { type: "chat", from: "Aarti",  text: "ALISHA WHAT" },
    { type: "chat", from: "Zaeem",  text: "we would be so cute together" },
    { type: "chat", from: "Aarti",  text: "see. he agrees." },
    { type: "chat", from: "Zaeem",  text: "i agree with everything, it's a personality flaw" },
    { type: "narration", text: "So they flirted. It was easy, and it cost him nothing, and that was exactly the problem — Aarti meant it a little more than he did. He knew that. He kept it somewhere at the back of his head where he didn't have to look at it." },

    // ---- beat 2: him and Bisma, entirely made of insults -------------
    { type: "chat", from: "Zaeem",  text: "bisma why does your dp look like a passport photo from 2011" },
    { type: "chat", from: "Bisma",  text: "ill beat your ass" },
    { type: "chat", from: "Zaeem",  text: "you say that a lot for someone who lives 20 minutes away" },
    { type: "chat", from: "Bisma",  text: "i WILL come to your building" },
    { type: "chat", from: "Bisma",  text: "i will find your flat and i will beat you up in front of your mother" },
    { type: "chat", from: "Aarti",  text: "she means it" },
    { type: "chat", from: "Alisha", text: "she 1000% means it" },
    { type: "chat", from: "Zaeem",  text: "worth it" },
    { type: "narration", text: "All of it was group chat. Every single bit of it. Nobody said any of this out loud, ever, to anybody's face." },

    // ---- beat 3: the paintings, and saying too much ------------------
    { type: "narration", text: "Then one evening everyone started posting their paintings." },
    { type: "chat", from: "Alisha", text: "[image] okay be nice to me" },
    { type: "chat", from: "Aarti",  text: "[image] mine's the sunset one, it's not finished" },
    { type: "chat", from: "Bisma",  text: "[image] still wet. ignore the edges" },
    { type: "chat", from: "Alisha", text: "BISMA the colours" },
    { type: "chat", from: "Zaeem",  text: "the left side's flat" },
    { type: "chat", from: "Zaeem",  text: "and the proportions are off, the whole thing leans. did you even sketch it first or did you just start" },
    { type: "chat", from: "Zaeem",  text: "i'm just being honest" },
    { type: "chat", from: "Aarti",  text: "...bro" },
    { type: "narration", text: "She didn't reply." },

    // ---- beat 4: being ignored --------------------------------------
    { type: "chat", from: "Bisma",  text: "alisha did you finish yours?" },
    { type: "chat", from: "Alisha", text: "almost!! tomorrow i'll send" },
    { type: "chat", from: "Bisma",  text: "aarti the sunset one is my favourite thing you've done" },
    { type: "chat", from: "Zaeem",  text: "bisma" },
    { type: "narration", text: "Nothing. Not angry. Just gone — the specific kind of gone that's worse than angry, where the group keeps moving and you're the only thing in it that stopped." },
    { type: "chat", from: "Zaeem",  text: "bisma" },
    { type: "narration", text: "He'd never been ignored by someone he had only ever typed at. He hadn't expected it to sit in his chest the way it did." },

    // ---- beat 5: the first apology, and the flat forgiveness ---------
    { type: "chat", from: "Zaeem",  text: "okay listen. about the painting" },
    { type: "chat", from: "Zaeem",  text: "i said it like i was doing you a favour and i wasn't. i'm sorry" },
    { type: "chat", from: "Bisma",  text: "ok" },
    { type: "chat", from: "Bisma",  text: "ok maaf kiya" },
    { type: "narration", text: "Two words with nothing behind them. She went straight back to talking to everyone who wasn't him." },

    // ---- beat 6: Bandra, the Burgman, and Aarti in the group ---------
    { type: "narration", text: "A few days later he was in Bandra with Hamid, sitting sideways on the Burgman outside a shop, phone buzzing in his hand." },
    { type: "chat", from: "Aarti",  text: "what are you doing" },
    { type: "chat", from: "Zaeem",  text: "bandra. hamid dragged me out" },
    { type: "chat", from: "Aarti",  text: "without me??" },
    { type: "chat", from: "Aarti",  text: "you'd have more fun with me and you know it" },
    { type: "chat", from: "Zaeem",  text: "debatable" },
    { type: "chat", from: "Aarti",  text: "it's not" },
    { type: "chat", from: "Aarti",  text: "i love you" },
    { type: "narration", text: "There were four people in that group chat. Every one of them could see it." },
    { type: "chat", from: "Zaeem",  text: "😭😭😭" },
    { type: "chat", from: "Zaeem",  text: "aarti no. i don't like you like that, you're a friend. sorry" },
    { type: "chat", from: "Aarti",  text: "IT WAS A JOKE" },
    { type: "chat", from: "Aarti",  text: "obviously it was a joke, why are you like this" },
    { type: "chat", from: "Zaeem",  text: "my bad" },
    { type: "chat", from: "Aarti",  text: "yeah" },
    { type: "narration", text: "Nobody typed for eleven minutes. He watched all three of them come online and go offline again without saying a word." },

    // ---- beat 7: the real apology, and Alisha in his corner ----------
    { type: "narration", text: "He went back to Bisma. Properly, this time." },
    { type: "chat", from: "Zaeem",  text: "i know you said maaf kiya. you didn't mean it and i don't blame you" },
    { type: "chat", from: "Zaeem",  text: "your painting was good. better than anything i could do. i said what i said because i wanted to sound like i knew something, and that's a stupid reason to make someone feel small" },
    { type: "chat", from: "Zaeem",  text: "that's the whole apology. no joke at the end this time" },
    { type: "chat", from: "Alisha", text: "bisma maaf kar de yaar" },
    { type: "chat", from: "Alisha", text: "bohot accha ladka hai, seriously. i'm not just saying it because he's here" },
    { type: "chat", from: "Alisha", text: "ALSO you two would be unreal together but that's a separate conversation" },
    { type: "chat", from: "Zaeem",  text: "alisha." },
    { type: "chat", from: "Alisha", text: "SEPARATE conversation" },
    { type: "chat", from: "Aarti",  text: "she's not wrong though" },

    // ---- beat 8: the ice breaks -------------------------------------
    { type: "narration", text: "Typing. Stopped. Typing again." },
    { type: "chat", from: "Bisma",  text: "it's okay" },
    { type: "chat", from: "Bisma",  text: "the left side WAS flat. i knew it was flat" },
    { type: "chat", from: "Bisma",  text: "i just didn't want it to be you who said it" },
    { type: "chat", from: "Zaeem",  text: "i'm never telling the truth again as long as i live" },
    { type: "chat", from: "Bisma",  text: "good. keep it that way" },

    // ---- beat 9: and then, trouble ----------------------------------
    { type: "chat", from: "Alisha", text: "and just like that" },
    { type: "chat", from: "Bisma",  text: "so are you going to paint one for me or not" },
    { type: "chat", from: "Zaeem",  text: "me. paint. after all that." },
    { type: "chat", from: "Bisma",  text: "i want to watch you be bad at something for once" },
    { type: "chat", from: "Zaeem",  text: "you could've just said you want to see me" },
    { type: "chat", from: "Bisma",  text: "..." },
    { type: "chat", from: "Bisma",  text: "friday. bring the painting" },
    { type: "chat", from: "Zaeem",  text: "SO YOU DO WANT TO SEE ME" },
    { type: "chat", from: "Bisma",  text: "goodnight zaeem" },
    { type: "chat", from: "Zaeem",  text: "goodnight bisma" },
    { type: "chat", from: "Alisha", text: "I KNEW IT" },
    { type: "chat", from: "Aarti",  text: "goodnight to me as well i guess" }
  ],

  // --------------------------------------------------------------------
  // #EDIT-DIALOGUE — end of chapter card
  // --------------------------------------------------------------------
  chapterEndTitle: "END OF CHAPTER 3",
  chapterEndSubtitle: "Friday. Bring The Painting."
};
