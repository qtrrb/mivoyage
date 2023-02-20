import { Interaction } from "discord.js";
import { Event } from "../types";

const interactionCreate: Event = {
  name: "interactionCreate",
  execute: async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.guild) {
      await interaction.reply("Sorry, commands don't work outside of servers!");
      return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

export default interactionCreate;
