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

      var productionTeamTextBounds = new Rectangle(0, 0, 230, 28);
      var blastInfernoBounds = new Rectangle(0, 0, 160, 28);

      var productionTeamText = new TextureRegion(
        textImage,
        productionTeamTextBounds
      );

      var blastInferno = new TextureRegion(
        textImage,
        new Rectangle(blastInfernoBounds).translate(0, 33)
      );

      var that = this;
      var center = new Vector(this.width / 2, 200);

      that.setImage(
          productionTeamText,
          productionTeamTextBounds,
          new Vector().set(center).add(-115, 0));

      window.setTimeout(function() {
        that.setImage(
          blastInferno,
          blastInfernoBounds,
          new Vector().set(center).add(-80, 0));
      }, 1500);

      window.setTimeout(function() {
        that.nextScene(nextScreenId);
      }, 3500);

    };

    SplashScreen.prototype = new Scene();

    SplashScreen.prototype.setImage = function(textureRegion, bounds, position, scale) {
      this.renderer.erase();
      this.renderer.clear(1);
      this.renderer.defaultImageRenderer.render(textureRegion,
          bounds, this.renderer, position, scale);
      this.renderer.draw(1);
    };

    return SplashScreen;
});
