define([
    'd2/actors/controllers/paths/script',
    'd2/actors/controllers/paths/wait',
    'waves/spawnShip'
  ], function(Script, Wait, SpawnShip) {

  var ShipsRemaining = function(maxShips) {
    this.maxShips = maxShips;
  };

  ShipsRemaining.prototype.update = function(wave, deltaTime) {
    if (wave.getNumShps() > this.maxShips) {
      return 0;
    } else {
      return deltaTime;
    }
  };

  var Wave = function(level) {
    this.level = level;
    Script.call(this, level);
    this.ships = [];
  };

  Wave.prototype = new Script();

  Wave.prototype.afterTime = function(time, ship, controller) {
    this.addStep(new Wait(time));
    this.addStep(new SpawnShip(ship, controller));
    return this;
  };

  Wave.prototype.whenShipsLeft = function(remaining, ship, controller) {
    this.addStep(new ShipsRemaining(remaining || 0));
    this.addStep(new SpawnShip(ship, controller));
    return this;
  };

  Wave.prototype.end = function() {
    return this.level;
  };

  Wave.prototype.getNumShips = function() {
    var ships = this.ships;
    var numShips = 0;
    for (var i = ships.length - 1; i >= 0; i++) {
      if (ships[i].isAlive) {
        numShips++;
      } else {
        ships.splice(i, 1);
      }
    }
    return numShips;
  };

  Wave.prototype.addShip = function(ship) {
    console.log('ADD SHIP')
    this.ships.push(ship);
    this.notifyObservers(new ActorEvent('actorEvent.spawn', ship));
  }

  return Wave;
});
