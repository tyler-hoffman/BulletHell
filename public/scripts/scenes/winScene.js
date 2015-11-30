"use strict";

define([
    'scenes/GameSlideShowScene',
    'd2/collections/imageBasedActorManager',
    'd2/utils/vector',
    'text/gameText'
  ], function(SlideShowScene, ActorManager, Vector, GameText) {

    var WinScreen = function(canvas, animator, keyboard, nextSceneId) {
      SlideShowScene.call(this, canvas, animator, keyboard, nextSceneId);

      var position = new Vector(100, 400);
      this.addTextSlide('you won!', 3, position, 3);

      this.play();
    };

    WinScreen.prototype = Object.create(SlideShowScene.prototype);

    return WinScreen;
});
