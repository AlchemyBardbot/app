const router = require('../lib/controllers/router.js');
const MusicService = require('../lib/services/MusicService.js');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const jsonToChat = require('../lib/utils/jsonToChat.js');

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
