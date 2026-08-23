// ============================================================================
// #EDIT-CHAPTERS — the chapter select list.
//
// "scene" must match a key registered in js/main.js.
// "fromBlack" is for chapters that open on a narration card over black
// (2 and 4) rather than fading straight into a scene — the select screen
// sets the fader accordingly so jumping in mid-story looks the same as
// arriving there normally.
//
// Add Chapter 5 here once it exists and it appears in the menu automatically.
// ============================================================================
window.TME = window.TME || {};

TME.CHAPTERS = [
  {
    num: "1",
    scene: "sceneA",
    title: "The Road",
    blurb: "An old friend on the way home, and a name found on a phone that night.",
    fromBlack: false
  },
  {
    num: "2",
    scene: "Ch2_Restaurant",
    title: "Back To The Road",
    blurb: "Al Broaster King, a little after eight. A table across the pavement.",
    fromBlack: true
  },
  {
    num: "3",
    scene: "Ch3_GroupChat",
    title: "Maaf Kiya",
    blurb: "The group chat. A painting, a silence, and a confession meant for someone else.",
    fromBlack: true
  },
  {
    num: "4",
    scene: "Ch4_Cafe",
    title: "Two Or Three Minutes",
    blurb: "Love and Latte, just past nine. And the walk home afterwards.",
    fromBlack: true
  },
  {
    num: "5",
    scene: "Ch5_Flowers",
    title: "Four Flowers",
    blurb: "A flower stall, two bikes, and four choices nobody ever asked him to explain.",
    fromBlack: true
  }
];
