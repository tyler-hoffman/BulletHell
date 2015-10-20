"use strict"

define(function() {

  var Observable = function() {
    this.observers = [];
  };

  Observable.prototype.addObserver = function(listener) {
    var index = this.observers.indexOf(listener);
    if (index < 0) {
      this.observers.push(listener);
    }
  };

  Observable.prototype.removeObserver = function(listener) {
    var index = this.observers.indexOf(listener);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  };

  Observable.prototype.removeObservers = function() {
    this.observers = [];
  };

  Observable.prototype.notifyObservers = function(event) {
    for (var observer in this.observers) {
      this.observers[observer].notify(event);
    }
  };

  return Observable;
});
