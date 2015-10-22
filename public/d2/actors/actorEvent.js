"use strict"

define(['d2/actors/event'], function(Event) {

  const SPAWN = 'actorEvent.spawn';
  const DESTROY = 'actorEvent.destroy';

  var ActorEvent = function(type, actor) {
    Event.call(this, type);
    this.actor = actor;
  };

  ActorEvent.prototype = new Event();

  ActorEvent.createSpawnEvent = function(actor) {
    return new ActorEvent(SPAWN, actor);
  };

  ActorEvent.createDestroyEvent = function(actor) {
    return new ActorEvent(DESTROY, actor);
  };

  ActorEvent.SPAWN = SPAWN;
  ActorEvent.DESTROY = DESTROY;

  return ActorEvent;
});
