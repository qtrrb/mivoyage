import axios from "axios";
import { ApiData } from "../types";
import "dotenv/config";

const apiEndpoint = process.env.API_ENDPOINT as string;

export async function generateImage(data: ApiData) {
  return await axios
    .post(
      apiEndpoint,
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
