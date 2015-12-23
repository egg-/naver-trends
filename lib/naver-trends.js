var request = require('request')
var async = require('async')
var cheerio = require('cheerio')
var safeEval = require('safe-eval')

module.exports = {
  load: function (targets, cb) {
    if (targets instanceof Array === false) {
      targets = [targets]
    }

    request('http://m.naver.com', function (err, res, body) {
      if (err) {
        return cb(err)
      }

      var $ = cheerio.load(body)
      var $items = $('script')

      for (var i = 0; i < $items.length; i++) {
        var src = $($items[i]).text()
        if (src.indexOf('function initVariable()') !== -1) {
          var start = '$.createNamespace("naver.main").gVariable = '
          var tmp = src.substring(src.indexOf(start) + start.length, src.indexOf('};') + 1)
          var data = safeEval(tmp)

          var tasks = {}

          for (var idx = 0, target = null, key = null; idx < targets.length; idx++) {
            target = targets[idx]
            key = KEYS[target]

            if (typeof key !== 'undefined') {
              tasks[target] = (function (item) {
                return function (cb) {
                  parse(item, cb)
                }
              }(data[key]))
            }
          }

          return async.parallel(tasks, cb)
        }
      }

      return cb(null, {})
    })
  }
}

var KEYS = {
  real: 'oRTK',
  hot: 'oHTP'
}

var parse = function (data, cb) {
  var words = []
  var time = Math.floor(new Date(data.t.replace('Z', '+09:00')) / 1000)
  var items = data.d

  for (var i = 0, item = null; i < items.length; i++) {
    item = items[i]
    words.push({
      title: item.k,
      link: 'https://search.naver.com/search.naver?where=m&sm=mtp_lve&query=' + encodeURIComponent(item.k),
      state: item.c,
      num: parseInt(item.n, 10),
      ctime: time
    })
  }

  cb(null, words)
}
