"use strict"

define([
    'd2/utils/animator',
    'd2/scenes/sceneEvent'
  ], function(Animator, SceneEvent) {

  var SceneManager = function(canvas) {
    this.canvas = canvas;

    this.currentScene = null;
    this.sceneGenerators = {};

    this.animator = new Animator(this.onFrame, this);
  };

  SceneManager.prototype.onFrame = function(deltaTime) {
    if (this.currentScene) {
      this.currentScene.onFrame(delta);
    }
  };

  SceneManager.prototype.notify = function(event) {
    switch (event.type) {
      case SceneEvent.CHANGE:
        console.log(event.next);
        this.setScene(event.next);
        break;
    }
  };

  SceneManager.prototype.registerScene = function(id, sceneGenerator) {
    this.sceneGenerators[id] = sceneGenerator;
  };

  SceneManager.prototype.setScene = function(id) {
    this.currentScene = this.sceneGenerators[id](this.canvas);
  };

  return SceneManager;
});
