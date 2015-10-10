config({
  ajax: ajaxer,
  baseUrl: 'scripts',
  paths: {
    d2: './d2',
    shaders: './d2/defaultShaders'
  },
  plugins: {
    text: './lib/requirator-text/lib/requirator-text'
  }
});

require(['game'], function(Game) {
  var canvas = document.getElementById('canvas');
  var game = new Game(canvas);
});
