"use strict"

define(['emitters/emission'], function(Emission) {

  var makeCircle = function(numBullets) {
    var delta = Math.PI * 2 / (numBullets + 1);
    return delta * numBullets;
  };

  var Spreader = function(numBullets, spreadAngle) {
    this.numBullets = numBullets;

    if (typeof spreadAngle === 'number') {
      this.spreadAngle = spreadAngle;
      this.baseAngle = 0;
    } else {
      var delta = Math.PI * 2 / numBullets;
      this.spreadAngle = delta * (numBullets - 1);
      this.baseAngle = this.spreadAngle / 2;
    }
  };

  Spreader.prototype.decorate = function(emission) {
    var start = this.baseAngle - this.spreadAngle / 2,
        delta = this.spreadAngle / (this.numBullets - 1),
        end = start + this.spreadAngle + delta / 2,
        children = emission.children;

    emission.children = [];
    for (var theta = start; theta <= end; theta += delta) {
      emission.children.push(new Emission(theta, children));
    };

  };

  return Spreader;
});
