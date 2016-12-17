var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
/*var mysql = require('mysql')
 var connection = mysql.createConnection({
 host: 'localhost',
 user: 'dbuser',
 password: 's3kreee7'
 })

 connection.connect()

 connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
 if (err) throw err

 console.log('The solution is: ', rows[0].solution)
 })*/
router.get('/scrape', function (req, res) {
    // Let's scrape Anchorman 2
    url = 'http://freshmusic.in/';
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = {title: "", release: "", rating: ""};
            $('.updates').filter(function () {
                var data = $(this);
                title = data.children().eq(1).text().trim();
                //title = data.children().first().text().trim();
                //release = data.children().last().children().last().text().trim();
                json.title = title;
                //json.release = release;
            })
            /*$('.ratingValue').filter(function () {
             var data = $(this);
             rating = data.text().trim();
             json.rating = rating;
             })*/
        }
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })
        res.send(json);
    })
})
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;
