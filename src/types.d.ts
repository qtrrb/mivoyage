import {
  CommandInteraction,
  SlashCommandBuilder,
  Collection,
  Client,
} from "discord.js";

export interface Command {
  data: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction) => void;
}

export interface Event {
  name: string;
  once?: boolean;
  execute: (...args) => void;
}

export interface ApiDataTxt {
  prompt: string;
  negativePrompt: string;
  height: number;
  width: number;
  model: string;
}

export interface ApiDataImg {
  prompt: string;
  negativePrompt: string;
  imageUrl: string;
  model: string;
}

export interface Style {
  name: string;
  model: string;
  prompt: string;
  negativePrompt: string;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, any>;
  }
}
