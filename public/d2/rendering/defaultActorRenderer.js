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

    var position = actor.position.toArray();

    webglBridge.setImage(textureRegion.image);
    webglBridge.a_vertex.addData(planeBuffer.points);

    for (var i = 0; i < 6; i++) {
      webglBridge.a_position.addData(position);
    }

    webglBridge.a_texCoord.addData(textureRegion.textureCoordinates.float32Array);
  };

  return DefaultActorRenderer;
});
