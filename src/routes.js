require('dotenv').config();
const { Router } = require('express');
const ExpressBrute = require('express-brute');
const RedisStore = require('express-brute-redis');
const { celebrate, Segments, Joi } = require('celebrate');

const store = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteforce = new ExpressBrute(store);

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const MovieController = require('./app/controllers/MovieController');

const routes = Router();

routes.post(
  '/signup',
  bruteforce.prevent,
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
  bruteforce.prevent,
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
