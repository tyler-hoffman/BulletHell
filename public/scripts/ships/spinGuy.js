"use strict"

define([
    'ships/ship',
    'd2/utils/vector',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'guns/quadFire',
    'image!images/bullets.png'
], function(Ship, Vector, Rectangle, TextureRegion, GunFactory, image) {

    const MAX_HP = 20,
        FAST_SPIN = Math.PI / 1.5,
        NORMAL_SPIN = Math.PI / 8,
        FAST_EMIT = 0.14,
        NORMAL_EMIT = 0.4;

    var shipWidth = 13,
        shipHeight = 13;

    var gunFactory = new GunFactory();

    var mountPoints = {
      TOP_WING_MOUNT: new Vector(6, -2),
      RIGHT_WING_MOUNT: new Vector(14, 6),
      DOWN_WING_MOUNT: new Vector(6, 14),
      LEFT_WING_MOUNT: new Vector(-2, 6)
    };

    var view = new TextureRegion(
      image,
      new Rectangle(27, 0, shipWidth, shipHeight),
      new Vector(shipWidth / 2, shipHeight / 2)
    );

    var SpinGuy = function(position) {
      Ship.call(this,
          view,
          position,
          mountPoints,
          gunFactory.generateGunSet(),
          MAX_HP
          );
      this.setState(NORMAL_SPIN, NORMAL_EMIT);
    };

    SpinGuy.prototype = Object.create(Ship.prototype);

    SpinGuy.prototype.update = function(deltaTime) {
      // this guy is alwsays spinning
      this.rotation += this.angularVelocity * deltaTime;

      Ship.prototype.update.call(this, deltaTime);
    };

    SpinGuy.prototype.chaosMode = function() {
      this.setState(FAST_SPIN, FAST_EMIT);
    };

    SpinGuy.prototype.passiveMode = function() {
      this.setState(0, 0);
    }

    SpinGuy.prototype.setState = function(angularVelocity, emitRate) {
      emitRate = emitRate || 0;
      this.angularVelocity = angularVelocity;
      for (var gun in this.gunSet) {
        if (emitRate) {
          this.gunSet[gun].emitRate = emitRate;
          this.gunSet[gun].enable(true);
        } else {
          this.gunSet[gun].enable(false);
        }
      }
    };

    return SpinGuy;
});
