"use strict"

define([
    'd2/utils/shaderCompiler',
    'text!shaders/vertex-shader.vert',
    'text!shaders/fragment-shader.frag'
  ], function(ShaderCompiler, vertexShader, fragmentShader) {

    var DefaultShader = function(gl) {
      var shaderCompiler = new ShaderCompiler();
      this.shaderProgram = shaderCompiler.compileProgram(
        gl, vertexShader, fragmentShader
      );
    };

    DefaultShader.prototype.getProgram = function() {
      return this.shaderProgram;
    };

    return DefaultShader;
});
