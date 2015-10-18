uniform vec2 u_resolution;
uniform vec2 u_magnification;
uniform vec2 u_offset;

attribute vec3 a_vertex;
attribute vec2 a_texCoord;
attribute vec2 a_position;
attribute vec2 a_scale;
attribute vec2 a_rotation;

varying vec2 v_texCoord;

void main() {

  vec2 clipspace = vec2(
      a_vertex.x * a_rotation.x + a_vertex.y * a_rotation.y,
      a_vertex.y * a_rotation.x - a_vertex.x * a_rotation.y);

  clipspace = (clipspace.xy * a_scale + u_offset + a_position)
      * u_magnification / u_resolution * 2.0 - 1.0;
  gl_Position = vec4(clipspace * vec2(1, -1), a_vertex.z, 1);

  v_texCoord = a_texCoord;
}
