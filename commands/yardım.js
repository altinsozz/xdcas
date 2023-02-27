const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'yardım',
  description: 'Botun komutları hakkında bilgi verir',
  execute(message, args) {
    const embed = new MessageEmbed()
      .setTitle('Komut Listesi')
      .setDescription('Botun mevcut komutları:')
      .setColor('#00ff00');

    const commands = message.client.commands;
    const commandList = commands.map(cmd => `**${cmd.name}:** ${cmd.description}`).join('\n');
    embed.addField('Komutlar', commandList);

    message.channel.send({ embeds: [embed] });
  },
};
