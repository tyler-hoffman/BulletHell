"use strict";

define([
    'd2/actors/actor',
    'd2/actors/controllers/physics/velocityController'
  ], function(Actor, VelocityController) {

    var Bullet = function(view, position, velocity, damage, radius) {
      Actor.call(this, view, position);
      this.controller = new VelocityController(this.position, velocity);
      this.damage = damage || 1;
      this.radius = radius || 1;
    };

    Bullet.prototype = new Actor();

    Bullet.prototype.update = function(deltaTime, gameState) {
      Actor.prototype.update.call(this, deltaTime, gameState);

      if (gameState &&
          !gameState.worldBounds.intersectsRectangle(this.boundingBox)) {
        this.isAlive = false;
      }
    };

    return Bullet;
});
