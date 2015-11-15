"use strict"

define(function() {

  var Wait = function(time) {
    this.initialTime = time;
    this.reset();
  };

  Wait.prototype.reset = function() {
    this.time = this.initialTime;
  };

  Wait.prototype.update = function(deltaTime, subject) {
    console.log('wait')
    if (deltaTime <= this.time) {
      this.time -= deltaTime;
      deltaTime = 0;
    } else {
      deltaTime - this.time;
      this.reset();
    }
    return deltaTime;
  };

  return Wait;
});
