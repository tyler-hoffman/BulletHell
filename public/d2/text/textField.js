"use strict";

define([
    'd2/actors/actor',
    'd2/utils/vector'
  ], function(Actor, Vector) {

    var CharacterField = function(view, position, velocity) {
      Actor.call(this, view, position, velocity);
      this.depth = 0;
    };

    CharacterField.prototype = new Actor();

    var TextField = function(font, text, magnification, onChange) {
      Actor.call(this);
      this.font = font;
      this.onChange = onChange;
      this.scale = new Vector(magnification, magnification);

      if (text) {
        this.setText(text);
        this.update(0);
      }
    };

    TextField.prototype = new Actor();

    TextField.prototype.setText = function(text) {
      // mark old characters as dead as dead
      if (this.text) {
        for (var i = 0; i < this.children.length; i++) {
          this.children[i].isAlive = false;
        }
      }

      this.children = [];
      this.text = text;
      if (text) {
        var x = this.position.x;
        var y = this.position.y;
        for (var i = 0; i < text.length; i++) {
          var textureRegion = this.font.getImage(text[i]);
          var character = new CharacterField(textureRegion);
          character.collisionBits = 0;
          character.setScale(this.scale);
          character.setPosition(x, y);
          x += character.boundingBox.width;
          this.children.push(character);
        }
      }
      this.onChange(this.children);
      this.update();
    };

    TextField.prototype.update = function(deltaTime, gameState) {
      this.view = this.children[0].view;
      Actor.prototype.update.call(this, deltaTime, gameState);
    };

    return TextField;
});
