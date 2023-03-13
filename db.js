/** Database for lunchly */
require('dotenv').config();
const { Client } = require("pg");

let DB_URI = {
    user: process.env.DB_USER,
    host: 'localhost',
    database: '',
    password: process.env.DB_PASSWORD
}

if (process.env.NODE_ENV === "test") {
    DB_URI.database = "lunchly_test";
} else {
    DB_URI.database = "lunchly";
}

const db = new Client(DB_URI);

db.connect();

module.exports = db;