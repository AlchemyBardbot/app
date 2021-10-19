const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.BARDBOT_TOKEN;
const router = require('./lib/controllers/router.js');

const client = new Discord.Client();
const connections = {};

client.once('ready', () => {
  console.log('ready!');
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  const messageParts = message.content.split(' ');
  const keyword = messageParts[0];
  const args = messageParts.slice(1);
  const id = message.guild.id;
  const connection = await router(keyword, args, message, connections[id]);
  connections[id] = connection;
});

client.login(token);
