var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require("cheerio");

/* GET users listing. */
router.get('/', function (req, res, next) {
	let post_id = req.query.id

	request({
		url: `https://rent.591.com.tw/map-houseRound.html?type=1&post_id=${post_id}&detail=detail&version=1`,
		method: 'GET'
	}, function (error, response, body) {
		if (error || !body) {
			res.send('request failure');
		} else {
			var $ = cheerio.load(body);
			var target = $("iframe");

			try {
				var location = target.attr('src').split('&')[2].replace('q=', '').split(',');
			
				res.send({
					lat: location[0],
					lng: location[1]
				});
			} catch (err) {
				res.send(null)
			}
			
		}

	});
});

module.exports = router;