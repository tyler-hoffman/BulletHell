"use strict";

define([
  'd2/collections/linkedList'
], function(LinkedList) {

    var ActorManager = function() {
      this.actors = {};
    };


    ActorManager.prototype.addActor = function(actor, text) {
      var image = actor.getTextureRegion().image.src;

      if (!this.actors[image]) {
        this.actors[image] = new LinkedList();
      }

      this.actors[image].add(actor);
    }

    ActorManager.prototype.size = function() {
      var size = 0;
      for (var property in this.actors) {
        size += this.actors[property].size;
      }
      return size;
    }

    ActorManager.prototype.forEachInList = function(update, key) {
      this.actors[key].forEach(update);
      if (!this.actors[key].size) {
        delete this.actors[key];
      }
    }


    ActorManager.prototype.forEach = function(update, remove) {
      for (var property in this.actors) {
        var list = this.actors[property];

        // do foreach
        list.forEach(update, remove);
      }
    }

    ActorManager.prototype.removeIf = function(remove) {
      for (var property in this.actors) {
        var list = this.actors[property];

        // do foreach
        list.removeIf(remove);

        // check if we should delete the list
        if (!list.size) {
          delete this.actors[property];
        }
      }
    };

    ActorManager.prototype.renderAll = function(renderer, actorRenderer) {
      renderer.erase();
      for (var key in this.actors) {
        var size = this.actors[key].size;
        renderer.clear(size);

        this.forEachInList(function(actor) {
          actorRenderer.render(actor, renderer);
        }, key);

        renderer.draw(size);
      }
    };

    ActorManager.prototype.updateAll = function(deltaTime, gameState, renderState) {
      this.forEach(function(actor) {
        actor.update(deltaTime, gameState);
      });

      this.removeIf(function(actor) {
        return actor.remove && actor.remove(gameState);
      });

      this.forEach(function(actor) {
        actor.view.render(renderState);
      });
    }

    return ActorManager;
});
