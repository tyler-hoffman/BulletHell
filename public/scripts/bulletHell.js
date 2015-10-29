"use strict"

define([
    'd2/scenes/sceneManager',
    'game'
  ], function(SceneManager, Game) {

    const LEVEL = 'LEVEL';

    var BulletHell = function(canvas) {
      SceneManager.call(this, canvas);

      this.registerScene(LEVEL, function(canvas) {
        return new Game(canvas);
      });

      this.setScene(LEVEL);
    };

    BulletHell.prototype = new SceneManager();

    return BulletHell;
});
