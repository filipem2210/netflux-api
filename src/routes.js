const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const rateLimiterMiddleware = require('./app/middlewares/rateLimiterRedis');
const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const MovieController = require('./app/controllers/MovieController');

const routes = Router();

routes.post(
  '/signup',
  rateLimiterMiddleware,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    }),
  }),
  UserController.store,
);

routes.post(
  '/checkUser',
  rateLimiterMiddleware,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  UserController.checkUser,
);

routes.post(
  '/signin',
  rateLimiterMiddleware,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    }),
  }),
  SessionController.store,
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

routes.get(
  '/movies',
  celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      genres: Joi.number(),
    }),
  }),
  authMiddleware,
  MovieController.index,
);

routes.get(
  '/movies/netflix',
  celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  authMiddleware,
  MovieController.netflix,
);

routes.get(
  '/movies/top_rated',
  celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  authMiddleware,
  MovieController.top_rated,
);

routes.get(
  '/movies/trending',
  celebrate({
    [Segments.HEADERS]: Joi.object().keys({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  authMiddleware,
  MovieController.trending,
);

module.exports = routes;
