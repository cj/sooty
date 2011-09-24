(function() {
  var Action;
  Action = (function() {
    function Action(bot, callback, room, message) {
      this.bot = bot;
      this.callback = callback;
      this.room = room;
      this.message = message;
      this.matches = [];
    }
    Action.prototype.message = function() {
      return this.message.body;
    };
    Action.prototype.room = function() {
      return this.message.room_id.toString();
    };
    Action.prototype.room_id = function() {
      return this.message.room_id;
    };
    Action.prototype.run = function() {
      return this.callback.call(this);
    };
    Action.prototype.speak = function(text) {
      return this.room.speak(text, function() {
        return {};
      });
    };
    Action.prototype.user = function() {
      return this.message.user_id.toString();
    };
    Action.prototype.user_id = function() {
      return this.message.user_id;
    };
    return Action;
  })();
  exports.Action = Action;
}).call(this);
