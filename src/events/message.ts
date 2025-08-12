import { Client, Events, Message } from "discord.js";
import { loadCommands } from "../loader";
import { join } from "path";

const normalCommands = loadCommands(join(__dirname, "commands"));

export default (client: Client) => {
  client.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot) return;
    // Ejecutar comandos normales
    for (const cmd of normalCommands) {
      if (typeof cmd.execute === "function") {
        try {
          await cmd.execute(client, message);
        } catch (err) {
          console.error(`[COMMAND ERROR] ${cmd.name}:`, err);
        }
      }
    }
  });
};
