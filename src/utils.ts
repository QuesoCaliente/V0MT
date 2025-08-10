import fetch from "node-fetch";
import { ILinkPreviewResponse } from "./types";

export const getInfoUrl = async (url: string) => {
  const apiKey = process.env.LINK_PREVIEW_API_KEY ?? "";
  const apiUrl = `https://api.linkpreview.net/?q=${encodeURIComponent(url)}`;
  const response = await fetch(apiUrl, {
    headers: {
      "X-Linkpreview-Api-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching URL info: ${response.statusText}`);
  }
  return response.json() as Promise<ILinkPreviewResponse>;
};
