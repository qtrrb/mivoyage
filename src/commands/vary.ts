import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { ApiDataImg, Command } from "../types";
import { varyImage } from "../utils/callApi";
import { parseCommandImg } from "../utils/commandParser";

let isActive = false;

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("vary")
    .setDescription("create a variation of an image.")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("The prompt used to change the image.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("image-url")
        .setDescription("The url of the image.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("negative-prompt")
        .setDescription("The negative prompt.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("style")
        .setDescription("The style of the image.")
        .setRequired(false)
        .addChoices(
          { name: "default", value: "default" },
          { name: "inkpunk", value: "inkpunk" },
          { name: "anime", value: "anime" },
          { name: "pastel", value: "pastel" }
        )
    ),
  execute: async (interaction) => {
    if (!isActive) {
      try {
        isActive = true;
        //@ts-ignore
        const prompt = interaction.options.getString("prompt");
        //@ts-ignore
        const imageUrl = interaction.options.getString("image-url");

        const negativePrompt =
          //@ts-ignore
          interaction.options.getString("negative-prompt") ?? "";

        const style =
          //@ts-ignore
          interaction.options.getString("style") ?? "default";

        await interaction.reply("generating...");

        const data: ApiDataImg = parseCommandImg(
          prompt,
          negativePrompt,
          imageUrl,
          style
        );

        const image = await varyImage(data);

        const attachment = new AttachmentBuilder(image, {
          name: "image.png",
        });

        await interaction.editReply({
          content: `generated! ${prompt}, a variation of ${imageUrl}`,
          files: [attachment],
        });
        isActive = false;
      } catch (e) {
        await interaction.editReply(
          "Something went wrong. Please try again later"
        );
        console.log(e);
        isActive = false;
      }
    } else {
      await interaction.reply("Currently busy. Please try again later");
    }
  },
};

export default command;
