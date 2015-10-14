"use strict";

define([
    'd2/utils/Rectangle'
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

    /**
     * Insert an element into the QuadTree
     * @param {Actor} element element to insert
     * @return {Boolean} Wether or not the element could be inserted
     */
    QuadTree.prototype.insert = function(element, bounds) {
      bounds = bounds || element.getBoundingBox();

      if (!this.contains(bounds)) {
        return false;
      } else if (this.elements.length < this.elementsPerBox) {
        this.elements.push(element);
        return true;
      } else {
        if (!this.children) {
          this.subdivide();
        }
        this.hasChildren = true;

        for (var i = 0; i < 4; i++) {
          if (this.children[i].insert(element, bounds)) {
            return true;
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
      bounds = bounds || actor.getBoundingBox();
      var collisions = [];

      // check elements
      for (var i = 0; i < this.elements.length; i++) {
        if (bounds.intersectsRectangle(this.elements[i].getBoundingBox())) {
          collisions.push(this.elements[i]);
        }
      }

      if (this.hasChildren) {
        var child = this.getChild(bounds);
        if (child) {
          collisions = collisions.concat(child.getCollisions(actor, bounds));
        }
      }

      return collisions;
    };

    QuadTree.prototype.getChild = function(bounds) {
      for (var i = 0; i < 4; i++) {
        if (this.children[i].contains(bounds)) {
          return this.children[i];
        }
      }
      return null;
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
