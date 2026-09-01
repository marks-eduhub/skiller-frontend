/**
 * Display pipeline for tutor-authored HTML.
 *
 * Tutors write topic content in a full-toolbar react-quill editor
 * (components/Tutor/uploadCourse/topicfields.tsx), so headings, lists, code
 * blocks, blockquotes, links and images are already stored on the Strapi
 * fields `topicdescription`, `topicExpectations` and `resourceInstructions`.
 * Until now the student side ran all of it through stripHtmlTags, so every
 * lesson rendered as one unbroken paragraph.
 *
 * Everything here is read-only presentation: no field, endpoint or payload
 * changes, and content authored before this existed renders as-is.
 */
import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "p", "br", "hr", "span", "div",
  "strong", "b", "em", "i", "u", "s", "del", "ins", "mark", "sub", "sup", "small",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "blockquote", "pre", "code",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
];

const ALLOWED_ATTR = [
  "href", "target", "rel", "src", "alt", "title", "class", "style",
  "colspan", "rowspan", "width", "height", "start", "type", "align",
];

let hooksInstalled = false;

const installHooks = () => {
  if (hooksInstalled || !DOMPurify.isSupported) return;

  // Tutor content routinely links out to references. Anything that leaves the
  // app opens in a new tab and never gets access to window.opener.
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.nodeName === "A" && node.hasAttribute("href")) {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer nofollow");
    }
  });

  hooksInstalled = true;
};

/**
 * DOMPurify only exposes `sanitize` in the browser. RichContent renders inside
 * an effect for exactly that reason, but guard anyway so a stray server-side
 * import can never leak unsanitized markup.
 */
export const sanitizeRichHtml = (html?: string | null): string => {
  if (!html || !DOMPurify.isSupported) return "";

  installHooks();

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });
};

/** Quill writes "<p><br></p>" for an untouched editor - that is not content. */
export const hasRichContent = (html?: string | null): boolean => {
  if (!html) return false;

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 0 || /<(img|table|pre|hr)\b/i.test(html);
};

/* ------------------------------------------------------------------ *
 * Block-level enhancers
 * ------------------------------------------------------------------ */

const FENCE_OPEN = /^```([A-Za-z0-9+#._-]*)$/;

const normalizeText = (value: string) => value.replace(/\u00a0/g, " ");

const blockText = (el: Element) => normalizeText(el.textContent || "").trim();

/** Text of one Quill block, with <br> soft breaks kept as real newlines. */
const blockLines = (el: Element) => {
  const holder = document.createElement("div");
  holder.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, "\n");
  return normalizeText(holder.textContent || "").replace(/\s+$/, "");
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

/**
 * Quill stores every line as its own block element, so a ``` fence a tutor
 * types arrives as several sibling <p> nodes rather than one <pre>. Stitch
 * those back into a single code block.
 */
const normalizeFences = (root: HTMLElement) => {
  let children = Array.from(root.children);
  let index = 0;

  while (index < children.length) {
    const opener = FENCE_OPEN.exec(blockText(children[index]));

    if (!opener) {
      index += 1;
      continue;
    }

    let closer = -1;
    for (let cursor = index + 1; cursor < children.length; cursor += 1) {
      if (blockText(children[cursor]) === "```") {
        closer = cursor;
        break;
      }
    }

    // An unbalanced fence is far more likely to be prose than code.
    if (closer === -1) {
      index += 1;
      continue;
    }

    const lines: string[] = [];
    for (let cursor = index + 1; cursor < closer; cursor += 1) {
      lines.push(blockLines(children[cursor]));
    }

    const pre = document.createElement("pre");
    const code = document.createElement("code");
    if (opener[1]) code.className = `language-${opener[1].toLowerCase()}`;
    code.textContent = lines.join("\n");
    pre.appendChild(code);

    root.insertBefore(pre, children[index]);
    for (let cursor = index; cursor <= closer; cursor += 1) {
      children[cursor].remove();
    }

    children = Array.from(root.children);
    index = 0;
  }
};

/** A tutor may also paste a whole fenced block into one <pre>. */
const unwrapFencesInPre = (root: HTMLElement) => {
  Array.from(root.querySelectorAll("pre")).forEach((pre) => {
    const raw = normalizeText(pre.textContent || "");
    const match = /^```([A-Za-z0-9+#._-]*)\n([\s\S]*?)\n?```\s*$/.exec(raw.trim());
    if (!match) return;

    const code = document.createElement("code");
    if (match[1]) code.className = `language-${match[1].toLowerCase()}`;
    code.textContent = match[2];

    pre.textContent = "";
    pre.appendChild(code);
  });
};

/** Pull mermaid sources out before code blocks get the copy-button treatment. */
const extractDiagrams = (root: HTMLElement) => {
  Array.from(root.querySelectorAll("pre")).forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code || !/\blanguage-mermaid\b/.test(code.className)) return;

    const holder = document.createElement("div");
    holder.className = "rc-diagram";
    holder.setAttribute("data-rc-diagram", "");
    holder.textContent = normalizeText(code.textContent || "");
    pre.replaceWith(holder);
  });
};

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  ruby: "Ruby",
  shell: "Shell",
  csharp: "C#",
  "c++": "C++",
  js: "JavaScript",
  jsx: "JSX",
  ts: "TypeScript",
  tsx: "TSX",
  py: "Python",
  rb: "Ruby",
  sh: "Shell",
  bash: "Shell",
  zsh: "Shell",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  sql: "SQL",
  java: "Java",
  cpp: "C++",
  cs: "C#",
  php: "PHP",
  go: "Go",
  rust: "Rust",
  kotlin: "Kotlin",
  swift: "Swift",
};

const decorateCode = (root: HTMLElement) => {
  Array.from(root.querySelectorAll("pre")).forEach((pre) => {
    if (pre.parentElement?.classList.contains("rc-code")) return;

    let code = pre.querySelector("code");
    if (!code) {
      code = document.createElement("code");
      code.textContent = normalizeText(pre.textContent || "");
      pre.textContent = "";
      pre.appendChild(code);
    }

    const language = (/language-([\w+#._-]+)/.exec(code.className) || [])[1] || "";
    // Short names read better shouted (SQL, PHP); longer ones title-cased.
    const label =
      LANGUAGE_LABELS[language] ||
      (!language
        ? "Code"
        : language.length <= 3
        ? language.toUpperCase()
        : language.charAt(0).toUpperCase() + language.slice(1));

    const wrapper = document.createElement("div");
    wrapper.className = "rc-code";

    const header = document.createElement("div");
    header.className = "rc-code__bar";

    const name = document.createElement("span");
    name.className = "rc-code__lang";
    name.textContent = label;

    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "rc-code__copy";
    copy.setAttribute("data-rc-copy", "");
    copy.textContent = "Copy";

    header.append(name, copy);
    pre.replaceWith(wrapper);
    wrapper.append(header, pre);
  });
};

type CalloutTone = {
  label: string;
  tone: string;
  icon: string;
};

const INFO_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
const BULB_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>';
const ALERT_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>';
const STAR_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1z"/></svg>';

const CALLOUTS: Record<string, CalloutTone> = {
  note: { label: "Note", tone: "note", icon: INFO_ICON },
  info: { label: "Note", tone: "note", icon: INFO_ICON },
  tip: { label: "Tip", tone: "tip", icon: BULB_ICON },
  hint: { label: "Hint", tone: "tip", icon: BULB_ICON },
  example: { label: "Example", tone: "tip", icon: BULB_ICON },
  warning: { label: "Warning", tone: "warning", icon: ALERT_ICON },
  caution: { label: "Caution", tone: "warning", icon: ALERT_ICON },
  important: { label: "Important", tone: "warning", icon: ALERT_ICON },
  remember: { label: "Remember", tone: "key", icon: STAR_ICON },
  key: { label: "Key point", tone: "key", icon: STAR_ICON },
};

const CALLOUT_PREFIX = /^\s*(note|info|tip|hint|example|warning|caution|important|remember|key)\s*:\s*/i;

/**
 * A blockquote opening with "Tip:" / "Warning:" / ... becomes a callout. It is
 * the one authoring convention this adds, and it degrades to a plain
 * blockquote for anyone who does not use it.
 */
const buildCallouts = (root: HTMLElement) => {
  Array.from(root.querySelectorAll("blockquote")).forEach((quote) => {
    const match = CALLOUT_PREFIX.exec(normalizeText(quote.textContent || ""));
    if (!match) return;

    const config = CALLOUTS[match[1].toLowerCase()];
    if (!config) return;

    // Drop the "Tip:" marker itself - the callout header now says it.
    const walker = document.createTreeWalker(quote, NodeFilter.SHOW_TEXT);
    const first = walker.nextNode() as Text | null;
    if (first) first.data = first.data.replace(CALLOUT_PREFIX, "");

    const callout = document.createElement("div");
    callout.className = `rc-callout rc-callout--${config.tone}`;

    const icon = document.createElement("span");
    icon.className = "rc-callout__icon";
    icon.innerHTML = config.icon;

    const body = document.createElement("div");
    body.className = "rc-callout__body";

    const label = document.createElement("p");
    label.className = "rc-callout__label";
    label.textContent = config.label;
    body.appendChild(label);

    while (quote.firstChild) body.appendChild(quote.firstChild);

    callout.append(icon, body);
    quote.replaceWith(callout);
  });
};

const decorateTables = (root: HTMLElement) => {
  Array.from(root.querySelectorAll("table")).forEach((table) => {
    if (table.parentElement?.classList.contains("rc-table")) return;
    const scroller = document.createElement("div");
    scroller.className = "rc-table";
    table.replaceWith(scroller);
    scroller.appendChild(table);
  });
};

const decorateMedia = (root: HTMLElement) => {
  Array.from(root.querySelectorAll("img")).forEach((image) => {
    image.setAttribute("loading", "lazy");
    image.classList.add("rc-image");
  });
};

const anchorHeadings = (root: HTMLElement) => {
  Array.from(root.querySelectorAll("h1, h2, h3, h4, h5, h6")).forEach((heading) => {
    if (heading.id) return;
    const slug = slugify(heading.textContent || "");
    if (slug) heading.id = `topic-${slug}`;
  });
};

/* ------------------------------------------------------------------ *
 * Lazily loaded enhancers - none of these ship in the page bundle, and
 * each one only loads when the content actually contains that syntax.
 * ------------------------------------------------------------------ */

const highlightCode = async (root: HTMLElement, cancelled: () => boolean) => {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>(".rc-code pre code"));
  if (!blocks.length) return;

  const hljs = (await import("highlight.js/lib/common")).default;
  if (cancelled()) return;

  blocks.forEach((block) => {
    if (block.getAttribute("data-rc-highlighted")) return;
    try {
      hljs.highlightElement(block);
    } catch {
      // An unknown language is not worth failing the whole lesson over.
    }
    block.setAttribute("data-rc-highlighted", "1");
  });
};

const MATH_PATTERN = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;

/**
 * "$12 for the first month and $20 after" must not become math. Require a
 * single-dollar span to look like an expression before rendering it.
 */
const looksLikeMath = (value: string) => {
  const inner = value.trim();
  if (!inner) return false;
  if (/[\\^_{}=+*/<>|]/.test(inner)) return true;
  return inner.length <= 3 && /^[A-Za-z0-9]+$/.test(inner);
};

const renderMath = async (root: HTMLElement, cancelled: () => boolean) => {
  if (!/\$|\\\(|\\\[/.test(root.textContent || "")) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement?.closest("pre, code, .katex, .rc-diagram")
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });

  const targets: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    if (/\$|\\\(|\\\[/.test(current.nodeValue || "")) targets.push(current as Text);
    current = walker.nextNode();
  }
  if (!targets.length) return;

  const katex = (await import("katex")).default;
  if (cancelled()) return;

  targets.forEach((node) => {
    const source = node.nodeValue || "";
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let touched = false;
    let match: RegExpExecArray | null;

    MATH_PATTERN.lastIndex = 0;
    while ((match = MATH_PATTERN.exec(source)) !== null) {
      const display = match[1] !== undefined || match[2] !== undefined;
      const tex = match[1] ?? match[2] ?? match[3] ?? match[4] ?? "";

      if (!display && match[4] !== undefined && !looksLikeMath(tex)) continue;

      const holder = document.createElement(display ? "div" : "span");
      holder.className = display ? "rc-math rc-math--block" : "rc-math";

      try {
        holder.innerHTML = katex.renderToString(tex, {
          displayMode: display,
          throwOnError: false,
          output: "html",
        });
      } catch {
        continue;
      }

      fragment.appendChild(document.createTextNode(source.slice(lastIndex, match.index)));
      fragment.appendChild(holder);
      lastIndex = match.index + match[0].length;
      touched = true;
    }

    if (!touched) return;
    fragment.appendChild(document.createTextNode(source.slice(lastIndex)));
    node.replaceWith(fragment);
  });
};

const renderDiagrams = async (root: HTMLElement, cancelled: () => boolean) => {
  const holders = Array.from(root.querySelectorAll<HTMLElement>("[data-rc-diagram]"));
  if (!holders.length) return;

  const mermaid = (await import("mermaid")).default;
  if (cancelled()) return;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "neutral",
    fontFamily: "inherit",
  });

  for (let index = 0; index < holders.length; index += 1) {
    const holder = holders[index];
    const source = holder.textContent || "";

    try {
      const { svg } = await mermaid.render(`rc-diagram-${Date.now()}-${index}`, source);
      if (cancelled()) return;
      holder.innerHTML = svg;
      holder.classList.add("rc-diagram--ready");
    } catch {
      if (cancelled()) return;
      // Fall back to showing the source rather than an empty gap.
      holder.classList.add("rc-diagram--raw");
      holder.textContent = source;
    }
  }
};

/**
 * The synchronous half of the pipeline: structure only, no lazy imports.
 * Split out so it can be exercised directly in tests.
 */
export const applyBlockEnhancements = (root: HTMLElement) => {
  normalizeFences(root);
  unwrapFencesInPre(root);
  extractDiagrams(root);
  decorateCode(root);
  buildCallouts(root);
  decorateTables(root);
  decorateMedia(root);
  anchorHeadings(root);
};

/**
 * Upgrades already-sanitized markup in place. Returns a cleanup function -
 * call it before the container is reused for different content.
 */
export const enhanceRichContent = (root: HTMLElement): (() => void) => {
  let disposed = false;
  const cancelled = () => disposed;

  applyBlockEnhancements(root);

  const onClick = (event: Event) => {
    const target = (event.target as HTMLElement | null)?.closest("[data-rc-copy]");
    if (!target) return;

    const source = target.closest(".rc-code")?.querySelector("pre")?.textContent || "";
    navigator.clipboard?.writeText(source).then(
      () => {
        target.textContent = "Copied";
        window.setTimeout(() => {
          if (!disposed) target.textContent = "Copy";
        }, 1500);
      },
      () => {
        target.textContent = "Press Ctrl+C";
      }
    );
  };

  root.addEventListener("click", onClick);

  // A renderer that cannot load must never take the lesson down with it.
  const swallow = () => undefined;
  void highlightCode(root, cancelled).catch(swallow);
  void renderMath(root, cancelled).catch(swallow);
  void renderDiagrams(root, cancelled).catch(swallow);

  return () => {
    disposed = true;
    root.removeEventListener("click", onClick);
  };
};
