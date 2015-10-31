"use strict"

define([
    'd2/actors/observable',
    'd2/scenes/sceneEvent'
  ], function(Observable, SceneEvent) {

    var Scene = function(canvas, animator) {
      Observable.call(this);

      this.animator = animator;

      if (canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.gl = canvas.getContext('webgl');
      }
    };

    Scene.prototype = new Observable();

    Scene.prototype.play = function() {
      this.animator.start();
    };

    Scene.prototype.stop = function() {
      this.animator.stop();
    };

    Scene.prototype.togglePlaying = function() {
      this.animator.toggle();
    };

    Scene.prototype.nextScene = function(sceneId) {
      this.notifyObservers(SceneEvent.generateChangeEvent(sceneId));
    };

    return Scene;
});
