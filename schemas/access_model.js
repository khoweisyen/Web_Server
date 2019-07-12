var conn = require('../connector');
var schema = require('./access_schema');

const models = conn.model('Accessories', schema, 'accs_collection');

module.exports = models;
