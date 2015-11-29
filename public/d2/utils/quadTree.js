"use strict";

define([
    'd2/utils/rectangle'
  ], function(Rectangle) {

    var tempBounds = new Rectangle();

    /**
     * Create a new QuadTree
     * @param {Rectangle} bounds bounds of the QuadTree
     * @param {Number} elementsPerBox Number of nodes per box
     */
    var QuadTree = function(bounds, elementsPerBox, maxDepth) {
      this.bounds = bounds;
      this.elementsPerBox;
      this.maxDepth = (maxDepth === 'undefined')? -1 : maxDepth;
      this.clear();
    };

    /**
     * Clear the QuadTree
     */
    QuadTree.prototype.clear = function() {
        this.elements = [];

        if (this.hasChildren) {
          for (var i = 0; i < 4; i++) {
            this.children[i].clear();
          }
          this.hasChildren = false;
        }
    };

    /**
     * Check if the QuadTree contains a bounding box
     * @param {Rectangle} bounds Bounds to check
     * @return {Boolean} Whether or not the bounds
     *    are within those of the QuadTree
     */
    QuadTree.prototype.contains = function(bounds) {
      return this.bounds.containsRectangle(bounds);
    };

    QuadTree.prototype.intersects = function(bounds) {
      return this.bounds.intersectsRectangle(bounds);
    };

    /**
     * Insert an element into the QuadTree
     * @param {Actor} element element to insert
     * @return {Boolean} Wether or not the element could be inserted
     */
    QuadTree.prototype.insert = function(element, bounds) {
      bounds = bounds || element.boundingBox;

      if (!this.contains(bounds)) {
        return false;
      } else if (this.elements.length < this.elementsPerBox) {
        this.elements.push(element);
        return true;
      } else {
        if (this.maxDepth) {
          if (!this.children) {
            this.subdivide();
          }
          this.hasChildren = true;

          for (var i = 0; i < 4; i++) {
            if (this.children[i].insert(element, bounds)) {
              return true;
            }
          }
        }
        
        // if it didn't fit in children, insert it in elements
        this.elements.push(element);
        return true;
      }
    };

    /**
     * Get all elements whose bounding box intersects the provided bounds
     * @param {Rectangle} bounds Bounds to check against elements
     */
    QuadTree.prototype.getCollisions = function(actor, bounds) {
      bounds = bounds || actor.boundingBox;
      var collisions = [];

      // check elements
      for (var i = 0; i < this.elements.length; i++) {
        if ((actor.collisionBits & this.elements[i].collisionBits)
          && bounds.intersectsRectangle(this.elements[i].boundingBox)) {
          collisions.push(this.elements[i]);
        }
      }

      if (this.hasChildren) {
        var children = this.getChildren(bounds);
        for (var child in children) {
          if (children[child].intersects(bounds)) {
            collisions = collisions.concat(
              children[child].getCollisions(actor, bounds)
            );
          }
        }
      }

      return collisions;
    };

    QuadTree.prototype.size = function() {
      var size = this.elements.length;

      if (this.hasChildren) {
        for (var child in this.children) {
          size += this.children[child].size();
        }
      }
      return size;
    };

    QuadTree.prototype.getChild = function(bounds) {
      for (var child in children) {
        if (children[child].contains(bounds)) {
          return children[child];
        }
      }
      return null;
    };

    QuadTree.prototype.getChildren = function(bounds) {
      var output = [];
      for (var i = 0; i < 4; i++) {
        if (this.children[i].intersects(bounds)) {
          output.push(this.children[i]);
        }
      }
      return output;
    };

    /**
     * Subdivide the QuadTree.
     * This should not be called from outside QuadTree.
     */
    QuadTree.prototype.subdivide = function() {
      var width = this.bounds.width / 2,
          height = this.bounds.height / 2,
          xStart = this.bounds.x,
          yStart = this.bounds.y,
          xMid = this.bounds.x + width,
          yMid = this.bounds.y + height;

      this.children = [
        new QuadTree(
          new Rectangle(xStart, yStart, width, height),
          this.elementsPerBox,
          this.maxDepth - 1
        ),
        new QuadTree(
          new Rectangle(xMid, yStart, width, height),
          this.elementsPerBox,
          this.maxDepth - 1
        ),
        new QuadTree(
          new Rectangle(xStart, yMid, width, height),
          this.elementsPerBox,
          this.maxDepth - 1
        ),
        new QuadTree(
          new Rectangle(xMid, yMid, width, height),
          this.elementsPerBox,
          this.maxDepth - 1
        ),
      ];
    };

    return QuadTree;
});
