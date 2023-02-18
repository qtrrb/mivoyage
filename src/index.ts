import * as dotenv from "dotenv";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { setCommands } from "./handlers/commands";
import { setEvents } from "./handlers/events";
dotenv.config();

const token = process.env.TOKEN as string;
const clientId = process.env.CLIENT_ID as string;
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

setCommands(client, token, clientId);
setEvents(client);

client.login(token);
