"use strict";

"use strict";

define([
    'bullets/bullet',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'image!images/bullets.png'
  ],
  function(Bullet, Vector, Rectangle, TextureRegion, image) {

    var imageX = 116,
        imageY = 0,
        imageWidth = 10,
        imageHeight = 10;

    var view = new TextureRegion(
      image,
      new Rectangle(imageX, imageY, imageWidth, imageHeight),
      new Vector(imageWidth / 2, imageHeight / 2)
    );

    var BlueBullet = function(position, velocity) {
      Bullet.call(this, view, position, velocity);
    };

    BlueBullet.prototype = new Bullet();

    return BlueBullet;
});
