const { Router } = require('express');
const UserController = require('./app/controllers/UserController');

const routes = Router();

routes.get('/', UserController.show);

module.exports = routes;
