"use client";
import RichContent from "@/components/ui/richContent";

const SAMPLE = `
<h2>Understanding Big-O</h2>
<p>Before we look at code, remember what we are measuring: how the work grows as the input grows, not how many seconds it takes on your laptop.</p>
<blockquote>Tip: Constants are dropped. An algorithm that runs 3n steps and one that runs 300n steps are both O(n).</blockquote>
<h3>The formal definition</h3>
<p>We say $f(n) = O(g(n))$ when there is a constant $c$ such that:</p>
<p>$$f(n) \\le c \\cdot g(n) \\quad \\text{for all } n \\ge n_0$$</p>
<blockquote>Warning: O(1) does not mean fast. It means constant - a constant of ten minutes is still O(1).</blockquote>
<h3>Comparing two lookups</h3>
<p>\`\`\`js</p>
<p>// O(n) - every element may be visited</p>
<p>function findLinear(items, target) {</p>
<p>  for (const item of items) {</p>
<p>    if (item === target) return item;</p>
<p>  }</p>
<p>  return null;</p>
<p>}</p>
<p>\`\`\`</p>
<blockquote>Remember: A hash lookup trades memory for time. That trade is the whole point.</blockquote>
<h3>How the growth compares</h3>
<p>\`\`\`mermaid</p>
<p>graph LR</p>
<p>  A[Input size n] --> B[O(1) constant]</p>
<p>  A --> C[O(log n) logarithmic]</p>
<p>  A --> D[O(n) linear]</p>
<p>  A --> E[O(n^2) quadratic]</p>
<p>\`\`\`</p>
<table>
  <thead><tr><th>Operation</th><th>Array</th><th>Hash map</th></tr></thead>
  <tbody>
    <tr><td>Lookup</td><td>O(n)</td><td>O(1)</td></tr>
    <tr><td>Insert</td><td>O(1)</td><td>O(1)</td></tr>
  </tbody>
</table>
<blockquote>Note: The table shows average cases. Worst-case hash lookup degrades to O(n).</blockquote>
<p>Read more in the <a href="https://example.com">reference notes</a>.</p>
<ul><li>Measure growth, not seconds</li><li>Drop constants</li><li>Name the worst case</li></ul>
`;

export default function Preview() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <RichContent html={SAMPLE} />
    </main>
  );
}
