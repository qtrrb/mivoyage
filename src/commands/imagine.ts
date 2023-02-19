import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { Command } from "../types";
import { ApiData } from "../types";
import { generateImage } from "../utils/callApi";
import { parseCommand } from "../utils/commandParser";

let isActive = false;

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("imagine")
    .setDescription("generate an image")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("The prompt used to generate the image.")
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
        .setDescription("The style of the image")
        .setRequired(false)
        .addChoices(
          { name: "default", value: "default" },
          { name: "inkpunk", value: "inkpunk" },
          { name: "anime", value: "anime" },
          { name: "pastel", value: "pastel" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("aspect-ratio")
        .setDescription("The aspect ratio of the image")
        .setRequired(false)
        .addChoices(
          { name: "1:1", value: "1:1" },
          { name: "2:3", value: "2:3" },
          { name: "3:2", value: "3:2" }
        )
    ),

  execute: async (interaction) => {
    if (!isActive) {
      try {
        isActive = true;
        //@ts-ignore
        const prompt = interaction.options.getString("prompt");

        const negativePrompt =
          //@ts-ignore
          interaction.options.getString("negative-prompt") ?? "";

        const style =
          //@ts-ignore
          interaction.options.getString("style") ?? "default";

        const aspectRatio =
          //@ts-ignore
          interaction.options.getString("aspect-ratio") ?? "1:1";

        await interaction.reply("generating...");

        const data: ApiData = parseCommand(
          prompt,
          negativePrompt,
          aspectRatio,
          style
        );

        const image = await generateImage(data);

        const attachment = new AttachmentBuilder(image, {
          name: "image.png",
        });

        await interaction.editReply({
          content: `generated! ${prompt}`,
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
