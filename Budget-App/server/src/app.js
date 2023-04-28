const express = require('express');
const app = express();
const admin = require('firebase-admin');
require('dotenv').config();


app.use(cors());

app.use(express.json());

admin.initializeApp(process.env.firebaseConfig);

app.require('./routes');

module.exports = app;

