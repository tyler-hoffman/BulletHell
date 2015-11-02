"use strict"

define([
    'd2/utils/shaderCompiler',
    'text!shaders/rotated.vert',
    'text!shaders/fragment-shader.frag'
  ], function(ShaderCompiler, vertexShader, fragmentShader) {

    var RoratedShader = function(gl) {
      var shaderCompiler = new ShaderCompiler();
      this.shaderProgram = shaderCompiler.compileProgram(
        gl, vertexShader, fragmentShader
      );
    };

    RoratedShader.prototype.getProgram = function() {
      return this.shaderProgram;
    };

    return RoratedShader;
});
