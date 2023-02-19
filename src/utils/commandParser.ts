import { ApiData } from "../types";
import { styles } from "./styles";

export function parseCommand(
  prompt: string,
  negativePrompt: string,
  aspectRatio: "1:1" | "3:2" | "2:3",
  styleName: string
): ApiData {
  let height, width;
  let model = styles[0].model;

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

  for (const style of styles) {
    if (style.name === styleName) {
      model = style.model;
      prompt = style.prompt + prompt;
      negativePrompt = style.negativePrompt + negativePrompt;
      break;
    }
  }

  return {
    prompt: prompt,
    negativePrompt: negativePrompt,
    height: height,
    width: width,
    model: model,
  };
}
