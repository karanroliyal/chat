const express = require('express');

const createRouter = (routesCallback) => {
  const router = express.Router();
  routesCallback(router);
  return router;
};

module.exports = createRouter;