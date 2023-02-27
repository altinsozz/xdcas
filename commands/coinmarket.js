const Discord = require('discord.js');
const { getAllCurrencies } = require('../helpers/database');
const { calculatePercentChange } = require('../helpers/utils');

module.exports = {
  name: 'coinmarket',
  description: 'Displays a list of all currencies and their values.',
  async execute(message) {
    const currencies = await getAllCurrencies();
    const baseCurrency = 'USD'; // Botun ana para birimi

    // Tüm para birimlerinin değerlerini al
    const currencyValues = await Promise.all(currencies.map(async (currency) => {
      const value = await calculatePercentChange(currency.value, baseCurrency);
      return {
        name: currency.name,
        symbol: currency.symbol,
        value,
      };
    }));

    // Para birimlerini değerine göre sırala
    currencyValues.sort((a, b) => b.value - a.value);

    // Embed oluştur
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Coin Market')
      .setDescription('Here are the current values of all currencies:')
      .addFields(
        currencyValues.map((currency) => {
          return {
            name: `${currency.symbol} ${currency.name}`,
            value: `${currency.value.toFixed(2)}%`,
            inline: true,
          };
        }),
      );

    // Mesajı gönder
    message.channel.send({ embeds: [embed] });
  },
};
