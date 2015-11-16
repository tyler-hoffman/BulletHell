"use strict"

define([
    'd2/actors/observable',
    'd2/actors/actorEvent'
  ], function(Observable, ActorEvent) {

  var SpawnShip = function(ship, controller) {
    Observable.call(this);
    this.ship = ship;
    this.controller = controller;
  };

  SpawnShip.prototype = Object.create(Observable.prototype);

  SpawnShip.prototype.update = function(deltaTime, subject) {
    var ship = (typeof this.ship === 'function')?
        this.ship()
        : this.ship;

    if (this.controller) {
      ship.setController((typeof this.controller === 'function')?
          this.controller(ship.position)
          : this.controller);
    }

    // dispatch event to spawn ship
    this.notifyObservers(new ActorEvent('actorEvent.spawn', ship));

    return deltaTime;
  };

  return SpawnShip;
});
