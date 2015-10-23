"use strict";

define([
    'd2/rendering/renderer',
    'd2/rendering/webglBindings/uniform2d',
    'd2/utils/plane'
  ], function(Renderer, Uniform2d, Plane) {

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

      var position = actor.position.toArray(),
          scale = actor.scale.toArray();

      webglBridge.setImage(textureRegion.image);
      webglBridge.a_vertex.addData(planeBuffer.points);

      for (var i = 0; i < 6; i++) {
        webglBridge.a_position.addData(position);
        webglBridge.a_scale.addData(scale);
      }

      webglBridge.a_texCoord.addData(textureRegion.textureCoordinates.float32Array);
    };

    var DefaultRenderer = function(gl, shaderProgram, width, height) {
      Renderer.call(this, gl, shaderProgram);

      this.defaultActorRenderer = new DefaultActorRenderer();

      this.a_vertex = this.createArrayAttribute(gl, 'a_vertex', 3);
      this.a_texCoord = this.createArrayAttribute(gl, 'a_texCoord', 2);
      this.a_position = this.createArrayAttribute(gl, 'a_position', 2);
      this.a_scale = this.createArrayAttribute(gl, 'a_scale', 2);

      this.addArrayAttribute(this.a_vertex);
      this.addArrayAttribute(this.a_texCoord);
      this.addArrayAttribute(this.a_position);
      this.addArrayAttribute(this.a_scale);

      var resolutionLocation = gl.getUniformLocation(shaderProgram, 'u_resolution');
      var offsetLocation = gl.getUniformLocation(shaderProgram, 'u_offset');
      var magnificationLocation = gl.getUniformLocation(shaderProgram, 'u_magnification');

      this.u_resolution = new Uniform2d(resolutionLocation);
      this.u_offset = new Uniform2d(offsetLocation);
      this.u_magnification = new Uniform2d(magnificationLocation);

      this.addUniform2d(this.u_resolution);
      this.addUniform2d(this.u_offset);
      this.addUniform2d(this.u_magnification);

      this.u_offset.set(0, 0);
      this.u_magnification.set(1, 1);

      this.setResolution(width, height);
    };

    DefaultRenderer.prototype = new Renderer();

    DefaultRenderer.prototype.setResolution = function(width, height) {
      this.u_resolution.set(width, height)
    };

    return DefaultRenderer;
});
