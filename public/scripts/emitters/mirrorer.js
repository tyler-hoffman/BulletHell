"use strict"

define([
    'emitters/emitterDecorator',
    'emitters/emission'
  ], function(EmitterDecorator, Emission) {

    var Mirrorer = function(angle) {
      EmitterDecorator.call(this);

      this.angle = angle || 0;
    };

    Mirrorer.prototype = new EmitterDecorator();

    Mirrorer.prototype.decorateChildren = function(children, parent) {
      var theta = parent.angle - this.angle;

      parent.angle = 0;
      return [
        new Emission(theta, children),
        new Emission(-theta, children)
      ];
    };

    return Mirrorer;
});
