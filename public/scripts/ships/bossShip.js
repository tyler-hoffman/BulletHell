"use strict"

define([
    'ships/ship',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'guns/enemyDualSprayGunFactory',
    'image!images/bullets.png'
], function(Ship, Vector, Rectangle, TextureRegion, GunFactory, image) {

    const MAX_HP = 200;

    var shipWidth = 23,
        shipHeight = 13;

    var gunFactory = new GunFactory();

    var mountPoints = {
      LEFT_WING_MOUNT: new Vector(20, 12),
      RIGHT_WING_MOUNT: new Vector(3, 12)
    };

    var view = new TextureRegion(
      image,
      new Rectangle(9, 19, shipWidth, shipHeight),
      new Vector(shipWidth / 2, shipHeight / 2)
    );

    var BossShip = function(position) {
      Ship.call(this,
          view,
          position,
          mountPoints,
          gunFactory.generateGunSet(),
          MAX_HP
          );
    };

    BossShip.prototype = new Ship();

    return BossShip;
});
