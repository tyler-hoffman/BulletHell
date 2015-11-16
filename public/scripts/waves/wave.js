define([
    'd2/scripts/script',
    'd2/scripts/wait',
    'waves/spawnShip'
  ], function(Script, Wait, SpawnShip) {

  var ShipsRemaining = function(maxShips) {
    this.maxShips = maxShips;
  };

  ShipsRemaining.prototype.update = function(deltaTime, wave) {
    if (wave.getNumShips() > this.maxShips) {
      deltaTime = 0;
    } else {
    }
    return deltaTime;
  };

  var Wave = function(level) {
    Script.call(this, level);
    this.level = level;
    this.ships = [];
  };

  Wave.prototype = new Script();

  Wave.prototype.afterTime = function(time, ship, controller) {
    this.addStep(new Wait(time));
    this.addStep(new SpawnShip(ship, controller));
    return this;
  };

  Wave.prototype.whenShipsLeft = function(remaining, time, ship, controller) {
    this.addStep(new ShipsRemaining(remaining || 0));
    this.addStep(new Wait(time));
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

  return Wave;
});
