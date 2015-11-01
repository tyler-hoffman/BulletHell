"use strict";

define([
    'd2/scenes/slideShowScene',
    'd2/collections/imageBasedActorManager',
    'text/gameText'
  ], function(SlideShowScene, ActorManager, GameText) {

    var TextRenderer = function(text, textField, actorManager, scale) {
      this.text = text;
      this.textField = textField;
      this.actorManager = actorManager;
      this.scale = scale || 0;
    };

    TextRenderer.prototype.render = function(renderer) {
      this.textField.scale.set(this.scale, this.scale);
      this.textField.setText(this.text);
      this.actorManager.removeIf(function(actor) {
        return !actor.isAlive
      });
      this.actorManager.renderAll(renderer);
    };

    var TextSplashScreen = function(canvas, animator, keyboard, nextScreenId) {
      this.nextScreenId = nextScreenId;
      SlideShowScene.call(this, canvas, animator);

      var actorManager = new ActorManager();

      var textField = new GameText('', 2, function(letters) {
        for (var i = 0; i < letters.length; i++) {
          actorManager.addActor(letters[i]);
        }
      });
      textField.setPosition(100, 400);

      this.addSlide(new TextRenderer(
          'Power Cosmic presents',
          textField, actorManager, 3
      ), 3);
      this.addSlide(new TextRenderer(
          'in association with Blast Force Entertainment',
          textField, actorManager, 3
      ), 3);
      this.addSlide(new TextRenderer(
          'BLAST INFERNO',
          textField, actorManager, 6
      ), 5);

      keyboard.registerAction(keyboard.ENTER, this.nextSlide.bind(this));
      this.play();
    };

    TextSplashScreen.prototype = new SlideShowScene();

    TextSplashScreen.prototype.triggerNextScene = function() {
      this.nextScene(this.nextScreenId);
    };

    return TextSplashScreen;
});
