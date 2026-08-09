Drop the two character sprite sheets here:

  zaeem_spritesheet.png
  samaara_spritesheet.png

Each should be a grid of frames, one row per animation, one column per
frame. The default assumption (see #EDIT-SPRITESHEETS in js/data.js) is:

  64x64 px per frame, 6 columns, 6 rows, laid out as:
    row 0: idle          (4 frames used)
    row 1: walk-down     (6 frames used)
    row 2: walk-up       (6 frames used)
    row 3: walk-left     (6 frames used)
    row 4: walk-right    (6 frames used)
    row 5: talk          (4 frames used)

If your actual sheet uses different frame dimensions, a different number of
columns/rows, or animations in a different order, just edit the
ZAEEM_SHEET / SAMAARA_SHEET objects in js/data.js to match — nothing else
in the code needs to change.

Until these files exist, each character renders as a simple colored
rectangle that still bobs while walking and blips while talking, so the
game is fully playable without them.

See also:
  images/backgrounds/README.txt — scene background art
  images/avatars/README.txt     — Instagram-mockup profile photos
