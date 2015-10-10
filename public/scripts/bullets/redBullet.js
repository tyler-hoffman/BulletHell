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

    var view = new TextureRegion(
      image,
      new Rectangle(0, 0, 10, 10),
      new Vector(5, 5)
    );

    var RedBullet = function(position, velocity) {
      Bullet.call(this, view, position, velocity);
    };

    RedBullet.prototype = new Bullet();

    return RedBullet;
});
