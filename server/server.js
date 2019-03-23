require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/config');
const apirouter = require('./api/v1');

const { port } = config;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', apirouter);

app.listen(port, () => {
  console.log(`Server running at port ${port}/`);
});
