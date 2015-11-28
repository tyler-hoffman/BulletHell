"use strict";

define([
    'bullets/bullet',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'image!images/bullets.png'
  ],
  function(Bullet, Vector, Rectangle, TextureRegion, image) {

    var imageX = 123,
        imageY = 10,
        imageWidth = 4,
        imageHeight = 4;

    var view = new TextureRegion(
      image,
      new Rectangle(imageX, imageY, imageWidth, imageHeight),
      new Vector(imageWidth / 2, imageHeight / 2)
    );

    var BlueBullet = function(position, velocity) {
      Bullet.call(this, view, position, velocity, 1, 2);
    };

    BlueBullet.prototype = new Bullet();

    return BlueBullet;
});
