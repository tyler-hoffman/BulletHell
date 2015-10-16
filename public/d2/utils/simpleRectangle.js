define(function() {

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

  return SimpleRectangle;
});
