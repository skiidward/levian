const config = require("../config.json");
module.exports = async function(bot, msg){
  if(msg.content === "<@!"+config.botid+">" || msg.content === "<@"+config.botid+">") {
    msg.reply(`Hey, my prefix in this server is: \`${}\``);
  }
}

a
