"use strict";

define([
    'd2/actors/observable',
    'd2/utils/SimpleRectangle',
    'd2/utils/vector'
  ], function(Observable, SimpleRectangle, Vector) {

    var temp = new Vector();

    var Actor = function(view, position, controller) {
      Observable.call(this);

      this.view = view;
      this.bounds = new SimpleRectangle();

      this.boundingBox = new SimpleRectangle();
      this.position = new Vector();
      this.scale = new Vector(1, 1);
      //this.velocity = new Vector();
      this.children = [];
      this.rotation = 0;
      this.depth = 0.5;
      this.isAlive = true;

      this.collisionBits = 1;
      this.controller = controller;
      if (controller) {
        this.controller.setActor(this);
      }
      if (position) {
        this.setPosition(position);
      }
      // if (velocity) {
      //   this.setVelocity(velocity);
      // }
      this.setView(view);
      this.updateBounds();
    };

    Actor.prototype = new Observable();

    Actor.prototype.setScale = function(x, y) {
      this.scale.set(x, y | x);
    };

    Actor.prototype.update = function(deltaTime) {
      deltaTime = deltaTime || 0;
      // temp.set(this.velocity)
      //     .scale(deltaTime);
      //
      // this.position.add(temp);
      // this.updateBoundingBox();
      //
      // this.position.
      if (this.controller) {
        this.controller.updateModel(deltaTime);
      }

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
          - this.view.center.x,
          - this.view.center.y,
          this.view.width,
          this.view.height
        );

        this.updateBoundingBox();
      }
    };

    Actor.prototype.updateBoundingBox = function() {
      if (this.view) {
        this.boundingBox.set(this.bounds)
            .scale(this.scale.x, this.scale.y)
            .translate(this.position.x, this.position.y);
      }
    };

    Actor.prototype.getBoundingBox = function() {
      return this.boundingBox;
    };

    Actor.prototype.setView = function(view) {
      this.view = view;
      this.updateBounds();
    };

    Actor.prototype.setPosition = function(x, y) {
      this.position.set(x, y);
      this.updateBounds();
    };

    // Actor.prototype.setVelocity = function(x, y) {
    //   this.velocity.set(x, y);
    // };

    Actor.prototype.getTextureRegion = function() {
      return this.view.getTextureRegion();
    };

    return Actor;
});
