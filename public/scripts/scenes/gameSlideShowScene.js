"use strict";

define([
    'd2/scenes/slideShowScene',
    'd2/collections/imageBasedActorManager',
    'text/gameText'
  ], function(SlideShowScene, ActorManager, GameText) {

    var TextRenderer = function(text, actorManager, textField, magnification, position) {
      this.text = text;
      this.actorManager = actorManager;
      this.textField = textField;
      this.magnification = magnification || 0;
      this.position = position;
    };

    TextRenderer.prototype.render = function(renderer) {
      this.textField.scale.set(this.magnification, this.magnification);
      if (this.position) {
        this.textField.setPosition(this.position);
      }
      this.textField.setText(this.text);
      this.actorManager.removeIf(function(actor) {
        return !actor.isAlive;
      });
      this.actorManager.renderAll(renderer);
    };

    var GameSlideShowScene = function(canvas, animator, keyboard, nextSceneId) {
      SlideShowScene.call(this, canvas, animator);
      this.nextSceneId = nextSceneId;

      var actorManager = this.actorManager = new ActorManager();
      this.textField = new GameText('', 1, function(letters) {
        letters.forEach(function(letter) {
          actorManager.addActor(letter);
        });
      });

      keyboard.registerAction(keyboard.ENTER, this.nextSlide.bind(this));
    };

    GameSlideShowScene.prototype = Object.create(SlideShowScene.prototype);

    GameSlideShowScene.prototype.addTextSlide = function(
        text, magnification, position, duration) {

      this.addSlide(new TextRenderer(
        text,
        this.actorManager,
        this.textField,
        magnification,
        position
      ), duration);
    };

    GameSlideShowScene.prototype.triggerNextScene = function() {
      this.nextScene(this.nextSceneId);
    };

    return GameSlideShowScene;
});
