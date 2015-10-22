"use strict";

define(['d2/actors/event'], function(Event) {

  const EMIT = 'emitEvent.emit';

  var EmitEvent = function(emitted, emitter) {
    Event.call(this, EMIT);

    this.emitted = emitted;
    this.emitter = emitter;
  };

  EmitEvent.prototype = new Event();

  EmitEvent.EMIT = EMIT;

  return EmitEvent;
});
