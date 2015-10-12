"use strict";

define(function() {

  var Font = function() {
    this.images = {};
  };

  Font.prototype.getImage = function(character) {
    return this.images[character];
  };

  Font.prototype.addImage = function(character, textureRegion) {
    this.images[character] = textureRegion;
  };

  return Font;
});
