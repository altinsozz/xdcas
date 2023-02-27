const Currency = require('../models/currency');
const { formatCurrency } = require('../helpers/utils');

module.exports = {
  name: 'para-birimi-oluştur',
  description: 'Yeni bir para birimi oluşturur.',
  usage: '<para birimi adı> <başlangıç değeri>',
  async execute(message, args) {
    const name = args[0];
    const value = Number(args[1]);

    if (!name || !value) {
      return message.reply('Lütfen bir para birimi adı ve başlangıç değeri belirtin.');
    }

    try {
      const currency = await Currency.create({
        name,
        value,
      });

      message.channel.send(`${formatCurrency(value)} değerinde ${currency.name} adlı para birimi oluşturuldu!`);
    } catch (error) {
      console.error(error);
      message.reply('Bir hata oluştu ve para birimi oluşturulamadı.');
    }
  },
};
