"use strict"

define([
    'ships/ship',
    'd2/utils/vector',
    'utils/shipViewGenerator',
    'guns/enemyDualSprayGunFactory',
    'image!images/bullets.png'
], function(Ship, Vector, ShipViewGenerator, GunFactory, image) {

    const MAX_HP = 20;

    var shipSize = new Vector(23, 14),
        shipCenter = new Vector().set(shipSize).scale(0.5),
        normalImagePosition = new Vector(30, 0),
        firstDamageFrame = new Vector(30, 14),
        viewGenerator = new ShipViewGenerator(image, shipSize, shipCenter),
        normalView = viewGenerator.generateNormalView(normalImagePosition);

    var gunFactory = new GunFactory();

    var mountPoints = {
      LEFT_WING_MOUNT: new Vector(4, 0),
      RIGHT_WING_MOUNT: new Vector(20, 0)
    };

    var BossShip = function(position) {
      Ship.call(this,
          normalView,
          viewGenerator.generateDamageAnimation(
            firstDamageFrame, 3, 1, 0.06
          ),
          position,
          mountPoints,
          gunFactory.generateGunSet(),
          MAX_HP
          );
    };

    BossShip.prototype = new Ship();

    return BossShip;
});
