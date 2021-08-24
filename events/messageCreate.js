import config from "../config.js";
import getPrefix from "../utils/getPrefix.js";
import { MessageEmbed } from "discord.js";
export default async function (client, msg) {
  const prefix = await getPrefix(client, msg);
  if (
    msg.content === "<@!" + config.clientid + ">" ||
    msg.content === "<@" + config.clientid + ">"
  ) {
    await client.replyEmbed(
      msg,
      new MessageEmbed()
        .setTitle("You just pinged me!")
        .setDescription("My prefix for this server is: **`" + prefix + "`**")
    );
    return;
  }
  if (msg.content.startsWith(prefix)) {
    const msgWithoutPrefix = msg.content.slice(0, prefix.length).trim();
    const words = msgWithoutPrefix.split(" ").filter((x) => x.length > 0);
    try {
      const command = client.commands[words[0]];
    } catch (_) {
      return;
    }
    if (command.nsfw && !msg.channel.nsfw) {
      await client.replyEmbed(
        msg,
        new MessageEmbed()
          .setTitle("You aren't at the true place to do that!")
          .setDescription(
            [
              "Looks like the command you are trying to use",
              "is an NSFW-only command and this channel isn't NSFW!",
              "\n Consider using this command in an NSFW channel",
              "or switching NSFW for this channel on!",
            ].join(" ")
          )
      );
      return;
    }
    if(command.voted && !await (await import("../utils/isVoted.js")).default(client, msg.author)) {
      await client.replyEmbed(
        msg,
        new MessageEmbed()
          .setTitle("You have to vote!")
          .setDescription("This is a vote-rewarded command! Please vote to use!")
      );
      return;
    }
    await command.run.call(client, msg, ...words.slice(1));
  }
};
