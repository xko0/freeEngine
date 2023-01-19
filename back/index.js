const express = require('express');
const jwt = require('./auth');
const crawlApi = require("./controllers/crawler")

const app = express();

app.use(express.json());

app.use(jwt);

app.get('/scrapeFreelanceComData', crawlApi.scrapeFreelanceComData);
app.get('/scrapeMaltData', crawlApi.scrapeMaltData);

module.exports = app;