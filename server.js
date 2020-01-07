// server.js
// where your node app starts

// init project
require('dotenv').config();
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

const getTimeStamp = dateString => {
	let date;

	// If the date string is empty, create a new Date with no argument.
	if (!dateString) {
		date = new Date();
	} else {
		// If the date string is Not a Number, create a new Date with the date string as the argument.
		if (isNaN(dateString)) {
			date = new Date(dateString);
			// Else create a new Date with the date string converted to an Integer and passed as an argument.
		} else {
			date = new Date(parseInt(dateString));
		}
	}

	return {
		unix: date.getTime(),
		utc: date.toUTCString()
	};
};

// Timestamp
app.get('/api/timestamp/:date_string?', (req, res) =>
	res.json(getTimeStamp(req.params.date_string))
);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
