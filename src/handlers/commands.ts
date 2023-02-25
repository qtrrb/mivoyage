import { REST, Routes, Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "../types";

// eslint-disable-next-line @typescript-eslint/ban-types
const commands: Object[] = [];

const commandFiles = readdirSync(join(__dirname, "../commands"));

export async function setCommands(
  client: Client,
  token: string,
  clientId: string
) {
  for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command: Command = require(`../commands/${file}`).default;
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
  const rest = new REST({ version: "10" }).setToken(token);
  try {
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
