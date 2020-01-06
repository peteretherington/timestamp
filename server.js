// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Timestamp
app.get("/api/timestamp/:date_string?", function (req, res) {
  const dateString = req.params.date_string;
  const utc = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  const validUTCString = utc.test(dateString);
  let date, data;

  if (dateString && validUTCString) {
    console.log('valid UTC string');
    date = new Date(dateString);
    data = {
      "unix": date.getTime(),
      "utc": date.toUTCString(),
    };
  } else if (dateString) {
    console.log('invalid UTC string');
    date = moment.unix(dateString).format('ddd, D MMM YYYY HH:mm:ss');
    data = {
      "unix": dateString,
      "utc": date,
    };
  } else {
    console.log('empty Date string');
    date = new Date();
    data = {
      "unix": date.getTime(),
      "utc": date.toUTCString(),
    };
  }

  res.json(data);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
