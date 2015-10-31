"use strict"

define([
    'd2/scenes/slideShowScene',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'd2/rendering/textureRegion',
    'image!images/splash_text.png'
  ], function(SlideShowScene, Rectangle, Vector, TextureRegion, textImage) {

    var ImageRenderer = function(image, position, scale) {
      this.image = image;
      this.position = position;
      this.scale = scale;
    };

    ImageRenderer.prototype.render = function(renderer) {
      renderer.erase();
      renderer.clear(1);
      renderer.defaultImageRenderer.render(
          this.image, this.position, this.scale);
      renderer.draw(1);
    };

    var SplashScreen = function(canvas, animator, keyboard, nextScreenId) {
      this.nextScreenId = nextScreenId;
      SlideShowScene.call(this, canvas, animator);

      var productionTeamText = new TextureRegion(
        textImage,
        new Rectangle(0, 0, 222, 28),
        new Vector(111, 0)
      );

      var blastInferno = new TextureRegion(
        textImage,
        new Rectangle(0, 33, 160, 28),
        new Vector(80, 0)
      );

      var that = this;
      var center = new Vector(this.width / 2, 200);
      var scale = new Vector(2, 2);

      this.addSlide(new ImageRenderer(productionTeamText, center, scale), 1);
      this.addSlide(new ImageRenderer(blastInferno, center, scale), 1);

      keyboard.registerAction(keyboard.ENTER, this.nextSlide.bind(this));

      this.play();
    };

    SplashScreen.prototype = new SlideShowScene();

    SplashScreen.prototype.triggerNextScene = function() {
      this.nextScene(this.nextScreenId);
    };

    return SplashScreen;
});
