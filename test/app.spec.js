const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Travel App API"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Travel App API');
  });
});
