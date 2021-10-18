const Discord = require('discord.js');
require('dotenv').config();
const prefix = process.env.PREFIX;
const token = process.env.BARDBOT_TOKEN;
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

let connection;

const client = new Discord.Client();

client.once('ready', () => {
  console.log('ready!');
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message);
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message);
  } else {
    message.channel.send('Enter a valid command!');
  }
});

async function execute(message) {
  const args = message.content.split(' ');
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
  const tracks = songs; //will need to update with call to DB

  try {
    connection = await voiceChannel.join();
    play(tracks[0]); // this line will change
    message.channel.send(`Now playing ${tracks[0].title}`); // this line will change too
  } catch (error) {
    console.log(error);
    return message.channel.send(error);
  }
}

function stop(message) {
  if (!message.member.voice.channel) {
    return message.channel.send(
      'You have to be in a voice channel to stop playback'
    );
  }
  connection.dispatcher.end();
}

function play(track) {
  const dispatcher = connection
    .play(ytdl(track.url, { filter: 'audioonly' }))
    .on('error', (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(5);
}

client.login(token);
