"use strict"

define([
    'emitters/emitter',
    'emitters/splitter',
    'emitters/rotator',
    'emitters/emitEvent',
    'ships/ship',
    'bullets/blueBullet'
  ], function(Emitter, Splitter, Rotator, EmitEvent, Ship, BlueBullet) {

    const EMIT_RATE     = 1;
    const BULLET_SPEED  = 20;

    var bulletFactory = function(position, velocity, fromTime) {
      var bullet = new BlueBullet(
          position, velocity.scale(BULLET_SPEED));

      bullet.update(fromTime);
      bullet.depth = 0.45;
      bullet.collisionBits = 2;
      this.notifyObservers(new EmitEvent(bullet));
    };

    var DualSprayGunFactory = function() {

    };

    DualSprayGunFactory.prototype.generateEmitter = function() {
      var emitter = new Emitter(EMIT_RATE, bulletFactory);
      emitter.addDecorator(new Splitter(6));//, Math.PI * 0.4));
      return emitter;
    };

    DualSprayGunFactory.prototype.generateGunSet = function() {
      return {
        LEFT_WING_MOUNT: this.generateEmitter(),
        RIGHT_WING_MOUNT: this.generateEmitter().setTime(EMIT_RATE / 2)
      }
    };

    return DualSprayGunFactory;
});
