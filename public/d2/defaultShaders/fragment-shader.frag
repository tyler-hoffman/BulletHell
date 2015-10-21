precision mediump float;

uniform sampler2D u_image2;

varying vec2 v_texCoord;

void main() {
  vec4 color = texture2D(u_image2, v_texCoord);

  if (color.a < 0.1) {
    discard;
  } else {
    gl_FragColor = color;
  }
}
