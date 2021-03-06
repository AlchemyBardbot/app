const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.BARDBOT_TOKEN;
const prefix = process.env.PREFIX;
const router = require('./lib/controllers/router.js');

const client = new Discord.Client();
const connections = {};

client.once('ready', () => {
    console.log('Roll for initiative!');
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const messageParts = message.content.split(' ');
    const keyword = messageParts[0];
    const args = messageParts.slice(1) || [];
    const id = message.guild.id;
    const connection = await router(keyword, args, message, connections[id]);
    if (keyword === `${prefix}play`) connections[id] = connection;
});

client.login(token);
