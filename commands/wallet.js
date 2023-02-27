const Discord = require('discord.js');
const Currency = require('../models/currency');
const { calculatePercentageChange } = require('../helpers/utils');

module.exports = {
  name: 'wallet',
  description: 'Displays user\'s wallet information',
  async execute(message, args) {
    const userId = message.author.id;
    const userCurrencies = await Currency.find({ userId });

    if (userCurrencies.length === 0) {
      return message.channel.send('You don\'t have any currencies yet!');
    }

    const userCurrencyValues = userCurrencies.map((currency) => {
      const percentageChange = calculatePercentageChange(currency.lastHourValue, currency.value);
      return {
        name: currency.name,
        symbol: currency.symbol,
        value: currency.value,
        percentageChange: percentageChange
      };
    });

    const totalPortfolioValue = userCurrencyValues.reduce((acc, currency) => {
      return acc + currency.value;
    }, 0);

    const formattedUserCurrencies = userCurrencyValues.map((currency) => {
      const percentageChangeString = currency.percentageChange > 0 ? `+${currency.percentageChange.toFixed(2)}%` : `${currency.percentageChange.toFixed(2)}%`;
      return `**${currency.name} (${currency.symbol}):** ${currency.value.toFixed(2)} (${percentageChangeString})`;
    }).join('\n');

    const totalPortfolioValueString = totalPortfolioValue.toFixed(2);
    const portfolioPercentageChange = calculatePercentageChange(totalPortfolioValue, 100);
    const portfolioPercentageChangeString = portfolioPercentageChange > 0 ? `+${portfolioPercentageChange.toFixed(2)}%` : `${portfolioPercentageChange.toFixed(2)}%`;

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${message.author.username}'s Wallet`)
      .setDescription(formattedUserCurrencies)
      .addField('Total Portfolio Value', `${totalPortfolioValueString} ${process.env.MAIN_CURRENCY_SYMBOL} (${portfolioPercentageChangeString})`);

    return message.channel.send(embed);
  },
};
