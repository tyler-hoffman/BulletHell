"use strict";

define([
    'd2/rendering/renderer',
    'd2/rendering/webglBindings/arrayAttribute',
    'd2/rendering/webglBindings/uniform2d'
  ], function(Renderer, ArrayAttribute, Uniform2d) {

    var DefaultRenderer = function(gl, shaderProgram, width, height) {
      Renderer.call(this, gl, shaderProgram);

      var positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
      var texCoordLocation = gl.getAttribLocation(shaderProgram, 'a_texCoord');
      this.a_position = new ArrayAttribute(gl, positionLocation);
      this.a_texCoord = new ArrayAttribute(gl, texCoordLocation);

      this.addArrayAttribute(this.a_position);
      this.addArrayAttribute(this.a_texCoord);

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
