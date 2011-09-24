(function() {
  var Action, Matcher;
  var __hasProp = Object.prototype.hasOwnProperty;
  Action = require("./action").Action;
  Matcher = (function() {
    function Matcher(bot, pattern, conditions, callback) {
      this.bot = bot;
      this.pattern = pattern;
      this.conditions = conditions;
      this.callback = callback;
    }
    Matcher.prototype.attempt = function(room, message) {
      var match;
      if (!this.conditions_satisfied_by(message)) {
        return false;
      }
      match = this.triggered_by(message.body);
      if (match) {
        if (match instanceof Object) {
          return this.run(room, message, match);
        } else {
          return this.run(room, message);
        }
      }
    };
    Matcher.prototype.conditions_satisfied_by = function(message) {
      var cond, item, _ref, _results;
      if (this.conditions === null) {
        return true;
      }
      _ref = this.conditions;
      _results = [];
      for (item in _ref) {
        if (!__hasProp.call(_ref, item)) continue;
        cond = _ref[item];
        switch (item) {
          case 'room':
            if (message.room_id !== cond) {
              return false;
            }
            break;
          case 'user':
            if (message.user_id !== cond) {
              return false;
            }
        }
        _results.push(true);
      }
      return _results;
    };
    Matcher.prototype.run = function(room, message, match) {
      var action;
      action = new Action(this.bot, this.callback, room, message);
      if (match) {
        action.matches = match;
      }
      return action.run();
    };
    Matcher.prototype.triggered_by = function(message_text) {
      if (this.pattern instanceof RegExp) {
        return message_text.match(this.pattern);
      } else if (typeof this.pattern === 'string') {
        return message_text === this.pattern;
      } else {
        return false;
      }
    };
    return Matcher;
  })();
  exports.Matcher = Matcher;
}).call(this);
