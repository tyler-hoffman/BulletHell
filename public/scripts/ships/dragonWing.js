"use strict";

define([
    'ships/ship',
    'd2/utils/vector',
    'utils/ShipViewGenerator',
    'guns/basicGunFactory',
    'd2/animations/textureRegionSplitter',
    'image!images/bullets.png'
], function(Ship, Vector, ShipViewGenerator,
      GunFactory, TextureRegionSplitter, image) {

    const MAX_HP = 2000;

    var shipSize = new Vector(17, 14),
        shipCenter = new Vector(shipSize.x / 2, shipSize.y / 2),
        normalImagePosition = new Vector(10, 0),
        firstDamageFrame = new Vector(0, 33),
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
          position,
          mountPoints,
          gunFactory.generateGunSet(),
          MAX_HP);

      this.damageView = viewGenerator.generateDamageAnimation(
        firstDamageFrame, 1, 3, 0.06);
    };

    DragonWing.prototype = new Ship();

    DragonWing.prototype.takeDamage = function(damage) {
      Ship.prototype.takeDamage.call(this, damage);

      this.view = this.damageView;
      this.damageView.reset();
      this.damageView.removeObservers();

      var that = this;
      this.damageView.addObserver(function() {
        that.view = normalView;
      });
    };

    return DragonWing;
});
