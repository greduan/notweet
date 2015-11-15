'use strict'

var path = require('path'),
  config = require(path.join(__dirname, 'config.js')),
  Twit = require('twit'),
  T = new Twit(config)

var TweetsContainer = require(path.join(__dirname, 'lib/TweetsContainer.js'))
var Screen = require(path.join(__dirname, 'lib/Screen.js'))

var screen = Screen(),
  tweetsContainer = TweetsContainer()

screen.append(tweetsContainer)

/*
T.get('statuses/user_timeline', function (err, data, response) {
  console.log(data[0])
})
*/
