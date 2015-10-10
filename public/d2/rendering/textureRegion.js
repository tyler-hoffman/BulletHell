"use strict";

define([
    'd2/utils/rectangle'
  ], function(Rectangle) {

    var TextureRegion = function(image, imageBox, center) {
      this.image = image;
      this.center = center;

      this.width = imageBox.width;
      this.height = imageBox.height;

      this.textureCoordinates = new Rectangle(
        imageBox.x / image.width,
        imageBox.y / image.height,
        (imageBox.x + imageBox.width) / image.width,
        (imageBox.y + imageBox.height) / image.height
      );
    };

    TextureRegion.prototype.getTextureRegion = function() {
      return this;
    };

    return TextureRegion;
});
