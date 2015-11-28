"use strict"

define(['d2/actors/event'], function(Event) {

  const DISPLAY_TEXT = 'textEvent.display',
        REMOVE_TEXT = 'textEvent.remove';

  var TextEvent = function(type, text, position, duration) {
    Event.call(this, type);

    this.text = text;
    this.position = position;
    this.duration = duration;
  };

  TextEvent.prototype = Object.create(Event.prototype);

  TextEvent.generateDisplayEvent = function(text, position, duration) {
    return new TextEvent(DISPLAY_TEXT, text, position, duration);
  };

  TextEvent.generateRemoveEvent = function() {
    return new TextEvent(REMOVE_TEXT);
  };

  return TextEvent;
});
