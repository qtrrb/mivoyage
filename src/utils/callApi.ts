import axios from "axios";
import { ApiDataImg, ApiDataTxt } from "../types";
import "dotenv/config";

const apiEndpoint = process.env.API_ENDPOINT as string;

export async function generateImage(data: ApiDataTxt) {
  return await axios
    .post(
      apiEndpoint + "/txt2img",
      {
        prompt: data.prompt,
        negative_prompt: data.negativePrompt,
        height: data.height,
        width: data.width,
        model: data.model,
      },
      { responseType: "arraybuffer" }
    )
    .then((response) => Buffer.from(response.data));
}

export async function varyImage(data: ApiDataImg) {
  return await axios
    .post(
      apiEndpoint + "/img2img",
      {
        prompt: data.prompt,
        negative_prompt: data.negativePrompt,
        image: data.imageUrl,
        model: data.model,
      },
      { responseType: "arraybuffer" }
    )
    .then((response) => Buffer.from(response.data));
}
