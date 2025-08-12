import { REST, Routes } from "discord.js";
import "dotenv/config";
import { loadCommands } from "./loader";
import { join, dirname } from "path";

const clientId = process.env.CLIENT_ID!;
const guildId = process.env.GUILD_ID!;
const token = process.env.DISCORD_TOKEN!;

const slashCommands = loadCommands(join(dirname(__dirname), "slashCommands"));

console.log("SLash COMMANDS: ", slashCommands);

const commandsData = slashCommands.map((cmd: any) => {
  // Elimina la función run para el registro
  const { execute, ...data } = cmd;
  return data;
});

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(
      `Registrando ${commandsData.length} slash commands en el servidor ${guildId}...`
    );
    const data: any = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commandsData }
    );
    console.log(`Slash commands registrados correctamente (${data.length}).`);
  } catch (error) {
    console.error("Error registrando slash commands:", error);
  }
})();
