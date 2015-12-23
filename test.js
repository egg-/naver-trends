var trends = require('./')

trends.load(['real', 'hot'], function (err, result) {
  console.log(err, JSON.stringify(result))
})
