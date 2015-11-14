'use strict'

var path = require('path'),
  Twit = require('twit'),
  blessed = require('blessed'),
  config = require(path.join(__dirname, 'config.js'))

var T = new Twit(config)

T.get('statuses/user_timeline', function (err, data, response) {
  console.log(data[0])
})
