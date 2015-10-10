"use strict";

define([], function() {

  var Node = function(data, next) {
    this.data = data;
    this.next = next;
  };

  var LinkedList = function() {
    this.root = null;
    this.size = 0;
  };

  LinkedList.prototype.add = function(data) {
    this.root = new Node(data, this.root);
    this.size++;
  };

  LinkedList.prototype.remove = function(node, prev) {
    if (node == this.root) {
      this.root = node.next;
    } else {
      prev.next = node.next;
    }
    this.size--;
  }

  LinkedList.prototype.forEach = function(callback) {

    var node = this.root;
    while (node != null) {

      callback(node.data);

      // iterate
      node = node.next;

    }
  }

  LinkedList.prototype.removeIf = function(callback) {
    var node = this.root;
    var prev = null;

    while (node != null) {

      // check if we should delete
      if (callback(node.data)) {
        this.remove(node, prev);
      } else {
        prev = node;
      }
      // iterate
      node = node.next;
    }
  };

  return LinkedList;
});
