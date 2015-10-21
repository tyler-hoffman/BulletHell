"use strict"

define([
    'emitters/emitter',
    'emitters/splitter',
    'emitters/rotator',
    'emitters/emitEvent',
    'ships/ship',
    'bullets/greenBullet'
  ], function(Emitter, Splitter, Rotator, EmitEvent, Ship, GreenBullet) {

    const EMIT_RATE     = 0.1;
    const BULLET_SPEED  = 600;

    var bulletFactory = function(position, velocity, fromTime) {
      var bullet = new GreenBullet(
          position, velocity.scale(BULLET_SPEED));

      bullet.update(fromTime);
      bullet.depth = 0.45;
      bullet.collisionBits = 2;
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

    var LEFT_WING_MOUNT   = Ship.prototype.LEFT_WING_MOUNT,
        LEFT_MID_MOUNT    = Ship.prototype.LEFT_MID_MOUNT,
        CENTER_MOUNT      = Ship.prototype.CENTER_MOUNT,
        RIGHT_MID_MOUNT   = Ship.prototype.RIGHT_MID_MOUNT,
        RIGHT_WING_MOUNT  = Ship.prototype.RIGHT_WING_MOUNT;

    DualSprayGunFactory.prototype.generateGunSet = function() {
      return {
        LEFT_WING_MOUNT: this.generateEmitter(- Math.PI / 16),
        RIGHT_WING_MOUNT: this.generateEmitter(Math.PI / 16)
      }
    };

    return DualSprayGunFactory;
});
