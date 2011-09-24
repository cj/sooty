Campfire = require("smores").Campfire
Matcher  = require("./matcher").Matcher

class Robot

  constructor: (@config) ->
    @matchers = []
    @rooms = []

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
        room.speak "Hello!", -> {}
        room.listen (message) ->
          robot.dispatch room, message

  leave: (room_id) ->
    room = @rooms.filter (room, idx) -> room.id is parseInt(room_id)
    room = room[0]
    idx = @rooms.indexOf room
    @rooms.splice idx, 1 unless idx is -1
    room.speak "Goodbye!", ->
      room.leave -> {}

exports.Robot = Robot
