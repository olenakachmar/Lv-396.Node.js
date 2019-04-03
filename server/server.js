require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const config = require('./config/config');
const authRouter = require('./api/v1/auth.route');
const usersRouter = require('./api/v1/users.route');
const issuesRouter = require('./api/v1/issues.route');
const departmentsRouter = require('./api/v1/departments.route');
const mongoose = require('./config/mongoose');

const { port } = config;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/', usersRouter);
app.use('/api/v1/', issuesRouter);
app.use('/api/v1/', departmentsRouter);

app.listen(port, () => {
  console.log(`Server running at port ${port}/`);
});
