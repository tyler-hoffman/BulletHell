config({
  ajax: ajaxer,
  baseUrl: 'scripts',
  paths: {
    d2: './d2',
    shaders: './d2/defaultShaders',
    images: './images',
    keyManager: './lib/key-manager/src'
  },
  plugins: {
    text: './lib/requirator-text/lib/requirator-text',
    image: './lib/requirator-image/lib/requirator-image'
  }
});

require(['game'], function(Game) {
  var canvas = document.getElementById('canvas');
  var game = new Game(canvas);
});
