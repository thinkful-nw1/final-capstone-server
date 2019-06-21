const fetch = require('node-fetch');
const airports = require('../airports');
const hipmunkRequest =
  'https://apidojo-hipmunk-v1.p.rapidapi.com/flights/create-session?infants_lap=0&children=0&seniors=0&country=US&from0=';
const host = 'apidojo-hipmunk-v1.p.rapidapi.com';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function convertDateToString(date) {
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}+${day}+${year}`;
}

const FlightsService = {
  validateAirportCode(code) {
    for (let i = 0; i < airports.length; i++) {
      if (airports[i].code === code) return true;
    }
    return false;
  },

  getFlights(flightSearch) {
    const {
      from_destination,
      to_destination,
      passengers,
      from_date
    } = flightSearch;
    const request = `${hipmunkRequest}${from_destination}&to0=${to_destination}&date0=${convertDateToString(
      from_date
    )}&pax=${passengers}&cabin=Coach`;

    return fetch(request, {
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': host,
        'X-RapidAPI-Key': process.env.HIPMUNK_KEY
      }
    })
      .then(res => res.json())
      .catch(err => err);
  },

  formatResults(results) {
    let flights = Object.keys(results).map(key => results[key]);

    flights = flights.map(flightData => {
      const flight = {
        flight_code: flightData.iden,
        price: flightData.unrounded_price,
        booking_urls: flightData.booking_urls
      };
      return flight;
    });
    if (flights.length > 10) flights.length = 10;
    return flights;
  }
};

module.exports = FlightsService;
