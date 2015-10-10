define([
    'd2/utils/shaderCompiler',
    'd2/utils/rectangle',
    'text!shaders/vertex-shader.vert',
    'text!shaders/fragment-shader.frag'
  ], function(ShaderCompiler, Rectangle, vertexShader, fragmentShader) {

    var Game = function(canvas) {
      this.canvas = canvas;
      this.gl = canvas.getContext('webgl');

      var shaderCompiler = new ShaderCompiler();
      this.shaderProgram = shaderCompiler.compileProgram(
        this.gl, vertexShader, fragmentShader
      );

    };

    return Game;

});
