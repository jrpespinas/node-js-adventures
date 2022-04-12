const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const fs = require('fs');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', require('./routes/tours'));
app.use('/api/v1/users', require('./routes/users'));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
