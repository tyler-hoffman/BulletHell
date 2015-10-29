define(function() {

  var Plane = function(x, y, height, width, depth) {
    this.points = new Float32Array(18);
    this.setRectangle(x, y, height, width, depth);
  };

  Plane.prototype.setRectangle = function(x, y, width, height, depth) {
    depth = depth || 0;
    x = x || 0;

    if (typeof x !== 'number') {
      /*
       * Assume x is a rectangle, and y was given the depth.
       * Reset variables appropriately before continuing.
       */
      depth = y;
      y = x.y;
      width = x.width;
      height = x.height
      x = x.x;
    }

    var x1 = x,
        x2 = x + width,
        y1 = y,
        y2 = y + height;

    var rect = this.points;
    rect[0] = x1; rect[1] = y1; rect[2] = depth;
    rect[3] = x2; rect[4] = y1; rect[5] = depth;
    rect[6] = x1; rect[7] = y2; rect[8] = depth;
    rect[9] = x1; rect[10] = y2; rect[11] = depth;
    rect[12] = x2; rect[13] = y1; rect[14] = depth;
    rect[15] = x2; rect[16] = y2; rect[17] = depth;
  };

  return Plane;
});
