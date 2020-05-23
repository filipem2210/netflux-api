const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', routes);

app.use(errors());

module.exports = app;