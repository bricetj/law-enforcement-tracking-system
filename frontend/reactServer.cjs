/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 * 
 * 
 * Citation for the following server code:
 * Date: 7/31/2025
 * Adapted from Canvas starter code on Activity 2 - Connect webapp to database (Individual).
 * Source URL: https://canvas.oregonstate.edu/courses/2007765/assignments/10118865?module_item_id=25664551
 */

const express = require('express');
const path = require('path');
const app = express();

// Front end port number.
const PORT = 4642;

// Serves the static files from the React app located in the build folder '/dist'.
app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match the ones above to return the React app.
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Starts the server and listens on the specified port.
app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});