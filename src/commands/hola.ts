import { Client, Message } from "discord.js";

export default {
  name: "hola",
  description: "Responde con un saludo (comando normal)",
  execute: (_client: Client, message: Message) => {
    if (message.content === "!hola") {
      message.reply("¡Hola! Este es un comando normal.");
    }
  },
};
