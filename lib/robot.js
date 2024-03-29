(function() {
  var Campfire, Matcher, Robot;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Campfire = require("smores").Campfire;
  Matcher = require("./matcher").Matcher;
  Robot = (function() {
    function Robot(config) {
      this.config = config;
      this.matchers = [];
      this.rooms = [];
      this.users_cache = [];
      this.rooms_cache = [];
    }
    Robot.prototype.behaviour = function(callback) {
      return callback.call(this);
    };
    Robot.prototype.connect = function(rooms) {
      var room, _i, _len, _results;
      this.campfire = new Campfire(this.config);
      _results = [];
      for (_i = 0, _len = rooms.length; _i < _len; _i++) {
        room = rooms[_i];
        _results.push(this.join(room));
      }
      return _results;
    };
    Robot.prototype.dispatch = function(room, message) {
      var matcher, _i, _len, _ref, _results;
      _ref = this.matchers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        matcher = _ref[_i];
        _results.push(matcher.attempt(room, message));
      }
      return _results;
    };
    Robot.prototype.hear = function(pattern, conditions, callback) {
      var matcher;
      if (typeof conditions === 'function') {
        callback = conditions;
        conditions = null;
      }
      matcher = new Matcher(this, pattern, conditions, callback);
      return this.matchers.push(matcher);
    };
    Robot.prototype.join = function(room_id) {
      var robot;
      robot = this;
      return this.campfire.room(room_id, function(err, room) {
        return room.join(function(response) {
          robot.rooms.push(room);
          return room.listen(function(message) {
            return robot.dispatch(room, message);
          });
        });
      });
    };
    Robot.prototype.leave = function(room_id) {
      var idx, room;
      room = this.rooms.filter(function(room, idx) {
        return room.id === parseInt(room_id);
      });
      room = room[0];
      idx = this.rooms.indexOf(room);
      if (idx !== -1) {
        this.rooms.splice(idx, 1);
      }
      return room.leave;
    };
    Robot.prototype.username_for = function(user_id) {
      if (this.users_cache['#' + user_id]) {
        return this.users_cache['#' + user_id].name;
      }
      this.campfire.user(user_id, __bind(function(err, resp) {
        return this.users_cache['#' + user_id] = resp.user;
      }, this));
      return user_id.toString();
    };
    Robot.prototype.roomname_for = function(room_id) {
      if (this.rooms_cache['#' + room_id]) {
        return this.rooms_cache['#' + room_id].name;
      }
      this.campfire.room(room_id, __bind(function(err, room) {
        return this.rooms_cache['#' + room_id] = room;
      }, this));
      return room_id.toString();
    };
    return Robot;
  })();
  exports.Robot = Robot;
}).call(this);
