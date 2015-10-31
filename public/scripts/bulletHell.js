"use strict"

define([
    'd2/scenes/sceneManager',
    'scenes/textSplashScreen',
    'scenes/menuScreen',
    'controls/keyboardController',
    'game'
  ], function(SceneManager, SplashScreen, MenuScreen, KeyboardController, Game) {

    const LEVEL = 'LEVEL',
          SPLASH = 'SPLASH',
          MENU = 'MENU';

    var BulletHell = function(canvas) {
      SceneManager.call(this, canvas);

      this.keyboardController = new KeyboardController();
      this.registerSceneGenerators();
      this.setScene(SPLASH);
    };

    BulletHell.prototype = new SceneManager();

    BulletHell.prototype.registerSceneGenerators = function() {

      var keyboardController = this.keyboardController;
      this.registerScene(LEVEL, function(canvas, animator) {
        return new Game(canvas, animator, keyboardController);
      });

      this.registerScene(SPLASH, function(canvas, animator) {
        return new SplashScreen(
            canvas,
            animator,
            keyboardController,
            MENU);
      });

      this.registerScene(MENU, function(canvas, animator) {
        return new MenuScreen(
            canvas,
            animator,
            keyboardController);
      });

    };

    return BulletHell;
});
