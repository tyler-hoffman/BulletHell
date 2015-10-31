define([
    'd2/collections/imageBasedActorManager',
    'd2/actors/actorEvent',
    'd2/actors/controllers/physics/velocityController',
    'd2/actors/controllers/paths/script',
    'd2/actors/controllers/paths/linearMove',
    'd2/actors/controllers/paths/repeat',
    'd2/actors/controllers/paths/ifElse',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'd2/collisionDetection/PixelPerfectDetector',
    'ships/dragonWing',
    'ships/bossShip',
    'text/gameText',
    'd2/utils/quadTree',
    'd2/rendering/defaultRenderer',
    'emitters/emitEvent',
    'controls/keyboardController',
    'utils/renderInfo',
    'shaders/defaultShader',
    'd2/scenes/scene'
  ], function(ImageBasedActorManager, ActorEvent, VelocityController,
        Script, LinearMove, Repeat, IfElse,
        SimpleRectangle, Vector, Detector,
        DragonWing, BossShip, GameText, QuadTree,
        DefaultRenderer, EmitEvent,
        KeyboardController, RenderInfo, DefaultShader, Scene) {

    const SHIP_SPEED    = 300;
    const BULLET_SPEED  = 200;
    const MAGNIFICATION = 4;

    var Game = function(canvas, animator) {
      Scene.call(this, canvas, animator);


      this.actorManager = new ImageBasedActorManager();
      this.shaderProgram = new DefaultShader(this.gl).getProgram();
      this.detector = new Detector();
      var worldBounds = new SimpleRectangle(0, 0, this.width, this.height);
      this.quadTree = new QuadTree(worldBounds, 10, 10);

      this.gameState = {
        worldBounds: worldBounds
      };

      var player = new DragonWing(
          new Vector(this.width / 2, this.height * 0.75));
      player.controller = new VelocityController(player.position, 100);
      this.setPlayer(player);


      this.enemyShips = [];
      var bossVelocity = 200;
      var boss = new BossShip(new Vector(this.width / 2, this.height * 0.25));
      boss.controller = new Script(boss.position)
          .addStep(new LinearMove(new Vector(300, 300), bossVelocity))
          .addStep(new Repeat(5)
              .addStep(new IfElse(function() {
                  return player.position.y < boss.position.y;
                },
                new LinearMove(new Vector(100, 600), bossVelocity),
                new LinearMove(new Vector(100, 100), bossVelocity)
              ))
              .addStep(new LinearMove(new Vector(100, 100), bossVelocity))
              .addStep(new LinearMove(new Vector(100, 300), bossVelocity))
              .addStep(new Repeat(2)
                  .addStep(new LinearMove(new Vector(300, 300), bossVelocity))
                  .addStep(new LinearMove(new Vector(100, 300), bossVelocity))
              )
            );
      this.addEnemyShip(boss);

      var actorManager = this.actorManager;
      this.textField = new GameText('', 2, function(letters) {
        for (var i = 0; i < letters.length; i++) {
          actorManager.addActor(letters[i]);
        }
      });

      this.emitters = [];
      var gameState = this.gameState;

      this.renderer = new DefaultRenderer(this.gl, this.shaderProgram);
      this.renderer.setResolution(this.width, this.height);

      var that = this;
      var keyboard = this.keyboard = new KeyboardController();
      keyboard.registerAction(keyboard.ENTER, function() {
        that.togglePlaying();
      });
      keyboard.registerAction(keyboard.SPACE, function() {
        that.togglePlaying();
      });

      var that = this;
      this.renderInfo = new RenderInfo(1, function(fps) {
        that.textField.setText('[' + Math.floor(that.renderInfo.fps) + ' fps]');
      });

      this.play();
    };

    Game.prototype = new Scene();

    Game.prototype.onFrame = function(deltaTime) {
      this.renderInfo.update(deltaTime)
      this.quadTree.clear();
      this.handleInput(deltaTime);
      this.updateActors(deltaTime, this.gameState);
      this.updateEmitters(deltaTime);
      this.handleCollisions();
      this.removeDeadActors();
      this.renderAll();
    };

    Game.prototype.notify = function(event) {

      switch (event.type) {

        case ActorEvent.DESTROY:
          this.unregisterShip(event.actor);
          if (event.actor === this.player) {
            console.log('you died!')
            this.player = null;
          } else {
            var index = this.enemyShips.indexOf(event.actor);
            this.enemyShips.splice(index, 1);
          }
          break;

        case EmitEvent.EMIT:
          event.emitted.setScale(MAGNIFICATION);
          this.actorManager.addActor(event.emitted);
          break;
      }
    };

    Game.prototype.setPlayer = function(ship) {
      ship.setBufferBitAsPlayer(true);
      this.addShip(ship);
      this.player = ship;
    };

    Game.prototype.addEnemyShip = function(enemy) {
      enemy.setBufferBitAsPlayer(false);
      this.addShip(enemy);

      enemy.rotation = Math.PI;
      this.enemyShips.push(enemy);
    };

    Game.prototype.addShip = function(ship) {
      ship.addObserver(this);
      ship.setScale(MAGNIFICATION);
      ship.updateBounds();

      this.actorManager.addActor(ship);
    };

    Game.prototype.unregisterShip = function(ship) {
      ship.removeObserver(this);
    };

    Game.prototype.updateActors = function(deltaTime, gameState) {
      this.actorManager.forEach(function(actor) {
        actor.update(deltaTime, gameState);
      });
    };

    Game.prototype.handleCollisions = function() {
      var quadTree = this.quadTree;

      this.actorManager.forEach(function(actor) {
        quadTree.insert(actor);
      });


      if (this.player) {
        this.handleCollisionsForShip(this.player);
      }

      for (var i = 0; i < this.enemyShips.length; i++) {
        this.handleCollisionsForShip(this.enemyShips[i]);
      }
    };

    Game.prototype.handleCollisionsForShip = function(ship) {
      var quadTree = this.quadTree,
          collisions = quadTree.getCollisions(ship);

      for (var i = 0; i < collisions.length; i++) {
        if (collisions[i] !== ship) {
          if (this.detector) {
            var intersection = this.detector.getIntersection(ship, collisions[i]);
            if (!intersection.isEmpty()) {
              // remove bullet and kill ship
              collisions[i].isAlive = false;
              ship.takeDamage(collisions[i].damage || 0);
            }
          }
        }
      }
    };

    Game.prototype.updateEmitters = function(deltaTime) {
      for (var i = 0; i < this.emitters.length; i++) {
        this.emitters[i].update(deltaTime);
      }
    };

    Game.prototype.handleInput = function(deltaTime) {
      if (this.player && this.player.isAlive) {
        this.player.controller.setVelocity(this.keyboard.getVelocity())
            .scale(SHIP_SPEED);
      }
    };

    Game.prototype.removeDeadActors = function() {
      this.actorManager.removeIf(function(actor) {
        return !actor.isAlive;
      });
    };

    Game.prototype.renderAll = function() {
      this.actorManager.renderAll(this.renderer);
    };

    return Game;

});
