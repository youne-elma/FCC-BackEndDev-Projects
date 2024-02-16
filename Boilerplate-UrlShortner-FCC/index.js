const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dns = require("dns");
const urlparser = require("url");
const { request } = require("http");
require("dotenv").config();

// Basic Configuration
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
  });

const urlSchema = new mongoose.Schema({
  url: { type: String },
  short_url: { type: String },
});
const Url = mongoose.model("Url", urlSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", async (req, res) => {
  const url = req.body.url;
  console.log(url);

  dns.lookup(urlparser.parse(url).hostname, async (err, address) => {
    if (!address) {
      res.json({ error: "Invalid Url" });
    } else {
      const urlCounts = await Url.countDocuments({});

      const urlDoc = new Url({ url, short_url: +urlCounts });

      await urlDoc.save();
      res.json({ original_url: url, short_url: urlCounts });
    }
  });
});

app.get("/api/shorturl/:short_url", async (req, res) => {
  const short_url = req.params.short_url;

  const urlDoc = await Url.findOne({ short_url: short_url });

  res.redirect(urlDoc.url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
