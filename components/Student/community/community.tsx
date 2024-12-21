"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  addLiked,
  addResponse,
  removeLiked,
  useFetchCommunityDetails,
  useFetchLikeCount,
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
import { useAuthContext } from "@/Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetchCategory } from "@/hooks/useCourseUpload";
import Loader from "@/components/Student/loader";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import QuestionModal from "./questionModal";
import { useDebounce } from "use-debounce";

const Community = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const { data, isLoading, error } = useFetchCommunityDetails();
  const questions = data?.data;
  const queryClient = useQueryClient();
  const { data: liked,isLoading: likedLoading,error: errorLiked,} = useLikedResponses(Number(userId));
  const { data: category,isLoading: categoryLoading,error: categoryError} = useFetchCategory();
  const categoryData = category?.data;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [responsesMap, setResponsesMap] = useState<{ [key: string]: any[] }>({});
  const [showAllResponsesMap, setShowAllResponsesMap] = useState<{ [key: string]: boolean;}>({});
  const [responsesContentMap, setResponsesContentMap] = useState<{[key: string]: string;}>({});
  const [filteredData, setFilteredData] = useState<any[]>([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const DEFAULT_RESPONSES_LIMIT = 3;
  const [likedResponsesMap, setLikedResponsesMap] = useState<{[responseId: number]: boolean;}>({});
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [responseContent, setResponseContent] = useState("");
  const [selectedResult, setSelectedResult] = useState(""); 
  const { data: searchResults, isLoading: isSearchLoading, error: searchError,} = useFetchSearchCommuity(searchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { data: responsesData, isLoading: responsesLoading, error: responsesError,} = useFetchQuestionResponses(Number(questionId));
  const { data: likedResponses = [], isLoading: likesLoading } = useLikedResponses(Number(userId));
  const [currentPage, setCurrentPage] = useState(1); 
  const questionsPerPage = 2; 
  const indexOfLastQuestion = currentPage * questionsPerPage; 
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});

  
  
  const{data:likedCount} = useFetchLikeCount()
  console.log("Like Counts:", likedCount);
  useEffect(() => {
    if (likedCount) {
      const initialLikeCounts = likedCount?.data.reduce((acc:any, item:any) => {
        const communityResponse = item.attributes.community_response?.data;
        if (communityResponse) {
          const responseId = communityResponse.id;
          acc[responseId] = (acc[responseId] || 0) + 1;
        }
        return acc;
      }, {});
      setLikeCounts(initialLikeCounts);
    }
  }, [likedCount]);

     console.log("Like Counts Object:", likeCounts); 

  
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
    setShowDropdown(false)
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults?.data?.length) {
      setSelectedResult(searchResults.data[0]);
      setShowDropdown(false);
  };
}
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
    }: {
      responseText: string;
      responderName: string;
      questionId: number;
    }) => {
      return await addResponse(responseText, responderName, questionId);
    },
    onMutate: async ({ responseText, responderName, questionId }) => {
      const previousData = queryClient.getQueryData([
        "question_responses",
        questionId,
      ]);

      const optimisticResponse = {
        id: new Date().toISOString(),
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
          data: [optimisticResponse, ...(oldData?.data || [])],
        })
      );

      return { previousData };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(
        ["question_responses", variables.questionId],
        context.previousData
      );
      message.error("Failed to post response.");
    },
    onSuccess: () => {
      message.success("Response posted successfully!");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries([
        "question_responses",
        variables.questionId,
      ]);
    },
  });

  const handleSubmitResponse = (questionId: number) => {
    console.log("Response Content: ", responseContent);

    if (!responseContent.trim()) {
      message.error("Please enter a response to submit!");
      return;
    }

    if (!questionId) {
      console.error("Missing questionId!");
      message.error("Something went wrong. Please try again later.");
      return;
    }

    const responderName = user?.username || "Guest";

    console.log("Posting response with: ", {
      responseText: responseContent,
      responderName,
      questionId,
    });

    postResponseMutation({
      responseText: responseContent,
      responderName,
      questionId,
    });

    setResponseContent("");
    setShowAllResponsesMap((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  const { mutate: removeFromLiked } = useMutation({
    mutationFn: async ({
      responseId,
      userId,
    }: {
      responseId: number;
      userId: number;
    }) => {
      if (!userId) throw new Error("User not logged in");
      const response = await removeLiked(responseId, userId);
      return response;
    },
    onMutate: async ({ responseId }) => {
      await queryClient.cancelQueries({ queryKey: ["likedResponses", userId] });

      const previousLiked =
        queryClient.getQueryData(["likedResponses", userId]) || [];

      queryClient.setQueryData(["likedResponses", userId], (old: any) => {
        const currentData = Array.isArray(old) ? old : [];
        return currentData.filter(
          (response: any) => response.id !== responseId
        );
      });

      return { previousLiked };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedResponses", userId] });
      message.success("Unliked successfully.");
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["likedResponses", userId],
        context?.previousLiked
      );
      message.error("Failed to unlike response.");
    },
  });

  const { mutate: addToWishlist } = useMutation({
    mutationFn: async ({
      responseId,
      userId,
    }: {
      responseId: number;
      userId: number;
    }) => {
      if (!userId) throw new Error("User not logged in");
      const response = await addLiked(responseId, userId);
      return response;
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
    onError: (err, variables, context) => {
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
    userId: number
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
      addToWishlist({ responseId, userId }); 
    }
  };
  
  const displayedQuestions = selectedResult ? [selectedResult] : filteredData.length > 0 ? filteredData : questions;

  const currentQuestions = displayedQuestions?.slice(
    indexOfFirstQuestion, 
    indexOfLastQuestion
  );

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

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="flex items-center relative rounded-lg shadow bg-white p-3 w-full sm:w-1/2">
          <MagnifyingGlassIcon className="w-6 h-6 text-black mr-2" />
          <input
            type="text"
            placeholder="Search through community"
            className="flex-1 outline-none bg-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          {isLoading && (
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
        <QuestionModal />
      </div>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute bg-white top-[165px] shadow-lg rounded-lg mt-2 w-full max-h-60 overflow-y-auto"
        >
          {searchResults?.data?.length > 0 ? (
            <div className="gap-6">
              {searchResults?.data?.map((item: any) => (
                 <div
                 key={item.id}
                 className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchResultClick(item)}

               >
                 {item.attributes.Question}
               </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-gray-500">
              No results found for {searchQuery}.
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 w-full h-auto mt-5">
  <div className="w-full sm:w-[80%]">
    {currentQuestions && currentQuestions.length > 0 ? (
     currentQuestions.map((q: any, index: number) => {
        const { Question, nameofquestioner, id } = q.attributes;
        const questionId = q.id;
        const responses = responsesMap[questionId] || [];

        return (
          <div key={index} className="flex flex-col border mb-5 rounded-lg py-6 border-black">
            <div className="flex flex-col px-4 border-b pb-2 border-gray-400">
              <h1 className="font-semibold">
                Question: <span className="font-normal">{Question}</span>
              </h1>
              <p className="text-gray-500">Asked by: {nameofquestioner}</p>
            </div>

            <div className="px-4 mt-4">
              {responses.length === 0 ? (
                <p className="text-gray-700 mt-4 text-center">
                  No responses yet for this question.
                </p>
              ) : (
                (showAllResponsesMap[questionId] ? responses : responses.slice(0, DEFAULT_RESPONSES_LIMIT)).map(
                  (response: any, resIndex: number) => {
                    const isLiked = likedResponsesMap[response.id] || false;
                    const responseId = response.id;
                    console.log("Rendering Response ID2:", responseId); 
                    const likeCount = (likeCounts ? likeCounts[responseId] : 0 ) || 0;


                    return (
                      <div
                    key={resIndex}
                   className="flex items-start mb-3 p-2">
                  <div className="h-[40px] w-[40px] relative">
                 <Image
                  src={response?.profilepictureUrl || "/pic.svg"}
                   alt={response?.responderName}
                   fill
                    className="rounded-full"/>
                   </div>
                    <div className="ml-2">
                   <p className="font-medium text-sm mb-1">{response?.responderName}</p>
                   <p className="text-gray-600 text-sm">{response?.responseText}</p>
                   <div className="flex gap-1 mt-2">
                   <button  onClick={() => handleToggleLike(responseId, isLiked, userId)} >
                   {isLiked ? (
                  <AiFillHeart size={20} className="text-red-500" /> ) : ( <AiOutlineHeart size={20} className="text-gray-500" />)}
                  </button>
                  <span className="text-gray-500">{likeCount}</span>
                  </div>
                   </div>
                  </div>

                    );
                  }
                )
              )}
              {responses.length > DEFAULT_RESPONSES_LIMIT && (
                <button
                  onClick={() => handleLoadMoreResponses(questionId)}
                  className="text-blue-600 mt-3"
                >
                  {showAllResponsesMap[questionId] ? "Hide Responses" : `See ${responses.length - DEFAULT_RESPONSES_LIMIT} more response(s)`}
                </button>
              )}
            </div>

            <div className="mt-5 pt-5 px-4">
              <h2>Add a Response:</h2>
              <ReactQuill
                value={responsesContentMap[questionId] || ""}
                placeholder="Write your response here..."
                onChange={(value) => handleResponseChange(questionId, value)}
                className="mb-4 mt-2"
                theme="snow"
              />
              <button
                className="bg-gray-600 text-white px-4 py-2 mt-3 rounded-lg transition"
                onClick={() => handleSubmitResponse(questionId)}
              >
                {isSubmittingResponse ? <Loader /> : "Submit Response"}
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <div className="text-center py-10 text-gray-600">
        <h2 className="text-xl font-semibold">No questions yet!</h2>
        <p className="mt-4">Start the conversation by asking a question.</p>
      </div>
    )}
  </div>


        <div className="sm:w-[20%] border border-black max-h-[350px] overflow-y-auto">
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
      <div className="flex justify-center items-center mt-4 gap-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-lg text-white font-medium ${
      currentPage === 1
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-zinc-500 hover:bg-zinc-700"
    }`}
  >
    Previous
  </button>

  <span className="text-gray-700 font-medium">
    Page {currentPage} of {Math.ceil(displayedQuestions.length / questionsPerPage)}
  </span>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage * questionsPerPage >= displayedQuestions.length}
    className={`px-4 py-2 rounded-lg text-white font-medium ${
      currentPage * questionsPerPage >= displayedQuestions.length
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-zinc-500 hover:bg-zinc-700"
    }`}
  >
    Next
  </button>
</div>

    </div>
  );
};

export default Community;
