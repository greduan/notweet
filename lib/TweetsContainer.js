'use strict'

var path = require('path'),
  config = require(path.join(__dirname, '../config.js')),
  Twit = require('twit'),
  T = new Twit(config),
  blessed = require('blessed')

var Tweet = require(path.join(__dirname, 'Tweet.js'))

var elementProperties = {
  label: 'Your Twitter home timeline',
  align: 'left',
  valign: 'top',
  padding: 1,
  width: '100%',
  height: '100%',
  keys: true,
  vi: true,
  style: {
    fg: 'white',
    bg: 'black',
  },
}

var TweetsContainer = function (screen) {
  var containerList = blessed.list(elementProperties),
    tweets = []

  return {
    element: containerList,

    getHomeTimeline: function () {
      var count = 5,
        since_id = null

      if (tweets.length > 0) {
        count = null
        // sinde_id = tweets[0].id
      }

      T.get('statuses/home_timeline', {
        count: count,
        // since_id: since_id,
      }, function (err, tweetsData, response) {
        var tweetInstance;

        tweetsData.forEach(function (tweetData) {
          tweetInstance = Tweet(tweetData)

          tweets.push(tweetInstance)

          containerList.add(tweetInstance.tweetText)
          // containerList.pushItem(tweetInstance.element)
        })

        containerList.focus()

        screen.render()
      })
    },
  }
}

module.exports = TweetsContainer
