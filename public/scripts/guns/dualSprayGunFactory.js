"use strict"

define([
    'emitters/emitter',
    'emitters/splitter',
    'emitters/rotator',
    'emitters/emitEvent',
    'ships/ship',
    'bullets/greenBullet'
  ], function(Emitter, Splitter, Rotator, EmitEvent, Ship, GreenBullet) {

    const EMIT_RATE     = 0.4;
    const BULLET_SPEED  = 200;

    var bulletFactory = function(position, velocity, fromTime) {
      var bullet = new GreenBullet(
          position, velocity.scale(BULLET_SPEED));

      bullet.update(fromTime);
      bullet.depth = 0.45;
      this.notifyObservers(new EmitEvent(bullet));
    };

    var DualSprayGunFactory = function() {

    };

    DualSprayGunFactory.prototype.generateEmitter = function(offset) {
      var emitter = new Emitter(EMIT_RATE, bulletFactory);
      emitter.addDecorator(new Splitter(2, Math.PI / 8));
      emitter.addDecorator(new Rotator(0, offset));
      return emitter;
    };

    DualSprayGunFactory.prototype.generateGunSet = function() {
      return {
        LEFT_WING_MOUNT: this.generateEmitter(- Math.PI / 16),
        RIGHT_WING_MOUNT: this.generateEmitter(Math.PI / 16)
      }
    };

    return DualSprayGunFactory;
});
