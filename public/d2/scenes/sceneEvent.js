"use strict"

define(['d2/actors/event'], function(Event) {

  var SceneEvent = function(type) {
    Event.call(this, type);
  };

  SceneEvent.prototype = new Event();

  Object.defineProperty(SceneEvent, 'CHANGE', {
    value: 'CHANGE'
  });

  SceneEvent.generateChangeEvent = function(next) {
    var event = new SceneEvent(SceneEvent.END);
    event.next = next;
    return event;
  };

  return SceneEvent;
});
