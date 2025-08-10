import { Client, Events } from "discord.js";
import { commands } from "../commands";

export default (client: Client) => {
  client.on(Events.ClientReady, () => {
    if (!client.user || !client.application) return;
    console.log(`Logged in as ${client.user.tag}`);
    client.application.commands.set(commands);
  });
};
