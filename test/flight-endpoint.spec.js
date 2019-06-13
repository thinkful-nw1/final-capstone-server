const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('Flights Endpoint', () => {
  describe('POST /api/flights', () => {
    context('flight search', () => {
      const requiredFields = [
        'to_destination',
        'from_destination',
        'to_date',
        'from_date',
        'passengers'
      ];

      requiredFields.forEach(field => {
        const flightSearchAttemptBody = {
          to_destination: 'LGA',
          from_destination: 'CAE',
          to_date: 'June+30+2019',
          from_date: 'June+27+2019',
          passengers: 1
        };

        it(`responds with 400 error when required '${field}' is missing`, () => {
          delete flightSearchAttemptBody[field];

          return supertest(app)
            .post('/api/flights')
            .send(flightSearchAttemptBody)
            .expect(400, { error: `Missing '${field}' in request body` });
        });
      });

      it(`responds with 400 error when 'to_destination' isn't a valid airport code`, () => {
        const flightSearchBody = {
          to_destination: 'ZZZ',
          from_destination: 'CAE',
          to_date: 'June+30+2019',
          from_date: 'June+27+2019',
          passengers: 1
        };

        return supertest(app)
          .post('/api/flights')
          .send(flightSearchBody)
          .expect(400, {
            error: `Incorrect airport code in 'to_destination'`
          });
      });

      it(`responds with 400 error when 'from_destination' isn't a valid airport code`, () => {
        const flightSearchBody = {
          to_destination: 'LGA',
          from_destination: 'ZZZ',
          to_date: 'June+30+2019',
          from_date: 'June+27+2019',
          passengers: 1
        };

        return supertest(app)
          .post('/api/flights')
          .send(flightSearchBody)
          .expect(400, {
            error: `Incorrect airport code in 'from_destination'`
          });
      });

      it(`responds with 400 error when 'passengers' is less than 1`, () => {
        const flightSearchBody = {
          to_destination: 'LGA',
          from_destination: 'CAE',
          to_date: 'June+30+2019',
          from_date: 'June+27+2019',
          passengers: 0
        };

        return supertest(app)
          .post('/api/flights')
          .send(flightSearchBody)
          .expect(400, {
            error: `'passengers' can't be less than 1`
          });
      });

      it(`responds with 400 error when 'passengers' is more than 5`, () => {
        const flightSearchBody = {
          to_destination: 'LGA',
          from_destination: 'CAE',
          to_date: 'June+30+2019',
          from_date: 'June+27+2019',
          passengers: 99
        };

        return supertest(app)
          .post('/api/flights')
          .send(flightSearchBody)
          .expect(400, {
            error: `'passengers' can't be more than 5`
          });
      });
    });
  });
});
