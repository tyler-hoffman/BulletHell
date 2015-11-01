"use strict";

define(function() {

  var Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };

  var temp = new Vector();

  Vector.prototype.set = function(x, y) {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y;
    } else {
      // x is other vector
      this.x = x.x;
      this.y = x.y;
    }
    return this;
  };

  Vector.prototype.add = function(x, y) {
    if (typeof x === 'number') {
      this.x += x;
      this.y += y;
    } else {
      // x is other vector
      this.x += x.x;
      this.y += x.y;
    }
    return this;
  };

  Vector.prototype.subtract = function(x, y) {
    if (typeof x === 'number') {
      this.add(-x, -y);
    } else {
      this.add(temp.set(x).negative());
    }
    return this;
  };

  Vector.prototype.negative = function() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  };

  Vector.prototype.multiply = function(other) {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  };

  Vector.prototype.scale = function(amount) {
    this.x *= amount;
    this.y *= amount;
    return this;
  };

  Vector.prototype.normalize = function() {
    if (this.x || this.y) {
      var length = this.length();
      this.x /= length;
      this.y /= length;
    }
    return this;
  };

  Vector.prototype.length = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  };

  Vector.prototype.rotate = function(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    var xTemp = this.x * cosTheta + this.y * sinTheta;
    this.y = - this.x * sinTheta + this.y * cosTheta;

    this.x = xTemp;

    return this;
  };

  Vector.prototype.theta = function() {
    return Math.atan2(-this.y, this.x);
  };

  Vector.prototype.toArray = function() {
    return [this.x, this.y];
  };

  Vector.prototype.clamp = function(minX, minY, maxX, maxY) {
    minX = minX || 0;
    if (typeof minX === 'number') {
      this.x = Math.max(minX, Math.min(maxX || 0, this.x));
      this.y = Math.max(minY, Math.min(maxY || 0, this.y))
    } else {
      /*
       * minX should be min x an y
       * minY should be max x and y
       */
      this.x = Math.max(minX.x, Math.min(minY.x, this.x));
      this.y = Math.max(minX.y, Math.min(minY.y, this.y));
    }
    return this;
  };

  return Vector;
});
