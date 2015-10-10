"use strict";

define(function() {

  var Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  };

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

  return Vector;
});
