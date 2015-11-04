"use strict"

define([
    'd2/actors/actorEvent'
  ], function(ActorEvent) {

  var SpawnShip = function(ship, controller) {
    this.ship = ship;
    this.shipController = controller;
  };

  SpawnShip.prototype.update = function(subject, deltaTime) {
    var ship = (typeof this.ship === 'function')?
        this.ship()
        : this.ship;
    ship.controller = (typeof this.controller === 'function')?
        this.controller(ship.position)
        : this.controller;
    subject.addShip(ship);
    return deltaTime;
  };

  return SpawnShip;
});
