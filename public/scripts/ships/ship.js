"use strict";

define([
    'd2/actors/actor'
  ], function(Actor) {

    var Ship = function(view, position, emitters, controller) {
      Actor.call(this, view, position);
      this.emitters = emitters || [];
      this.controller = controller;
    };

    Ship.prototype = new Actor();

    Ship.prototype.update = function(deltaTime) {
      deltaTime = deltaTime || 0;
      Actor.prototype.update.call(this, deltaTime);

      this.emitters.forEach(function(emitter) {
        emitter.setAngle(this.rotation - Math.PI / 2);
        emitter.update(deltaTime);
      });
    };

    return Ship;
});
