const fs = require('fs');

module.exports = (client) => {
  const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./${file}`);
    client.commands.set(command.name, command);
  }
}
