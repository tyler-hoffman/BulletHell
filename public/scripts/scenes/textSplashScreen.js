"use strict";

define([
    'scenes/GameSlideShowScene',
    'd2/collections/imageBasedActorManager',
    'd2/utils/vector',
    'text/gameText'
  ], function(SlideShowScene, ActorManager, Vector, GameText) {

    var TextSplashScreen = function(canvas, animator, keyboard, nextSceneId) {
      SlideShowScene.call(this, canvas, animator, keyboard, nextSceneId);

      var position = new Vector(100, 400);
      this.addTextSlide('Power Cosmic presents', 3, position, 3);
      this.addTextSlide('in association with Blast Force Entertainment', 3, position, 3);
      this.addTextSlide('BLAST INFERNO', 6, position, 3);

      this.play();
    };

    TextSplashScreen.prototype = Object.create(SlideShowScene.prototype);

    return TextSplashScreen;
});
