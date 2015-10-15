"use strict";

define(['d2/utils/plane'], function(Plane) {

  var planeBuffer = new Plane();

  var DefaultActorRenderer = function() {

  };

  DefaultActorRenderer.prototype.render = function(actor, webglBridge, text) {
    var textureRegion = actor.getTextureRegion();

    var bounds = actor.bounds;
    planeBuffer.setRectangle(
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height,
      actor.depth
    );

    webglBridge.setImage(textureRegion.image);
    webglBridge.a_position.addData(planeBuffer.points);
    webglBridge.a_texCoord.addData(textureRegion.textureCoordinates.float32Array);
  };

  return DefaultActorRenderer;
});
