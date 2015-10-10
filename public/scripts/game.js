define([
    'd2/utils/shaderCompiler',
    'text!shaders/vertex-shader.vert',
    'text!shaders/fragment-shader.frag'

  ], function(ShaderCompiler, vertexShader, fragmentShader) {

    var Game = function(canvas) {
      this.canvas = canvas;
      this.gl = canvas.getContext('webgl');

      var shaderCompiler = new ShaderCompiler();
      this.shaderProgram = shaderCompiler.compileProgram(
        this.gl, vertexShader, fragmentShader
      );
      console.log(this.shaderProgram)
    };

    return Game;

});
