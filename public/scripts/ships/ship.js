"use strict";

define([
    'd2/actors/actor',
    'd2/utils/vector'
  ], function(Actor, Vector) {

    var tempVector = new Vector();

    var Ship = function(view, position, mountPoints, gunSet, controller) {
      Actor.call(this, view, position);
      this.mountPoints = mountPoints || {};
      this.setGunSet(gunSet || {});
      this.controller = controller;
    };

    Ship.prototype = new Actor();

    // labels for common mount points
    Ship.prototype.LEFT_WING_MOUNT   = 0;
    Ship.prototype.LEFT_MID_MOUNT    = 1;
    Ship.prototype.CENTER_MOUNT      = 2;
    Ship.prototype.RIGHT_MID_MOUNT   = 3;
    Ship.prototype.RIGHT_WING_MOUNT  = 4;

    Ship.prototype.update = function(deltaTime) {
      deltaTime = deltaTime || 0;
      Actor.prototype.update.call(this, deltaTime);

      for (var mountPoint in this.gunSet) {
        var emitter = this.gunSet[mountPoint];
        var mountPoint = this.mountPoints[mountPoint];
        if (emitter && mountPoint) {
          emitter.setAngle(this.rotation - Math.PI / 2);
          emitter.setPosition(tempVector
              .set(mountPoint)
              .add(this.bounds.x, this.bounds.y)
              .scale(this.scale.x)
              .add(this.position));

          emitter.update(deltaTime);
        }
      }
    };

    Ship.prototype.notify = function(emitEvent) {
      emitEvent.emitter = this;
      this.notifyObservers(emitEvent);
    };

    Ship.prototype.setGunSet = function(gunSet) {
      this.gunSet = gunSet;

      if (this.gunSet) {
        for (var gun in this.gunSet) {
          this.gunSet[gun].addObserver(this);
        }
      }
    };

    return Ship;
});
