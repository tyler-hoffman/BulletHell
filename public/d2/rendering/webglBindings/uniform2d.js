"use strict";

define(function() {

  var Uniform2d = function(location) {
    this.location = location;
    this.x = 0;
    this.y = 0;
  };

  Uniform2d.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  };

  return Uniform2d;
});
