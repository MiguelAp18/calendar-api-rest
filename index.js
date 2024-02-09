const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create the express server
const app = express();

// Database configuration
dbConnection();

// CORS
app.use(cors())

// Public Directory
app.use( express.static('public') );

// Lecture and parse of body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

// TODO: CRUD: Eventos



// Listening requests
app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});






