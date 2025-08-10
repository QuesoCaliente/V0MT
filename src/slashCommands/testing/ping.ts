import { ApplicationCommandType } from "discord.js";
import { command } from "../../types";

export const ping: command = {
  name: "ping",
  description: "Responde con pong",
  type: ApplicationCommandType.ChatInput,
  execute: async (_client, interaction) => {
    await interaction.reply("Pong!");
  },
};
