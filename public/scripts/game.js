define([
    'd2/collections/actorManager',
    'd2/rendering/defaultActorRenderer',
    'd2/utils/shaderCompiler',
    'd2/utils/animator',
    'd2/utils/rectangle',
    'd2/utils/simpleRectangle',
    'd2/utils/vector',
    'd2/collisionDetection/PixelPerfectDetector',
    'ships/dragonWing',
    'd2/text/monoFont',
    'd2/text/textField',
    'bullets/redBullet',
    'd2/utils/quadTree',
    'd2/rendering/defaultRenderer',
    'd2/rendering/textureRegion',
    'emitters/emitter',
    'emitters/rotator',
    'emitters/spreader',
    'keyManager/keyManager',
    'utils/renderInfo',
    'image!images/bullets.png',
    'image!images/letters.png',
    'text!shaders/vertex-shader.vert',
    'text!shaders/fragment-shader.frag'
  ], function(ActorManager, DefaultActorRenderer, ShaderCompiler, Animator,
        Rectangle, SimpleRectangle, Vector, Detector,
        DragonWing, MonoFont, TextField, RedBullet, QuadTree,
        DefaultRenderer, TextureRegion, Emitter, Rotator, Spreader,
        KeyManager, RenderInfo, image, fontImage, vertexShader, fragmentShader) {

    const LEFT          = 37;
    const UP            = 38;
    const RIGHT         = 39;
    const DOWN          = 40;
    const SHIP_SPEED    = 300;
    const BULLET_SPEED  = 200;
    const MAGNIFICATION = 4;


    var Game = function(canvas) {
      this.canvas = canvas;
      this.width = canvas.width;
      this.height = canvas.height;
      this.font = new MonoFont();
      this.font.addLetters(6, 8, 10, 9, 32, fontImage);


      this.gl = canvas.getContext('webgl');
      this.actorManager = new ActorManager();
      this.defaultActorRenderer = new DefaultActorRenderer();
      this.shaderProgram = new ShaderCompiler().compileProgram(
        this.gl, vertexShader, fragmentShader
      );
      this.detector = new Detector();
      var worldBounds = new SimpleRectangle(0, 0, this.width, this.height);
      this.quadTree = new QuadTree(worldBounds, 10, 10);

      this.gameState = {
        worldBounds: worldBounds
      };

      this.ship = new DragonWing(new Vector(this.width / 2, this.height * 0.75));
      //console.log(this.ship.view)
      this.actorManager.addActor(this.ship);
      this.ship.setScale(MAGNIFICATION);
      this.ship.updateBounds();

      var actorManager = this.actorManager;
      this.textField = new TextField(this.font, '[Blast Inferno]', 8, function(letters) {
        for (var i = 0; i < letters.length; i++) {
          actorManager.addActor(letters[i]);
        }
      });

      this.emitters = [];
      var gameState = this.gameState;

      var emitter = new Emitter(
          new Vector(this.width / 2, this.height / 2),
          .11, 0.2,
          function(position, velocity, fromTime) {

            var newBullet = new RedBullet(
              position, velocity.scale(BULLET_SPEED)
            );
            newBullet.update(fromTime, gameState);
            newBullet.setScale(MAGNIFICATION);
            actorManager.addActor(newBullet);
          }
      );
      emitter.addDecorator(new Spreader(300));
      emitter.addDecorator(new Rotator(0.1));
      this.emitters.push(emitter);

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
        console.log(this.actorManager.size()
            + ' items rendered at '
            + fps + ' fps');
      }, this);

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

      var collisions = quadTree.getCollisions(this.ship);
      for (var i = 0; i < collisions.length; i++) {
        if (collisions[i] !== ship) {
          if (this.detector) {
            var intersection = this.detector.getIntersection(ship, collisions[i]);
            if (!intersection.isEmpty()) {
              collisions[i].isAlive = false;
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
    };

    Game.prototype.removeDeadActors = function() {
      this.actorManager.removeIf(function(actor) {
        return !actor.isAlive;
      });
    };

    Game.prototype.renderAll = function() {

      var defaultActorRenderer = this.defaultActorRenderer;
      var renderer = this.renderer;
      this.actorManager.renderAll(renderer, defaultActorRenderer);
    };

    return Game;

});
