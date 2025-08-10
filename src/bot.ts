import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

import { loadEvents } from "./loader";
import { join } from "path";

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
loadEvents(join(__dirname, "events"), client);

client.login(process.env.DISCORD_TOKEN);
