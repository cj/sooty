Action = require("./action").Action

class Matcher

  constructor: (@bot, @pattern, @conditions, @callback) ->

  attempt: (room, message) ->
    return false unless @conditions_satisfied_by message
    match = @triggered_by message.body

    if match
      if match instanceof Object
        @run room, message, match
      else
        @run room, message

  conditions_satisfied_by: (message) ->
    return true if @conditions is null
    for own item, cond of @conditions
      switch item
        when 'room'
          return false unless message.room_id is cond
        when 'user'
          return false unless message.user_id is cond
      true

  run: (room, message, match) ->
    action = new Action @bot, @callback, room, message
    action.matches = match if match
    action.run()

  triggered_by: (message_text) ->
    if @pattern instanceof RegExp
      message_text.match @pattern
    else if typeof @pattern is 'string'
      message_text is @pattern
    else
      false

exports.Matcher = Matcher
