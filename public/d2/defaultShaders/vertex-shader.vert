uniform vec2 u_resolution;
uniform vec2 u_magnification;
uniform vec2 u_offset;

attribute vec2 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;

void main() {

  vec2 clipspace = (a_position + u_offset) * u_magnification / u_resolution * 2.0 - 1.0;
  gl_Position = vec4(clipspace * vec2(1, -1), 0, 1);

  v_texCoord = a_texCoord;
}
