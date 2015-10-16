define([
    'd2/utils/simpleRectangle'
  ], function(Rectangle) {

    const ALPHA_CHANNEL   = 3;
    const ALPHA_THRESHOLD = 1;

    var PixelPerfectDetector = function() {
      this.intersection = new Rectangle();
      this.rectA = new Rectangle();
      this.rectB = new Rectangle();
      this.images = {};
    };

    PixelPerfectDetector.prototype.getIntersection =
        function(actorA, actorB, dest) {

      dest = dest || new Rectangle();

      var intersectionA = this.rectA,
          intersectionB = this.rectB;

      var textureRegionA = actorA.getTextureRegion(),
          textureRegionB = actorB.getTextureRegion(),
          imageA = textureRegionA.image,
          imageB = textureRegionB.image,
          boundsA = actorA.getBoundingBox(),
          boundsB = actorB.getBoundingBox();

      boundsA.getIntersection(boundsB, intersectionA);
      if (intersectionA.isEmpty()) {

        dest.set(0, 0, 0, 0);

      } else {

        this.registerImage(imageA);
        this.registerImage(imageB);

        intersectionB.set(intersectionA)
            .translate(-boundsB.x, -boundsB.y)
            .scale(1 / actorB.scale.x)
            .snap();

        intersectionA
            .translate(-boundsA.x, -boundsA.y)
            .scale(1 / actorA.scale.x)
            .snap();

        var xMin = intersectionA.width,
            xMax = intersectionA.x,
            yMin = intersectionA.height,
            yMax = intersectionA.y;

        var imageGridA = this.images[imageA],
            imageGridB = this.images[imageB];

        for (var row = 0; row < intersectionA.height; row++) {
          for (var col = 0; col < intersectionA.width; col++) {
            var rowA = intersectionA.y + row + textureRegionA.y,
                colA = intersectionA.x + col + textureRegionA.x,
                rowB = intersectionB.y + row + textureRegionB.y,
                colB = intersectionB.x + col + textureRegionB.x;

            if (imageGridA[rowA][colA] > ALPHA_THRESHOLD &&
                imageGridB[rowB][colB] > ALPHA_THRESHOLD) {
                  xMin = Math.min(xMin, col);
                  xMax = Math.max(xMax, col);
                  yMin = Math.min(yMin, row);
                  yMax = Math.max(yMax, row);
            }
          }
        }
        if (xMax >= xMin && yMax >= yMin) {
          dest.set(xMin, yMin, xMax - xMin + 1, yMax - yMin + 1);
        } else {
          dest.set(0, 0, 0, 0);
        }
      }

      return dest;
    };

    PixelPerfectDetector.prototype.registerImage = function(image) {
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
      }
    };

    PixelPerfectDetector.prototype.unregisterImage = function(image) {
      delete this.images[image];
    };

    return PixelPerfectDetector;
});
