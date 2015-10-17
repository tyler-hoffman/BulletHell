"use strict";

define([
    'ships/ship',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'image!images/bullets.png'
], function(Ship, Vector, Rectangle, TextureRegion, image) {

    var shipWidth = 17,
        shipHeight = 14;

    var view = new TextureRegion(
      image,
      new Rectangle(10, 0, shipWidth, shipHeight),
      new Vector(shipWidth / 2, shipHeight / 2)
    );

    var DragonWing = function(position) {
      Ship.call(this, view, position);
    };

    DragonWing.prototype = new Ship();

    return DragonWing;
});
