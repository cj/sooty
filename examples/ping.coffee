Robot = require('../lib/robot').Robot

ping = new Robot ssl: true, token: "your_api_key", account: "your_account_subdomain"

ping.behaviour ->
  @hear /^ping/i, ->
    @speak "#{@user}: PONG"

ping.connect [ 403967 ]
