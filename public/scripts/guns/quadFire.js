"use strict"

define([
    'emitters/emitter',
    'emitters/rotator',
    'emitters/emitEvent',
    'ships/ship',
    'bullets/blueBullet'
  ], function(Emitter, Rotator, EmitEvent, Ship, BlueBullet) {

    const EMIT_RATE     = 0.6;
    const BULLET_SPEED  = 160;

    var bulletFactory = function(position, velocity, fromTime) {
      var bullet = new BlueBullet(
          position, velocity.scale(BULLET_SPEED));

      bullet.update(fromTime);
      bullet.depth = 0.45;
      bullet.collisionBits = 2;
      this.notifyObservers(new EmitEvent(bullet));
    };

    var QuadFireGunFactory = function() {

    };

    QuadFireGunFactory.prototype.generateEmitter = function(angle) {
      var emitter = new Emitter(EMIT_RATE, bulletFactory);
      emitter.addDecorator(new Rotator(0, (angle || 0) + Math.PI / 2));
      return emitter;
    };

    QuadFireGunFactory.prototype.generateGunSet = function() {
      return {
        TOP_WING_MOUNT: this.generateEmitter(- Math.PI / 2),
        RIGHT_WING_MOUNT: this.generateEmitter(),
        DOWN_WING_MOUNT: this.generateEmitter(Math.PI / 2),
        LEFT_WING_MOUNT: this.generateEmitter(Math.PI)
      }
    };

    return QuadFireGunFactory;
});
