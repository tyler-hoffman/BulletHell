"use strict"

define([
    'd2/scenes/scene',
    'd2/collections/imageBasedActorManager',
    'd2/rendering/defaultRenderer',
    'shaders/defaultShader',
    'd2/utils/rectangle',
    'd2/rendering/textureRegion',
    'd2/ui/button',
    'image!images/splash_text.png'
  ], function(Scene, ActorManager, DefaultRenderer, DefaultShaderProgram, Rectangle,
        TextureRegion, Button, textImage) {

    var MenuScreen = function(canvas, animator, keyboard) {
      if (canvas) {
        Scene.call(this, canvas, animator);

        var shaderProgram = new DefaultShaderProgram(this.gl).getProgram();
        this.renderer = new DefaultRenderer(this.gl, shaderProgram);
        this.renderer.setResolution(this.width, this.height);

        this.actorManager = new ActorManager();

        this.buttons = this.generateButtons();
        for (var button in this.buttons) {
          this.actorManager.addActor(this.buttons[button]);
        }
        this.currentButtonIndex = 0;

        keyboard.registerAction(keyboard.UP, function() {
          this.cycleChoices(-1);
        }.bind(this));
        keyboard.registerAction(keyboard.DOWN, function() {
          this.cycleChoices(1);
        }.bind(this));
        keyboard.registerAction(keyboard.ENTER, function() {
          this.currentButton.doAction();
        }.bind(this));

        this.selectButton(this.buttons[0]);
      }
    };

    MenuScreen.prototype = new Scene();

    MenuScreen.prototype.PLAY = 'PLAY';
    MenuScreen.prototype.OPTIONS = 'OPTIONS';

    MenuScreen.prototype.generateButtons = function() {

      var xStart = 5,
          yStart = 67,
          buttonWidth = 78,
          buttonHeight = 21;

      var textureRegions = [];
      for (var row = 0; row < 2; row++) {
        for (var col = 0; col < 3; col++) {
          textureRegions.push(new TextureRegion(textImage, new Rectangle(
            xStart + col * buttonWidth,
            yStart + row * buttonHeight,
            buttonWidth, buttonHeight
          )));
        }
      }

      var that = this;
      var buttons = [
        new Button(
          textureRegions[0],
          textureRegions[1],
          textureRegions[2],
          function() {
            that.nextScene(that.PLAY);
          }
        ),
        new Button(
          textureRegions[3],
          textureRegions[4],
          textureRegions[5],
          function() {
            that.nextScene(that.OPTIONS);
          }
        )
      ];

      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setPosition(600, 360 + 80 * i);
        buttons[i].setScale(4, 4);
      }

      return buttons;
    };

    MenuScreen.prototype.cycleChoices = function(increment) {
      if (this.currentButtonIndex === -1) {
        if (increment >= 0) {
          this.selectButton(this.buttons[0]);
        } else {
          this.selectButton(this.buttons[this.buttons.length - 1]);
        }
      } else {
        var nextIndex = this.currentButtonIndex + increment;
        while (nextIndex < 0) {
          nextIndex += this.buttons.length;
        }
        nextIndex = nextIndex % this.buttons.length;
        this.selectButton(this.buttons[nextIndex]);
      }
    };

    MenuScreen.prototype.selectButton = function(button) {
      if (button != this.currentButton) {
        var currentButton = this.currentButton;
        if (currentButton) {
          currentButton.setState(currentButton.DEFAULT);
        }

        this.currentButton = button;
        if (button) {
          button.setState(button.HOVER);
          this.currentButtonIndex = this.buttons.indexOf(button);
        } else {
          this.currentButtonIndex = -1;
        }
        this.actorManager.renderAll(this.renderer);
      }
    };

    return MenuScreen;
});
