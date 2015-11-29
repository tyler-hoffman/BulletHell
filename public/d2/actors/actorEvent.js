"use strict"

define(['d2/actors/event'], function(Event) {

  const SPAWN = 'actorEvent.spawn',
        DESTROY = 'actorEvent.destroy',
        DAMAGE = 'actorEvent.damage';

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

  ActorEvent.createDamageEvent = function(actor) {
    return new ActorEvent(DAMAGE, actor);
  };

  ActorEvent.SPAWN = SPAWN;
  ActorEvent.DESTROY = DESTROY;

  return ActorEvent;
});
