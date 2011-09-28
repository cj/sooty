Campfire = require("smores").Campfire
Matcher  = require("./matcher").Matcher

class Robot

  constructor: (@config) ->
    @matchers = []
    @rooms = []

    @users_cache = []
    @rooms_cache = []

  behaviour: (callback) ->
    callback.call this

  connect: (rooms) ->
    @campfire = new Campfire @config
    @join room for room in rooms

  dispatch: (room, message) ->
    for matcher in @matchers
      matcher.attempt room, message

  hear: (pattern, conditions, callback) ->
    if typeof conditions is 'function'
      callback = conditions
      conditions = null
    matcher = new Matcher @, pattern, conditions, callback
    @matchers.push matcher

  join: (room_id) ->
    robot = @
    @campfire.room room_id, (err, room) ->
      room.join (response) ->
        robot.rooms.push room
        room.listen (message) ->
          robot.dispatch room, message

  leave: (room_id) ->
    room = @rooms.filter (room, idx) -> room.id is parseInt(room_id)
    room = room[0]
    idx = @rooms.indexOf room
    @rooms.splice idx, 1 unless idx is -1
    room.leave

  username_for: (user_id) ->
    return @users_cache['#' + user_id].name if @users_cache['#' + user_id]
    @campfire.user user_id, (err, resp) =>
      @users_cache['#' + user_id] = resp.user
    user_id.toString()

  roomname_for: (room_id) ->
    return @rooms_cache['#' + room_id].name if @rooms_cache['#' + room_id]
    @campfire.room room_id, (err, room) =>
      @rooms_cache['#' + room_id] = room
    room_id.toString()

exports.Robot = Robot
