define([
    'd2/collections/actorManager',
    'd2/rendering/defaultActorRenderer',
    'd2/utils/shaderCompiler',
    'd2/utils/animator',
    'd2/utils/rectangle',
    'd2/utils/vector',
    'bullets/RedBullet',
    'd2/rendering/defaultRenderer',
    'd2/rendering/textureRegion',
    'image!images/bullets.png',
    'text!shaders/vertex-shader.vert',
    'text!shaders/fragment-shader.frag'
  ], function(ActorManager, DefaultActorRenderer, ShaderCompiler, Animator, Rectangle,
        Vector, RedBullet, DefaultRenderer, TextureRegion,
        image, vertexShader, fragmentShader) {

    var Game = function(canvas) {
      this.canvas = canvas;
      this.gl = canvas.getContext('webgl');
      this.actorManager = new ActorManager();
      this.defaultActorRenderer = new DefaultActorRenderer();
      var shaderCompiler = new ShaderCompiler();
      this.shaderProgram = shaderCompiler.compileProgram(
        this.gl, vertexShader, fragmentShader
      );

      for (var i = 0; i < 1000; i++) {
        var bullet = new RedBullet(
          new Vector(Math.random() * 600, Math.random() * 600),
          new Vector(Math.random(), Math.random()).scale(200)
        );

        this.actorManager.addActor(bullet);
      }

      this.gameState = {
        worldBounds: new Rectangle(0, 0, 800, 800)
      };

      this.renderer = new DefaultRenderer(this.gl, this.shaderProgram);
      this.renderer.setResolution(800, 800);
      this.frame = 0;
      this.animator = new Animator(this.onFrame, this);

      this.animator.start();
    };

    Game.prototype.onFrame = function(deltaTime) {
      this.frame++;
      if (this.frame > 900) {
        this.animator.stop();
      };

      this.render(deltaTime);
    };

    Game.prototype.render = function(deltaTime) {
      this.renderer.clear(this.actorManager.size());

      this.updateAll(deltaTime, this.gameState);
      this.removeDeadActors();
      this.renderAll();

      this.renderer.draw(this.actorManager.size());

      console.log(this.actorManager.size());
    };

    Game.prototype.updateAll = function(deltaTime, gameState) {
      this.actorManager.forEach(function(actor) {
        actor.update(deltaTime, gameState);
      });
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
