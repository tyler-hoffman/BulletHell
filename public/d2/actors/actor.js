"use strict";

define([
    'd2/utils/rectangle',
    'd2/utils/vector'
  ], function(Rectangle, Vector) {

    var temp = new Vector();

    var Actor = function(view, position, velocity) {
      this.view = view;
      this.bounds = new Rectangle();
      this.position = new Vector();
      this.velocity = new Vector();
      this.children = [];
      this.magnification = 1;
      this.depth = 0.5;
      this.isAlive = true;

      if (position) {
        this.setPosition(position);
      }
      if (velocity) {
        this.setVelocity(velocity);
      }
      this.setView(view);
    };

    Actor.prototype.update = function(deltaTime) {
      deltaTime = deltaTime || 0;
      temp.set(this.velocity)
          .scale(deltaTime);

      this.position.add(temp);
      this.updateBounds();

      if (this.view) {
        if (this.view.update) {
          this.view.update(deltaTime);
        }
      }
    };

    Actor.prototype.updateBounds = function() {
      if (this.view) {
        this.bounds.set(
          this.position.x - this.view.center.x * this.magnification,
          this.position.y - this.view.center.y * this.magnification,
          this.view.width * this.magnification,
          this.view.height * this.magnification
        );
      }
    };

    Actor.prototype.setView = function(view) {
      this.view = view;
      this.updateBounds();
    };

    Actor.prototype.setPosition = function(x, y) {
      this.position.set(x, y);
      this.updateBounds();
    };

    Actor.prototype.setVelocity = function(x, y) {
      this.velocity.set(x, y);
    };

    Actor.prototype.getTextureRegion = function() {
      return this.view.getTextureRegion();
    };

    return Actor;
});
