const Currency = require('../models/currency');

async function getCurrency(userId, currencyCode) {
  const userCurrency = await Currency.findOne({ userId, code: currencyCode });
  return userCurrency;
}

async function createCurrency(userId, currencyCode, amount) {
  const currency = new Currency({
    userId,
    code: currencyCode,
    amount,
  });

  await currency.save();
}

async function updateCurrency(userId, currencyCode, amount) {
  await Currency.updateOne({ userId, code: currencyCode }, { amount });
}

module.exports = {
  getCurrency,
  createCurrency,
  updateCurrency,
};
