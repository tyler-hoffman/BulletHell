define([
    'd2/collections/actorManager',
    'd2/rendering/defaultActorRenderer',
    'd2/utils/shaderCompiler',
    'd2/utils/animator',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'emitters/circleEmitter',
    'bullets/RedBullet',
    'd2/rendering/defaultRenderer',
    'd2/rendering/textureRegion',
    'image!images/bullets.png',
    'text!shaders/vertex-shader.vert',
    'text!shaders/fragment-shader.frag'
  ], function(ActorManager, DefaultActorRenderer, ShaderCompiler, Animator, Rectangle,
        Vector, CircleEmitter, RedBullet, DefaultRenderer, TextureRegion,
        image, vertexShader, fragmentShader) {

    var Game = function(canvas) {
      this.canvas = canvas;
      this.width = canvas.width;
      this.height = canvas.height;
      this.gl = canvas.getContext('webgl');
      this.actorManager = new ActorManager();
      this.defaultActorRenderer = new DefaultActorRenderer();
      this.shaderProgram = new ShaderCompiler().compileProgram(
        this.gl, vertexShader, fragmentShader
      );

      this.gameState = {
        worldBounds: new Rectangle(0, 0, this.width, this.height)
      };

      this.emitters = [];
      var actorManager = this.actorManager;
      var gameState = this.gameState;
      this.emitters.push(new CircleEmitter(
        function(position, velocity, fromTime) {
          var newBullet = new RedBullet(
            position, velocity.scale(100)
          );
          newBullet.update(fromTime, gameState);
          newBullet.magnification = 4;
          actorManager.addActor(newBullet);
        }, new Vector(this.width / 2, this.height / 2),
        16, 0.1, 0.14
      ));

      this.renderer = new DefaultRenderer(this.gl, this.shaderProgram);
      this.renderer.setResolution(this.width, this.height);
      this.frame = 0;
      this.animator = new Animator(this.onFrame, this);

      this.animator.start();
    };

    Game.prototype.onFrame = function(deltaTime) {
      this.frame++;
      if (this.frame > 900) {
        this.animator.stop();
      };

      this.updateAll(deltaTime, this.gameState);
      this.removeDeadActors();


      this.renderer.clear(this.actorManager.size());
      this.renderAll();

      this.renderer.draw(this.actorManager.size());
    };

    Game.prototype.updateAll = function(deltaTime, gameState) {
      this.actorManager.forEach(function(actor) {
        actor.update(deltaTime, gameState);
      });

      for (var i = 0; i < this.emitters.length; i++) {
        this.emitters[i].update(deltaTime);
      }
    };

    Game.prototype.removeDeadActors = function() {
      this.actorManager.removeIf(function(actor) {
        return !actor.isAlive;
      });
    };

    Game.prototype.renderAll = function() {
      var defaultActorRenderer = this.defaultActorRenderer;
      var renderer = this.renderer;
      this.actorManager.forEach(function(actor) {
        defaultActorRenderer.render(actor, renderer);
      });
    };

    return Game;

});
