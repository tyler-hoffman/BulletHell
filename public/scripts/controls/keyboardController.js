"use strict"

define([
    'd2/utils/vector',
    'keyManager/keyManager'
  ], function(Vector, KeyManager) {

    const LEFT    = 37;
    const UP      = 38;
    const RIGHT   = 39;
    const DOWN    = 40;
    const ENTER   = 13;
    const SPACE   = 32;

    const A       = 65;
    const D       = 68;
    const W       = 87;
    const S       = 83;

    var KeyboardController = function() {
      this.velocity = new Vector();

      // define actions
      this.registerAction(LEFT);
      this.registerAction(UP);
      this.registerAction(RIGHT);
      this.registerAction(DOWN);
      this.registerAction(ENTER, function() {
        this.enterListener && this.enterListener();
      }.bind(this));
      this.registerAction(SPACE, function() {
        this.spaceListener && this.spaceListener();
      }.bind(this));

      // register keys to actions
      this.registerKey(LEFT, LEFT);
      this.registerKey(A, LEFT);
      this.registerKey(UP, UP);
      this.registerKey(W, UP);
      this.registerKey(RIGHT, RIGHT);
      this.registerKey(D, RIGHT);
      this.registerKey(DOWN, DOWN);
      this.registerKey(S, DOWN);
      this.registerKey(ENTER, ENTER);

      this.clearListeners();
    };

    KeyboardController.prototype = new KeyManager();

    KeyboardController.prototype.clearListeners = function() {
      this.enterListener = null;
      this.spaceListener = null;
    };

    KeyboardController.prototype.onEnter = function(callback) {
      this.enterListener = callback;
    };

    KeyboardController.prototype.onSpace = function(callback) {
      this.spaceListener = callback;
    };

    KeyboardController.prototype.getVelocity = function() {
      var x = 0,
          y = 0;

      if (this.isDown(LEFT)) {
        x -= 1;
      }
      if (this.isDown(RIGHT)) {
        x += 1;
      }
      if (this.isDown(UP)) {
        y -= 1;
      }
      if (this.isDown(DOWN)) {
        y += 1;
      }

      return this.velocity
          .set(x, y)
          .normalize();
    };

    return KeyboardController;
});
