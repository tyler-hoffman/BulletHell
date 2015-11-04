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

      // get shorthand for a few things
      var rectTexture = rectActor.getTextureRegion(),
          rectPosition = rectActor.position,
          circlePosition = circleActor.position,
          radius = circleActor.radius * circleActor.scale.x / rectActor.scale.x,
          image = this.registerImage(rectTexture.image);

      // get vector for circle position relative to rectangle
      tempVector.set(circlePosition)
          .subtract(rectPosition)
          .scale(1 / rectActor.scale.x)
          .rotate(-rectActor.rotation);


      /*
       * Create start/end points for loop for the intersection
       * we want to check.
       *
       * Convert vector from actor-space to actor's image-space
       * and make sure we check the largest rectangle needed
       */
      start.set(tempVector)
          .subtract(radius, radius)
          .add(rectTexture.center)
          .clamp(0, 0, rectActor.view.width, rectActor.view.height)
          .add(rectTexture.x, rectTexture.y)
          .floor();

      end.set(tempVector)
          .add(radius, radius)
          .add(rectTexture.center)
          .clamp(0, 0, rectActor.view.width, rectActor.view.height)
          .add(rectTexture.x, rectTexture.y)
          .ceil();

      // set pessimistic min/max x/y
      var xMin = end.x,
          xMax = start.x,
          yMin = end.y,
          yMax = start.y;

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

        /*
         * set the data and then translate back from
         * actor's image-space to actor-space
         */
        dest.set(xMin, yMin, xMax - xMin + 1, yMax - yMin + 1)
            .translate(-rectTexture.x - rectTexture.center.x,
                -rectTexture.y - rectTexture.center.y);
      } else {
        // no intersection
        dest.set(0, 0, 0, 0);
      }

      return dest;
    };

    return RectangleToCircleDetector;
});
