"use strict";

define([
    'bullets/bullet',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'image!images/bullets.png'
  ],
  function(Bullet, Vector, Rectangle, TextureRegion, image) {

    var imageX = 0,
        imageY = 26,
        imageWidth = 5,
        imageHeight = 7;

    var view = new TextureRegion(
      image,
      new Rectangle(imageX, imageY, imageWidth, imageHeight),
      new Vector(imageWidth / 2, imageWidth / 2)
    );

    var PurpleBullet = function(position, velocity) {
      Bullet.call(this, view, position, velocity, 1, 2);
    };

    PurpleBullet.prototype = new Bullet();

    return PurpleBullet;
});
