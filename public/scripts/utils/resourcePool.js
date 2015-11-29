define(function() {

  var ResourcePool = function(generator, reset) {
    this.generator = generator;
    this.reset = reset;

    this.pool = [];
  };

  ResourcePool.prototype.generate = function() {
    if (this.pool.length) {
      var element = this.pool.pop();
      if (this.reset) {
        this.reset(element);
      } else if (element.reset) {
        element.reset();
      }
      return element;
    } else {
      return this.generator();
    }
  };

  ResourcePool.prototype.return = function(element) {
    this.pool.push(element);
  };

  return ResourcePool;
});
