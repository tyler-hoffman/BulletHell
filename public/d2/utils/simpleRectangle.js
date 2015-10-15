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
  };

  SimpleRectangle.prototype.position = function(x, y) {
    this.x = x;
    this.y = y;
  };

  SimpleRectangle.prototype.size = function(width, height) {
    this.width = width;
    this.height = height;
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

  return SimpleRectangle;
});
