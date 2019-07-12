var router = require('express').Router();
var axios = require('axios').default;
var config = require('./config.json');
var restaurant_model = require('./schemas/access_model');

router.get('/set_data', (req, res) => {
  console.log('Retrieve Data from API!');

  var datasets = [];

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${config
        .init_location.lat +
        ',' +
        config.init_location.lng}&rankby=distance&name=car accessories&key=${
        config.API_KEY
      }`
    )
    .then(result => {
      var d = result.data.results;

      for (var i = 0; i < d.length; i++) {
        var tmp = {
          name: d[i].name,
          score_rating: d[i].rating,
          ttl_rating: d[i].user_ratings_total,
          vicinity: d[i].vicinity
        };

        datasets.push(tmp);
      }

      restaurant_model.deleteMany({}, err => {
        if (err) {
          res.status(500).send('Server error, unable delete previous data!');
        } else {
          restaurant_model.insertMany(datasets, (err, docs) => {
            if (err) {
              res.status(500).send('Server error, unable to save data!');
            } else {
              res.status(200).send('Data saved!');
            }
          });
        }
      });
    })
    .catch(err => {
      res.status(500).send('Server error, unable retrieve data!');
    });
});

router.get('/get_data', (req, res) => {
  console.log('Send Data to interface!');
  if (typeof req.query.SearchTxt === 'undefined') {
    res.status(404).send('Invalid parameters!');
  } else {
    var txt = req.query.SearchTxt;

    if (txt.length > 0) {
      restaurant_model
        .find({ name: { $regex: new RegExp(txt) } })
        .then(res1 => {
          res.status(200).json({ data: res1 });
        })
        .catch(err => {
          res.status(500).send('Server error, unable retrieve data!');
        });
    } else {
      restaurant_model
        .find({})
        .then(res2 => {
          res.status(200).json({ data: res2 });
        })
        .catch(err => {
          res.status(500).send('Server error, unable retrieve data!');
        });
    }
  }
});

module.exports = router;
