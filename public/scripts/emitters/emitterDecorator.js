"use strict"

define(['emitters/emission'], function(Emission) {

  var EmitterDecorator = function() {

  };

  EmitterDecorator.prototype.decorate = function(emission) {

    // let subclass handle changes to emission
    if (this.decorateEmission) {
      this.decorateEmission(emission);
    }

    // copy smission's children and let subclass handle them
    if (this.decorateChildren) {
      emission.children = this.decorateChildren(emission.children, emission);
    }

  };

  return EmitterDecorator;
});
