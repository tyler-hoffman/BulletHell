"use strict";

define(function() {

  var DefaultActorRenderer = function() {

  };

  DefaultActorRenderer.prototype.render = function(actor, webglBridge, text) {
    var textureRegion = actor.getTextureRegion();

    if (text) {
      //console.log(actor.bounds)
    }

    webglBridge.setImage(textureRegion.image);
    webglBridge.a_position.addData(actor.bounds.float32Array);
    webglBridge.a_texCoord.addData(textureRegion.textureCoordinates.float32Array);
  };

  return DefaultActorRenderer;
});
