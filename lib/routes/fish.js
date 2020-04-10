const { Router } = require('express');
const Fish = require('../models/Fish');

module.exports = Router()

  .get('/', (req, res, next) => {
    const { start, end } = req.query;

    Fish
      .getFishByMonth(start, end)
      .then(fishes => res.send(fishes))
      .catch(next);
  });
