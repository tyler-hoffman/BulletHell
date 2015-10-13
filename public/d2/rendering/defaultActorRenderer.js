"use strict";

define(function() {

  var buffer = new Float32Array(18);

  var to3d = function(source, destination, depth) {
    var sourceIndex = 0;
    var destinationIndex = 0;

    while (sourceIndex < source.length) {
      destination[destinationIndex++] = source[sourceIndex++];
      destination[destinationIndex++] = source[sourceIndex++];
      destination[destinationIndex++] = depth;
    }
    return destination;
  };

  var DefaultActorRenderer = function() {

  };

  DefaultActorRenderer.prototype.render = function(actor, webglBridge, text) {
    var textureRegion = actor.getTextureRegion();

    to3d(actor.bounds.float32Array, buffer, actor.depth);

    webglBridge.setImage(textureRegion.image);
    webglBridge.a_position.addData(buffer);
    webglBridge.a_texCoord.addData(textureRegion.textureCoordinates.float32Array);
  };

  return DefaultActorRenderer;
});
