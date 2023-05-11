const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./firebase')

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

module.exports = app;

