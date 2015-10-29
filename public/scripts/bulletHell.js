"use strict"

define([
    'd2/scenes/sceneManager',
    'game'
  ], function(SceneManager, Game) {

    const LEVEL = 'LEVEL',
          SPLASH = 'SPLASH';

    var BulletHell = function(canvas) {
      SceneManager.call(this, canvas);

      this.registerSceneGenerators();

      this.setScene(LEVEL);
    };

    BulletHell.prototype = new SceneManager();

    BulletHell.prototype.registerSceneGenerators = function() {
      this.registerScene(LEVEL, function(canvas, animator) {
        return new Game(canvas, animator);
      });
    };

    return BulletHell;
});
