/**
 * Collision detection between rotated rectangles
 * and circles.
 */
define([
    'd2/collisionDetection/collisionDetector',
    'd2/utils/rectangle',
    'd2/utils/vector'
  ], function(CollisionDetector, Rectangle, Vector) {

    const ALPHA_CHANNEL   = 3;
    const ALPHA_THRESHOLD = 1;

    var tempVector = new Vector(),
        start = new Vector(),
        end = new Vector();

    var RectangleToCircleDetector = function() {
      CollisionDetector.call(this);
    };

    RectangleToCircleDetector.prototype =  new CollisionDetector();

    RectangleToCircleDetector.prototype.getIntersection = function(
        rectActor, circleActor, dest) {

      dest = dest || new Rectangle();

      var rectTexture = rectActor.getTextureRegion(),
          circleTexture = circleActor.getTextureRegion(),
          rectImage = rectTexture.image,
          rectRotation = rectActor.rotation,
          rectPosition = rectActor.position,
          circlePosition = circleActor.position;

      var image = this.registerImage(rectImage);

      tempVector.set(circlePosition)
          .subtract(rectPosition);

      /*
       * TODO: DRAW IMAGES FACING RIGHT SO I DON'T HAVE TO SUBTRACT HERE
       * Otherwise, this might come back to haunt me
       */
      var theta = tempVector.theta() - rectActor.rotation,
          dist = tempVector.length() / rectActor.scale.x,
          xPos = dist * Math.cos(theta) + rectTexture.center.x,
          yPos = dist * Math.sin(theta) + rectTexture.center.y,
          radius = circleActor.radius * circleActor.scale.x / rectActor.scale.x;

      //console.log(xPos, yPos)

      start.set(Math.floor(xPos) - radius, Math.floor(yPos) - radius)
          .clamp(0, 0, rectActor.view.width, rectActor.view.height);
      end.set(Math.ceil(xPos) + radius, Math.ceil(yPos) + radius)
          .clamp(0, 0, rectActor.view.width, rectActor.view.height);

      var xMin = end.x,
          xMax = start.x,
          yMin = end.y,
          yMax = start.y;

      //console.log(start, end)


      for (var row = start.y; row < end.y; row++) {
        for (var col = start.x; col < end.x; col++) {
          if (image[row][col] > ALPHA_THRESHOLD) {
            xMin = Math.min(xMin, col);
            xMax = Math.max(xMax, col);
            yMin = Math.min(yMin, row);
            yMax = Math.max(yMax, row);
          }
        }
      }

      if (xMax >= xMin && yMax >= yMin) {
        dest.set(xMin, yMin, xMax - xMin + 1, yMax - yMin + 1);
        console.log(rectPosition, circlePosition, start, end)
        console.log(xPos, yPos, dest)
        //console.log(dest)
      } else {
        dest.set(0, 0, 0, 0);
      }

      return dest;
    };

    return RectangleToCircleDetector;
});
