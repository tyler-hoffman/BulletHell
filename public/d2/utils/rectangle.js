"use strict";

define(['d2/utils/vector'], function(Vector) {

  var tempVectors = [];
  for (var i = 0; i < 4; i++) {
    tempVectors.push(new Vector());
  }

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
    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;
    if (typeof x === 'number') {

        // correct so width and height are non-negative
        if (width < 0) {
          x += width;
          width = -width
        }

        if (height < 0) {
          y += height;
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

  Rectangle.prototype.boundingBox = function(theta, center) {
    if (theta) {
      var cosTheta = Math.cos(theta),
          sinTheta = Math.sin(theta),
          xLeft = this.x - center.x,
          yTop = this.y - center.y;

      var xMin = 0,
          xMax = 0,
          yMin = 0,
          yMax = 0;

      tempVectors[0].set(this.width + xLeft, yTop);
      tempVectors[1].set(this.width + xLeft, this.height + yTop);
      tempVectors[2].set(xLeft, this.height + yTop);
      tempVectors[3].set(xLeft, yTop);

      var t = 3;
      for (var i = 0; i < 4; i++) {
        tempVectors[i].rotate(theta);
        if (tempVectors[i].x < xMin) xMin = tempVectors[i].x;
        if (tempVectors[i].x > xMax) xMax = tempVectors[i].x;
        if (tempVectors[i].y < yMin) yMin = tempVectors[i].y;
        if (tempVectors[i].y > yMax) yMax = tempVectors[i].y;
      }

      this.set(
        center.x + xMin,
        center.y + yMin,
        xMax - xMin,
        yMax - yMin
      );
    }
    return this;
  };

  return Rectangle;

});
