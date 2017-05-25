'use strict';
const express = require('express');
const bodyParser = require('body-parser')

// The rest of the code implements the routes for our Express server.
let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

const ApiAiApp = require('actions-on-google').ApiAiApp;

const STATUS = 'status';

const messagesList = [
'Your order is already on its way! Should arrive in 10 to 15 minutes.', 
'Your order is in preparation. It will be ready to go in the next 30 minutes.'];

function getStatus(assistant) {
  if (assistant.getIntent() == 'status') {
  	assistant.tell(messagesList[Math.floor(Math.random() * messagesList.length)]);
  }
}

// Message processing
app.post('/webhook', function (request, response) {
  const assistant = new ApiAiApp({request, response});
  
  let actionMap = new Map();
  actionMap.set('STATUS', getStatus(assistant));

  assistant.handleRequest(actionMap);
});

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 5000, function () {
	console.log("Listening on port %s", server.address().port);
});
