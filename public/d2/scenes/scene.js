"use strict"

define([
    'd2/actors/observable',
    'd2/scenes/sceneEvent'
  ], function(Observable, SceneEvent) {

    var Scene = function(canvas) {
      Observable.call(this);

      this.canvas = canvas;
      this.width = canvase.width;
      this.height = canvas.height;
      this.gl = canvas.getContext('webgl');
    };

    Scene.prototype = new Observable();

    Scene.prototype.nextScene = function(sceneId) {
      this.notifyObservers(SceneEvent.generateChangeEvent(sceneId));
    };

    return Scene;
});
