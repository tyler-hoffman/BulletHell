"user script"

define([
    'd2/utils/rectangle',
    'd2/rendering/TextureRegion'
  ], function(Rectangle, TextureRegion) {

    var TextureRegionSplitter = function() {
    };

    TextureRegionSplitter.prototype.split = function(
        image,
        position,
        size,
        rows, cols,
        center) {

      var output = [];
      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
          output.push(new TextureRegion(
              image,
              new Rectangle(position.x + col * size.x,
                  position.y + row * size.y,
                  size.x, size.y),
              center));
        }
      }
      console.log(output)
      return output;
    };

    return TextureRegionSplitter;
});
