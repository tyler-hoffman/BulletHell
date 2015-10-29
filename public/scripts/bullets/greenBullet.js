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

    var imageX = 0,
        imageY = 10,
        imageWidth = 7,
        imageHeight = 7;

    var view = new TextureRegion(
      image,
      new Rectangle(imageX, imageY, imageWidth, imageHeight),
      new Vector(imageWidth / 2, imageHeight / 2)
    );

    var GreenBullet = function(position, velocity) {
      Bullet.call(this, view, position, velocity);
    };

    GreenBullet.prototype = new Bullet();

    return GreenBullet;
});
