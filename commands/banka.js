const { getCurrencyByName } = require('../helpers/utils');

module.exports = {
  name: 'banka',
  description: 'Kazançlarınızı gösterir.',
  async execute(message) {
    const user = await User.findOne({ discordId: message.author.id });

    let response = `Ana hesap bakiyeniz: ${user.balance} ${process.env.BASE_CURRENCY}\n`;

    for (let i = 0; i < process.env.CURRENCIES.split(',').length; i++) {
      const currencyName = process.env.CURRENCIES.split(',')[i];
      const currency = await getCurrencyByName(currencyName);

      const profit = (user[currency.name] * currency.price) - (user[currency.name] * currency.hourlyChange * currency.price);

      response += `${currency.name} hesabınızda: ${user[currency.name]} ${currency.name}. (24 saatteki kar/zarar: ${profit} ${process.env.BASE_CURRENCY})\n`;
    }

    return message.reply(response);
  },
};
