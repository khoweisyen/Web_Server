const Schema = require('mongoose').Schema;

const Hotel_Inf = new Schema({
  name: String,
  score_rating: Number,
  ttl_rating: Number,
  vicinity: String
});

module.exports = Hotel_Inf;
