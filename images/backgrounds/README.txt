Scene backgrounds are currently drawn as flat colored shapes directly in
code, clearly marked so they're easy to find and swap:

  js/scenes/sceneA_road.js  -> look for "#EDIT-BACKGROUND" in _drawBackground()
  js/scenes/sceneB_home.js  -> look for "#EDIT-BACKGROUND" in _drawBackground()

To use real art: put an image file in this folder (e.g. road_bg.png,
home_bg.png), load it the same way js/sprite.js loads a spritesheet
(`new Image(); img.src = "images/backgrounds/road_bg.png";`), and replace
the body of _drawBackground() with a single ctx.drawImage(img, 0, 0, W, H)
once the image has loaded.
