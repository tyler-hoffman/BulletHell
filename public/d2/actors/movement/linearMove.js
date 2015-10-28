"use strict"

define([
    'd2/utils/vector'
  ], function(Vector) {

    var temp = new Vector();

    var LinearMove = function(destination, velocity) {

      this.destination = new Vector().set(destination);
      this.velocity = velocity;
      this.isComplete = false;
    };

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

    LinearMove.prototype.getState = function() {
      return this.position;
    };

    return LinearMove;
});
