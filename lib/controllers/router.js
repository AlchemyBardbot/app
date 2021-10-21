require('dotenv').config();

const prefix = process.env.PREFIX;

const Genre = require('../models/Genre.js');
const MusicService = require('../services/MusicService');
const roll = require('../utils/roll.js');

module.exports = async function router(keyword, args, message, connection) {
    switch (keyword) {
        case `${prefix}play`:
            if (args.length) {
                return MusicService.execute(message, args);
            }
            message.channel.send(
                'Genre needs to accompany the play command. Enter the genres command for a list of options!'
            );
            break;

        case `${prefix}stop`:
            MusicService.stop(message, connection);
            break;

        case `${prefix}genres`: {
            const genres = await Genre.getGenres();
            message.channel.send(genres);
            break;
        }
        case `${prefix}roll`:
            if (args.length) {
                return message.channel.send(roll(args[0]));
            }
            message.channel.send(
                'Please provide a number for the roll feature!'
            );
            break;
        default:
            message.channel.send('You need to enter a valid command!');
            break;
    }
};
