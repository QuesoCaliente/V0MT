import { Client, CommandInteraction, Interaction } from "discord.js";
import { loadCommands } from "../loader";
import { join, dirname } from "path";
const slashCommands = loadCommands(join(dirname(__dirname), "slashCommands"));

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = slashCommands.find(
    (cmd) => cmd.name === interaction.commandName
  );
  if (!slashCommand) {
    interaction.reply({
      content: "Error, Comando no encontrado",
    });
    return;
  }
  try {
    if (typeof slashCommand.run === "function") {
      await slashCommand.run(client, interaction);
    } else if (typeof slashCommand.execute === "function") {
      await slashCommand.execute(client, interaction);
    } else {
      await interaction.reply({
        content: "Este comando no tiene función ejecutable.",
      });
    }
  } catch (error) {
    console.log("Error al ejecutar el comando:", error);
  }
};
