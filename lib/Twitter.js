'use strict'

var path = require('path'),
  Twit = require('twit')

var Twitter = function (config) {
  var T = new Twit(config)

  var tweets = [],
    oldTweets = []

  return {
    // Gets the latest 20 tweets.
    // Only to be used once, before refreshHomeTimeline().
    getHomeTimeline: function (callback) {
      T.get('statuses/home_timeline', {
        count: 20,
      }, function (err, tweetsData, response) {
        if (err) { return callback(err) }

        tweets = tweetsData

        return callback(null, tweetsData)
      })
    },

    // Gets the newest tweets, newer than the ones we have at least.
    // Only to be used after getHomeTimeline() has been used at least once.
    refreshHomeTimeline: function (callback) {
      T.get('statuses/home_timeline', {
        since_id: tweets[0].id,
        count: 20,
      }, function (err, tweetsData, response) {
        if (err) { return callback(err) }

        oldTweets = tweets

        var newTweets = tweetsData

        tweets = newTweets.concat(tweets)

        return callback(null, newTweets)
      })
    },
  }
}

module.exports = Twitter
