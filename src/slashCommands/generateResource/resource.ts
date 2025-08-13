import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
} from "discord.js";
// import { getInfoUrl } from "../../utils";
import { getLinkPreview } from "../../utils/linkpreview";
import { subirArchivo } from "../../utils/r2";
import { basename } from "path";
import mime from "mime-types";
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
      const info = await getLinkPreview(url!);

      const filename = basename(info.image);
      const ext = filename.includes(".") ? filename.split(".").pop() : "";
      const contentType = mime.lookup(info.image) || "application/octet-stream";
      const key = info.slug + (ext ? `.${ext}` : "");

      const imageResponse = await fetch(info.image);
      const arrayBuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const image = await subirArchivo({
        bucket: process.env.R2_BUCKET_NAME!,
        key,
        body: buffer,
        contentType: contentType,
      });

      await fetch(process.env.N8N_WEBHOOK!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: info.title,
          url: info.url,
          image,
          slug: info.slug,
          category: category ?? "-",
          keywords: keywords ?? [],
          discord_user: interaction.user.id,
          owner_id: process.env.OWNER_ID,
        }),
      });

      await interaction.editReply({
        content: "Recurso enviado para revisión",
      });
    } catch (error) {
      console.log("Error al generar el recurso:", error);
      await interaction.editReply({
        embeds: [
          {
            title: "❌ Error",
            description: "Ocurrió un error generando el recurso.",
            color: 0xff0000,
          },
        ],
      });
    }
  },
};
