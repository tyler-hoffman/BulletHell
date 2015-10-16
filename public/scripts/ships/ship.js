"use strict";

define([
    'd2/actors/actor',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'image!images/bullets.png'
], function(Actor, Vector, Rectangle, TextureRegion, image) {

    var shipWidth = 17,
        shipHeight = 14;

    var view = new TextureRegion(
      image,
      new Rectangle(10, 0, shipWidth, shipHeight),
      new Vector(shipWidth / 2, shipHeight / 2)
    );

    var Ship = function(position) {
      Actor.call(this, view, position);
    };

    Ship.prototype = new Actor();

    return Ship;
});
