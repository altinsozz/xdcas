const Discord = require('discord.js');
const { getCurrencyValueChange } = require('../helpers/utils');

const Currency = require('../models/currency');

module.exports = {
  name: 'buy',
  description: 'Buy a currency with your balance',
  aliases: ['purchase'],
  usage: '<currency name> <amount>',
  async execute(message, args) {
    const currencyName = args[0];
    const amount = parseInt(args[1]);
    const user = message.author;

    // Check if currency name and amount is provided
    if (!currencyName || !amount) {
      return message.reply(
        `Please provide a currency name and an amount. Usage: \`!buy ${this.usage}\``
      );
    }

    // Get the currency from the database
    const currency = await Currency.findOne({ name: currencyName }).exec();

    if (!currency) {
      return message.reply(`Currency \`${currencyName}\` not found.`);
    }

    const totalPrice = amount * currency.value;

    // Get user's balance from the database
    const userCurrency = await Currency.findOne({ user: user.id }).exec();

    if (!userCurrency || userCurrency.balance < totalPrice) {
      return message.reply(
        `You don't have enough balance to purchase ${amount} ${currency.symbol}.\nYour current balance is ${userCurrency ? userCurrency.balance : 0} ${currency.symbol}.`
      );
    }

    // Subtract purchased currency amount from user's balance
    userCurrency.balance -= totalPrice;
    await userCurrency.save();

    // Add purchased currency amount to user's wallet
    let wallet = userCurrency.wallet.find((c) => c.currencyId == currency._id);

    if (!wallet) {
      wallet = { currencyId: currency._id, amount: 0 };
      userCurrency.wallet.push(wallet);
    }

    wallet.amount += amount;
    await userCurrency.save();

    return message.reply(
      `You have successfully purchased ${amount} ${currency.symbol} for ${totalPrice} ${userCurrency.currency.symbol}.`
    );
  },
};
