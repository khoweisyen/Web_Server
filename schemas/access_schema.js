const Schema = require('mongoose').Schema;

const Res_Inf = new Schema({
  name: String,
  score_rating: Number,
  ttl_rating: Number,
  vicinity: String
});

module.exports = Res_Inf;
