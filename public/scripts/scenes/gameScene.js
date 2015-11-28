"use strict"

define([
    'd2/scenes/scene',
    'text/gameText'
  ], function(Scene, GameText) {

  var GameScene = function(canvas, animator, actorManager) {
    Scene.call(this, canvas, animator);

    this.actorManager = actorManager;
    this.textFields = [];
  };

  GameScene.prototype = Object.create(Scene.prototype);

  GameScene.prototype.getActorManager = function() {
    return this.actorManager;
  };

  GameScene.prototype.addText = function(text, magnification, position, duration) {
    var actorManager = this.actorManager;
    var newText = new GameText(text, magnification, function(letters) {
      letters.forEach(function(letter) {
        actorManager.addActor(letter);
      })
    }, position, duration);

    var textFields = this.textFields;
    textFields.push(newText);
    newText.addObserver(function() {
      textFields.splice(textFields.indexOf(newText), 1);
    });
    newText.depth = 0.2;
    return newText;
  };


  return GameScene;
});
