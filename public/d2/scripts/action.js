"use strict"

define(function() {

  var Action = function(callback) {
    this.callback = callback;
  };

  Action.prototype.update = function(deltaTime, subject) {
    this.callback(deltaTime, subject);
    return deltaTime;
  };

  return Action;
});
