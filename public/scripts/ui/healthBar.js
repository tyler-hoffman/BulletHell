define([
    'd2/ui/ninePatch',
    'd2/utils/vector',
    'image!images/bullets.png'
  ], function(NinePatch, Vector, image) {

    var borderVerticalLines = [123, 125, 126, 128],
        borderHorizontalLines = [59, 61, 62, 64],
        innerVerticalLines = [124, 125, 127, 128],
        innerHorizontalLines = [55, 56, 58, 59];

    var HealthBar = function() {

      this.border = new NinePatch(image, borderHorizontalLines, borderVerticalLines);
      this.inside = new NinePatch(image, innerHorizontalLines, innerVerticalLines);

      this.innerSize = new Vector(1, 1);
      this.percentFull = 1;

      this.childViews = [this.border, this.inside];
    };

    HealthBar.prototype.setSize = function(x, y) {
      this.border.setSize(x, y);

      if (typeof x !== 'number') {
        y = x.y;
        x = x.x;
      }

      this.innerSize.set(x - 4, y - 4);

      this.updateFill();

      return this;
    };

    HealthBar.prototype.setPercentage = function(percentFull) {
      this.percentFull = percentFull;
      this.updateFill();
      return this;
    };

    HealthBar.prototype.setDepth = function(depth) {
      this.childViews.forEach(function(view) {
        view.setDepth(depth);
      });
      return this;
    };

    HealthBar.prototype.setScale = function(x, y) {
      this.childViews.forEach(function(view) {
        view.setScale(x, y | x);
      });
      return this;
    };

    HealthBar.prototype.setPosition = function(x, y) {
      this.border.setPosition(x, y);
      this.inside.setPosition(
        x + 2 * this.border.scale.x,
        y + 2 * this.border.scale.y
      );
      return this;
    };

    HealthBar.prototype.updateFill = function() {
      this.inside.setSize(this.innerSize.x * this.percentFull, this.innerSize.y);
    };

    return HealthBar;
});
