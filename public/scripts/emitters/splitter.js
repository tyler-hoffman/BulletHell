"use strict"

define([
    'emitters/emitterDecorator',
    'emitters/emission'
  ], function(EmitterDecorator, Emission) {

    var makeCircle = function(numBullets) {
      var delta = Math.PI * 2 / (numBullets + 1);
      return delta * numBullets;
    };

    var Splitter = function(numBullets, spreadAngle) {
      EmitterDecorator.call(this);

      this.numBullets = numBullets;

      // ranged spread
      if (typeof spreadAngle === 'number') {
        this.spreadAngle = spreadAngle;
        this.baseAngle = 0;
      }

      // circle spread
      else {
        var delta = Math.PI * 2 / numBullets;
        this.spreadAngle = delta * (numBullets - 1);
        this.baseAngle = this.spreadAngle / 2;
      }

    };

    Splitter.prototype = new EmitterDecorator();

    Splitter.prototype.decorateChildren = function(children) {
      var start = this.baseAngle - this.spreadAngle / 2,
          delta = this.spreadAngle / (this.numBullets - 1),
          end = start + this.spreadAngle + delta / 2;

      var output = [];
      for (var theta = start; theta <= end; theta += delta) {
        output.push(new Emission(theta, children));
      };
      return output;
    };

    return Splitter;
});
