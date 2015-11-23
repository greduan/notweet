'use strict'

var path = require('path')

var Timeline = require(path.join(__dirname, 'lib/Timeline.js'))
var Screen = require(path.join(__dirname, 'lib/Screen.js'))

var screen = Screen(),
  timeline = Timeline()

screen.append(timeline)
screen.render()
