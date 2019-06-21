const express = require('express');
const FlightsService = require('./flights-service');

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
    passengers,
    to_date,
    from_date
  };

  for (const [key, value] of Object.entries(newFlightSearch))
    if (value == null)
      return res
        .status(400)
        .json({ error: `Missing '${key}' in request body` });

  if (!FlightsService.validateAirportCode(to_destination))
    return res
      .status(400)
      .json({ error: `Incorrect airport code in 'to_destination'` });

  if (!FlightsService.validateAirportCode(from_destination))
    return res
      .status(400)
      .json({ error: `Incorrect airport code in 'from_destination'` });

  if (to_destination === from_destination)
    return res.status(400).json({
      error: `'to_destination' and 'from_destination' cannot be the same`
    });

  if (Number(passengers) < 1)
    return res.status(400).json({ error: `'passengers' can't be less than 1` });

  if (Number(passengers) > 5)
    return res.status(400).json({ error: `'passengers' can't be more than 5` });

  newFlightSearch.from_date = newFlightSearch.from_date.split('-');
  newFlightSearch.to_date = newFlightSearch.to_date.split('-');

  newFlightSearch.from_date = new Date(newFlightSearch.from_date.join('-'));
  newFlightSearch.to_date = new Date(newFlightSearch.to_date.join('-'));

  if (newFlightSearch.to_date.getTime() === newFlightSearch.from_date.getTime())
    return res
      .status(400)
      .json({ error: `'to_date' and 'from_date' cannot be the same` });

  if (newFlightSearch.to_date.getTime() < newFlightSearch.from_date.getTime())
    return res
      .status(400)
      .json({ error: `'to_date' cant be before 'from_date'` });

  FlightsService.getFlights(newFlightSearch)
    .then(results => {
      return res.send(FlightsService.formatResults(results.itins));
    })
    .catch(err => res.status(400).json(err));
});

module.exports = flightsRouter;
