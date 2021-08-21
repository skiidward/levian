const discord = require("discord.js");
const config = require("./config.json");
const bot = new discord.Client({
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
        discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
}); 
const fs = require("fs");
const axios = require('axios')
const moment = require('moment')
require("dotenv").config();

bot.commands = {};

const events = fs.readdirSync("./events");
for(const event of events){
    const eventFunc = require(`./events/${event}`);
    bot.on(event.replace(".js", ""), async (bot, ...args) => {
        await eventFunc(bot, ...args);
    });
}

const categories = fs.readdirSync("./commands");
for(const category of categories){
    if(category.toLowerCase() === ".ds_store") continue;
    const commands = fs.readdirSync("./commands/" + category);
    for(const command of commands){
        if(command.toLowerCase() === ".ds_store") continue;
        if(!command.endsWith(".js")) continue;
        bot.commands[command] = require(`./commands/${category}/${command}`);
    }
}

bot.login(process.env.DISCORD_TOKEN);