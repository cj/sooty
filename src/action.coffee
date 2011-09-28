class Action

  constructor: (@bot, @callback, @room_obj, @msg) ->
    @matches = []

    @message = @msg.body
    @room    = @bot.roomname_for @msg.room_id
    @room_id = @msg.room_id
    @user    = @bot.username_for @msg.user_id
    @user_id = @bot.user_id

  run: ->
    @callback.call this

  speak: (text) ->
    @room_obj.speak text

exports.Action = Action
