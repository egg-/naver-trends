# naver-trends

Scrap recent trend words(실시간 급상승, 핫토픽) on NAVER for Node.js

The unofficial module to crawl the content of the site.
Therefore, whenever it may not be a normal operation, if problems occur, please add the issue.

[![version](https://img.shields.io/npm/v/naver-trends.svg) ![download](https://img.shields.io/npm/dm/naver-trends.svg)](https://www.npmjs.com/package/naver-trends)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Usage

```javascript
var trends = require('naver-trends')

trends.load(['real', 'hot'], function (err, result) {
  console.log(err, JSON.stringify(result))
})

```

```javascript
// output
{
  "real": [
    {
      "title": "강성",
      "link": "https://search.naver.com/search.naver?where=m&sm=mtp_lve&query=%EA%B0%95%EC%84%B1",
      "state": "up",
      "num": 270,
      "ctime": 1450853340
    },
    // ...
  ],
  "hot": [
    {
      "title": "택시 홍예슬",
      "link": "https://search.naver.com/search.naver?where=m&sm=mtp_lve&query=%ED%83%9D%EC%8B%9C%20%ED%99%8D%EC%98%88%EC%8A%AC",
      "state": "sm",
      "num": 0,
      "ctime": 1450846800
    },
    // ...
  ]
}
```

## LICENSE

naver-trends is licensed under the MIT license.
