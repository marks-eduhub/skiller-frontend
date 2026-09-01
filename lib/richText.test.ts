/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from "vitest";
import { applyBlockEnhancements, hasRichContent, sanitizeRichHtml } from "./richText";

const render = (html: string) => {
  const root = document.createElement("div");
  root.innerHTML = sanitizeRichHtml(html);
  applyBlockEnhancements(root);
  return root;
};

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("sanitizeRichHtml", () => {
  it("keeps the formatting quill actually produces", () => {
    const html = sanitizeRichHtml(
      '<h2>Loops</h2><p><strong>while</strong> and <em>for</em></p><ul><li>one</li></ul>'
    );

    expect(html).toContain("<h2>Loops</h2>");
    expect(html).toContain("<strong>while</strong>");
    expect(html).toContain("<li>one</li>");
  });

  it("strips scripts and event handlers", () => {
    const html = sanitizeRichHtml(
      '<p onclick="steal()">hi</p><script>steal()</script><img src=x onerror="steal()">'
    );

    expect(html).not.toContain("script");
    expect(html).not.toContain("onclick");
    expect(html).not.toContain("onerror");
    expect(html).toContain("hi");
  });

  it("neutralises javascript: links and sends real links to a new tab", () => {
    const evil = sanitizeRichHtml('<a href="javascript:steal()">click</a>');
    expect(evil).not.toContain("javascript:");

    const good = sanitizeRichHtml('<a href="https://example.com">docs</a>');
    expect(good).toContain('target="_blank"');
    expect(good).toContain("noopener");
  });
});

describe("hasRichContent", () => {
  it("treats an untouched quill editor as empty", () => {
    expect(hasRichContent("<p><br></p>")).toBe(false);
    expect(hasRichContent("<p>&nbsp;</p>")).toBe(false);
    expect(hasRichContent("")).toBe(false);
    expect(hasRichContent(null)).toBe(false);
  });

  it("counts text and media as content", () => {
    expect(hasRichContent("<p>hello</p>")).toBe(true);
    expect(hasRichContent('<p><img src="/a.png"></p>')).toBe(true);
  });
});

describe("code blocks", () => {
  it("stitches a fence split across quill paragraphs into one block", () => {
    const root = render(
      "<p>```js</p><p>const a = 1;</p><p>const b = 2;</p><p>```</p><p>after</p>"
    );

    const code = root.querySelector(".rc-code pre code");
    expect(code?.textContent).toBe("const a = 1;\nconst b = 2;");
    expect(code?.className).toContain("language-js");
    expect(root.querySelector(".rc-code__lang")?.textContent).toBe("JavaScript");
    expect(root.textContent).toContain("after");
  });

  it("leaves an unclosed fence as prose", () => {
    const root = render("<p>```js</p><p>const a = 1;</p>");

    expect(root.querySelector(".rc-code")).toBeNull();
    expect(root.textContent).toContain("const a = 1;");
  });

  it("unwraps a fence pasted into a single pre", () => {
    const root = render("<pre>```python\nprint(1)\n```</pre>");

    expect(root.querySelector("code")?.textContent).toBe("print(1)");
    expect(root.querySelector(".rc-code__lang")?.textContent).toBe("Python");
  });

  it("gives every code block a copy control", () => {
    const root = render("<pre>ls -la</pre>");

    expect(root.querySelector("[data-rc-copy]")).not.toBeNull();
    expect(root.querySelector(".rc-code pre")?.textContent).toBe("ls -la");
  });

  it("routes mermaid fences to a diagram holder instead of a code card", () => {
    const root = render("<p>```mermaid</p><p>graph TD; A--&gt;B;</p><p>```</p>");

    const diagram = root.querySelector("[data-rc-diagram]");
    expect(diagram).not.toBeNull();
    expect(diagram?.textContent).toContain("graph TD");
    expect(root.querySelector(".rc-code")).toBeNull();
  });
});

describe("callouts", () => {
  it("promotes a prefixed blockquote and drops the marker", () => {
    const root = render("<blockquote>Tip: revise before the check</blockquote>");

    const callout = root.querySelector(".rc-callout");
    expect(callout?.className).toContain("rc-callout--tip");
    expect(root.querySelector(".rc-callout__label")?.textContent).toBe("Tip");
    expect(root.querySelector(".rc-callout__body")?.textContent).toContain(
      "revise before the check"
    );
    expect(root.querySelector(".rc-callout__body")?.textContent).not.toContain("Tip:");
  });

  it("maps the tone aliases", () => {
    expect(render("<blockquote>Warning: careful</blockquote>").querySelector(".rc-callout")?.className).toContain(
      "rc-callout--warning"
    );
    expect(render("<blockquote>Note: careful</blockquote>").querySelector(".rc-callout")?.className).toContain(
      "rc-callout--note"
    );
    expect(render("<blockquote>Remember: careful</blockquote>").querySelector(".rc-callout")?.className).toContain(
      "rc-callout--key"
    );
  });

  it("leaves an ordinary blockquote alone", () => {
    const root = render("<blockquote>Just a quotation</blockquote>");

    expect(root.querySelector(".rc-callout")).toBeNull();
    expect(root.querySelector("blockquote")).not.toBeNull();
  });
});

describe("structure", () => {
  it("wraps tables so they scroll instead of overflowing the column", () => {
    const root = render("<table><tr><td>a</td></tr></table>");

    expect(root.querySelector(".rc-table table")).not.toBeNull();
  });

  it("lazy-loads images and anchors headings", () => {
    const root = render('<h2>Big Idea</h2><p><img src="/a.png" alt="a"></p>');

    expect(root.querySelector("img")?.getAttribute("loading")).toBe("lazy");
    expect(root.querySelector("h2")?.id).toBe("topic-big-idea");
  });

  it("is safe to run twice on the same container", () => {
    const root = render("<pre>ls</pre><table><tr><td>a</td></tr></table>");
    applyBlockEnhancements(root);

    expect(root.querySelectorAll(".rc-code").length).toBe(1);
    expect(root.querySelectorAll(".rc-table").length).toBe(1);
  });
});
