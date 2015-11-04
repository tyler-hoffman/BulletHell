define(['d2/utils/vector'], function(Vector) {

  var tempVec = new Vector();

  var SimpleRectangle = function(x, y, width, height) {
    this.set(x, y, width, height);
  };

  SimpleRectangle.prototype.set = function(x, y, width, height) {
    x = x || 0;
    if (typeof x === 'number') {
      this.x = x;
      this.y = y || 0;
      this.width = width || 0;
      this.height = height || 0;
    } else {
      this.x = x.x;
      this.y = x.y;
      this.width = x.width;
      this.height = x.height;
    }
    return this;
  };

  SimpleRectangle.prototype.scale = function(amount) {
    this.x *= amount;
    this.y *= amount;
    this.width *= amount;
    this.height *= amount;

    return this;
  };

  SimpleRectangle.prototype.translate = function(x, y) {
    this.x += x;
    this.y += y;

    return this;
  };

  SimpleRectangle.prototype.position = function(x, y) {
    this.x = x;
    this.y = y;

    return this;
  };

  SimpleRectangle.prototype.size = function(width, height) {
    this.width = width;
    this.height = height;
    return this;
  };

  SimpleRectangle.prototype.containsRectangle = function(other) {
    return other.x >= this.x
        && other.x + other.width <= this.x + this.width
        && other.y >= this.y
        && other.y + other.height <= this.y + this.height;
  };

  SimpleRectangle.prototype.intersectsRectangle = function(other) {
    return other.x + other.width >= this.x
        && other.x <= this.x + this.width
        && other.y + other.height >= this.y
        && other.y <= this.y + this.height;
  };

  SimpleRectangle.prototype.isEmpty = function() {
    return this.width == 0 || this.height == 0;
  };

  SimpleRectangle.prototype.x1 = function() {
    return this.x;
  };

  SimpleRectangle.prototype.y1 = function() {
    return this.y;
  };

  SimpleRectangle.prototype.x2 = function() {
    return this.x + this.width;
  };

  SimpleRectangle.prototype.y2 = function() {
    return this.y + this.height;
  };

  SimpleRectangle.prototype.getCorner = function(index, dest) {
    dest = dest || new Vector();
    switch(index) {
      case 0:
        return dest.set(this.x1(), this.y1());
        break;
      case 1:
        return dest.set(this.x2(), this.y1());
        break;
      case 2:
        return dest.set(this.x2(), this.y2());
        break;
      case 3:
        return dest.set(this.x1(), this.y2());
        break;
    }
  };

  SimpleRectangle.prototype.getIntersection = function(other, dest) {
    dest = dest || new SimpleRectangle;

    var x1 = Math.max(this.x, other.x),
        x2 = Math.min(this.x + this.width, other.x + other.width),
        y1 = Math.max(this.y, other.y),
        y2 = Math.min(this.y + this.height, other.y + other.height);

    if (x1 <= x2 && y1 <= y2) {
      dest.set (x1, y1, x2 - x1, y2 - y1);
    } else {
      dest.set(0, 0, 0, 0);
    }

    return dest;
  };

  /**
   * Set rectangle to the bounding box of the rectangle,
   * given a rotation. Note: This does change the size,
   * and does not retain any rotation info, so repeated calls
   * will likely result in a huge meaningless rectangle.
   *
   * Pro-tip: use a secondary rectnagle, set it equal to
   * the one you want a bounding box for, then call bounds
   *
   * @param {Rectangle} rotation Rotation of the rectangle
   */
  SimpleRectangle.prototype.getBounds = function(rotation) {
    if (rotation) {
      var xMin = Number.MAX_VALUE,
          xMax = Number.MIN_VALUE,
          yMin = Number.MAX_VALUE,
          yMax = Number.MIN_VALUE;

      for (var i = 0; i < 4; i++) {
        this.getCorner(i, tempVec).rotate(rotation);
        if (tempVec.x < xMin) {
          xMin = tempVec.x;
        }
        if (tempVec.x > xMax) {
          xMax = tempVec.x;
        }
        if (tempVec.y < yMin) {
          yMin = tempVec.y;
        }
        if (tempVec.y > yMax) {
          yMax = tempVec.y;
        }
      }

      this.set(
        xMin,
        yMin,
        xMax - xMin,
        yMax - yMin
      );
    }

    return this;
  };

  SimpleRectangle.prototype.snap = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);

    return this;
  };

  return SimpleRectangle;
});
