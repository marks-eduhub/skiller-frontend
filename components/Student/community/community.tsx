"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  addLiked,
  addResponse,
  removeLiked,
  useFetchCommunityDetails,
  useFetchCommunityResponses,
  useFetchLikeCount,
  useFetchLikedResponseEntries,
  useFetchQuestionResponses,
  useFetchSearchCommuity,
  useLikedResponses,
} from "@/hooks/useCommunity";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Student/loader";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import QuestionModal from "./questionModal";
import { useDebounce } from "use-debounce";
import dynamic from "next/dynamic";
import { FaComment } from "react-icons/fa";
import { stripHtmlTags } from "../../../lib/utility";

const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

type ActivityTab = "posts" | "responses" | "likes";

const Community = () => {
  const { user } = useAuthContext();
  const userId = user?.id ?? 0;
  const { data, isLoading, error } = useFetchCommunityDetails();
  const questions = data?.data;
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [responsesMap, setResponsesMap] = useState<{ [key: string]: any[] }>(
    {}
  );
  const [showAllResponsesMap, setShowAllResponsesMap] = useState<{
    [key: string]: boolean;
  }>({});
  const [responsesContentMap, setResponsesContentMap] = useState<{
    [key: string]: string;
  }>({});
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedResponsesMap, setLikedResponsesMap] = useState<{
    [responseId: number]: boolean;
  }>({});
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [selectedResult, setSelectedResult] = useState("");
  const [activeTab, setActiveTab] = useState<ActivityTab>("posts");
  const { data: searchResults, isLoading: searchLoading } =
    useFetchSearchCommuity(searchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const {
    data: responsesData,
    isLoading: responsesLoading,
    error: responsesError,
  } = useFetchQuestionResponses(Number(questionId));
  const { data: allResponsesData } = useFetchCommunityResponses();
  const { data: likedResponseEntries } = useFetchLikedResponseEntries(userId);
  const { data: likedResponses = [] } = useLikedResponses(Number(userId));
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 3;
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const { data: likedCount } = useFetchLikeCount();
  const [showModalForQuestion, setShowModalForQuestion] = useState<
    string | boolean
  >(false);

  const myPosts = useMemo(() => {
    const posts = questions || [];
    return posts.filter((post: any) => post?.attributes?.user?.data?.id === userId);
  }, [questions, userId]);

  const myResponses = useMemo(() => {
    const responses = allResponsesData?.data || [];
    return responses.filter(
      (response: any) => response?.attributes?.user?.data?.id === userId
    );
  }, [allResponsesData, userId]);

  const likedResponseItems = likedResponseEntries?.data || [];

  useEffect(() => {
    if (likedCount) {
      const initialLikeCounts = likedCount?.data.reduce(
        (acc: any, item: any) => {
          const communityResponse = item.attributes.community_response?.data;
          if (communityResponse) {
            const responseId = communityResponse.id;
            acc[responseId] = (acc[responseId] || 0) + 1;
          }
          return acc;
        },
        {}
      );
      setLikeCounts(initialLikeCounts);
    }
  }, [likedCount]);

  useEffect(() => {
    if (likedResponses.length > 0) {
      const initialMap = likedResponses.reduce((acc, id) => {
        acc[id] = true;
        return acc;
      }, {} as { [key: number]: boolean });

      setLikedResponsesMap(initialMap);
    }
  }, [likedResponses]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
  };

  const handleSearchResultClick = (result: any) => {
    setSelectedResult(result);
    setShowDropdown(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults?.data?.length) {
      setSelectedResult(searchResults.data[0]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchQuery && searchResults) {
      const filtered = searchResults.data.filter((item: any) =>
        item.attributes.Question.toLowerCase().includes(
          debouncedSearchQuery.toLowerCase()
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(searchResults?.data || []);
    }
  }, [debouncedSearchQuery, searchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResponseChange = (questionId: string, value: string) => {
    setResponsesContentMap((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  useEffect(() => {
    if (responsesData) {
      const responsesByQuestion = responsesData.data.reduce(
        (map: any, response: any) => {
          const responseQuestionId = response?.attributes?.community?.data?.id;
          const createdAt = response?.attributes?.createdAt;
          if (!map[responseQuestionId]) {
            map[responseQuestionId] = [];
          }
          map[responseQuestionId].push({
            id: response.id,
            responderName: response.attributes?.responderName,
            responseText: response.attributes.responseText,
            createdAt,
            profilePicture:
              response.attributes.user?.data?.attributes?.profilepicture?.data
                ?.attributes?.url || "/pic.svg",
          });
          return map;
        },
        {}
      );

      Object.keys(responsesByQuestion).forEach((id) => {
        responsesByQuestion[id].sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setResponsesMap(responsesByQuestion);
    }
  }, [responsesData, questionId]);

  const handleLoadMoreResponses = (questionId: number) => {
    setShowAllResponsesMap((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const { mutate: postResponseMutation } = useMutation({
    mutationFn: async ({
      responseText,
      responderName,
      questionId,
      userId,
    }: {
      responseText: string;
      responderName: string;
      questionId: number;
      userId: number;
    }) => {
      if (!userId) throw new Error("User not logged in");
      return await addResponse(responseText, responderName, questionId, userId);
    },
    onMutate: async ({ responseText, responderName, questionId }) => {
      if (!userId) return;
      await queryClient.cancelQueries({
        queryKey: ["question_responses", questionId],
      });

      const previousData = queryClient.getQueryData([
        "question_responses",
        questionId,
      ]);

      const optimisticResponse = {
        id: Date.now(),
        attributes: {
          responseText,
          responderName,
          questionId,
          createdAt: new Date().toISOString(),
        },
      };

      queryClient.setQueryData(
        ["question_responses", questionId],
        (oldData: any) => ({
          ...oldData,
          data: [...(oldData?.data || []), optimisticResponse],
        })
      );

      return { previousData };
    },
    onSuccess: () => {
      message.success("Response posted successfully!");
      setShowModalForQuestion("");
      setShowAllResponsesMap((prev) => ({
        ...prev,
        [questionId]: true,
      }));
      setResponsesContentMap((prev) => ({
        ...prev,
        [questionId]: "",
      }));
      setIsSubmittingResponse(false);
    },
    onError: (_error, _variables, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["question_responses", questionId],
          context.previousData
        );
      }
      message.error("Failed to post response.");
    },
    onSettled: () => {
      setIsSubmittingResponse(false);
      queryClient.invalidateQueries({
        queryKey: ["question_responses", questionId],
      });
    },
  });

  const handleSubmitResponse = (questionId: number) => {
    const responseText = responsesContentMap[questionId] || "";

    if (!responseText.trim()) {
      message.error("Please enter a response to submit!");
      return;
    }

    if (!questionId) {
      message.error("Something went wrong. Please try again later.");
      return;
    }

    const responderName = user?.username || "Anonymous";
    setIsSubmittingResponse(true);

    const newResponse = {
      id: Date.now(),
      responderName,
      responseText,
      createdAt: new Date().toISOString(),
      profilePicture: "/pic.svg",
    };

    setResponsesMap((prev) => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), newResponse],
    }));

    setResponsesContentMap((prev) => ({
      ...prev,
      [questionId]: "",
    }));

    postResponseMutation({
      responseText,
      responderName,
      questionId,
      userId,
    });
  };

  const { mutate: removeFromLiked } = useMutation({
    mutationFn: async ({
      responseId,
      userId,
    }: {
      responseId: number;
      userId: number | undefined;
    }) => {
      if (!userId) throw new Error("User not logged in");
      return await removeLiked(responseId, userId);
    },
    onMutate: async ({ responseId }) => {
      await queryClient.cancelQueries({ queryKey: ["likedResponses", userId] });
      const previousUnLiked =
        queryClient.getQueryData(["likedResponses", userId]) || [];

      queryClient.setQueryData(["likedResponses", userId], (old: any) => {
        const currentData = Array.isArray(old) ? old : [];
        return currentData.filter((response: any) => response.id !== responseId);
      });

      return { previousUnLiked };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedResponses", userId] });
      message.success("Unliked successfully.");
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        ["likedResponses", userId],
        context?.previousUnLiked
      );
      message.error("Failed to unlike response.");
    },
  });

  const { mutate: addToLiked } = useMutation({
    mutationFn: async ({
      responseId,
      userId,
    }: {
      responseId: number;
      userId: number | undefined;
    }) => {
      if (!userId) throw new Error("User not logged in");
      return await addLiked(responseId, userId);
    },
    onMutate: async ({ responseId }) => {
      await queryClient.cancelQueries({ queryKey: ["likedResponses", userId] });
      const previousLiked =
        queryClient.getQueryData(["likedResponses", userId]) || [];

      queryClient.setQueryData(["likedResponses", userId], (old: any) => {
        const currentData = Array.isArray(old) ? old : [];
        return [...currentData, { id: responseId }];
      });

      return { previousLiked };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedResponses", userId] });
      message.success("Liked successfully.");
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        ["likedResponses", userId],
        context?.previousLiked
      );
      message.error("Failed to like response.");
    },
  });

  const handleToggleLike = (
    responseId: number,
    isLiked: boolean,
    userId: number | undefined
  ) => {
    setLikeCounts((prevLikeCounts) => ({
      ...prevLikeCounts,
      [responseId]: isLiked
        ? (prevLikeCounts[responseId] || 0) - 1
        : (prevLikeCounts[responseId] || 0) + 1,
    }));

    setLikedResponsesMap((prev) => ({ ...prev, [responseId]: !isLiked }));

    if (isLiked) {
      removeFromLiked({ responseId, userId });
    } else {
      addToLiked({ responseId, userId });
    }
  };

  const openReplyModal = (questionId: string) => {
    setShowModalForQuestion(questionId);
    setQuestionId(questionId);
  };

  const displayedQuestions = selectedResult
    ? [selectedResult]
    : filteredData.length > 0
    ? filteredData
    : questions;

  const currentQuestions = displayedQuestions?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const totalPages = Math.max(
    Math.ceil((displayedQuestions?.length || 0) / questionsPerPage),
    1
  );

  if (isLoading) {
    return (
      <div className="ml-5">
        <h2 className="my-4 text-lg font-300">
          <Skeleton width={200} height={24} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        </h2>
        <Skeleton height={240} count={3} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
      </div>
    );
  }

  if (error) {
    message.error("Error fetching community data. Please try again later.");
  }

  if (responsesError) {
    message.error("Error fetching question responses. Please try again later.");
  }

  const renderSideContent = () => {
    if (activeTab === "posts") {
      if (myPosts.length === 0) {
        return (
          <p className="text-sm leading-6 text-black/60">
            You have not posted yet. Start a thread and it will appear here.
          </p>
        );
      }

      return myPosts.slice(0, 5).map((post: any) => (
        <div key={post.id} className="border-b border-black/8 pb-3">
          <p className="text-xs uppercase tracking-[0.14em] text-black/40">
            Your post
          </p>
          <p className="mt-2 text-sm leading-6 text-black/80">
            {stripHtmlTags(post?.attributes?.Question || "")}
          </p>
        </div>
      ));
    }

    if (activeTab === "responses") {
      if (myResponses.length === 0) {
        return (
          <p className="text-sm leading-6 text-black/60">
            You have not responded yet. Join a discussion to build your activity
            here.
          </p>
        );
      }

      return myResponses.slice(0, 5).map((response: any) => (
        <div key={response.id} className="border-b border-black/8 pb-3">
          <p className="text-xs uppercase tracking-[0.14em] text-black/40">
            Your response
          </p>
          <p className="mt-2 text-sm leading-6 text-black/80">
            {stripHtmlTags(response?.attributes?.responseText || "")}
          </p>
        </div>
      ));
    }

    if (likedResponseItems.length === 0) {
      return (
        <p className="text-sm leading-6 text-black/60">
          You have not liked any responses yet. Helpful replies you save through
          likes will appear here.
        </p>
      );
    }

    return likedResponseItems.slice(0, 5).map((entry: any) => {
      const likedResponse = entry?.attributes?.community_response?.data;
      return (
        <div key={entry.id} className="border-b border-black/8 pb-3">
          <p className="text-xs uppercase tracking-[0.14em] text-black/40">
            Liked response
          </p>
          <p className="mt-2 text-sm leading-6 text-black/80">
            {stripHtmlTags(likedResponse?.attributes?.responseText || "")}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="relative flex w-full flex-col gap-5 p-1 sm:p-3">
      <div>
        <h1 className="mb-2 text-[24px] font-bold sm:text-[26px]">
          Community Discussions
        </h1>
        <p className="text-sm text-gray-600 sm:text-[15px]">
          Ask clear questions, help others, and keep the conversation moving.
        </p>
      </div>

      <div className="relative flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative flex w-full items-center rounded-lg border border-black/10 bg-white p-3 shadow-sm sm:w-[28rem]">
          <MagnifyingGlassIcon className="mr-2 hidden h-6 w-6 text-black md:block" />
          <input
            type="text"
            placeholder="Search through community"
            className="flex-1 bg-transparent text-sm outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          <Image
            src="/filter-variant.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
        <QuestionModal />
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-[150px] z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-black/10 bg-white shadow-lg sm:top-[64px] sm:max-w-[28rem]"
        >
          {searchLoading ? (
            <div className="p-2">Loading...</div>
          ) : searchResults?.data?.length ? (
            <div className="gap-6">
              {searchResults?.data?.map((item: any) => (
                <div
                  key={item.id}
                  className="cursor-pointer p-3 hover:bg-gray-100"
                  onClick={() => handleSearchResultClick(item)}
                >
                  {stripHtmlTags(item.attributes.Question)}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for {searchQuery}
            </div>
          )}
        </div>
      )}

      <div className="mt-3 grid w-full gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="w-full">
          {currentQuestions && currentQuestions.length > 0 ? (
            currentQuestions.map((q: any, index: number) => {
              const { Question } = q.attributes;
              const currentQuestionId = q.id;
              const responses = responsesMap[currentQuestionId] || [];
              const nameofquestioner =
                q.attributes?.user?.data?.attributes?.username;

              return (
                <div
                  key={index}
                  className="relative mb-6 flex flex-col rounded-lg border border-black/8 bg-white px-4 py-4 shadow-sm sm:gap-4 sm:px-5"
                >
                  <div>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Image
                          src={
                            q.attributes.user?.data?.attributes?.profilepicture
                              ?.data?.attributes?.url || "/profilepicture.webp"
                          }
                          alt={q.attributes?.user?.data?.attributes?.username}
                          width={54}
                          height={54}
                          className="h-[54px] w-[54px] rounded-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <h1 className="text-[15px] font-semibold leading-6 sm:text-[16px]">
                          <span className="font-normal">
                            {stripHtmlTags(Question)}
                          </span>
                        </h1>

                        <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                          Asked by: {nameofquestioner}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openReplyModal(currentQuestionId)}
                      className="absolute right-3 top-3 flex items-center gap-1 rounded-full p-2 text-gray-700 transition"
                    >
                      <FaComment size={16} />
                      <span className="text-sm text-gray-500">
                        {responses.length}
                      </span>
                    </button>
                  </div>

                  {responses.length === 0 && (
                    <div className="mt-3">
                      <h1 className="ml-1 text-sm text-gray-700">
                        Add a response
                      </h1>
                      <ReactQuill
                        value={responsesContentMap[currentQuestionId] || ""}
                        placeholder="Write your response here..."
                        onChange={(value) =>
                          handleResponseChange(currentQuestionId, value)
                        }
                        className="community-editor mb-3 mt-2"
                        theme="snow"
                      />
                      <button
                        className="mt-2 rounded-lg bg-gray-700 px-3 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-70"
                        onClick={() => handleSubmitResponse(currentQuestionId)}
                        disabled={isSubmittingResponse}
                      >
                        {isSubmittingResponse ? (
                          <DotPulseWrapper size="20" speed="1.5" color="white" />
                        ) : (
                          "Submit Response"
                        )}
                      </button>
                    </div>
                  )}

                  <div
                    className={`flex flex-col px-2 sm:px-3 ${
                      responses.length === 0
                        ? "mt-1 pb-0"
                        : "mt-3 max-h-[440px] pb-2"
                    }`}
                  >
                    <div className="overflow-auto custom-scrollbar">
                      {responses.length === 0 ? (
                        <p className="mt-1 text-center text-sm text-gray-600">
                          Be the first to respond.
                        </p>
                      ) : (
                        <>
                          <div className="mt-2 flex justify-start">
                            <button
                              onClick={() =>
                                handleLoadMoreResponses(currentQuestionId)
                              }
                              className="text-sm text-black underline underline-offset-4"
                            >
                              {showAllResponsesMap[currentQuestionId]
                                ? "Hide Responses"
                                : "Show Responses"}
                            </button>
                          </div>
                          {showAllResponsesMap[currentQuestionId] &&
                            responses.map((response: any) => {
                              const responseId = response.id;
                              const isLiked =
                                likedResponsesMap[response.id] || false;
                              const likeCount =
                                (likeCounts ? likeCounts[responseId] : 0) || 0;

                              return (
                                <div
                                  key={responseId}
                                  className="mt-3 flex-col items-start border-b border-black/5 pb-3"
                                >
                                  <div className="mb-3 flex items-center gap-2">
                                    <div className="relative h-[40px] w-[40px]">
                                      <Image
                                        src={response?.profilePicture}
                                        alt={response?.responderName}
                                        fill
                                        className="rounded-full object-cover"
                                      />
                                    </div>
                                    <p className="mb-1 text-sm font-medium">
                                      {response?.responderName}
                                    </p>
                                  </div>
                                  <div className="ml-1">
                                    <div className="overflow-hidden break-words text-sm leading-6 text-gray-600">
                                      {stripHtmlTags(response?.responseText || "")}
                                    </div>

                                    <div className="mt-2 flex gap-1">
                                      <button
                                        onClick={() =>
                                          handleToggleLike(
                                            responseId,
                                            isLiked,
                                            userId
                                          )
                                        }
                                      >
                                        {isLiked ? (
                                          <AiFillHeart size={20} className="text-red-500" />
                                        ) : (
                                          <AiOutlineHeart size={20} className="text-gray-500" />
                                        )}
                                      </button>
                                      <span className="text-gray-500">
                                        {likeCount}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </>
                      )}
                    </div>
                    {showAllResponsesMap[currentQuestionId] &&
                      responses.length > 0 && (
                        <div className="sticky bottom-0 flex bg-white pt-2 max-md:flex-col sm:items-center sm:justify-between">
                          <ReactQuill
                            value={responsesContentMap[currentQuestionId] || ""}
                            placeholder="Write your response here..."
                            onChange={(value) =>
                              handleResponseChange(currentQuestionId, value)
                            }
                            className="community-editor mt-1 w-full sm:w-[85%]"
                            theme="snow"
                          />
                          <div className="max-md:justify-start">
                            <button
                              className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-70"
                              onClick={() => handleSubmitResponse(currentQuestionId)}
                              disabled={isSubmittingResponse}
                            >
                              {isSubmittingResponse ? (
                                <DotPulseWrapper size="20" speed="1.5" color="white" />
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="my-10 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold">No questions yet.</h2>
              <p className="mt-4 text-center text-black/65">
                Start the conversation by asking a question.
              </p>
            </div>
          )}

          <div className="mt-2 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`rounded-lg px-4 py-2 font-medium text-white ${
                currentPage === 1
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-zinc-700 hover:bg-zinc-900"
              }`}
            >
              Previous
            </button>

            <p className="text-sm font-medium text-gray-700">
              Page {currentPage} of <span className="ml-1">{totalPages}</span>
            </p>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * questionsPerPage >= displayedQuestions.length}
              className={`rounded-lg px-4 py-2 font-medium text-white ${
                currentPage * questionsPerPage >= displayedQuestions.length
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-zinc-700 hover:bg-zinc-900"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-black/10 bg-white p-4 shadow-sm lg:sticky lg:top-4">
          <div className="border-b border-black/8 pb-3">
            <h2 className="text-lg font-semibold text-black">Your activity</h2>
            <p className="mt-1 text-sm text-black/60">
              A compact view of what you posted, answered, and liked.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("posts")}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                activeTab === "posts"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/70 hover:bg-black/10"
              }`}
            >
              My posts
            </button>
            <button
              onClick={() => setActiveTab("responses")}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                activeTab === "responses"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/70 hover:bg-black/10"
              }`}
            >
              My replies
            </button>
            <button
              onClick={() => setActiveTab("likes")}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                activeTab === "likes"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/70 hover:bg-black/10"
              }`}
            >
              Likes
            </button>
          </div>

          <div className="mt-4 space-y-3">{renderSideContent()}</div>
        </aside>
      </div>
    </div>
  );
};

export default Community;
