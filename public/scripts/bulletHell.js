"use strict"

define([
    'd2/scenes/sceneManager',
    'game'
  ], function(SceneManager, Game) {

    const LEVEL = 'LEVEL';

    var BulletHell = function(canvas) {
      SceneManager.call(this, canvas);

      this.registerScene(LEVEL, function(canvas, animator) {
        return new Game(canvas, animator);
      });

      this.setScene(LEVEL);
    };

    BulletHell.prototype = new SceneManager();

    return BulletHell;
});
