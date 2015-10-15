"use strict";

define([
    'd2/utils/rectangle',
    'd2/utils/SimpleRectangle',
    'd2/utils/vector'
  ], function(Rectangle, SimpleRectangle, Vector) {

    var temp = new Vector();

    var Actor = function(view, position, velocity) {
      this.view = view;
      this.bounds = new Rectangle();

      //this.boundingBox = new Rectangle();
      this.position = new Vector();
      this.scale = new Vector(1, 1);
      this.velocity = new Vector();
      this.children = [];
      this.magnification = 1;
      this.rotation = 0;
      this.depth = 0.5;
      this.isAlive = true;

      if (position) {
        this.setPosition(position);
      }
      if (velocity) {
        this.setVelocity(velocity);
      }
      this.setView(view);
      this.updateBounds();
    };

    Actor.prototype.update = function(deltaTime) {
      deltaTime = deltaTime || 0;
      temp.set(this.velocity)
          .scale(deltaTime);

      this.position.add(temp);
      //this.updateBounds();

      if (this.view) {
        if (this.view.update) {
          this.view.update(deltaTime);
        }
      }
    };

    Actor.prototype.updateBounds = function() {
      if (this.view) {

        // set bounding rectangle
        this.bounds.set(
          - this.view.center.x * this.magnification,
          - this.view.center.y * this.magnification,
          this.view.width * this.magnification,
          this.view.height * this.magnification
        );

        // this.boundingBox.set(this.bounds)
        //   .boundingBox(this.rotation, this.position);
      }
    };

    // Actor.prototype.getBoundingBox = function() {
    //   return this.boundingBox;
    // };

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
