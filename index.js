'use strict'

var path = require('path')

var TweetsContainer = require(path.join(__dirname, 'lib/TweetsContainer.js'))
var Screen = require(path.join(__dirname, 'lib/Screen.js'))

var screen = Screen(),
  tweetsContainer = TweetsContainer(screen)

screen.append(tweetsContainer.element)
screen.render()
tweetsContainer.getHomeTimeline()
