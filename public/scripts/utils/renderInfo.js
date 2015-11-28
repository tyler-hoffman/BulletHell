"use strict"

define(function() {

  /**
   * Create a new RenderInfo.
   * @param {Number} reportFrequency seconds between reports
   * @param {Function} callback function to do the reporting
   */
  var RenderInfo = function(reportFrequency, callback) {
    this.reportFrequency = reportFrequency || 1;
    this.callback = callback;

    this.time = 0;
    this.frames = 0;
    this.fps = 0;
  };

  /**
   * Update renderInfo. Calls the callback
   * if time is over reportFrequency.
   * @param {Number} deltaTime Seconds for most recent frame
   */
  RenderInfo.prototype.update = function(deltaTime) {
    this.time += deltaTime;
    this.frames++;

    if (this.time >= this.reportFrequency) {

      this.fps = this.frames / this.reportFrequency;
      this.callback && this.callback.call(this.context, this.fps);

      this.reset();
    }

  };

  /**
   * Reset the info.
   */
  RenderInfo.prototype.reset = function() {
    this.time = this.time % this.reportFrequency;
    this.frames = 0;
  };

  /**
   * Get the most recently found fps.
   */
  RenderInfo.prototype.getFps = function() {
    return this.fps;
  };

  return RenderInfo;
});
