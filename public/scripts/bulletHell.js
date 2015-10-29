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
        scene.addObserver(that);
        return scene;
      });

      this.registerScene(SPLASH, function(canvas, animator) {
        var scene = new SplashScreen(canvas, animator, LEVEL);
        scene.addObserver(that);
        return scene;
      });

    };

    return BulletHell;
});
