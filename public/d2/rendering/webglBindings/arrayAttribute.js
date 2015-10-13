"use strict";

define(function() {

  const VERTICES_PER_COMPONENT = 6;

  var ArrayAttribute = function(gl, location, componentsPerPoint) {
    this.gl = gl;
    this.location = location;
    this.componentsPerPoint = componentsPerPoint;
    this.buffer = gl.createBuffer();
    this.data = new Float32Array();
  };

  ArrayAttribute.prototype.clear = function(numberComponents) {
    var neededLength = numberComponents
        * VERTICES_PER_COMPONENT
        * this.componentsPerPoint;
    if (this.data.length < neededLength) {
      this.data = new Float32Array(neededLength);
    }
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
      this.location, this.componentsPerPoint, gl.FLOAT, false, 0, 0
    );
    gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);

    return renderState;
  };

  return ArrayAttribute;
});
