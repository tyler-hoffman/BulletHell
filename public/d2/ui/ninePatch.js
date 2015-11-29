define([
    'd2/actors/actor',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'd2/rendering/textureRegion'
  ],function(Actor, Rectangle, Vector, TextureRegion) {

    var NinePatch = function(image, horizontalLines, verticalLines) {

      this.childViews = [];
      this.scale = new Vector(1, 1);
      this.position = new Vector();
      this.size = new Vector(
        horizontalLines[3] - horizontalLines[0],
        verticalLines[3] - verticalLines[0]
      );

      this.rotation = 0;
      this.depth = 0.5;

      this.leftMargin = horizontalLines[1] - horizontalLines[0];
      this.rightMargin = horizontalLines[3] - horizontalLines[2];
      this.topMargin = verticalLines[1] - verticalLines[0];
      this.bottomMargin = verticalLines[3] - verticalLines[2];

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          var texture = new TextureRegion(image, new Rectangle(
              verticalLines[j],
              horizontalLines[i],
              verticalLines[j + 1] - verticalLines[j],
              horizontalLines[i + 1] - horizontalLines[i]
          ));
          var childActor = new Actor(texture);
          this.childViews.push(childActor);
        }
      }

      this.update();
    };

    NinePatch.prototype.setSize = function(x, y) {
      this.size.set(x, y);
      this.update();
    };

    NinePatch.prototype.setScale = function(x, y) {
      this.scale.set(x, y);
      this.update();
    };

    NinePatch.prototype.setPosition = function(x, y) {
      this.position.set(x, y);
      this.update();
    };

    NinePatch.prototype.setDepth = function(depth) {
      this.childViews.forEach(function(child) {
        child.depth = depth;
      });
      return this;
    };

    NinePatch.prototype.update = function() {
      var pixelSize = new Vector()
            .set(this.size)
            .divide(this.scale),
          minWidth = this.leftMargin + this.rightMargin,
          minHeight = this.topMargin + this.bottomMargin,
          midWidth = pixelSize.x - minWidth,
          midHeight = pixelSize.y - minHeight;

      var verticalLines = [0, this.leftMargin, this.size.x - this.rightMargin, this.size.x],
          horizontalLines = [0, this.topMargin, this.size.y - this.bottomMargin, this.size.y];

      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
          var subActor = this.childViews[row * 3 + col];
          subActor.setPosition(
            this.position.x + verticalLines[col] * this.scale.x,
            this.position.y + horizontalLines[row] * this.scale.y
          );
          var textureRegion = subActor.getTextureRegion();
          textureRegion.width = verticalLines[col + 1] - verticalLines[col];
          textureRegion.height = horizontalLines[row + 1] - horizontalLines[row];
          subActor.updateBounds();
          subActor.setScale(this.scale);
        }
      }

    };

    return NinePatch;
});
