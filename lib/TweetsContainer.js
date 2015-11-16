'use strict'

var path = require('path'),
  config = require(path.join(__dirname, '../config.js')),
  Twit = require('twit'),
  T = new Twit(config),
  blessed = require('blessed')

var Tweet = require(path.join(__dirname, 'Tweet.js'))

var TweetsContainer = function (screen) {
  var containerBox = blessed.box({
      label: 'Your Twitter home timeline',
      align: 'left',
      valign: 'top',
      padding: 1,
      width: '100%',
      height: '100%',
    }),
    tweets = []

  return {
    element: containerBox,

    // Gets the latest 10 tweets.
    // Only to be used once, before refreshHomeTimeline().
    getHomeTimeline: function () {
      T.get('statuses/home_timeline', {
        count: 10,
      }, function (err, tweetsData, response) {
        if (err) { throw err }

        tweets = tweetsData.map(function (data) {
          return Tweet(data)
        })
      })
    },

    // Gets the newest tweets, newer than the ones we have at least.
    // Only to be used after getHomeTimeline() has been used at least once.
    refreshHomeTimeline: function () {
      T.get('statuses/home_timeline', {
        since_id: tweets[0].id,
      }, function (err, tweetsData, response) {
        if (err) { throw err }

        var newTweets = tweetsData.map(function (data) {
          return Tweet(data)
        })

        tweets = newTweets.concat(tweets)
      })
    },

    // Fills screen with tweets, according to the `tweets` array.
    populateScreen: function () {
    },
  }
}

module.exports = TweetsContainer
