define([

], function() {

  const ALPHA_CHANNEL   = 3;
  const ALPHA_THRESHOLD = 1;

  var CollisionDetector = function() {
    this.images = {};
  };

  CollisionDetector.prototype.registerImage = function(image) {
    if (!this.images[image]) {
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);
      var grid = [];
      for (var row = 0; row < image.width; row++) {
        grid.push([]);
        for (var col = 0; col < image.height; col++) {
          grid[row].push(context.getImageData(
              col, row, 1, 1).data[ALPHA_CHANNEL]);
        }
      }
      this.images[image] = grid;
      console.log(grid)
    }
    return this.images[image];
  };

  CollisionDetector.prototype.unregisterImage = function(image) {
    delete this.images[image];
  };

  return CollisionDetector;
});
