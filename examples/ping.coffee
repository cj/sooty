Robot = require('../lib/robot').Robot

ping = new Robot ssl: true, token: "your-api-token", account: "your-subdomain"

ping.behaviour ->
  @hear /^ping/i, ->
    @speak 'PONG'

ping.connect [ 403967 ]
