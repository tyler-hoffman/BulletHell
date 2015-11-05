define([
    'd2/actors/controllers/paths/script',
    'waves/wave'
  ], function(Script, Wave) {

    var Level = function() {
      Script.call(this);
    };

    Level.prototype = new Script();

    Level.prototype.newWave = function() {
      var wave = new Wave();
      this.addStep(wave);
      return wave;
    };

    return Level;
});
