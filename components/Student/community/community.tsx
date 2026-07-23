"use client";
import React, { useMemo, useState } from "react";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import {
  useFetchCommunityDetails,
  useFetchCommunityResponses,
  useFetchLikedResponseEntries,
} from "@/hooks/useCommunity";
import QuestionModal from "./questionModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { stripHtmlTags } from "../../../lib/utility";

type ActivityTab = "posts" | "responses" | "likes";

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center">
    <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
    <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
      {description}
    </p>
  </div>
);

const CompactCard = ({
  eyebrow,
  title,
  body,
  meta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
}) => (
  <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
      {eyebrow}
    </p>
    <h3 className="mt-3 text-base font-semibold leading-6 text-slate-950">
      {title}
    </h3>
    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
      {body}
    </p>
    <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
      {meta}
    </p>
  </article>
);

const Community = () => {
  const { user } = useAuthContext();
  const userId = user?.id ?? 0;
  const [activeTab, setActiveTab] = useState<ActivityTab>("posts");

  const {
    data: communityData,
    isLoading: loadingPosts,
    error: postsError,
  } = useFetchCommunityDetails();
  const {
    data: responsesData,
    isLoading: loadingResponses,
    error: responsesError,
  } = useFetchCommunityResponses();
  const {
    data: likedEntriesData,
    isLoading: loadingLikes,
    error: likesError,
  } = useFetchLikedResponseEntries(userId);

  const myPosts = useMemo(() => {
    const posts = communityData?.data || [];
    return posts.filter(
      (post: any) => post?.attributes?.user?.data?.id === userId
    );
  }, [communityData, userId]);

  const myResponses = useMemo(() => {
    const responses = responsesData?.data || [];
    return responses.filter(
      (response: any) => response?.attributes?.user?.data?.id === userId
    );
  }, [responsesData, userId]);

  const likedResponses = useMemo(() => {
    return likedEntriesData?.data || [];
  }, [likedEntriesData]);

  const isLoading = loadingPosts || loadingResponses || loadingLikes;

  if (postsError || responsesError || likesError) {
    message.error("Failed to load your community activity.");
  }

  const tabConfig = {
    posts: {
      label: "My Posts",
      count: myPosts.length,
      emptyTitle: "You have not posted anything yet.",
      emptyDescription:
        "Start a discussion, ask a clear question, or share a learning challenge and it will appear here.",
    },
    responses: {
      label: "My Responses",
      count: myResponses.length,
      emptyTitle: "You have not responded to any discussions yet.",
      emptyDescription:
        "Reply to questions from other learners and your response history will be collected here.",
    },
    likes: {
      label: "Liked Responses",
      count: likedResponses.length,
      emptyTitle: "You have not liked any responses yet.",
      emptyDescription:
        "Helpful answers you appreciate will appear here once you start liking them.",
    },
  } as const;

  const renderPosts = () => {
    if (myPosts.length === 0) {
      return (
        <EmptyState
          title={tabConfig.posts.emptyTitle}
          description={tabConfig.posts.emptyDescription}
        />
      );
    }

    return (
      <div className="grid gap-4">
        {myPosts.map((post: any) => (
          <CompactCard
            key={post.id}
            eyebrow="Question"
            title={stripHtmlTags(post?.attributes?.Question || "Untitled post")}
            body="Your question is visible to the community. Responses and follow-up activity will build around this thread."
            meta={`${post?.attributes?.community_responses?.data?.length || 0} responses`}
          />
        ))}
      </div>
    );
  };

  const renderResponses = () => {
    if (myResponses.length === 0) {
      return (
        <EmptyState
          title={tabConfig.responses.emptyTitle}
          description={tabConfig.responses.emptyDescription}
        />
      );
    }

    return (
      <div className="grid gap-4">
        {myResponses.map((response: any) => (
          <CompactCard
            key={response.id}
            eyebrow="Response"
            title={stripHtmlTags(
              response?.attributes?.community?.data?.attributes?.Question ||
                "Community thread"
            )}
            body={stripHtmlTags(response?.attributes?.responseText || "")}
            meta={`By you in discussion`}
          />
        ))}
      </div>
    );
  };

  const renderLikes = () => {
    if (likedResponses.length === 0) {
      return (
        <EmptyState
          title={tabConfig.likes.emptyTitle}
          description={tabConfig.likes.emptyDescription}
        />
      );
    }

    return (
      <div className="grid gap-4">
        {likedResponses.map((entry: any) => {
          const likedResponse = entry?.attributes?.community_response?.data;
          return (
            <CompactCard
              key={entry.id}
              eyebrow="Liked response"
              title={stripHtmlTags(
                likedResponse?.attributes?.community?.data?.attributes?.Question ||
                  "Community thread"
              )}
              body={stripHtmlTags(
                likedResponse?.attributes?.responseText || "Saved because you found it useful."
              )}
              meta={`From ${likedResponse?.attributes?.responderName || "community member"}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <section className="rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_50%,_#2563eb_100%)] px-6 py-8 text-white shadow-[0_20px_70px_rgba(15,23,42,0.16)] sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-white/65">
              Community Activity
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Keep your discussions, replies, and saved responses in one compact view.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/78 sm:text-base">
              This page now focuses on your own community footprint so you can
              track what you posted, where you responded, and what you found
              worth saving.
            </p>
          </div>

          <div className="flex justify-start lg:justify-end">
            <QuestionModal />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
              <HiOutlineDocumentText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                My Posts
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                {myPosts.length}
              </h2>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
              <FaRegCommentDots className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                My Responses
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                {myResponses.length}
              </h2>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <FaHeart className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Liked Responses
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                {likedResponses.length}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="flex flex-wrap gap-3">
          {(Object.keys(tabConfig) as ActivityTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tabConfig[tab].label} ({tabConfig[tab].count})
            </button>
          ))}
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="grid gap-4">
              <Skeleton height={140} count={3} />
            </div>
          ) : activeTab === "posts" ? (
            renderPosts()
          ) : activeTab === "responses" ? (
            renderResponses()
          ) : (
            renderLikes()
          )}
        </div>
      </section>
    </div>
  );
};

export default Community;
