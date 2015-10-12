"use strict";

define([
    'd2/text/font',
    'd2/rendering/textureRegion',
    'd2/utils/rectangle',
    'd2/utils/vector'
  ], function(Font, TextureRegion, Rectangle, Vector) {

  var MonoFont = function() {
    Font.call(this);
  };

  MonoFont.prototype = new Font();

  MonoFont.prototype.addLetters = function(
        width,
        height,
        columns,
        rows,
        firstCharCode,
        image) {

    var charCode = firstCharCode;
    for (var row = 0; row < rows; row++) {
      for (var column = 0; column < columns; column++) {
        this.addImage(
          String.fromCharCode(charCode++),
          new TextureRegion(
            image,
            new Rectangle(column * width, row * height, width, height),
            new Vector(0, 0)
          )
        );
      }
    }
  };

  return MonoFont;
});
