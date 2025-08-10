import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

import { loadCommands, loadEvents } from "./loader";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildExpressions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

// Cargar eventos dinámicamente
loadEvents(__dirname + "\\events", client);

// Cargar comandos normales y slash commands
console.log(__dirname + "\\commands");
loadCommands(__dirname + "\\commands");
loadCommands(__dirname + "\\slashCommands");

client.login(process.env.DISCORD_TOKEN);
