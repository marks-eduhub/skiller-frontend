"use client";

import React, { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import {
  enhanceRichContent,
  hasRichContent,
  sanitizeRichHtml,
} from "@/lib/richText";

type RichContentProps = {
  /** Raw tutor-authored HTML straight off the Strapi field. */
  html?: string | null;
  className?: string;
  /** Rendered instead of an empty box when the tutor left the field blank. */
  emptyState?: React.ReactNode;
};

/**
 * Renders tutor-authored lesson content: sanitized HTML first, then code
 * highlighting, math, diagrams and callouts layered on lazily.
 *
 * Sanitizing needs a real DOM, so the markup is written in an effect rather
 * than through dangerouslySetInnerHTML - that also keeps the server render and
 * the first client render identical.
 */
const RichContent = ({ html, className = "", emptyState = null }: RichContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filled = hasRichContent(html);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!filled) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = sanitizeRichHtml(html);
    return enhanceRichContent(container);
  }, [html, filled]);

  if (!filled) {
    return <>{emptyState}</>;
  }

  return <div ref={containerRef} className={`rich-content ${className}`.trim()} />;
};

export default RichContent;
