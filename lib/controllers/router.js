const MusicService = require('../services/MusicService');

module.exports = function router(keyword, args, message) {
  switch (keyword) {
    case 'play':
      MusicService.execute(message);
      break;

    default:
      break;
  }
};
