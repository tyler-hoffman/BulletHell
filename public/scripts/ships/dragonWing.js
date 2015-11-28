"use strict";

define([
    'ships/ship',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'guns/basicGunFactory',
    'd2/animations/animation',
    'd2/animations/textureRegionSplitter',
    'image!images/bullets.png'
], function(Ship, Vector, Rectangle, TextureRegion,
      GunFactory, Animation, TextureRegionSplitter, image) {

    const MAX_HP = 2000;

    var shipWidth = 17,
        shipHeight = 14;

    var gunFactory = new GunFactory();

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

    var damageFrames = new TextureRegionSplitter().split(
      image,
      new Vector(0, 33),
      new Vector(shipWidth, shipHeight),
      1, 3,
      new Vector(shipWidth / 2, shipHeight / 2)
    );

    var DragonWing = function(position) {
      Ship.call(this,
          view,
          position,
          mountPoints,
          gunFactory.generateGunSet(),
          MAX_HP);

      this.damageView = new Animation(damageFrames,
          new Vector(shipWidth, shipHeight),
          new Vector(shipWidth / 2, shipHeight / 2),
          0.06, false);
    };

    DragonWing.prototype = new Ship();

    DragonWing.prototype.takeDamage = function(damage) {
      Ship.prototype.takeDamage.call(this, damage);

      this.view = this.damageView;
      this.damageView.reset();
      this.damageView.removeObservers();

      var that = this;
      this.damageView.addObserver(function() {
        that.view = view;
      });
    };

    return DragonWing;
});
