const router = require('../lib/controllers/router.js');
const MusicService = require('../lib/services/MusicService.js');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');

describe('bardbot routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    jest.spyOn(MusicService, 'play').mockImplementation(() => true);

    const message = {
        member: {
            voice: {
                channel: {
                    permissionsFor() {
                        return { has: () => true };
                    },
                    join: () => true,
                },
            },
        },
        channel: {
            send: jest.fn(),
        },
        client: {
            user: true,
        },
    };

    it('should retrieve a song by genre and send it along with a message', async () => {
        await router('!play', ['battle'], message);
        expect(message.channel.send).toHaveBeenCalledWith(
            expect.stringContaining('Now playing')
        );
    });

    it('should get all genres and count their tracks', async () => {
        await router('!genres', [], message);
        expect(message.channel.send).toHaveBeenCalledWith(
            expect.stringContaining('travel:')
        );
    });
});
