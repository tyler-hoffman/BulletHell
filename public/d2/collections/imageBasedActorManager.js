"use strict"

define(['d2/collections/actorManager'], function(ActorManager) {

  var ImageBasedActorManager = function() {
    ActorManager.call(this, function(actor) {
      return actor.getTextureRegion().image.src;
    });
  };

  ImageBasedActorManager.prototype = new ActorManager();

  return ImageBasedActorManager;
});
