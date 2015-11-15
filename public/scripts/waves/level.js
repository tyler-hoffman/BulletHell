define([
    'd2/actors/controllers/paths/script',
    'waves/wave'
  ], function(Script, Wave) {

    var Level = function() {
      Script.call(this, this);
    };

    Level.prototype = new Script();

    Level.prototype.update = function(deltaTime, subject) {
      var output = Script.prototype.update.call(this, deltaTime, subject);
      return output;
    };

    Level.prototype.newWave = function() {
      var wave = new Wave(this);
      this.addStep(wave);
      return wave;
    };

    return Level;
});
