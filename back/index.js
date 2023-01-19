const express = require("express");

const crawlApi = require("./controllers/crawler.js")

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.get("/scrapeMaltData", crawlApi.scrapeMaltData);
app.get("/scrapeFreelanceComData", crawlApi.scrapeFreelanceComData);

module.exports = app;
