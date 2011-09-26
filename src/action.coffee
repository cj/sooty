class Action

  constructor: (@bot, @callback, @room, @message) ->
    @matches = []

  room: ->
    @message.room_id.toString()

  room_id: ->
    @message.room_id

  run: ->
    @callback.call this

  speak: (text) ->
    @room.speak text

  user: ->
    return @bot.username_for @message.user_id

  user_id: ->
    @message.user_id

exports.Action = Action
