"use strict";

define(function() {

  var Rectangle = function(x, y, width, height) {
    this.float32Array = new Float32Array(12);
    this.set(x, y, width, height);
  };

  Rectangle.prototype.containsRectangle = function(other) {
    return other.x >= this.x
        && other.x + other.width <= this.x + this.width
        && other.y >= this.y
        && other.y + other.height <= this.y + this.height;
  };

  Rectangle.prototype.intersectsRectangle = function(other) {
    return other.x + other.width >= this.x
        && other.x <= this.x + this.width
        && other.y + other.height >= this.y
        && other.y <= this.y + this.height;
  };

  Rectangle.prototype.translate = function(x, y) {
    this.set(this.x + x, this.y + y, width, height);
  };

  Rectangle.prototype.set = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    var x1 = x,
        x2 = x + width,
        y1 = y,
        y2 = y + height;

    var rect = this.float32Array;
    rect[0] = x1; rect[1] = y1;
    rect[2] = x2; rect[3] = y1;
    rect[4] = x1; rect[5] = y2;
    rect[6] = x1; rect[7] = y2;
    rect[8] = x2; rect[9] = y1;
    rect[10] = x2; rect[11] = y2;
  };


  return Rectangle;

});
