// Dependencies

const express = require('express');
const path = require('path');


// Sets up the Express App

const app = express();
const PORT = 3000;

// global array of reservations
let reservedParties = [];
let waitingParties = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES

/// Basic route that sends the user home Hot Restaurant page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'HTML/index.html')));

/// Sends the user to the current tables page
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'HTML/tables.html')));

// Shows all table reservations
app.get('/api/tables', (req, res) => res.json(reservedParties));

// Shows all waiting parties
app.get('/api/reservations', (req, res) => res.json(waitingParties));

/// Sends the user to the wait list page
app.get('/reservations', (req, res) => res.sendFile(path.join(__dirname, 'HTML/reservations.html')));

// Gets 'body' from fetch request and pushes it to the reservedParties array or waitingParties array based on # of current tables
app.post('/tables', (req, res) => {
  const newTable = req.body;

  console.log(newTable);

  if(reservedParties.length < 2) {
    reservedParties.push(newTable);
  } 
  else {
    waitingParties.push(newTable);
  }

  res.json(newTable);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));