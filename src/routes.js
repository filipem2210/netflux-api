const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { celebrate, Segments, Joi } = require('celebrate');

const rateLimitConfig = require('./config/rateLimit');

const apiLimiter = rateLimit(rateLimitConfig);

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const MovieController = require('./app/controllers/MovieController');

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

routes.get(
  '/me',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  authMiddleware,
  UserController.show,
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

routes.get(
  '/movies',
  celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  authMiddleware,
  MovieController.index,
);

routes.post(
  '/movies',
  celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      file: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
      creators: Joi.string().allow(''),
      cast: Joi.string().allow(''),
      genres: Joi.string().allow(''),
    }),
  }),
  authMiddleware,
  MovieController.store,
);

module.exports = routes;
