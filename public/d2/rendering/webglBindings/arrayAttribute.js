"use strict";

define(function() {

  const VERTICES_PER_COMPONENT = 6;

  var ArrayAttribute = function(gl, location) {
    this.gl = gl;
    this.location = location;
    this.buffer = gl.createBuffer();
  };

  ArrayAttribute.prototype.clear = function(numberComponents) {
    this.data = new Float32Array(numberComponents * VERTICES_PER_COMPONENT * 2);
    this.numData = 0;
  };

  ArrayAttribute.prototype.addData = function(data) {
    for (var i = 0; i < data.length; i++) {
      this.data[this.numData++] = data[i];
    }
  };

  ArrayAttribute.prototype.bind = function(renderState) {
    var gl = this.gl;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.enableVertexAttribArray(this.location);
    gl.vertexAttribPointer(
      this.location, 2, gl.FLOAT, false, 0, 0
    );
    gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);

    return renderState;
  };

  return ArrayAttribute;
});
