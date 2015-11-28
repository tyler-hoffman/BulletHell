"use strict"

define([
    'd2/scenes/sceneManager',
    'controls/keyboardController',
    'scenes/textSplashScreen',
    'scenes/menuScreen',
    'scenes/gameplayScreen',
    'scenes/loseScene'
  ], function(SceneManager, KeyboardController, SplashScreen,
        MenuScreen, GameplayScreen, LoseScreen) {

    const PLAY = 'PLAY',
          SPLASH = 'SPLASH',
          MENU = 'MENU',
          OPTIONS = 'OPTIONS',
          BACK = 'BACK',
          WIN = 'WIN',
          LOSE = 'LOSE';

    var BulletHell = function(canvas) {
      SceneManager.call(this, canvas);

      this.keyboardController = new KeyboardController();
      this.registerSceneGenerators();
      this.setScene(SPLASH);
    };

    BulletHell.prototype = new SceneManager();

    BulletHell.prototype.registerSceneGenerators = function() {

      var keyboardController = this.keyboardController;
      this.registerScene(PLAY, function(canvas, animator) {
        return new GameplayScreen(
          canvas, animator, keyboardController,
          WIN, LOSE
        );
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


      this.registerScene(OPTIONS, function(canvas, animator) {
        console.log('TODO: Implement options screen')
      });

      this.registerScene(LOSE, function(canvas, animator) {
        return new LoseScreen(canvas, animator, keyboardController, MENU);
      });

    };

    BulletHell.prototype.setScene = function(id) {
      this.keyboardController.unregisterAllActions();
      SceneManager.prototype.setScene.call(this, id);
    };

    return BulletHell;
});
