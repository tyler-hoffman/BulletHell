"use strict"

define([
    'd2/utils/rectangle',
    'd2/utils/vector',
    'd2/rendering/textureRegion',
    'd2/animations/textureRegionSplitter',
    'd2/animations/animation'
  ], function(Rectangle, Vector, TextureRegion,
        TextureRegionSplitter, Animation) {

    var splitter = new TextureRegionSplitter();

    var ShipViewGenerator = function(image, shipSize, shipCenter) {
      this.image = image;
      this.shipSize = shipSize;
      this.shipCenter = shipCenter;
    };

    ShipViewGenerator.prototype.generateNormalView = function(position) {
      return new TextureRegion(
        this.image,
        new Rectangle(position.x, position.y,
            this.shipSize.x, this.shipSize.y),
        this.shipCenter
      );
    };

    ShipViewGenerator.prototype.generateDamageAnimation = function(
        firstPosition,
        rows, cols,
        timePerFrame) {

      if (!this.damageFrames) {
        this.damageFrames = this.generateDamageFrames(firstPosition, rows, cols);
      }
      return new Animation(this.damageFrames, timePerFrame, false);

    };

    ShipViewGenerator.prototype.generateDamageFrames = function(
        firstPosition, rows, cols) {

      this.damageFrames = splitter.split(
        this.image,
        firstPosition,
        this.shipSize,
        rows, cols,
        this.shipCenter
      );

      return this.damageFrames;
    };

    return ShipViewGenerator;
});
