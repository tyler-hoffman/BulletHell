"use strict";

define([
    'ships/ship',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'guns/dualSprayGunFactory',
    'image!images/bullets.png'
], function(Ship, Vector, Rectangle, TextureRegion, GunFactory, image) {

    const MAX_HP = 20;

    var shipWidth = 17,
        shipHeight = 14;

    var gunFactory = new GunFactory();
    var LEFT_WING_MOUNT   = Ship.prototype.LEFT_WING_MOUNT,
        LEFT_MID_MOUNT    = Ship.prototype.LEFT_MID_MOUNT,
        CENTER_MOUNT      = Ship.prototype.CENTER_MOUNT,
        RIGHT_MID_MOUNT   = Ship.prototype.RIGHT_MID_MOUNT,
        RIGHT_WING_MOUNT  = Ship.prototype.RIGHT_WING_MOUNT;

    var mountPoints = {
      LEFT_WING_MOUNT: new Vector(0, 3),
      LEFT_MID_MOUNT: new Vector(3, 5),
      CENTER_MOUNT: new Vector(8, 0),
      RIGHT_MID_MOUNT: new Vector(13, 5),
      RIGHT_WING_MOUNT: new Vector(16, 3)
    };

    var view = new TextureRegion(
      image,
      new Rectangle(10, 0, shipWidth, shipHeight),
      new Vector(shipWidth / 2, shipHeight / 2)
    );

    var DragonWing = function(position) {
      Ship.call(this,
          view,
          position,
          mountPoints,
          gunFactory.generateGunSet(),
          MAX_HP);
    };

    DragonWing.prototype = new Ship();

    return DragonWing;
});
