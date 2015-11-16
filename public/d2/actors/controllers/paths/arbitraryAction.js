"use strict"

define(function() {

  var ArbitraryAction = function(callback) {
    this.callback = callback;
  };

  ArbitraryAction.prototype.update = function(deltaTime, subject) {

    this.callback(deltaTime, subject);

    return deltaTime;
  };

  return ArbitraryAction;
});
