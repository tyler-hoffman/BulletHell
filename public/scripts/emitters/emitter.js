"use strict"

define([
    'd2/actors/observable',
    'd2/utils/vector',
    'emitters/emission'
  ], function(Observable, Vector, Emission) {

    var tempVector = new Vector();

    var Emitter = function(emitRate, factory, decorators) {
      Observable.call(this);

      this.emission = new Emission();
      this.position = new Vector();
      this.emissionDecorators = [];
      this.time = 0;

      this.emitRate = emitRate || 0;
      this.angle = 0;
      this.factory = factory;

      if (decorators) {
        var that = this;
        decorators.forEach(function(decorator) {
          that.addDecorator(decorator);
        });
      }
    };

    Emitter.prototype = new Observable();

    Emitter.prototype.update = function(deltaTime) {
      var emitRate = this.emitRate;
      this.time += deltaTime;

      while (this.time >= this.emitRate) {

        var emission = new Emission();
        this.time -= this.emitRate;

        this.decorateAll(emission);
        this.emitAll(emission, this.time);

        // update decorators and decorate the emission
        this.emissionDecorators.forEach(function(decorator) {

          // I like this, but you probably don't
          decorator.update && decorator.update(emitRate);
        });
      }

    };

    Emitter.prototype.decorateAll = function(emissionGroup) {
      this.emissionDecorators.forEach(function(decorator) {
        decorator.decorate(emissionGroup);
      });
    };

    Emitter.prototype.emitAll = function(emission, fromTime) {
      if (emission.children) {
        var that = this;
        emission.children.forEach(function(child) {
          if (child.isActive) {
            var copy = child.deepCopy();
            copy.angle += emission.angle;
            that.emitAll(copy, fromTime);
          }
        });
      } else {
        this.emit(emission, fromTime);
      }
    };

    Emitter.prototype.emit = function(emission, fromTime) {
      this.factory(
        this.position,
        new Vector(Math.cos(emission.angle), Math.sin(emission.angle)),
        fromTime || 0
      );
    };

    Emitter.prototype.setPosition = function(x, y) {
      return this.position.set(x, y);
    };

    Emitter.prototype.setAngle = function(angle) {
      this.angle = angle;
    };

    Emitter.prototype.addDecorator = function(decorator) {
      this.emissionDecorators.push(decorator);
    };

    return Emitter;
});
