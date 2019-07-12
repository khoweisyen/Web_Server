'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const service_reqs = require('./service_reqs');
const access_reqs = require('./access_reqs');

const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(helmet());
App.use(compression());
App.set('trust proxy', 1);
App.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
  })
);

App.use('/services', service_reqs);
App.use('/accessories', access_reqs);

App.use('*', (req, res) => {
  res.status(404).send('Fuck you! No Data!');
});

var http = require('http');
try {
  http.createServer(App).listen(process.env.PORT || 4000);
  console.log('Server started!');
} catch (e) {
  console.log('Server error!');
}
