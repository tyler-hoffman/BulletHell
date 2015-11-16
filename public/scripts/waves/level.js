define([
    'd2/scripts/script',
    'waves/wave'
  ], function(Script, Wave) {

    var Level = function(shipCounter) {
      Script.call(this, this);
      this.shipCounter = shipCounter;
    };

    Level.prototype = new Script();

    // Level.prototype.update = function(deltaTime, subject) {
    //   var output = Script.prototype.update.call(this, deltaTime, this);
    //   return output;
    // };

    Level.prototype.newWave = function() {
      var wave = new Wave(this);
      this.addStep(wave);
      return wave;
    };

    Level.prototype.getNumShips = function() {
      return this.shipCounter();
    };

    return Level;
});
