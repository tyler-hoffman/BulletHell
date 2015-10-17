"use strict"

define(function() {

  var Emission = function(angle, children) {
    this.angle = angle || 0;
    this.isActive = true;
    this.children = children || false;
  };

  Emission.prototype.deepCopy = function() {
    var copy = new Emission(this.angle);

    copy.isActive = this.isActive;

    if (this.children) {
      copy.children = [];
      for (var i = 0; i < this.children.length; i++) {
        copy.children.push(this.children[i].deepCopy());
      }
    };

    return copy;
  };

  return Emission;
});
