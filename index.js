import discord from "discord.js";
import config from "./config.js";
const client = new discord.Client({
  intents: [
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MEMBERS,
    discord.Intents.FLAGS.GUILD_BANS,
    discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    discord.Intents.FLAGS.GUILD_WEBHOOKS,
    discord.Intents.FLAGS.GUILD_INVITES,
    discord.Intents.FLAGS.GUILD_VOICE_STATES,
    discord.Intents.FLAGS.GUILD_PRESENCES,
    discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    discord.Intents.FLAGS.DIRECT_MESSAGES,
    discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

client.commands = {};
client.replyEmbed = (msg, embed) => msg.reply({ embeds: [ embed.setFooter("Requested by "+msg.author.tag).setColor("RANDOM").setTimestamp() ] });
(async()=>{
  const events = fs.readdirSync("./events");
  for (const event of events) {
    const eventFunc = (await import(`./events/${event}`)).default;
    client.on(event.replace(".js", ""), async (...args) => {
      await eventFunc(client, ...args);
    });
  }
  
  const categories = fs.readdirSync("./commands");
  for (const category of categories) {
    if (category.toLowerCase() === ".ds_store") continue;
    const commands = fs.readdirSync("./commands/" + category);
    for (const command of commands) {
      if (command.toLowerCase() === ".ds_store") continue;
      if (!command.endsWith(".js")) continue;
      client.commands[command] = (await import(`./commands/${category}/${command}`)).default;
    }
  }
  client.login(process.env.DISCORD_TOKEN);
})();
