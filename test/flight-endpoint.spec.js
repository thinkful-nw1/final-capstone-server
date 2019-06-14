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
          to_date: '2019-30-6',
          from_date: '2019-27-6',
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
          to_date: '2019-30-6',
          from_date: '2019-27-6',
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
          to_date: '2019-30-6',
          from_date: '2019-27-6',
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
          to_date: '2019-30-6',
          from_date: '2019-27-6',
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
          to_date: '2019-30-6',
          from_date: '2019-27-6',
          passengers: 99
        };

        return supertest(app)
          .post('/api/flights')
          .send(flightSearchBody)
          .expect(400, {
            error: `'passengers' can't be more than 5`
          });
      });

      it(`responds with 400 error when 'to_destination' and 'from_destination are the same`, () => {
        const flightSearchBody = {
          to_destination: 'LGA',
          from_destination: 'LGA',
          to_date: '2019-30-6',
          from_date: '2019-27-6',
          passengers: 1
        };

        return supertest(app)
          .post('/api/flights')
          .send(flightSearchBody)
          .expect(400, {
            error: `'to_destination' and 'from_destination' cannot be the same`
          });
      });

      it(`responds with 400 error when 'to_date' is equal to 'from_date'`, () => {
        const flightSearchBody = {
          to_destination: 'LGA',
          from_destination: 'CAE',
          from_date: '2019-27-6',
          to_date: '2019-27-6',
          passengers: 1
        };

        return supertest(app)
          .post('/api/flights')
          .send(flightSearchBody)
          .expect(400, {
            error: `'to_date' and 'from_date' cannot be the same`
          });
      });

      it.skip(`responds with 400 error when 'to_date' is before 'from_date'`, () => {
        const flightSearchBody = {
          to_destination: 'LGA',
          from_destination: 'CAE',
          from_date: '2019-27-6',
          to_date: '2019-20-6',
          passengers: 1
        };

        return supertest(app)
          .post('/api/flights')
          .send(flightSearchBody)
          .expect(400, {
            error: `'to_date' cant be before 'from_date'`
          });
      });
    });
  });
});
