"use strict";

define([
    'scenes/GameSlideShowScene',
    'd2/collections/imageBasedActorManager',
    'd2/utils/vector',
    'text/gameText'
  ], function(SlideShowScene, ActorManager, Vector, GameText) {

    var LoseScreen = function(canvas, animator, keyboard, nextSceneId) {
      SlideShowScene.call(this, canvas, animator, keyboard, nextSceneId);

      var position = new Vector(100, 400);
      this.addTextSlide('you died...', 3, position, 3);
      this.addTextSlide('which means you lose.', 3, position, 6);

      this.play();
    };

    LoseScreen.prototype = Object.create(SlideShowScene.prototype);

    return LoseScreen;
});
