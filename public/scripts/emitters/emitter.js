"use strict"

define([
    'd2/utils/vector',
    'd2/collections/nonDestructiveStack',
    'emitters/emission'
  ], function(Vector, NonDestructiveStack, Emission) {

    var tempVector = new Vector();

    var Emitter = function(position, emitRate, angle, factory, decorators) {

      //this.emissionStack = [];
      // new NonDestructiveStack(function(emission) {
      //   return emission.deepCopy();
      // });

      this.emission = new Emission(angle);
      //this.emissionStack.push(this.emission);
      this.cumulativeEmission = new Emission();
      this.position = new Vector();
      this.emissionDecorators = [];
      this.time = 0;

      this.setPosition(position);
      this.emitRate = emitRate || 0;
      this.angle = angle || 0;
      this.factory = factory;

      if (decorators) {
        var that = this;
        decorators.forEach(function(decorator) {
          that.addDecorator(decorator);
        });
      }
    };

    Emitter.prototype.update = function(deltaTime) {
      this.time += deltaTime;

      while (this.time >= this.emitRate) {
        this.time -= this.emitRate;
        var emission = new Emission();
        this.decorateAll(emission);
        //console.log(emission)
        this.emitAll(emission, this.time);

        // update decorators and decorate the emission
        var emitRate = this.emitRate;
        this.emissionDecorators.forEach(function(decorator) {

          // I like this, but you probably don't
          decorator.update && decorator.update(emitRate);
        });
      }

    };

    Emitter.prototype.decorateAll = function(emissionGroup) {

      //this.emission.angle = this.angle;
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

    Emitter.prototype.addDecorator = function(decorator) {
      this.emissionDecorators.push(decorator);
    };

    return Emitter;
});
