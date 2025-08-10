import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
} from "discord.js";
import { getInfoUrl } from "../../utils";
const categories = [
  "3d",
  "backgrounds",
  "colors",
  "css",
  "fonts",
  "hosting",
  "illustrations",
  "inspirations",
  "tools",
  "video",
];

export default {
  name: "resource",
  description: "Genera un recurso para AssetBox 2",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "url",
      description: "URL del recurso",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "category",
      description: "Categoría del recurso",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: categories.map((cat) => ({ name: cat, value: cat })),
    },
    {
      name: "keywords",
      description: "Palabras clave separadas por coma",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  execute: async (
    _client: Client,
    interaction: CommandInteraction | ChatInputCommandInteraction
  ) => {
    const url = (interaction as ChatInputCommandInteraction).options.getString(
      "url"
    );
    const category = (
      interaction as ChatInputCommandInteraction
    ).options.getString("category");
    const keywords = (interaction as ChatInputCommandInteraction).options
      .getString("keywords")
      ?.split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    await interaction.deferReply();
    try {
      const info = await getInfoUrl(url!);
      const slug = info.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      await fetch(
        "https://n8n-m89n.onrender.com/webhook-test/85e18e2e-f76d-46a3-b8a5-e08b4823c580",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: info.title,
            url: info.url,
            image: info.image,
            slug: slug,
            category: category ?? "-",
            keywords: keywords ?? [],
          }),
        }
      );

      await interaction.editReply(
        `Recurso generado: ${info.title} (${info.url})\nSlug: ${slug}`
      );
    } catch (error) {
      await interaction.editReply("Ocurrió un error generando el recurso.");
    }
  },
};
