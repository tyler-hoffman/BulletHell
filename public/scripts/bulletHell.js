"use strict"

define([
    'd2/scenes/sceneManager',
    'scenes/splashScreen',
    'game'
  ], function(SceneManager, SplashScreen, Game) {

    const LEVEL = 'LEVEL',
          SPLASH = 'SPLASH';

    var BulletHell = function(canvas) {
      SceneManager.call(this, canvas);
      this.registerSceneGenerators();

      this.setScene(SPLASH);
    };

    BulletHell.prototype = new SceneManager();

    BulletHell.prototype.registerSceneGenerators = function() {

      var that = this;
      this.registerScene(LEVEL, function(canvas, animator) {
        var scene = new Game(canvas, animator);
        return scene;
      });

      this.registerScene(SPLASH, function(canvas, animator) {
        var scene = new SplashScreen(canvas, animator, LEVEL);
        return scene;
      });

    };

    return BulletHell;
});
