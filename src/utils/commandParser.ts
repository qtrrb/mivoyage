import { ApiData } from "../types";

export function parseCommand(
  prompt: string,
  negativePrompt: string,
  aspectRatio: "1:1" | "3:2" | "2:3",
  style: string
): ApiData {
  let height, width, model;

  switch (aspectRatio) {
    case "2:3":
      height = 768;
      width = 512;
      break;
    case "3:2":
      height = 512;
      width = 768;
      break;
    case "1:1":
      height = 512;
      width = 512;
      break;
    default:
      height = 512;
      width = 512;
      break;
  }
  switch (style) {
    case "default":
      model = "sdv1/1-5.safetensors";
      break;
    case "anime":
      model = "sdv1/anime.safetensors";
      break;
    case "pastel":
      model = "sdv1/pastel.safetensors";
      break;
    case "inkpunk":
      prompt = "nvinkpunk " + prompt;
      model = "sdv1/Inkpunk-Diffusion-v2.ckpt";
      break;
    default:
      model = "sdv1/1-5.safetensors";
      break;
  }
  return {
    prompt: prompt,
    negativePrompt: negativePrompt,
    height: height,
    width: width,
    model: model,
  };
}
