const express = require('express');
const jwt = require('./auth');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.use(jwt);

app.get('/scrapeFreelanceComData', controllers.scrapeFreelanceComData);
app.get('/scrapeMaltData', controllers.scrapeMaltData);

module.exports = app;