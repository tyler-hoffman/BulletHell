"use strict";

define(['d2/actors/event'], function(Event) {

  const NAME = 'emit';

  var EmitEvent = function(emitted, emitter) {
    Event.call(this, NAME);

    this.emitted = emitted;
    this.emitter = emitter;
  };

  EmitEvent.prototype = new Event();

  return EmitEvent;
});
