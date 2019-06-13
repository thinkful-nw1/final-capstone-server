const airports = require('../airports');

const FlightsService = {
  validateAirportCode(code) {
    for (let i = 0; i < airports.length; i++) {
      if (airports[i].code === code) return true;
    }
    return false;
  }
};

module.exports = FlightsService;
