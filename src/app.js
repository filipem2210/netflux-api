require('dotenv/config');
const express = require('express');
const Sentry = require('@sentry/node');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const { errors } = require('celebrate');

const sentryConfig = require('./config/sentry');
const corsConfig = require('./config/cors');
const sessionConfig = require('./config/session');

const routeNotFound = require('./app/middlewares/routeNotFound');

const routes = require('./routes');

const app = express();

Sentry.init(sentryConfig);
app.use(Sentry.Handlers.requestHandler());

app.use(helmet());
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use('/api/v1/static/images/movies', express.static(path.resolve(__dirname, '..', 'images', 'reduced')));
app.use('/api/v1', routes);
app.use(routeNotFound);

app.use(Sentry.Handlers.errorHandler());
app.use(errors());

module.exports = app;
