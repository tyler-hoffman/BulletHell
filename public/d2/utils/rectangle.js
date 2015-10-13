"use strict";

define(function() {

  var rotate

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
    if (typeof x === 'number') {

      // correct so width and height are non-negative
      if (width < 0) {
        x -= width;
        width = -width
      }

      if (height < 0) {
        y -= height;
        height = -height;
      }

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

    } else if (x === undefined) {

      // not all parameters passed
      return this.set(x || 0, y || 0, width || 0, height || 0);

    } else {

      // x is rectangle
      return this.set(x.x, x.y, x.width, x.height);

    }

    return this;
  };

  Rectangle.prototype.rotate = function(theta, center) {
    var cosTheta = Math.cos(theta),
        sinTheta = Math.sin(theta),
        xLeft = this.x - center.x,
        yTop = this.y - center.y;

    this.set(
      center.x + cosTheta * xLeft + sinTheta * yTop,
      center.y + sinTheta * xLeft + cosTheta * yTop,
      cosTheta * this.width + sinTheta * this.height,
      sinTheta * this.width + cosTheta * this.height
    );
    return this;
  };

  return Rectangle;

});
