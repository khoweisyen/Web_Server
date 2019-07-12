var conn = require('../connector');
var schema = require('./service_schema');

const models = conn.model('Services', schema, 'service_collection');

module.exports = models;
