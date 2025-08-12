import { JSDOM } from "jsdom";
import url from "url";

function resolveUrl(base: string, relative: string) {
  return url.resolve(base, relative);
}

export async function getLinkPreview(link: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(link, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const ogTitle = (
      document.querySelector(
        'meta[property="og:title"]'
      ) as HTMLMetaElement | null
    )?.content;
    const ogDescription = (
      document.querySelector(
        'meta[property="og:description"]'
      ) as HTMLMetaElement | null
    )?.content;
    const ogImage = (
      document.querySelector(
        'meta[property="og:image"]'
      ) as HTMLMetaElement | null
    )?.content;

    // Si no hay Open Graph, buscamos en meta description y title
    const title = ogTitle || document.querySelector("title")?.textContent || "";

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const description =
      ogDescription ||
      (
        document.querySelector(
          'meta[name="description"]'
        ) as HTMLMetaElement | null
      )?.content ||
      "";
    let image = ogImage ? resolveUrl(link, ogImage) : "";

    // Si no hay imagen, intenta obtener favicon
    if (!image) {
      const iconLink =
        (document.querySelector('link[rel="icon"]') as HTMLLinkElement | null)
          ?.href ||
        (
          document.querySelector(
            'link[rel="shortcut icon"]'
          ) as HTMLLinkElement | null
        )?.href ||
        (
          document.querySelector(
            'link[rel="apple-touch-icon"]'
          ) as HTMLLinkElement | null
        )?.href;
      if (iconLink) {
        image = resolveUrl(link, iconLink);
      }
    }

    return {
      title,
      slug,
      description,
      image,
      url: link,
    };
  } catch (error) {
    console.error("Error fetching preview:", error);
    return {
      title: "",
      slug: "",
      description: "",
      image: "",
      url: link,
      error: true,
    };
  }
}
