"use strict";

define([
    'ships/ship',
    'd2/utils/vector',
    'utils/shipViewGenerator',
    'guns/basicGunFactory',
    'd2/animations/textureRegionSplitter',
    'image!images/bullets.png'
], function(Ship, Vector, ShipViewGenerator,
      GunFactory, TextureRegionSplitter, image) {

    const MAX_HP = 10;

    var shipSize = new Vector(17, 14),
        shipCenter = new Vector(shipSize.x / 2, shipSize.y / 2),
        normalImagePosition = new Vector(0, 0),
        firstDamageFrame = new Vector(0, 14),
        viewGenerator = new ShipViewGenerator(image, shipSize, shipCenter),
        normalView = viewGenerator.generateNormalView(normalImagePosition);

    var gunFactory = new GunFactory();

    var mountPoints = {
      LEFT_WING_MOUNT: new Vector(0, 3),
      LEFT_MID_MOUNT: new Vector(3, 5),
      CENTER_MOUNT: new Vector(8, 0),
      RIGHT_MID_MOUNT: new Vector(13, 5),
      RIGHT_WING_MOUNT: new Vector(16, 3)
    };

    var DragonWing = function(position) {
      Ship.call(this,
          normalView,
          viewGenerator.generateDamageAnimation(
            firstDamageFrame, 3, 1, 0.06
          ),
          position,
          mountPoints,
          gunFactory.generateGunSet(),
          MAX_HP);
    };

    DragonWing.prototype = new Ship();

    return DragonWing;
});
