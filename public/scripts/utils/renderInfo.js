"use strict"

define(function() {

  var average = function(numbers) {
    var sum = 0;
    for (var i in numbers) {
      sum += numbers[i];
    }
    return sum / numbers.length;
  };

  var RenderInfo = function(reportFrequency, callback, context) {
    this.reportFrequency = reportFrequency || 1;
    this.callback = callback;
    this.context = context || this;
    this.time = 0;
    this.timeSoFar = 0;
    this.fps = 0;
    this.history = [];
    this.itemsInHistory = 0;
  };

  RenderInfo.prototype.update = function(deltaTime) {
    if (deltaTime) {
      this.time += deltaTime;
      if (this.time >= this.reportFrequency) {

        var untilReport = this.reportFrequency - this.timeSoFar;
        this.history[this.itemsInHistory++] = untilReport;

        this.fps = Math.floor(average(this.history));
        this.callback.call(this.context, this.fps);

        this.reset();
        this.history[this.itemsInHistory++] = (1 / deltaTime);


        this.timeSoFar = this.time;
        this.time-= this.reportFrequency;
      } else {

        this.history[this.itemsInHistory++] = (1 / deltaTime);
        this.timeSoFar += deltaTime;

      }
    }
  };

  RenderInfo.prototype.reset = function() {
    this.itemsInHistory = 0;
  };

  RenderInfo.prototype.getFps = function() {
    return this.fps;
  };

  return RenderInfo;
});
