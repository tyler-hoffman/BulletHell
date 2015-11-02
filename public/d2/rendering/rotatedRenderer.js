"use strict";

define([
    'd2/rendering/renderer',
    'd2/rendering/webglBindings/arrayAttribute',
    'd2/rendering/webglBindings/uniform2d',
    'd2/utils/float32Plane',
    'd2/utils/float32Rectangle'
  ], function(Renderer, ArrayAttribute, Uniform2d, Float32Plane, Float32Rectangle) {

    var rectangleBuffer = new Float32Rectangle(),
        planeBuffer = new Float32Plane();

    var RotatedActorRenderer = function(webglBridge) {
      this.webglBridge = webglBridge;
    };

    RotatedActorRenderer.prototype.render = function(actor) {
      var textureRegion = actor.getTextureRegion(),
          webglBridge = this.webglBridge,
          bounds = actor.bounds;

      planeBuffer.setRectangle(bounds, actor.depth);

      var position = actor.position.toArray(),
          scale = actor.scale.toArray(),
          rotation = [Math.cos(actor.rotation), Math.sin(actor.rotation)];

      webglBridge.setImage(textureRegion.image);
      webglBridge.a_vertex.addData(planeBuffer.points);

      for (var i = 0; i < 6; i++) {
        webglBridge.a_position.addData(position);
        webglBridge.a_scale.addData(scale);
        webglBridge.a_rotation.addData(rotation);
      }
      
      // set texture coordinates
      rectangleBuffer.set(textureRegion.textureCoordinates);
      webglBridge.a_texCoord.addData(rectangleBuffer.points);
    };

    var RotatedRenderer = function(gl, shaderProgram, width, height) {
      Renderer.call(this, gl, shaderProgram);

      this.defaultActorRenderer = new RotatedActorRenderer(this);

      var vertexLocation = gl.getAttribLocation(shaderProgram, 'a_vertex');
      var texCoordLocation = gl.getAttribLocation(shaderProgram, 'a_texCoord');
      var positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
      var scaleLocation = gl.getAttribLocation(shaderProgram, 'a_scale');
      var rotationLocation = gl.getAttribLocation(shaderProgram, 'a_rotation');
      this.a_vertex = new ArrayAttribute(gl, vertexLocation, 3);
      this.a_texCoord = new ArrayAttribute(gl, texCoordLocation, 2);
      this.a_position = new ArrayAttribute(gl, positionLocation, 2);
      this.a_scale = new ArrayAttribute(gl, scaleLocation, 2);
      this.a_rotation = new ArrayAttribute(gl, rotationLocation, 2);

      this.addArrayAttribute(this.a_vertex);
      this.addArrayAttribute(this.a_texCoord);
      this.addArrayAttribute(this.a_position);
      this.addArrayAttribute(this.a_scale);
      this.addArrayAttribute(this.a_rotation);

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

    RotatedRenderer.prototype = new Renderer();

    RotatedRenderer.prototype.setResolution = function(width, height) {
      this.u_resolution.set(width, height)
    };

    return RotatedRenderer;
});
