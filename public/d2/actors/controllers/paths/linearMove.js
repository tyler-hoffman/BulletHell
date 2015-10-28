"use strict"

/**
 * LinearMove is a Script Step.
 * It is used to move a subject Vector toward a destination.
 * The step is complete once the subject Vector reaches the destination.
 */
define([
    'd2/utils/vector'
  ], function(Vector) {

    var temp = new Vector();

    /**
     * Create a new LinearMove
     * @param {Vector} destination Target destination
     * @param {Number} velocity Velocity at which to update subject
     */
    var LinearMove = function(destination, velocity) {

      this.destination = new Vector().set(destination);
      this.velocity = velocity;
      this.isComplete = false;
    };

    /**
     * Update the step, moving the subject vector toward the destination
     * @param {Vector} position The subject Vector
     * @param {Number} deltaTime The amount of time to update for
     * @return {Number} Returns the amount of time unused by the step.
     *    This will be zero unless the step completes.
     */
    LinearMove.prototype.update = function(position, deltaTime) {
      var destination = this.destination,
          maxDistance = deltaTime * this.velocity,
          distance = temp.set(destination)
              .subtract(position)
              .length();

      if (distance <  maxDistance) {
        var timeUsed = distance / maxDistance;

        position.set(destination);
        deltaTime -= timeUsed * deltaTime;
      } else {
        var theta = Math.atan2(destination.y - position.y,
            destination.x - position.x);

        position.add(temp.set(Math.cos(theta), Math.sin(theta))
            .scale(maxDistance));

        deltaTime = 0;
      }
      return deltaTime;
    };

    return LinearMove;
});
