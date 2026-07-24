export const stripHtmlTags = (html: string) => {
  if (!html) return "";

  const withoutHtml =
    typeof document !== "undefined"
      ? (() => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;
          return tempDiv.textContent || tempDiv.innerText || "";
        })()
      : html.replace(/<[^>]*>/g, " ");

  return withoutHtml
    .replace(/(\*\*|__|\*|_|~~|`)/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const isValidResourceLink = (value: string) => {
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export const normalizeOptions = (rawOptions: unknown): string[] => {
  if (Array.isArray(rawOptions)) {
    return rawOptions.map((option) => String(option));
  }

  if (typeof rawOptions === "string") {
    try {
      const parsed = JSON.parse(rawOptions);
      if (Array.isArray(parsed)) {
        return parsed.map((option) => String(option));
      }
    } catch {
      const delimiter = rawOptions.includes("\n") ? "\n" : ",";
      return rawOptions
        .split(delimiter)
        .map((option) => option.trim())
        .filter(Boolean);
    }
  }

  if (rawOptions && typeof rawOptions === "object") {
    return Object.values(rawOptions).map((option) => String(option));
  }

  return [];
};
