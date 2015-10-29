"use strict"

define([
    'd2/scenes/scene',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'd2/rendering/textureRegion',
    'd2/rendering/defaultRenderer',
    'shaders/defaultShader',
    'image!images/splash_text.png'
  ], function(Scene, Rectangle, Vector, TextureRegion,
        DefaultRenderer, DefaultShader, textImage) {

    var SplashScreen = function(canvas, animator, nextScreenId) {
      Scene.call(this, canvas, animator);

      var shaderProgram = new DefaultShader(this.gl).getProgram();
      this.renderer = new DefaultRenderer(this.gl, shaderProgram);
      this.renderer.setResolution(this.width, this.height);

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

      that.setImage(
          productionTeamText,
          center,
          scale);

      window.setTimeout(function() {
        that.setImage(
          blastInferno,
          center,
          scale);
      }, 1500);

      window.setTimeout(function() {
        that.nextScene(nextScreenId);
      }, 3500);

    };

    SplashScreen.prototype = new Scene();

    SplashScreen.prototype.setImage = function(textureRegion, position, scale) {



      this.renderer.erase();
      this.renderer.clear(1);
      this.renderer.defaultImageRenderer.render(textureRegion,
          this.renderer, position, scale);
      this.renderer.draw(1);
    };

    return SplashScreen;
});
