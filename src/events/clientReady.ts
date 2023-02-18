import { Client } from "discord.js";
import { Event } from "../types";

const clientReady: Event = {
  name: "ready",
  once: true,
  execute: (c: Client) => {
    console.log(`Ready! Logged in as ${c.user?.tag}`);
  },
};

export default clientReady;
