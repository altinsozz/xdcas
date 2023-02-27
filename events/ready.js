module.exports = {
  name: 'ready',
  once: true, // Buradaki once değişkeni true olarak ayarlanmalıdır.
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
  },
};
