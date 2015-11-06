define([
    'waves/level',
    'ships/bossShip'
  ], function(Level, BossShip) {

    var Level001 = function() {
      this.newWave()
          .afterTime(0, new BossShip, )
    };

    Level001.prototype = new Level();

    return Level001;
});
