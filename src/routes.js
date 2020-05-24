const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const routes = Router();

routes.post(
  '/signup',
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
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    }),
  }),
  SessionController.store,
);

module.exports = routes;
