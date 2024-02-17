import { default as fetch } from "node-fetch";
const apiKey = process.env.ai21_API_KEY;

interface AI21Request {
  prompt: string;
  numResults: number;
  maxTokens: number;
  temperature: number;
  topKReturn: number;
  topP: number;
  countPenalty: {
    scale: number;
    applyToNumbers: boolean;
    applyToPunctuations: boolean;
    applyToStopwords: boolean;
    applyToWhitespaces: boolean;
    applyToEmojis: boolean;
  };
  frequencyPenalty: {
    scale: number;
    applyToNumbers: boolean;
    applyToPunctuations: boolean;
    applyToStopwords: boolean;
    applyToWhitespaces: boolean;
    applyToEmojis: boolean;
  };
  presencePenalty: {
    scale: number;
    applyToNumbers: boolean;
    applyToPunctuations: boolean;
    applyToStopwords: boolean;
    applyToWhitespaces: boolean;
    applyToEmojis: boolean;
  };
  stopSequences: string[];
}

export const getModifiedAnswer = async (
  originalAnswer: string
): Promise<any> => {
  try {
    const response = await fetch(
      "https://api.ai21.com/studio/v1/j2-mid/complete",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: originalAnswer,
          numResults: 1,
          maxTokens: 30,
          temperature: 1,
          topKReturn: 0,
          topP: 1,
          countPenalty: {
            scale: 0,
            applyToNumbers: false,
            applyToPunctuations: false,
            applyToStopwords: false,
            applyToWhitespaces: false,
            applyToEmojis: true,
          },
          frequencyPenalty: {
            scale: 0,
            applyToNumbers: false,
            applyToPunctuations: false,
            applyToStopwords: false,
            applyToWhitespaces: false,
            applyToEmojis: false,
          },
          presencePenalty: {
            scale: 0,
            applyToNumbers: false,
            applyToPunctuations: false,
            applyToStopwords: false,
            applyToWhitespaces: false,
            applyToEmojis: false,
          },
          stopSequences: ["##"],
        } as AI21Request),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in getModifiedAnswer:", error);
    throw error;
  }
};
