"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  postQuestion,
  addResponse,
  useFetchCommunityDetails,
  useFetchQuestionResponses,
  useFetchSearchCommuity,
  likeResponse,
  removeLikedResponse,
  useLikedResponses,
} from "@/hooks/useCommunity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useAuthContext } from "@/Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetchCategory } from "@/hooks/useCourseUpload";
import { CommunityQuestions } from "@/lib/types";
import Loader from "@/components/Student/loader";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Community = () => {
  const { data, isLoading, error } = useFetchCommunityDetails();
  const { user } = useAuthContext();
  const userId = user?.id;
  const queryClient = useQueryClient();
const {data:liked, isLoading:likedLoading, error:errorLiked} = useLikedResponses()
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useFetchCategory();
  const categoryData = category?.data;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [questionId, setQuestionId] = useState(null);
  const [responseId, setResponseId] = useState<number | null>(null);

  const [questions, setQuestions] = useState<CommunityQuestions[]>([]);
  const [responsesMap, setResponsesMap] = useState<{ [key: string]: any[] }>(
    {}
  );
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [responseInputs, setResponseInputs] = useState<{
    [key: number]: string;
  }>({});
  const [responsesLimit, setResponsesLimit] = useState<{
    [key: number]: number;
  }>({});
  const [questionInput, setQuestionInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const DEFAULT_RESPONSES_LIMIT = 3;
  const [likedResponsesMap, setLikedResponsesMap] = useState<{
    [responseId: number]: boolean;
  }>({});

  const { data: searchResults, isLoading: isSearchLoading } =
    useFetchSearchCommuity(searchQuery);

  useEffect(() => {
    if (data?.data) {
      const initialQuestions = data.data.map((member: any) => {
        const {
          id,
          attributes: { Question, nameofquestioner, response },
        } = member;
        return {
          id,
          Question,
          nameofquestioner,
          responses: response || [],
        };
      });
      setQuestions(initialQuestions);
    }
  }, [data]);

  useEffect(() => {
    if (liked && liked.data && Array.isArray(liked.data) && liked.data.length > 0) {
      const newLikedResponsesMap = liked.data.reduce((map, response) => {
        map[response.id] = true;  
        return map;
      }, {} as Record<number, boolean>);
  
      setLikedResponsesMap(newLikedResponsesMap);
    } else {
      setLikedResponsesMap({});
    }
  }, [liked]);

  const { data: responsesData } = useFetchQuestionResponses(Number(questionId));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
  };

  const handleSearchResultClick = (resultId: string) => {
    setShowDropdown(false);
  };

  useEffect(() => {
    if (responsesData) {
      const responsesByQuestion = responsesData.data.reduce(
        (map: any, response: any) => {
          const questionId = response?.attributes?.community?.data?.id;
          const createdAt = response?.attributes?.createdAt;
          if (!map[questionId]) {
            map[questionId] = [];
          }
          map[questionId].push({
            id: response.id,
            responderName: response.attributes.responderName,
            responseText: response.attributes.responseText,
            createdAt,
          });
          return map;
        },
        {}
      );

      Object.keys(responsesByQuestion).forEach((questionId) => {
        responsesByQuestion[questionId].sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setResponsesMap(responsesByQuestion);
    }
  }, [responsesData, questionId]);

  const handleLoadMoreResponses = (questionId: number) => {
    setResponsesLimit((prev) => ({
      ...prev,
      [questionId]: (prev[questionId] || DEFAULT_RESPONSES_LIMIT) + 3,
    }));
  };

  const { mutate: post } = useMutation({
    mutationFn: async ({
      Question,
      nameofquestioner,
    }: {
      Question: string;
      nameofquestioner: string;
    }) => {
      return await postQuestion(Question, nameofquestioner);
    },
    onSuccess: () => {
      message.success("Question posted!");
    },
    onError: (err) => {
      message.error("Failed to post question.");
      setQuestions((prev) => prev.filter((q) => q.Question !== questionInput));
    },
  });

  const handleQuestion = () => {
    if (!questionInput.trim()) {
      message.error("Please enter a question!");
      return;
    }

    const nameofquestioner = user?.username || "Guest";
    const newQuestion = {
      id: new Date().toISOString(),
      Question: questionInput,
      nameofquestioner,
      responses: [],
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    setQuestionInput("");
    setIsSubmittingQuestion(true);

    post(
      { Question: questionInput, nameofquestioner },
      {
        onSuccess: ({ data }) => {
          setQuestions((prev) =>
            prev.map((q) =>
              q.id === newQuestion.id
                ? {
                    ...newQuestion,
                    id: data.id,
                  }
                : q
            )
          );
          setIsSubmittingQuestion(false);
          message.success("Question posted!");
        },
        onError: (err) => {
          setIsSubmittingQuestion(false);
          setQuestions((prev) => prev.filter((q) => q.id !== newQuestion.id));
          message.error("Failed to post question.");
        },
      }
    );
  };

  const handleSubmitResponse = (questionId: number, responseText: string) => {
    if (!responseText.trim()) {
      message.error("Response cannot be empty.");
      return;
    }

    const responderName = user?.username || "Anonymous";

    addResponse(responseText, responderName, questionId)
      .then((newResponse) => {
        const savedResponse = newResponse?.data?.attributes;
        const responseId = newResponse?.data?.id;

        if (!responseId) {
          return;
        }

        setResponsesMap((prevMap) => {
          const updatedResponses = prevMap[questionId]
            ? [savedResponse, ...prevMap[questionId]]
            : [savedResponse];
          return { ...prevMap, [questionId]: updatedResponses };
        });

        setResponseInputs((prev) => ({
          ...prev,
          [questionId]: "",
        }));

        message.success("Response added successfully.");
        setResponseId(responseId);
      })
      .catch((err) => {
        
        message.error("Failed to add response.");
      });
  };

  const { mutate: likedResponses } = useMutation({
    mutationFn: async (id: number) => {
      if (!userId) throw new Error("User not logged in");
      return await likeResponse(id, userId);
    },
    onSuccess: () => {
      message.success(`Response liked successfully.`);
      queryClient.invalidateQueries({queryKey:["likedResponses", userId]});
    },
    onError: (err, variables, context) => {
      message.error("Failed to like response.");
      setLikedResponsesMap((prevMap) => ({
        ...prevMap,
        [variables]: false,
      }));
    },
  });

  const { mutate: removeFromLiked } = useMutation({
    mutationFn: async (responseId: number) => {
      if (!userId) throw new Error("User not logged in");
      const response = await removeLikedResponse(responseId, userId);
      return response;
    },
  
    onMutate: async (responseId: number) => {
      if (!userId) return;
    
      await queryClient.cancelQueries({ queryKey: ["likedResponses", userId] });
    
      const previousLikedResponses = queryClient.getQueryData([
        "likedResponses",
        userId,
      ]);
    
      queryClient.setQueryData(["likedResponses", userId], (oldData: any) => {
        return {
          ...oldData,
          data: oldData?.data?.filter(
            (response: any) => response.id !== responseId
          ),
        };
      });
    
      return { previousLikedResponses };
    },
    
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["likedResponses", userId] });

      }
      message.success(`Unliked successfully.`);
    },
    onError: (err, variables, context: any) => {
      if (userId) {
        queryClient.setQueryData(["likedResponses", userId], context.previousLikedResponses);
      }
      message.error("Failed to unlike.");
    },
  });

  const handleToggleWishlist = (responseId: number | null) => {
    if (!responseId) {
      return;
    }
  
    const isCurrentlyLiked = likedResponsesMap[responseId];
  
    if (!isCurrentlyLiked) {
      likedResponses(responseId);
      setLikedResponsesMap((prevMap) => ({
        ...prevMap,
        [responseId]: true, 
      }));
    } else {
      removeFromLiked(responseId); 
      setLikedResponsesMap((prevMap) => {
        const updatedMap = { ...prevMap };
        delete updatedMap[responseId]; 
        return updatedMap;
      });
    }
  };
  

  if (isLoading || categoryLoading) {
    return (
      <div>
        <h2 className="text-lg font-300 my-4 ">
          <Skeleton
            width={200}
            height={24}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
          />
        </h2>

        <div>
          <Skeleton
            height={300}
            count={3}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            enableAnimation={true}
          />
        </div>
      </div>
    );
  }

  if (error || categoryError) {
    message.error("Error fetching community data. Please try again later.");
  }

  return (
    <div className="flex flex-col gap-6 w-full p-4 relative">
      <div>
        <h1 className="text-2xl font-bold mb-5">Community Discussions</h1>
        <p className="text-gray-600 ">
          Ask a question or help others by responding.
        </p>
      </div>

      <div className="flex relative flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="flex items-center relative rounded-lg shadow bg-white p-3 w-full sm:w-1/2">
          <MagnifyingGlassIcon className="w-6 h-6 text-black mr-2" />
          <input
            type="text"
            placeholder="Search through community"
            className="flex-1 outline-none bg-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {isSearchLoading && (
            <div className="ml-2">
              <Loader />
            </div>
          )}
          <Image
            src="/filter-variant.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>

        <div className="flex flex-col relative sm:flex-row w-full gap-2 items-center">
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            className="border p-2 rounded-lg flex-1 outline-none"
            placeholder="Type your question here..."
          />

          <button
            onClick={handleQuestion}
            className="bg-gray-600 text-white rounded-lg px-6 py-2 hover:bg-gray-700 transition"
            disabled={isSubmittingQuestion}
          >
            {isSubmittingQuestion ? <Loader /> : "Post your Question"}
          </button>
        </div>
      </div>

      {showDropdown && (
        <div className="absolute top-[170px] left-[18px] bg-white border border-gray-200 shadow-md rounded-lg sm:w-3/4 z-50">
          {isSearchLoading ? (
            <div className="p-2 text-center">
              <Loader />
            </div>
          ) : searchResults?.data?.length > 0 ? (
            searchResults?.data.map((result: any) => (
              <div
                key={result.id}
                className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchResultClick(result.id)}
              >
                {result.attributes.Question}
              </div>
            ))
          ) : (
            <div className="p-4">No results found.</div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 w-full h-auto mt-5">
        <div className="w-full sm:w-[80%]">
          {questions && questions.length > 0 ? (
            questions.map((q: any, index: number) => {
              const { Question, nameofquestioner, id: questionId } = q;
              const responses = responsesMap[questionId] || [];
              const responsesToShow = responses.slice(
                0,
                responsesLimit[questionId] || DEFAULT_RESPONSES_LIMIT
              );
              return (
                <div
                  key={index}
                  className="flex flex-col border mb-5 rounded-lg py-6 border-black"
                >
                  <div className="flex flex-col px-4 border-b pb-2 border-gray-400">
                    <h1 className="font-semibold">
                      Question: <span className="font-normal">{Question}</span>
                    </h1>
                    <p className="text-gray-500">
                      Asked by: {nameofquestioner}
                    </p>
                  </div>

                  <div className="px-4 mt-4">
                    {responsesToShow.length === 0 ? (
                      <p className="text-gray-700 mt-4 text-center">
                        No responses yet for this question.
                      </p>
                    ) : (
                      responsesToShow.map((response: any, resIndex: number) => {
                        const isLiked = likedResponsesMap[response.id] || false;

                        return (
                          <div
                            key={resIndex}
                            className="flex items-center mb-3"
                          >
                            <div className="h-[40px] w-[40px] relative">
                              <Image
                                src={response?.profilepictureUrl || "/pic.svg"}
                                alt={response?.responderName}
                                fill
                                className="rounded-full"
                              />
                            </div>
                            <div className="ml-2">
                              <p className="font-medium text-sm">
                                {response?.responderName}
                              </p>
                              <div className="flex gap-10">
                                <p className="text-gray-600 text-sm">
                                  {response?.responseText}
                                </p>
                                <button
                                  onClick={() =>
                                    handleToggleWishlist(response.id)
                                  }
                                >
                                  {isLiked ? (
                                    <AiFillHeart
                                      size={20}
                                      className="text-red-500"
                                    />
                                  ) : (
                                    <AiOutlineHeart
                                      size={20}
                                      className="text-gray-500"
                                    />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    {responses.length > 3 &&
                      responsesToShow.length < responses.length && (
                        <button
                          onClick={() => handleLoadMoreResponses(questionId)}
                          className="text-blue-600 mt-3"
                        >
                          See {responses.length - responsesToShow.length} more
                          response(s)
                        </button>
                      )}
                  </div>

                  <div className="mt-5 pt-5 px-4">
                    <h2>Add a Response:</h2>
                    <textarea
                      className="w-full mt-3 p-2 border border-gray-300 rounded-lg outline-none"
                      placeholder="Write your response here..."
                      value={responseInputs[questionId] || ""}
                      onChange={(e) =>
                        setResponseInputs((prev) => ({
                          ...prev,
                          [questionId]: e.target.value,
                        }))
                      }
                    />
                    <button
                      className="bg-gray-600 text-white px-4 py-2 mt-3 rounded-lg hover:bg-gray-700 transition"
                      onClick={() =>
                        handleSubmitResponse(
                          questionId,
                          responseInputs[questionId] || ""
                        )
                      }
                    >
                      Submit Response
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-gray-600">
              <h2 className="text-xl font-semibold">No questions yet!</h2>
              <p className="mt-2">
                Start the conversation by asking a question.
              </p>
            </div>
          )}
        </div>

        <div className="sm:w-[20%] h-auto border border-black">
          <div className="flex flex-col">
            <h1 className="bg-gray-300 p-3">Course Categories</h1>
            <div className="p-2">
              {categoryData?.map((category: any, index: number) => {
                return (
                  <div key={index} className="flex items-center mb-2">
                    <h2>{category.attributes.coursecategories}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
