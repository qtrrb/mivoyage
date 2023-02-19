import { Style } from "../types";

export const styles: Style[] = [
  {
    name: "default",
    model: "sdv1/1-5.safetensors",
    prompt: "",
    negativePrompt: "",
  },
  {
    name: "anime",
    model: "sdv1/anime.safetensors",
    prompt: "",
    negativePrompt: "",
  },
  {
    name: "pastel",
    model: "sdv1/pastel.safetensors",
    prompt: "",
    negativePrompt: "",
  },
  {
    name: "inkpunk",
    model: "sdv1/Inkpunk-Diffusion-v2.ckpt",
    prompt: "nvinkpunk ",
    negativePrompt: "",
  },
];
