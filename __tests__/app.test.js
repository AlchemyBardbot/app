const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('bardbot routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Check to see if the message has play and by genre ', async() => {
    const res = await 
  });

  afterAll(() => {
    pool.end();
  });
});
