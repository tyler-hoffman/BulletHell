"use strict";

define(function() {

  var EmitEvent = function(emitted, emitter) {
    this.emitted = emitted;
    this.emitter = emitter;
  };

  return EmitEvent;
});
