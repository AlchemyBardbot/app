require('dotenv').config();

const prefix = process.env.PREFIX;

const Genre = require('../models/Genre');
const MusicService = require('../services/MusicService');

module.exports = async function router(keyword, args, message, connection) {
    switch (keyword) {
        case `${prefix}play`:
            return MusicService.execute(message, args);

        case `${prefix}stop`:
            MusicService.stop(message, connection);
            break;

        case `${prefix}genres`:
            const genres = await Genre.getGenres();
            message.channel.send(genres);
            break;

        default:
            message.channel.send('You need to enter a valid command!');
            break;
    }
};
