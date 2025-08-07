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

// Gets an instance of mysql to be used in the app.
const mysql = require("mysql2");

// Creates a 'connection pool' using the provided credentials.
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_jenkibri',
    password: 'u3z9Ig1eFRbk',
    database: 'cs340_jenkibri'
}).promise();

module.exports = pool;