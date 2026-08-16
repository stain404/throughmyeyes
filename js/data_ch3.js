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
// Note: Aarti's "i like you" lands in the GROUP, not a DM — everybody sees
// it, which is what makes the silence afterwards land.
// ============================================================================
window.TME = window.TME || {};

TME.DataCh3 = {

  // --------------------------------------------------------------------
  // #EDIT-CHARACTERS — who can speak, and the color of their name label.
  // --------------------------------------------------------------------
  CHAT_PEOPLE: {
    "Zaeem":  { color: "#9fd8ff", self: true },
    "Bisma":  { color: "#ff8fb8" },
    "Aarti":  { color: "#f2d18c" },
    "Alisha": { color: "#9be39b" },
    "Arhaan": { color: "#b6a6ff" }
  },

  // #EDIT-CHAT-TITLE
  groupTitle: "GROUP - 5 members",

  // --------------------------------------------------------------------
  // #EDIT-CHAT — the entire chapter, in order. Rewrite freely.
  // --------------------------------------------------------------------
  CH3_CHAT: [

    // ---- beat 1: Alisha decides Zaeem and Aarti are a thing ----------
    { type: "narration", text: "It started because of Alisha. She'd decided Zaeem and Aarti were a thing before the two of them had said ten words to each other." },
    { type: "chat", from: "Alisha", text: "ZAEEM. aarti. you two would be so cute together" },
    { type: "chat", from: "Aarti",  text: "ALISHA WHAT" },
    { type: "chat", from: "Zaeem",  text: "we would be so cute together" },
    { type: "chat", from: "Aarti",  text: "see. he agrees." },
    { type: "narration", text: "So they flirted. It was easy and it cost him nothing, and he never once thought about what it might be costing her." },

    // ---- beat 2: him and Bisma, entirely made of insults -------------
    { type: "chat", from: "Zaeem",  text: "bisma why does your dp look like a passport photo from 2011" },
    { type: "chat", from: "Bisma",  text: "ill beat your ass" },
    { type: "chat", from: "Bisma",  text: "i will come to your building. i will find your flat" },
    { type: "chat", from: "Alisha", text: "she means it" },
    { type: "chat", from: "Zaeem",  text: "worth it" },

    // ---- beat 3: the paintings ---------------------------------------
    { type: "narration", text: "Then one night the four of them started sending paintings." },
    { type: "chat", from: "Alisha", text: "[image] okay be nice to me" },
    { type: "chat", from: "Arhaan", text: "[image] mine's the bike one, still messy" },
    { type: "chat", from: "Alisha", text: "ARHAAN this is so clean what" },
    { type: "chat", from: "Zaeem",  text: "[image] mine. don't zoom in" },
    { type: "chat", from: "Bisma",  text: "[image] iron man" },
    { type: "chat", from: "Bisma",  text: "[image] and these — nose, ears, eyes. just practice sheets" },
    { type: "chat", from: "Alisha", text: "THE IRON MAN" },
    { type: "chat", from: "Arhaan", text: "bro the helmet is insane" },

    // ---- and Zaeem opens his mouth ------------------------------------
    { type: "chat", from: "Zaeem",  text: "iron man's good" },
    { type: "chat", from: "Zaeem",  text: "the face one though. the nose isn't sitting on the face, it's floating on top of it" },
    { type: "chat", from: "Zaeem",  text: "and the ears are at two different heights. eyes are the only decent part and even those don't match each other" },
    { type: "chat", from: "Arhaan", text: "...bro" },
    { type: "chat", from: "Bisma",  text: "wow" },
    { type: "chat", from: "Bisma",  text: "thanks for the feedback" },
    { type: "chat", from: "Bisma",  text: "genuinely. so helpful." },
    { type: "chat", from: "Zaeem",  text: "i'm just being honest" },
    { type: "chat", from: "Bisma",  text: "yeah. i can tell." },
    { type: "narration", text: "That was the last thing she said to him for a while." },

    // ---- beat 4: being ignored ---------------------------------------
    { type: "chat", from: "Bisma",  text: "alisha did you finish yours?" },
    { type: "chat", from: "Alisha", text: "almost!! kal bhejti hoon" },
    { type: "chat", from: "Bisma",  text: "arhaan send the bike one again, properly this time" },
    { type: "chat", from: "Zaeem",  text: "bisma" },
    { type: "narration", text: "Nothing. Not angry — gone. The group kept moving and he was the only thing in it that had stopped." },

    // ---- beat 5: Aarti, in the group, in front of everyone -----------
    { type: "narration", text: "Two days later he was out in Bandra with a friend, phone buzzing in his pocket the whole evening." },
    { type: "chat", from: "Aarti",  text: "zaeem" },
    { type: "chat", from: "Aarti",  text: "i like you zaeem" },
    { type: "narration", text: "Five people in that chat. Every one of them could see it." },
    { type: "chat", from: "Zaeem",  text: "aarti bro this is all a joke na" },
    { type: "chat", from: "Zaeem",  text: "we're not taking this seriously. you know that right" },
    { type: "chat", from: "Aarti",  text: "hahaha yes obviously" },
    { type: "chat", from: "Aarti",  text: "i know i know. i have a bf also, i was just messing around" },
    { type: "chat", from: "Aarti",  text: "you took it so seriously lmao" },
    { type: "chat", from: "Zaeem",  text: "haha yeah my bad" },
    { type: "narration", text: "Nobody typed for a long time after that. Everybody had read it, and everybody pretended they hadn't." },

    // ---- beat 6: she comes online, and he starts apologising ----------
    { type: "narration", text: "Then Bisma came online." },
    { type: "chat", from: "Zaeem",  text: "bisma" },
    { type: "chat", from: "Zaeem",  text: "i'm sorry about the painting thing" },
    { type: "chat", from: "Zaeem",  text: "i know you're seeing this" },
    { type: "chat", from: "Zaeem",  text: "the face one was practice. you said practice. i talked about it like it was a finished piece and that's on me" },
    { type: "chat", from: "Zaeem",  text: "bisma please yaar" },
    { type: "chat", from: "Zaeem",  text: "the iron man was genuinely incredible and i didn't even say it. i went straight to the thing i could tear apart" },
    { type: "chat", from: "Zaeem",  text: "i'm sorry. properly. no joke at the end this time" },
    { type: "narration", text: "He apologised more times than he would ever want written down anywhere." },
    { type: "chat", from: "Bisma",  text: "okay" },
    { type: "chat", from: "Bisma",  text: "okay. maaf kiya." },
    { type: "chat", from: "Bisma",  text: "the ears WERE at two different heights though" },
    { type: "chat", from: "Zaeem",  text: "i am never being honest again as long as i live" },
    { type: "chat", from: "Bisma",  text: "good. keep it that way" },

    // ---- beat 7: Alisha, immediately, with zero shame ----------------
    { type: "chat", from: "Alisha", text: "OMG" },
    { type: "chat", from: "Alisha", text: "i ship. i ship bisma zaeem. i'm saying it, i'm the one saying it" },
    { type: "chat", from: "Alisha", text: "zaeem dekho, maan gayi!!" },
    { type: "chat", from: "Alisha", text: "bisma mera bhai bohot accha hai seriously, main jhoot nahi bol rahi" },
    { type: "chat", from: "Alisha", text: "zaeem abhi rulana mat usko" },
    { type: "chat", from: "Zaeem",  text: "alisha." },
    { type: "chat", from: "Alisha", text: "WHAT" },
    { type: "chat", from: "Arhaan", text: "she's not wrong though" },
    { type: "chat", from: "Aarti",  text: "she's never wrong. that's the whole problem with her" },

    // ---- beat 8: goodnight -------------------------------------------
    { type: "chat", from: "Bisma",  text: "achha main sone jaa rahi hoon" },
    { type: "chat", from: "Bisma",  text: "goooddnightttt zaeeem" },
    { type: "chat", from: "Zaeem",  text: "goodnight bisma" },
    { type: "chat", from: "Bisma",  text: "aur haan" },
    { type: "chat", from: "Bisma",  text: "next time bolne se pehle thoda soch lena" },
    { type: "chat", from: "Zaeem",  text: "kabhi nahi" },
    { type: "chat", from: "Alisha", text: "I SHIP" }
  ],

  // #EDIT-DIALOGUE — end of chapter card
  chapterEndTitle: "END OF CHAPTER 3",
  chapterEndSubtitle: "Maaf Kiya."
};
