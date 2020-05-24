const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { celebrate, Segments, Joi } = require('celebrate');

const rateLimitConfig = require('./config/rateLimit');

const apiLimiter = rateLimit(rateLimitConfig);

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const routes = Router();

routes.post(
  '/signup',
  apiLimiter,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    }),
  }),
  UserController.store,
);

routes.post(
  '/signin',
  apiLimiter,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    }),
  }),
  SessionController.store,
);

module.exports = routes;
