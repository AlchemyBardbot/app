const ytdl = require('ytdl-core');

const songs = [
  {
    title: 'track1',
    genre: 'magic city',
    url: 'https://www.youtube.com/watch?v=K1vUA9NltVw',
  },
  {
    title: 'track2',
    genre: 'battle',
    url: 'https://www.youtube.com/watch?v=DFppStNpssI&list=PLvTniKF5s36przsVOM4vxKSfZRMz7kP7c&index=1',
  },
  {
    title: 'track3',
    genre: 'battle',
    url: 'https://www.youtube.com/watch?v=F7ifBaPNmz4&list=PLvTniKF5s36przsVOM4vxKSfZRMz7kP7c&index=8',
  },
];

module.exports = class MusicService {
  static async execute(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        'You need to be in a voice channel to play selections'
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send(
        'I need permission to join and speak in your voice channel!'
      );
    }

    try {
      const connection = await voiceChannel.join();
      const randomTrack = Math.floor(Math.random() * songs.length);
      MusicService.play(songs[randomTrack], connection);
      message.channel.send(`Now playing ${songs[randomTrack].title}`);
      return connection;
    } catch (error) {
      console.log(error);
      return message.channel.send(error);
    }
  }

  static async play(track, connection) {
    const dispatcher = connection
      .play(ytdl(track.url, { filter: 'audioonly' }))
      .on('error', (error) => console.error(error));
  }

  static async stop(message, connection) {
    if (!message.member.voice.channel) {
      return message.channel.send(
        'You have to be in a voice channel to stop playback'
      );
    }
    connection.dispatcher.end();
  }
};
