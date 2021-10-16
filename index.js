require('dotenv').config();
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const queue = new Map();
const prefix = require('./config.js');



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
  if (msg.content === `${prefix}dungeons`) {
    msg.reply('AND dragons');

  }


});


client.login(process.env.BARDBOT_TOKEN);
