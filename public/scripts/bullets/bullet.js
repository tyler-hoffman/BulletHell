"use strict";

define([
    'd2/actors/actor'
  ], function(Actor) {

    var Bullet = function(view, position, velocity) {
      Actor.call(this, view, position, velocity);
    };

    Bullet.prototype = new Actor();

    Bullet.prototype.update = function(deltaTime, gameState) {
      Actor.prototype.update.call(this, deltaTime, gameState);

      if (!gameState.worldBounds.intersectsRectangle(this.bounds)) {
        this.isAlive = false;
      }
    };

    return Bullet;
});
