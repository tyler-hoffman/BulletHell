"use strict"

define(['d2/actors/event'], function(Event) {

  const BEGIN = 'leveEvent.spawn',
        END = 'leveEvent.destroy';

  var LevelEvent = function(type, actor) {
    Event.call(this, type);
    this.actor = actor;
  };

  LevelEvent.prototype = new Event();

  LevelEvent.createEndEvent = function(level) {
    return new LevelEvent(END, lebel);
  };

  return LevelEvent;
});
