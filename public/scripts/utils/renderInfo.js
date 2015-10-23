"use strict"

define(function() {

  var average = function(numbers) {
    var sum = 0;
    for (var i in numbers) {
      sum += numbers[i];
    }

    /*
     * divide by length + 1 because when time >= reportFrequency
     * 2 numbers are added to the history
     */
    return sum / (numbers.length - 1);
  };

  /**
   * Create a new RenderInfo.
   * @param {Number} reportFrequency seconds between reports
   * @param {Function} callback function to do the reporting
   */
  var RenderInfo = function(reportFrequency, callback) {
    this.totalTime = 0;
    this.reportFrequency = reportFrequency || 1;
    this.callback = callback;

    this.fps = 0;
    this.history = [];

    this.reset();
  };

  /**
   * Update renderInfo. Calls the callback
   * if time is over reportFrequency.
   * @param {Number} deltaTime Seconds for most recent frame
   */
  RenderInfo.prototype.update = function(deltaTime) {
    this.totalTime += deltaTime;
    if (deltaTime) {

      var totalTime = this.time + deltaTime;

      if (totalTime >= this.reportFrequency) {

        var untilReport = this.reportFrequency - this.time,
            remainder = deltaTime - untilReport;

        // finish current
        this.addTime(untilReport);
        this.fps = Math.floor(average(this.history));
        this.callback.call(this.context, this.fps);

        // start anew
        this.reset();
        this.addTime(totalTime - this.reportFrequency);

      } else {

        this.addTime(deltaTime);

      }
    }
  };

  /**
   * Reset the info.
   */
  RenderInfo.prototype.reset = function() {
    this.itemsInHistory = 0;
    this.time =  0;
  };

  RenderInfo.prototype.hardReset = function() {
    this.reset();
    this.totalTime = 0;
  };

  /**
   * Add time.
   * @param {Number} time Time to add
   */
  RenderInfo.prototype.addTime = function(time) {
    this.history[this.itemsInHistory++] = 1 / time;
    this.time += time;
  };

  /**
   * Get the most recently found fps.
   */
  RenderInfo.prototype.getFps = function() {
    return this.fps;
  };

  return RenderInfo;
});
