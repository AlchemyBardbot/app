const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.BARDBOT_TOKEN;
const router = require('./lib/controllers/router.js');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('ready!');
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  const messageParts = message.split(' ');
  const keyword = messageParts[0];
  const args = messageParts.slice(1);
  return router(keyword, args, message);
});

client.login(token);
