
import OpenAI from "openai";
import { useAppState } from "../state/store";
import { enumValues } from "./utils";

export enum SupportedModels {
  Gpt35Turbo16k = "gpt-3.5-turbo-16k",
  Gpt4 = "gpt-4",
  Gpt4VisionPreview = "gpt-4-vision-preview",
  Gpt4Turbo = "gpt-4-turbo",

}

function isSupportedModel(value: string): value is SupportedModels {
  return enumValues(SupportedModels).includes(value as SupportedModels);
}

export const DEFAULT_MODEL = SupportedModels.Gpt4Turbo;

export const DisplayName = {
  [SupportedModels.Gpt35Turbo16k]: "GPT-3.5 Turbo (16k)",
  [SupportedModels.Gpt4]: "GPT-4",
  [SupportedModels.Gpt4VisionPreview]: "GPT-4 Vision (Preview)",
  [SupportedModels.Gpt4Turbo]: "GPT-4 Turbo",

};

export function hasVisionSupport(model: SupportedModels) {
  return (
    model === SupportedModels.Gpt4VisionPreview ||
    model === SupportedModels.Gpt4Turbo ||
    model === SupportedModels.Gpt4O ||

  );
}

export type SDKChoice = "OpenAI" ;

function chooseSDK(model: SupportedModels): SDKChoice {
  
  return "OpenAI";
}

export function isOpenAIModel(model: SupportedModels) {
  return chooseSDK(model) === "OpenAI";
}


export function findBestMatchingModel(
  selectedModel: string,
  openAIKey: string | undefined,
  anthropicKey: string | undefined,
): SupportedModels {
  let result: SupportedModels = DEFAULT_MODEL;
  // verify the string value is a supported model
  // this is to handle the case when we drop support for a model
  if (isSupportedModel(selectedModel)) {
    result = selectedModel;
  }
  // ensure the provider's API key is available
   if (openAIKey && !anthropicKey && !isOpenAIModel(result)) {
    result = SupportedModels.Gpt4O;
  }
  return result;
}

export type CommonMessageCreateParams = {
  prompt: string;
  imageData?: string;
  systemMessage?: string;
  jsonMode?: boolean;
};

export type Response = {
  usage: OpenAI.CompletionUsage | undefined;
  rawResponse: string;
};

export async function fetchResponseFromModelOpenAI(
  model: SupportedModels,
  params: CommonMessageCreateParams,
): Promise<Response> {
  const key = useAppState.getState().settings.openAIKey;
  if (!key) {
    throw new Error("No OpenAI key found");
  }
  const baseURL = useAppState.getState().settings.openAIBaseUrl;
  const openai = new OpenAI({
    apiKey: key,
    baseURL: baseURL ? baseURL : undefined, // explicitly set to undefined because empty string would cause an error
    dangerouslyAllowBrowser: true, // user provides the key
  });
  const messages: OpenAI.ChatCompletionMessageParam[] = [];
  if (params.systemMessage != null) {
    messages.push({
      role: "system",
      content: params.systemMessage,
    });
  }
  const content: OpenAI.ChatCompletionContentPart[] = [
    {
      type: "text",
      text: params.prompt,
    },
  ];
  if (params.imageData != null) {
    content.push({
      type: "image_url",
      image_url: {
        url: params.imageData,
      },
    });
  }
  messages.push({
    role: "user",
    content,
  });
  if (params.jsonMode) {
    messages.push({
      role: "assistant",
      content: "{",
    });
  }
  const completion = await openai.chat.completions.create({
    model: model,
    messages,
    max_tokens: 1000,
    temperature: 0,
  });
  let rawResponse = completion.choices[0].message?.content?.trim() ?? "";
  if (params.jsonMode && !rawResponse.startsWith("{")) {
    rawResponse = "{" + rawResponse;
  }
  return {
    usage: completion.usage,
    rawResponse,
  };
}



export async function fetchResponseFromModel(
  model: SupportedModels,
  params: CommonMessageCreateParams,
): Promise<Response> {
  const sdk = chooseSDK(model);
  if (sdk === "OpenAI") {
    return await fetchResponseFromModelOpenAI(model, params);
  } 
}
