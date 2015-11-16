"use strict"

define([
    'emitters/emitter',
    'emitters/emitEvent',
    'ships/ship',
    'bullets/greenBullet'
  ], function(Emitter, EmitEvent, Ship, GreenBullet) {

    const EMIT_RATE     = 0.1;
    const BULLET_SPEED  = 600;

    var bulletFactory = function(position, velocity, fromTime) {
      var bullet = new GreenBullet(
          position, velocity.scale(BULLET_SPEED));

      bullet.update(fromTime);
      bullet.depth = 0.45;
      this.notifyObservers(new EmitEvent(bullet));
    };

    var BasicGunFactory = function() {

    };

    BasicGunFactory.prototype.generateEmitter = function() {
      var emitter = new Emitter(EMIT_RATE, bulletFactory);
      return emitter;
    };

    BasicGunFactory.prototype.generateGunSet = function() {
      return {
        LEFT_WING_MOUNT: this.generateEmitter(),
        RIGHT_WING_MOUNT: this.generateEmitter()
      }
    };

    return BasicGunFactory;
});
