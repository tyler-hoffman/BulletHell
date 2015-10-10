define(function() {

  var ShaderCompiler = function() {

  };

  ShaderCompiler.prototype.compileProgram = function(gl, vertexShaderSource, fragmentShaderSource) {
    var vertexShader = this.compileShader(
      gl, vertexShaderSource, gl.VERTEX_SHADER
    );
    var fragmentShader = this.compileShader(
      gl, fragmentShaderSource, gl.FRAGMENT_SHADER
    );

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    return program;
  };

  ShaderCompiler.prototype.compileShader = function(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    } else {
      return null;
    }
  }

  return ShaderCompiler;

});
