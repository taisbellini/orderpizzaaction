'use strict';
const express = require('express');

// The rest of the code implements the routes for our Express server.
const app = express();
const Assistant = require('actions-on-google').ApiAiApp;

const messagesList = [
'Your order is already on its way! Should arrive in 10 to 15 minutes.', 
'Your order is in preparation. It will be ready to go in the next 30 minutes.'];

// Message processing
app.post('/webhook', function (request, response) {
  const assistant = new Assistant({request, response});
  if (assistant.getIntent() == 'get_status') {
  	assistant.tell(messagesList[Math.floor(Math.random() * messagesList.length)]);
  }  
});

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 5000, function () {
	console.log("Listening on port %s", server.address().port);
});
