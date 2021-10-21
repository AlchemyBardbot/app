const router = require('../lib/controllers/router.js');
const MusicService = require('../lib/services/MusicService.js');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const jsonToChat = require('../lib/utils/jsonToChat.js');
const roll = require('../lib/utils/roll.js');

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

    it('should match!', () => {
        const input = [
            { genre: 'town', count: '3' },
            { genre: 'battle', count: '3' },
            { genre: 'tavern', count: '3' },
            { genre: 'travel', count: '3' },
            { genre: 'magictown', count: '3' },
        ];

        const output = jsonToChat(input);
        expect(output).toEqual(
            `town: 3
battle: 3
tavern: 3
travel: 3
magictown: 3`
        );
    });

    it('the roll command should return a random number in range from 1 - x', () => {
        const roll20 = roll(20);

        expect(roll20).toBeGreaterThanOrEqual(1);
        expect(roll20).toBeLessThanOrEqual(20);
    });

    it('Should return "Not a valid Number" if anything else besides an integer is typed after roll command', async() => {
        await router('!roll', [], message);
        expect(message.channel.send).toHaveBeenCalledWith(
            expect.stringContaining('Please provide a number for the roll feature!')
        );
    });
});
