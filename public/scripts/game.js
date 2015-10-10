define([

  ], function() {

    var Game = function(canvas) {
      this.canvas = canvas;
      this.gl = canvas.getContext('webgl');
      console.log('gl:', this.gl);
    };

    return Game;

});
