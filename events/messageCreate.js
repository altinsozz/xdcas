const client = require("../index");
const { prefix } = require("../config.json");

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    await client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Bu komutu çalıştırırken bir hata oluştu!");
  }
});
