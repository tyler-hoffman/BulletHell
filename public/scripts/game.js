define([
    'd2/collections/imageBasedActorManager',
    'd2/actors/actorEvent',
    'd2/utils/animator',
    'd2/utils/simpleRectangle',
    'd2/utils/vector',
    'd2/collisionDetection/PixelPerfectDetector',
    'ships/dragonWing',
    'ships/bossShip',
    'd2/text/monoFont',
    'd2/text/textField',
    'd2/utils/quadTree',
    'd2/rendering/defaultRenderer',
    'emitters/emitEvent',
    'keyManager/keyManager',
    'utils/renderInfo',
    'image!images/letters.png',
    'shaders/defaultShader'
  ], function(ImageBasedActorManager, ActorEvent, Animator,
        SimpleRectangle, Vector, Detector,
        DragonWing, BossShip, MonoFont, TextField, QuadTree,
        DefaultRenderer, EmitEvent,
        KeyManager, RenderInfo, fontImage, DefaultShader) {

    const LEFT          = 37;
    const UP            = 38;
    const RIGHT         = 39;
    const DOWN          = 40;
    const SHIP_SPEED    = 300;
    const BULLET_SPEED  = 200;
    const MAGNIFICATION = 2;


    var Game = function(canvas) {
      this.canvas = canvas;
      this.width = canvas.width;
      this.height = canvas.height;
      this.font = new MonoFont();
      this.font.addLetters(6, 8, 10, 9, 32, fontImage);


      this.gl = canvas.getContext('webgl');
      this.actorManager = new ImageBasedActorManager();
      this.shaderProgram = new DefaultShader(this.gl).getProgram();
      this.detector = new Detector();
      var worldBounds = new SimpleRectangle(0, 0, this.width, this.height);
      this.quadTree = new QuadTree(worldBounds, 10, 10);

      this.gameState = {
        worldBounds: worldBounds
      };

      this.ship = new DragonWing(new Vector(this.width / 2, this.height * 0.75));
      this.actorManager.addActor(this.ship);
      this.ship.setScale(MAGNIFICATION);
      this.ship.updateBounds();

      this.boss = new BossShip(new Vector(this.width / 2, this.height * 0.25));
      this.actorManager.addActor(this.boss);
      this.boss.setScale(MAGNIFICATION);
      this.boss.updateBounds();


      var actorManager = this.actorManager;
      this.textField = new TextField(this.font, '[Demo]', 8, function(letters) {
        for (var i = 0; i < letters.length; i++) {
          actorManager.addActor(letters[i]);
        }
      });

      this.emitters = [];
      var gameState = this.gameState;

      // var emitter = new Emitter(.1, function(position, velocity, fromTime) {
      //
      //   var newBullet = new RedBullet(
      //     position, velocity.scale(BULLET_SPEED)
      //   );
      //   newBullet.update(fromTime, gameState);
      //   newBullet.setScale(MAGNIFICATION);
      //   newBullet.depth = 0.55;
      //   actorManager.addActor(newBullet);
      //
      // });

      //emitter.setPosition(new Vector(this.width / 2, this.height / 2));

      // emitter.addDecorator(new Swinger(4, Math.PI / 2));
      // emitter.addDecorator(new Splitter(2, Math.PI / 2));
      //
      //emitter.addDecorator(new Swinger(1, 0.4));
      //emitter.addDecorator(new Splitter(10));
      //emitter.addDecorator(new Mirrorer(Math.PI / 2));
      //this.emitters.push(emitter);

      this.renderer = new DefaultRenderer(this.gl, this.shaderProgram);
      this.renderer.setResolution(this.width, this.height);
      this.frame = 0;
      this.animator = new Animator(this.onFrame, this);

      var keyManager = new KeyManager();
      this.keyManager = keyManager;
      keyManager.registerAction(LEFT);
      keyManager.registerAction(UP);
      keyManager.registerAction(RIGHT);
      keyManager.registerAction(DOWN);

      keyManager.registerKey(LEFT, LEFT);
      keyManager.registerKey(UP, UP);
      keyManager.registerKey(RIGHT, RIGHT);
      keyManager.registerKey(DOWN, DOWN);

      var that = this;
      this.renderInfo = new RenderInfo(1, function(fps) {
        console.log(that.actorManager.size()
            + ' items rendered at '
            + fps + ' fps');
      });

      this.addShip(this.ship, true);
      this.addShip(this.boss);
      this.animator.start();
    };

    Game.prototype.onFrame = function(deltaTime) {
      this.frame++;
      if (this.frame > 9000) {
        this.animator.stop();
      };

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
          if (event.actor === this.ship) {
            console.log('you died!')
            this.ship = null;
          }
          break;

        case EmitEvent.EMIT:
          //console.log(event);
          event.emitted.setScale(MAGNIFICATION);
          this.actorManager.addActor(event.emitted);
          break;
      }
    };

    Game.prototype.addShip = function(ship, isPlayer) {
      ship.addObserver(this);

      ship.rotation = (isPlayer)? 0: Math.PI;
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
      var ship = this.ship;

      this.actorManager.forEach(function(actor) {
        quadTree.insert(actor);
      });


      if (this.ship) {
        var collisions = quadTree.getCollisions(this.ship);
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
      }
    };

    Game.prototype.updateEmitters = function(deltaTime) {
      for (var i = 0; i < this.emitters.length; i++) {
        this.emitters[i].update(deltaTime);
      }
    };

    Game.prototype.handleInput = function(deltaTime) {
      if (this.ship) {
        var x = 0,
            y = 0;

        if (this.keyManager.isDown(LEFT)) {
          x -= 1;
        }
        if (this.keyManager.isDown(RIGHT)) {
          x += 1;
        }
        if (this.keyManager.isDown(UP)) {
          y -= 1;
        }
        if (this.keyManager.isDown(DOWN)) {
          y += 1;
        }

        this.ship.velocity.set(x, y)
            .normalize()
            .scale(SHIP_SPEED);
      }
    };

    Game.prototype.removeDeadActors = function() {
      this.actorManager.removeIf(function(actor) {
        return !actor.isAlive;
      });
    };

    Game.prototype.renderAll = function() {

      var renderer = this.renderer;
      this.actorManager.renderAll(renderer);
    };

    return Game;

});
