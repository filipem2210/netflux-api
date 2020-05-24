const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./app/controllers/UserController');

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

module.exports = routes;
