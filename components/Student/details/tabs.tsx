"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Description from "./description";
import Resources from "./resources";
import Discussion from "./discussion";
import Knowledge from "./knowledge";
import Transcript from "./transcript";

const TABS = [
  { slug: "description", label: "Description", render: () => <Description /> },
  { slug: "transcript", label: "Transcript", render: () => <Transcript /> },
  { slug: "discussions", label: "Discussions", render: () => <Discussion /> },
  { slug: "resources", label: "Resources", render: () => <Resources /> },
  { slug: "knowledge", label: "Knowledge Check", render: () => <Knowledge /> },
];

const Tabs: React.FC = () => {
  const searchParams = useSearchParams();
  // The mastery path links straight to a topic's knowledge check, so the tab
  // has to be addressable: ?topicId=...&tab=knowledge
  const requestedTab = searchParams.get("tab");
  const topicId = searchParams.get("topicId");
  const [activeSlug, setActiveSlug] = useState("description");

  useEffect(() => {
    if (requestedTab && TABS.some((tab) => tab.slug === requestedTab)) {
      setActiveSlug(requestedTab);
    }
  }, [requestedTab, topicId]);

  const active = TABS.find((tab) => tab.slug === activeSlug) ?? TABS[0];

  return (
    <section className="mt-4 rounded-xl border border-gray-200 bg-white">
      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-gray-200 px-2 hide-scrollbar"
      >
        {TABS.map((tab) => {
          const isActive = tab.slug === active.slug;

          return (
            <button
              key={tab.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSlug(tab.slug)}
              className={`relative whitespace-nowrap px-3 py-3 text-sm font-semibold transition ${
                isActive ? "text-[#1C4E85]" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
              <span
                className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full transition ${
                  isActive ? "bg-[#1C4E85]" : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="pt-5">{active.render()}</div>
    </section>
  );
};

export default Tabs;
