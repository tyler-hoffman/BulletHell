"use strict";

define([
    'd2/actors/actor',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'image!images/bullets.png'
], function(Actor, Vector, Rectangle, TextureRegion, image) {

    var view = new TextureRegion(
      image,
      new Rectangle(0, 10, 10, 10),
      new Vector(5, 5)
    );

    var Ship = function(position) {
      Actor.call(this, view, position);
    };

    Ship.prototype = new Actor();


    return Ship;
});
