# Through My Eyes

A short browser game. Four chapters, told from one side of a story that took about two years to happen.

No build tools, no dependencies, no install. Open `index.html`.

## Play

Open `index.html` in any modern browser, or serve the folder:

```
python -m http.server 8000
```

then go to `http://localhost:8000`.

## Controls

| Key | Action |
| --- | --- |
| `E` / `Space` / `Enter` | Advance dialogue, narration and chat |
| `W A S D` / arrow keys | Walk (Chapter 1, home scene only) |
| `↑` `↓` + `E` | Navigate the phone's following list |
| `Esc` | Close a phone overlay |
| Any key | Continue past an end-of-chapter card |

## Chapters

1. **The Road / Home** — a street, an old friend, and a name found on a phone late at night.
2. **Back To The Road** — Al Broaster King, Millat Nagar. Watching a table across the pavement.
3. **Maaf Kiya** — the group chat. A painting, a silence, a confession meant for someone else.
4. **Two Or Three Minutes** — Love and Latte, a small boy borrowing a phone, and the walk home.

## How it's built

Plain HTML, CSS and hand-written canvas 2D — no engine, no framework, no bundler.

```
index.html          markup + script load order
style.css           all UI (dialogue box, phone overlays, chat log, end cards)
js/
  sprite.js         sprite sheets + the procedural placeholder character
  dialogue.js       shared dialogue box (speech / thought modes)
  fader.js          scene transitions, and the narration cards held over black
  sceneManager.js   scene registration and switching
  phoneUI.js        phone notification + Instagram-style overlays
  endCard.js        end-of-chapter cards
  data*.js          all writing, one file per chapter
  scenes/           one file per scene
```

### Editing the writing

Every line of dialogue, monologue and narration lives in the `js/data*.js` files,
marked with `#EDIT-` comments. Nothing in `js/scenes/` needs touching to rewrite a
chapter's text.

### Art

All characters and backgrounds are currently **procedurally drawn placeholders** —
no image files. Characters are built on a 16×22 pixel grid at runtime, with walk,
talk, back-turned and slumped poses, plus an `outfit` option for an abaya.

Points where real art should replace the placeholders are marked in the source with
`SWAP REAL SPRITES HERE` and `SWAP REAL TILESET HERE`. Drop a real sheet into
`images/` and update the matching entry in the chapter's data file — the placeholder
renderer switches itself off as soon as a sheet loads.
