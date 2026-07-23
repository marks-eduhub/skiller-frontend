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
