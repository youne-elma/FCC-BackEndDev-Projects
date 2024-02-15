// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  var reqString = req.params.date;

  console.log(req.params);

  // To check if the date is string with valid format, if it's not valid it will be returning NULL
  var isDateValid = Date.parse(reqString);

  // To check if the reqString is a string with just numbers (no symbol or special character)
  var isUnixValid = /^[0-9]+$/.test(reqString);

  // to check if there is nothing in the date.
  var isEmpty = reqString == "" || reqString == null;
  var unix = 0;
  var utc = "";

  if (isDateValid) {
    unix = new Date(reqString);

    utc = unix.toUTCString();

    return res.json({ unix: unix.valueOf(), utc: utc });
  } else if (isNaN(isDateValid) && isUnixValid) {
    unix = new Date(parseInt(reqString));

    utc = unix.toUTCString();

    return res.json({
      unix: unix.valueOf(),
      utc: utc,
    });
  } else if (isEmpty) {
    unix = new Date();

    utc = unix.toUTCString();

    return res.json({ unix: unix.valueOf(), utc: utc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
