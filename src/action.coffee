class Action

  constructor: (@bot, @callback, @room, @message) ->
    @matches = []

  message: ->
    @message.body

  room: ->
    @message.room_id.toString()

  room_id: ->
    @message.room_id

  run: ->
    @callback.call this

  speak: (text) ->
    @room.speak text

  user: ->
    @message.user_id.toString()

  user_id: ->
    @message.user_id

exports.Action = Action
