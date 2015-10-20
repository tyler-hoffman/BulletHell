"use strict"

define([
    'emitters/emitter',
    'emitters/emitEvent',
    'ships/ship',
    'bullets/redBullet'
  ], function(Emitter, EmitEvent, Ship, RedBullet) {

    const EMIT_RATE     = .1;
    const BULLET_SPEED  = 100;

    var bulletFactory = function(position, velocity, fromTime) {
      var bullet = new RedBullet(
          position, velocity.scale(BULLET_SPEED));

      bullet.update(fromTime);
      bullet.depth = 0.45;
      bullet.collisionBits = 2;
      this.notifyObservers(new EmitEvent(bullet));
    };

    var BasicGunFactory = function() {

    };

    BasicGunFactory.prototype.generateEmitter = function() {
      var emitter = new Emitter(EMIT_RATE, bulletFactory);


      return emitter;
    };

    var LEFT_WING_MOUNT   = Ship.prototype.LEFT_WING_MOUNT,
        LEFT_MID_MOUNT    = Ship.prototype.LEFT_MID_MOUNT,
        CENTER_MOUNT      = Ship.prototype.CENTER_MOUNT,
        RIGHT_MID_MOUNT   = Ship.prototype.RIGHT_MID_MOUNT,
        RIGHT_WING_MOUNT  = Ship.prototype.RIGHT_WING_MOUNT;

    BasicGunFactory.prototype.generateGunSet = function() {
      return {
        LEFT_WING_MOUNT: this.generateEmitter(),
        RIGHT_WING_MOUNT: this.generateEmitter()
      }
    };

    return BasicGunFactory;
});
