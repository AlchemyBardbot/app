require('dotenv').config();

const prefix = process.env.PREFIX;

const MusicService = require('../services/MusicService');

module.exports = function router(keyword, args, message, connection) {
  switch (keyword) {
    case `${prefix}play`:
      return MusicService.execute(message);

    case `${prefix}stop`:
      MusicService.stop(message, connection);
      break;

    default:
      break;
  }
};
