const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./router/user");
const sibApi = require("./controllers/sib")
const crawlApi = require("./controllers/crawler")

require('dotenv').config()

mongoose
  .connect(
    `${process.env.MONGO_CONNSTRING}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.get("/api/scrapeMaltData", crawlApi.scrapeMaltData);
app.get("/api/scrapeFreelanceComData", crawlApi.scrapeFreelanceComData);
app.get("/api/scrapeFiverrData", crawlApi.scrapeFiverrData)
app.get("/api/scrapeComeupData", crawlApi.scrapeComeupData)
app.post("/api/sendemail", sibApi.sendEmail);

module.exports = app;
