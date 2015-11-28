define([
    'd2/collections/imageBasedActorManager',
    'd2/actors/actorEvent',
    'd2/actors/controllers/physics/velocityController',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'd2/collisionDetection/rectangleToCircleDetector',
    'ships/dragonWing',
    'text/gameText',
    'd2/utils/quadTree',
    'd2/rendering/rotatedRenderer',
    'emitters/emitEvent',
    'utils/renderInfo',
    'levels/level001',
    'shaders/rotatedShader',
    'd2/scenes/scene'
  ], function(ImageBasedActorManager, ActorEvent, VelocityController,
        Rectangle, Vector, Detector,
        DragonWing, GameText, QuadTree,
        DefaultRenderer, EmitEvent,
        RenderInfo, Level001, DefaultShader, Scene) {

    const SHIP_SPEED    = 300;
    const BULLET_SPEED  = 200;
    const MAGNIFICATION = 4;

    var GameplayScreen = function(canvas, animator, keyboard) {
      Scene.call(this, canvas, animator);
      this.keyboard = keyboard;
      this.actorManager = new ImageBasedActorManager();
      this.shaderProgram = new DefaultShader(this.gl).getProgram();
      this.detector = new Detector();
      var worldBounds = new Rectangle(0, 0, this.width, this.height);
      this.quadTree = new QuadTree(worldBounds, 10, 10);

      this.gameState = {
        worldBounds: worldBounds
      };

      var player = new DragonWing(
          new Vector(this.width / 2, this.height * 0.75));

      player.controller = new VelocityController(player.position, 100);
      this.setPlayer(player);


      var enemyShips = this.enemyShips = [];
      // var bossVelocity = 80;
      // var createEnemyController = function(subject) {
      //   return new Script(subject)
      //       .wait(0.2)
      //       .addStep(new LinearMove(new Vector(300, 300), bossVelocity))
      //       .addStep(new Repeat(5)
      //           .ifElse(function() {
      //               return player.position.y < subject.position.y;
      //             },
      //             new LinearMove(new Vector(100, 600), bossVelocity),
      //             new LinearMove(new Vector(100, 100), bossVelocity)
      //           )
      //           .addStep(new LinearMove(new Vector(100, 100), bossVelocity))
      //           .addStep(new LinearMove(new Vector(100, 300), bossVelocity))
      //           .addStep(new Repeat(2)
      //               .addStep(new LinearMove(new Vector(300, 300), bossVelocity))
      //               .addStep(new LinearMove(new Vector(100, 300), bossVelocity))
      //           )
      //         );
      // };
      // var width = this.width;
      // var left = new Vector(width / 4, 100),
      //     right = new Vector(left.x * 3, 100);
      //
      // var xCenter = this.width / 2;
      // var enemyShips = this.enemyShips;
      // this.level = new Level(function() {
      //   return enemyShips.length;
      // }).newWave()
      //     .afterTime(1, new function() {
      //       var ship = new SpinShip(new Vector(xCenter, -100));
      //       ship.setController(new SpinAndMove(ship, 200, [left, right], 3));
      //       return ship;
      //     })
      //     .whenShipsLeft(0, 1, new function() {
      //       var ship = new BossShip(new Vector(xCenter, 0));
      //       ship.setController(new MoveAndDie(ship, 300, new Vector(100, 2000)));
      //       return ship;
      //     })
      //     .whenShipsLeft(0, 1, new function() {
      //       var ship = new BossShip(new Vector(xCenter, 0));
      //       ship.setController(createEnemyController(ship));
      //       return ship;
      //     })
      //     .end();
      this.level = new Level001(function() {
        return enemyShips.length
      }, worldBounds);
      this.level.addObserver(this);

      var actorManager = this.actorManager;
      this.textField = new GameText('', 2, function(letters) {
        for (var i = 0; i < letters.length; i++) {
          actorManager.addActor(letters[i]);
        }
      });
      this.textField.depth = .2;

      this.emitters = [];
      var gameState = this.gameState;

      this.renderer = new DefaultRenderer(this.gl, this.shaderProgram);
      this.renderer.setResolution(this.width, this.height);

      var that = this;
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

    GameplayScreen.prototype = new Scene();

    GameplayScreen.prototype.onFrame = function(deltaTime) {
      this.level.update(deltaTime);
      this.renderInfo.update(deltaTime)
      this.quadTree.clear();
      this.handleInput(deltaTime);
      this.updateActors(deltaTime, this.gameState);
      this.updateEmitters(deltaTime);
      this.handleCollisions();
      this.removeDeadActors();
      this.renderAll();
    };

    GameplayScreen.prototype.notify = function(event) {

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

        case 'actorEvent.spawn':
          this.addEnemyShip(event.actor);
          break;

        default:
          console.log('Unknown Event Dispatched');
          break;
      }
    };

    GameplayScreen.prototype.setPlayer = function(ship) {
      ship.setBufferBitAsPlayer(true);
      this.addShip(ship);
      this.player = ship;
    };

    GameplayScreen.prototype.addEnemyShip = function(enemy) {
      enemy.setBufferBitAsPlayer(false);
      this.addShip(enemy);

      enemy.rotation = Math.PI;
      this.enemyShips.push(enemy);
    };

    GameplayScreen.prototype.addShip = function(ship) {
      ship.addObserver(this);
      ship.setScale(MAGNIFICATION);
      ship.updateBounds();

      this.actorManager.addActor(ship);
    };

    GameplayScreen.prototype.unregisterShip = function(ship) {
      ship.removeObserver(this);
    };

    GameplayScreen.prototype.updateActors = function(deltaTime, gameState) {
      this.actorManager.forEach(function(actor) {
        actor.update(deltaTime, gameState);
      });

      if (this.player) {
        var bounds = this.gameState.worldBounds,
            textureRegion = this.player.view.getTextureRegion(),
            scale = this.player.scale,
            topLeft = new Vector()
              .set(textureRegion.center)
              .multiply(scale),
            bottomRight = new Vector(textureRegion.width, textureRegion.height)
              .multiply(scale)
              .subtract(topLeft);

        this.player.position.clamp(
          bounds.x + topLeft.x,
          bounds.y + topLeft.y,
          bounds.width - bottomRight.x,
          bounds.height - bottomRight.y
        );
      }
    };

    GameplayScreen.prototype.handleCollisions = function() {
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

    GameplayScreen.prototype.handleCollisionsForShip = function(ship) {
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

    GameplayScreen.prototype.updateEmitters = function(deltaTime) {
      for (var i = 0; i < this.emitters.length; i++) {
        this.emitters[i].update(deltaTime);
      }
    };

    GameplayScreen.prototype.handleInput = function(deltaTime) {
      if (this.player && this.player.isAlive) {
        this.player.controller.setVelocity(this.keyboard.getVelocity())
            .scale(SHIP_SPEED);
      }
    };

    GameplayScreen.prototype.removeDeadActors = function() {
      this.actorManager.removeIf(function(actor) {
        return !actor.isAlive;
      });
    };

    GameplayScreen.prototype.renderAll = function() {
      this.actorManager.renderAll(this.renderer);
    };

    return GameplayScreen;

});
