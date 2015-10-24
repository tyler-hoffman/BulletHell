"use strict"

define(['d2/utils/vector'], function(Vector) {

  var temp = new Vector();

  var MoveTo = function(x, y) {
    this.destination = new Vector().set(x, y);
  }

  MoveTo.prototype.setSettings = function(maxVelocity) {
    this.maxVelocity = maxVelocity;
  };

  MoveTo.prototype.update = function(deltaTime, position, velocity) {
    var destination = this.destination;

    var maxDistance = deltaTime * this.maxVelocity;
    var distance = temp.set(destination)
        .subtract(position)
        .length();

    if (distance <  maxDistance) {
      position.set(destination);
      var timeUsed = distance / maxDistance;
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

  return MoveTo;
});
