define([
    'd2/scripts/script',
    'waves/wave',
    'd2/utils/vector',
    'd2/text/textEvent'
  ], function(Script, Wave, Vector, TextEvent) {

    const TITLE_DURATION = 3,
          TITLE_POSITION = new Vector(600, 200);

    var Level = function(shipCounter, title) {
      Script.call(this, this);
      this.title = title;
      this.shipCounter = shipCounter;

      if (title) {
        this.showText(title, TITLE_POSITION, TITLE_DURATION, true);
      }
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

    Level.prototype.showText = function(text, position, duration, blocking) {
      var that = this;
      this.action(function() {
          that.notifyObservers(TextEvent.generateDisplayEvent(
              text, position, duration));
      });
      if (blocking) {
        this.wait(duration);
      }
    };

    return Level;
});
