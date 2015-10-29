"use strict";

define([
    'd2/rendering/renderer',
    'd2/rendering/webglBindings/uniform2d',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'd2/utils/float32Rectangle',
    'd2/utils/float32plane'
  ], function(Renderer, Uniform2d, Rectangle, Vector,
        Float32Rectangle, Float32Plane) {

    var vectorBuffer = new Vector();
    var rectangleBuffer = new Float32Rectangle();
    var planeBuffer = new Float32Plane();

    var TextureRegionRenderer = function() {

    };

    TextureRegionRenderer.prototype.render = function(
        textureRegion,
        bounds,
        webglBridge,
        position,
        scale,
        depth) {

      depth = depth || 0.5;

      var positionArray = (position || vectorBuffer.set(0, 0)).toArray(),
          scaleArray = (scale || vectorBuffer.set(1, 1)).toArray();

      webglBridge.setImage(textureRegion.image);

      // set image bounds
      planeBuffer.setRectangle(bounds, depth);
      webglBridge.a_vertex.addData(planeBuffer.points);

      // set position and scaling
      for (var i = 0; i < 6; i++) {
        webglBridge.a_position.addData(positionArray);
        webglBridge.a_scale.addData(scaleArray);
      }

      // set texture coordinates
      rectangleBuffer.set(textureRegion.textureCoordinates);
      webglBridge.a_texCoord.addData(rectangleBuffer.points);
    };

    var DefaultActorRenderer = function() {

    };

    DefaultActorRenderer.prototype.render = function(actor, webglBridge, text) {
      TextureRegionRenderer.prototype.render(
          actor.getTextureRegion(),
          actor.bounds,
          webglBridge,
          actor.position,
          actor.scale,
          actor.depth);
    };

    var ImageRenderer = function() {

    };

    ImageRenderer.prototype.render = function(textureRegion, webglBridge, position, scale, depth) {
      var bounds = new Rectangle()
          .set(textureRegion)
          .translate(-textureRegion.x, -textureRegion.y)
          .translate(-textureRegion.center.x, -textureRegion.center.y);

      TextureRegionRenderer.prototype.render(
        textureRegion,
        bounds,
        webglBridge,
        position,
        scale,
        depth || 0.5
      );
    };

    var DefaultRenderer = function(gl, shaderProgram, width, height) {
      Renderer.call(this, gl, shaderProgram);

      this.defaultImageRenderer = new ImageRenderer();
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
