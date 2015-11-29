define([
    'd2/actors/actor',
    'd2/actors/controllers/physics/velocityController',
    'd2/rendering/textureRegion',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'd2/actors/actorEvent',
    'image!images/bullets.png'
  ], function(Actor, VelocityController, TextureRegion,
        Rectangle, Vector, ActorEvent, image) {

    var regions = [
      new TextureRegion(
        image,
        new Rectangle(116, 17, 1, 1),
        new Vector(0.5, 0.5)
      ),
      new TextureRegion(
        image,
        new Rectangle(117, 17, 2, 2),
        new Vector(1, 1)
      ),
      new TextureRegion(
        image,
        new Rectangle(119, 17, 3, 3),
        new Vector(1.5, 1.5)
      )
    ];

    var randomRegion = function() {
      var index = Math.floor(Math.random() * regions.length);
      return regions[index];
    };

    var Star = function(position) {
      Actor.call(this, null, position);
      this.collisionBits = 0;
      this.controller = new VelocityController(this.position, new Vector());
      this.randomize();
    };

    Star.prototype = Object.create(Actor.prototype);

    Star.prototype.randomize = function() {
      var index = Math.floor(Math.random() * regions.length);
      this.view = regions[index];

      var speed = (index + 2) * (50 + Math.random() * 25);
      var direction = Math.PI / 2 + Math.random() * 0.06 - 0.03;
      this.controller.velocity
        .set(speed, 0)
        .rotate(direction);
      this.rotation = Math.random() * Math.PI;
    };

    Star.prototype.update = function(delta, gameState) {
      Actor.prototype.update.call(this, delta, gameState);

      var bounds = gameState.worldBounds;
      if (this.position.y > bounds.height) {
        this.isAlive = false;
        this.notifyObservers(ActorEvent.createDestroyEvent(this));
      }
    };

    return Star;
});
