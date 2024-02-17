import fetch, { Response } from "node-fetch";
import { GifResult } from "../interfaces/gif.interface";

interface ApiResponse {
  results?: GifResult[];
}

const API_KEY = process.env.GIF_API_KEY;
export const BOT = {
  username: "Habot Babai",
  imageUrl: "https://xsgames.co/randomusers/assets/avatars/pixel/1.jpg",
  _id: "babai",
};

const buildApiUrl = (feeling: string): string => {
  return `https://g.tenor.com/v2/search?q=${feeling}&key=${API_KEY}`;
};

export const handleApiResponse = (data: ApiResponse): string => {
  if (data.results && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomGif = data.results[randomIndex];
    return randomGif.media_formats.gif.url;
  } else {
    return "I'm sorry, I couldn't find a suitable gif.";
  }
};

export const getBotResponse = async (feeling: string): Promise<string> => {
  const apiURL = buildApiUrl(feeling);
  try {
    const response: Response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return handleApiResponse(data);
  } catch (error: any) {
    console.error("Error getting bot response:", error.message);
    throw error;
  }
};
