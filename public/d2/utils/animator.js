"use strict";

define(function() {

  var Animator = function(callback, context, pauseAfter) {
    this.callback = callback;
    this.context = context;
    this.pauseAfter = pauseAfter || 1;
    this.isPlaying = false;
    this.previousTime = 0;
  };

  Animator.prototype.start = function() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.doFrame(null);
    }
    return this.isPlaying;
  };

  Animator.prototype.stop = function() {
    if (this.isPlaying) {
      this.isPlaying = false;
      window.cancelAnimationFrame(this.callbackId);
      this.startTime = null;
    };
    return !this.isPlaying;
  };

  Animator.prototype.doFrame = function(timeStamp) {

    var deltaTime = 0;
    if (timeStamp != null && this.startTime != null) {
      deltaTime = (timeStamp - this.startTime) / 1000;

      // if deltaTime is huge, assume it was paused and set to 0
      if (deltaTime >= this.pauseAfter) {
        deltaTime = 0;
      }
    }
    this.startTime = timeStamp;
    this.callback.call(this.context, deltaTime);

    if (this.isPlaying) {
      var that = this;
      this.callbackId = window.requestAnimationFrame(function(timeStamp) {
        that.doFrame(timeStamp);
      });
    }
  };

  Animator.prototype.toggle = function() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  };


  return Animator;

});
