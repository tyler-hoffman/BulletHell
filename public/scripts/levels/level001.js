define([
    'waves/level',
    'd2/utils/vector',
    'ships/bossShip',
    'ships/spinGuy',
    'ships/behaviors/moveAndDie',
    'ships/behaviors/spinAndMove'
  ], function(Level, Vector, BossShip, SpinShip, MoveAndDie, SpinAndMove) {

    const LEVEL_NAME = 'level_001: prelude';

    var createDownwardEnemy = function(startPosition, endPosition) {
      var enemy = new BossShip(startPosition);
      enemy.setController(new MoveAndDie(enemy, 1000, endPosition));
      return enemy;
    };

    var Level001 = function(shipCounter, worldBounds) {
      Level.call(this, shipCounter, LEVEL_NAME);

      var padding = new Vector(30, 20),
          top = worldBounds.y - padding.y,
          bottom = worldBounds.height + padding.y,
          left = worldBounds.x - padding.x,
          right = worldBounds.x + padding.x;

      var wave = this.newWave();

      for (var i = 0; i < 5; i++) {
        // closure to handle i
        (function(i) {
          wave.whenShipsLeft(0, 1, function() {
            var x = 100 + i * (worldBounds.width - 200) / 4;
            return createDownwardEnemy(new Vector(x, top), new Vector(x, bottom));
          });
        })(i);
      }

      var topCenter = new Vector(worldBounds.width / 2, top),
          leftMid = new Vector(worldBounds.width / 4, 200),
          rightMid = new Vector(leftMid.x * 3, 200);

      this.newWave()
        .whenShipsLeft(0, 2, function() {
          var spinner = new SpinShip(topCenter);
          spinner.setController(new SpinAndMove(
            spinner, 200,
            [leftMid, rightMid],
            3
          ));
          return spinner;
        });

    };

    Level001.prototype = Object.create(Level.prototype);

    return Level001;
});
