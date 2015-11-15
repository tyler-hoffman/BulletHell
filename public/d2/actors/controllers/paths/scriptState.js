define(function() {

  var ScriptState = function() {
    this.states = {};
  };

  ScriptState.prototype.setState = function(subscript, state) {
    this.states[subscript] = state;
  };

  ScriptState.prototype.getState = function(subscript) {
    return this.states[subscript];
  };

  return ScriptState;
});
