(function() {
  var Action;
  Action = (function() {
    function Action(bot, callback, room_obj, msg) {
      this.bot = bot;
      this.callback = callback;
      this.room_obj = room_obj;
      this.msg = msg;
      this.matches = [];
      this.message = this.msg.body;
      this.room = this.bot.roomname_for(this.msg.room_id);
      this.room_id = this.msg.room_id;
      this.user = this.bot.username_for(this.msg.user_id);
      this.user_id = this.bot.user_id;
    }
    Action.prototype.run = function() {
      return this.callback.call(this);
    };
    Action.prototype.speak = function(text) {
      return this.room_obj.speak(text);
    };
    return Action;
  })();
  exports.Action = Action;
}).call(this);
