define([
    'stars/star',
    'utils/resourcePool',
    'd2/utils/vector'
  ], function(Star, ResourcePool, Vector) {

    var temp = new Vector()
        randomPosition = function(worldBounds) {
          return temp.set(
            Math.random() * worldBounds.width,
            - Math.random() * 200
          );
        };

    var StarManager = function(worldBounds, actorManager, frequency) {

      this.worldBounds = worldBounds;
      this.actorManager = actorManager;
      this.frequency = frequency || 0.1;

      this.time = 0;

      var that = this;
      this.starPool = new ResourcePool(function() {
        // generator function
        var star = new Star(randomPosition(worldBounds));
        star.addObserver(that);
        star.setScale(2);
        return star;
      }, function(star) {
        // resetter function
        star.randomize();
        star.setPosition(randomPosition(worldBounds));
      });

    };

    StarManager.prototype.notify = function(event) {
      if (event.type === 'actorEvent.unspawn') {
        this.starPool.return(event.actor);
      }
    };

    StarManager.prototype.update = function(deltaTime) {
      this.time += deltaTime;
      while (this.time >= this.frequency / 10) {
        this.time -= this.frequency / 10;
        if (Math.random() < 1 / 10) {
          var star = this.starPool.generate();
          this.actorManager.addActor(star);
        }
      }

    };

    return StarManager;
});
