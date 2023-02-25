import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Event } from "../types";

const eventFiles = readdirSync(join(__dirname, "../events"));

export function setEvents(client: Client) {
  for (const file of eventFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const event: Event = require(`../events/${file}`).default;
    event.once
      ? client.once(event.name, event.execute)
      : client.on(event.name, event.execute);
  }
}
