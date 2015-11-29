define([
    'd2/ui/ninePatch',
    'image!images/bullets.png'
  ], function(NinePatch, image) {

    var borderVerticalLines = [123, 125, 126, 128],
        borderHorizontalLines = [59, 61, 62, 64];

    var HealthBar = function() {

      this.border = new NinePatch(image, borderHorizontalLines, borderVerticalLines);

      this.childViews = [this.border];
    };

    HealthBar.prototype.setSize = function(x, y) {
      this.border.setSize(x, y);
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
      this.childViews.forEach(function(view) {
        view.setPosition(x, y | x);
      });
      return this;
    };

    return HealthBar;
});
