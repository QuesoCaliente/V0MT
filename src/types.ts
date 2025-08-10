import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
} from "discord.js";

export interface ILinkPreviewResponse {
  title: string;
  description: string;
  image: string;
  url: string;
}

export interface command extends ChatInputApplicationCommandData {
  category?: string;
  execute: (
    client: Client,
    interaction: CommandInteraction | ChatInputCommandInteraction
  ) => void;
}
