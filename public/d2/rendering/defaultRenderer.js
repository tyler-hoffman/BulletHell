"use strict";

define([
    'd2/rendering/renderer',
    'd2/rendering/webglBindings/uniform2d'
  ], function(Renderer, Uniform2d) {

    var DefaultRenderer = function(gl, shaderProgram, width, height) {
      Renderer.call(this, gl, shaderProgram);


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
