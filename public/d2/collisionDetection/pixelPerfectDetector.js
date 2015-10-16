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

      var intersection = this.intersection,
          textureRegionA = actorA.getTextureRegion(),
          textureRegionB = actorB.getTextureRegion(),
          imageA = textureRegionA.image,
          imageB = textureRegionB.image,
          boundsA = actorA.getBoundingBox(),
          boundsB = actorB.getBoundingBox();

      boundsA.getIntersection(boundsB, intersection);
      if (intersection.isEmpty()) {

        dest.set(0, 0, 0, 0);

      } else {

        this.registerImage(imageA);
        this.registerImage(imageB);

        this.rectA.set(intersection)
            .translate(-boundsA.x, -boundsA.y)
            .scale(1 / actorA.scale.x)
            .snap();

        this.rectB.set(intersection)
            .translate(-boundsB.x, -boundsB.y)
            .scale(1 / actorB.scale.x)
            .snap();

        intersection
            .translate(-boundsA.x, -boundsA.y)
            .scale(1 / actorA.scale.x)
            .snap();

        var xMin = intersection.width,
            xMax = intersection.x,
            yMin = intersection.height,
            yMax = intersection.y;

        var imageGridA = this.images[imageA],
            imageGridB = this.images[imageB];

        var xOffsetB = Math.floor(boundsB.x - boundsA.x),
            yOffsetB = Math.floor(boundsB.y - boundsA.y);

        

        for (var row = 0; row < intersection.height; row++) {
          for (var col = 0; col < intersection.width; col++) {
            var rowA = this.rectA.y + row + textureRegionA.y,
                colA = this.rectA.x + col + textureRegionA.x,
                rowB = this.rectB.y + row + textureRegionB.y,
                colB = this.rectB.x + col + textureRegionB.x;

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
