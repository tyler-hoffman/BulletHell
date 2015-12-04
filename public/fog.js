var run = function(div, path, user, gameHistory, cardListener) {

  path += 'public/';

  config({
    ajax: ajaxer,
    baseUrl: path + 'scripts',
    paths: {
      d2: path + 'd2',
      shaders: path + 'd2/defaultShaders',
      images: path + 'images',
      keyManager: path + 'lib/key-manager/src'
    },
    plugins: {
      text: path + 'lib/requirator-text/lib/requirator-text',
      image: path + 'lib/requirator-image/lib/requirator-image'
    }
  });

  require(['bulletHell'], function(BulletHell) {
    
    div.innerHTML = '<canvas id="canvas" width="1200" height="600" id="canvas"></canvas>';
    var canvas = document.getElementById('canvas');

    var game = new BulletHell(canvas);
  });
};
