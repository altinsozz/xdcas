const Discord = require('discord.js');
const mongoose = require('mongoose');

const utils = require('./helpers/utils');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async (message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('Pong!');
  } else if (command === 'parabirimi-oluştur') {
    const userId = message.author.id;
    const currencyCode = args[0];
    const amount = parseFloat(args[1]);

    if (!currencyCode || !amount) {
      return message.channel.send('Lütfen bir para birimi kodu ve tutar belirtin.');
    }

    const existingCurrency = await utils.getCurrency(userId, currencyCode);

    if (existingCurrency) {
      return message.channel.send(`Bu para birimi zaten mevcut: ${currencyCode}`);
    }

    await utils.createCurrency(userId, currencyCode, amount);

    return message.channel.send(`Para birimi oluşturuldu: ${currencyCode}`);
  } else if (command === 'parabirimi-al') {
    // parabirimi-al komutu burada
  } else if (command === 'parabirimi-sat') {
    // parabirimi-sat komutu burada
  } else if (command === 'cüzdan') {
    // cüzdan komutu burada
  }
});

client.login(process.env.TOKEN);
