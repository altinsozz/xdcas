const { getCurrencyByName } = require('../helpers/utils');

module.exports = {
  name: 'parabirimi-sat',
  description: 'Belirtilen para birimini belirtilen miktarda satın alır.',
  aliases: ['sat'],
  usage: '<para-birimi> <miktar>',
  async execute(message, args) {
    const currencyName = args[0];
    const quantity = parseInt(args[1]);

    if (isNaN(quantity)) {
      return message.reply('Lütfen geçerli bir miktar girin.');
    }

    const currency = await getCurrencyByName(currencyName);

    if (!currency) {
      return message.reply('Geçerli bir para birimi girin.');
    }

    const user = await User.findOne({ discordId: message.author.id });

    if (user[currency.name] < quantity) {
      return message.reply(`Yeterli miktarda ${currency.name} bulunamadı.`);
    }

    const price = currency.price * quantity;
    const profit = (price - (currency.hourlyChange * price)) - (currency.price * quantity);

    user.balance += price - profit;
    user[currency.name] -= quantity;
    await user.save();

    return message.reply(`${quantity} ${currency.name} sattınız ve ${price - profit} ${currency.baseCurrency} kazandınız.`);
  },
};
