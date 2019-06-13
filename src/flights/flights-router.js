const express = require('express');
const FlightService = require('./flights-service');

const flightsRouter = express.Router();
const jsonBodyParser = express.json();

flightsRouter.post('/', jsonBodyParser, (req, res, next) => {
  const {
    to_destination,
    from_destination,
    to_date,
    from_date,
    passengers
  } = req.body;

  const newFlightSearch = {
    to_destination,
    from_destination,
    to_date,
    from_date,
    passengers
  };

  for (const [key, value] of Object.entries(newFlightSearch))
    if (value == null)
      return res
        .status(400)
        .json({ error: `Missing '${key}' in request body` });

  if (!FlightService.validateAirportCode(to_destination))
    return res
      .status(400)
      .json({ error: `Incorrect airport code in 'to_destination'` });

  if (!FlightService.validateAirportCode(from_destination))
    return res
      .status(400)
      .json({ error: `Incorrect airport code in 'from_destination'` });

  if (Number(passengers) < 1)
    return res.status(400).json({ error: `'passengers' can't be less than 1` });

  if (Number(passengers) > 5)
    return res.status(400).json({ error: `'passengers' can't be more than 5` });
});

module.exports = flightsRouter;
