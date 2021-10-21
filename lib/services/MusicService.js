const ytdl = require('ytdl-core');
const { getPlaylist } = require('../models/Genre');

module.exports = class MusicService {
    static async execute(message, args) {
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
            //grab genre from user command
            const playList = await getPlaylist(args[0]);
            if (!playList.length) {
                return message.channel.send('Not a valid Genre');
            }
            const randomTrack = Math.floor(Math.random() * playList.length);
            MusicService.play(playList[randomTrack], connection);
        
            message.channel.send(`Now playing ${playList[randomTrack].title}`);
            return connection;
        } catch (error) {
            console.log(error);
            return message.channel.send(error);
        }
    }

    static async play(track, connection) {
        connection
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
