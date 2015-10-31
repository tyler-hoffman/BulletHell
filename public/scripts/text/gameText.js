"use strict"

define([
    'd2/text/monoFont',
    'd2/text/textField',
    'image!images/letters.png'
  ], function (MonoFont, TextField, fontImage) {

    // define font
    var font = new MonoFont();
    font.addLetters(6, 8, 10, 10, 32, fontImage);

    var GameText = function(text, magnification, letterHandler) {
      TextField.call(this, font, text, magnification, letterHandler);
      this.letterHandler = letterHandler;
    };

    GameText.prototype = new TextField();

    return GameText;
});
