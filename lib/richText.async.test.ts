/**
 * @vitest-environment jsdom
 *
 * Covers the lazily loaded half of the pipeline - katex, highlight.js and the
 * copy control - which the structural tests deliberately skip.
 */
import { describe, expect, it } from "vitest";
import { enhanceRichContent, sanitizeRichHtml } from "./richText";

const settle = () => new Promise((resolve) => setTimeout(resolve, 250));

const mount = (html: string) => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  root.innerHTML = sanitizeRichHtml(html);
  const dispose = enhanceRichContent(root);
  return { root, dispose };
};

describe("math", () => {
  it("renders display and inline math", async () => {
    const { root, dispose } = mount(
      "<p>$$E = mc^2$$</p><p>where $c$ is the speed of light</p>"
    );
    await settle();

    expect(root.querySelector(".rc-math--block .katex")).not.toBeNull();
    expect(root.querySelectorAll(".katex").length).toBe(2);
    expect(root.textContent).toContain("is the speed of light");

    dispose();
  });

  it("leaves prices alone", async () => {
    const { root, dispose } = mount("<p>The course costs $20 and the book costs $15.</p>");
    await settle();

    expect(root.querySelector(".katex")).toBeNull();
    expect(root.textContent).toContain("$20");
    expect(root.textContent).toContain("$15");

    dispose();
  });

  it("does not treat code as math", async () => {
    const { root, dispose } = mount("<pre>echo $HOME $PATH</pre>");
    await settle();

    expect(root.querySelector(".katex")).toBeNull();
    expect(root.textContent).toContain("$HOME");

    dispose();
  });
});

describe("syntax highlighting", () => {
  it("tokenises a code block", async () => {
    const { root, dispose } = mount("<p>```js</p><p>const answer = 42;</p><p>```</p>");
    await settle();

    const code = root.querySelector(".rc-code pre code");
    expect(code?.className).toContain("hljs");
    expect(code?.querySelectorAll("span.hljs-keyword").length).toBeGreaterThan(0);
    expect(code?.textContent).toBe("const answer = 42;");

    dispose();
  });
});

describe("cleanup", () => {
  it("detaches the copy handler when disposed", async () => {
    const { root, dispose } = mount("<pre>ls -la</pre>");
    await settle();
    dispose();

    let seen = 0;
    root.addEventListener("click", () => {
      seen += 1;
    });
    (root.querySelector("[data-rc-copy]") as HTMLElement).click();

    // The listener above still fires; what matters is the disposed handler
    // no longer rewrites the button label.
    expect(seen).toBe(1);
    expect(root.querySelector("[data-rc-copy]")?.textContent).toBe("Copy");
  });
});
