"use strict";

define([
    'd2/actors/actor',
    'd2/actors/actorEvent',
    'd2/utils/vector'
  ], function(Actor, ActorEvent, Vector) {

    var tempVector = new Vector();

    var Ship = function(view, position, mountPoints, gunSet, maxHp, controller) {
      Actor.call(this, view, position);
      this.mountPoints = mountPoints || {};
      this.setGunSet(gunSet || {});
      this.controller = controller;
      this.maxHp = maxHp || 1;

      this.resetHealth();
    };

    Ship.prototype = new Actor();

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

    Ship.prototype.takeDamage = function(damage) {
      this.hp -= damage;

      if (this.hp < 0) {
        this.die();
      }
    };

    Ship.prototype.die = function() {
        this.hp = 0;
        this.isAlive = false;

        // notify listeners
        this.notifyObservers(ActorEvent.createDestroyEvent(this));
    };

    Ship.prototype.resetHealth = function() {
      this.hp = this.maxHp;
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
