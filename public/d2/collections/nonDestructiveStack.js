"use strict"

define(function() {

  var Stack = function(factory, capacity) {
    this.currentIndex = 0;
    this.elements = [];
    this.factory = factory;

    capacity = capacity || 0;
    for (var i = 0; i < capacity; i++) {
      this.push();
    }
  };

  Stack.prototype.push = function(data) {
    if (this.currentIndex === this.elements.length) {
      this.elements.push(this.factory? this.factory(data) : data);
    }
    return this.elements[this.currentIndex++];
  };

  Stack.prototype.pop = function() {
    return this.elements[--this.currentIndex];
  };

  Stack.prototype.peek = function() {
    return this.elements[this.currentIndex - 1];
  };

  Stack.prototype.isEmpty = function() {
    return this.currentIndex === 0;
  };

  Stack.prototype.size = function() {
    return this.currentIndex;
  };

  return Stack;
});
