import React, { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { postReview, updateReview, useFetchReviews } from "@/hooks/useCourseOverview";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { useParams } from "next/navigation";
import queryClient from "@/lib/queryClient";
import { message } from "antd";
import ReviewModal from "./reviewModal";
import Loader from "../loader";

const CourseReview = () => {
  const { user } = useAuthContext();
  const userId = Number(user?.id);
  const { slug } = useParams();
  const courseId = Number(slug);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: reviewData,
    isLoading: loadingreviews,
    error: reviewError,
  } = useFetchReviews(courseId);
  const reviews = reviewData?.data || [];

  const { mutate: reviewPosting } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      return postReview(userId, courseId, comment, rating);
    },
    onMutate: async () => {
      if (!userId) return;

      await queryClient.cancelQueries({
        queryKey: ["coursereviews", courseId],
      });

      const previousReviews = queryClient.getQueryData([
        "coursereviews",
        courseId,
      ]);

      queryClient.setQueryData(["coursereviews", courseId], (oldData: any) => {
        const newReview = {
          id: "",
          attributes: {
            comment,
            rating,
            createdAt: new Date().toISOString(),
            user: { id: userId, username: "Current User" },
          },
        };
        return { ...oldData, data: [...(oldData?.data || []), newReview] };
      });

      return { previousReviews };
    },
    onSuccess: () => {
      message.success("Review posted successfully!");
      setComment("");
      setRating(0);
      setIsOpen(false);
    },
    onError: (error, variables, context) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(
          ["coursereviews", courseId],
          context.previousReviews
        );
      }
      message.error("Failed to post review. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["coursereviews", courseId] });
    },
  });

  const {mutate: reviewUpdate} = useMutation({
    mutationFn: async() => {
      return updateReview(userId, courseId, comment, rating)
    },
    onMutate: async () => {
      if (!userId) return;

      await queryClient.cancelQueries({
        queryKey: ["coursereviews", courseId],
      });

      const previousReviews = queryClient.getQueryData([
        "coursereviews",
        courseId,
      ]);

      queryClient.setQueryData(["coursereviews", courseId], (oldData: any) => {
        const newReview = {
          id: "",
          attributes: {
            comment,
            rating,
            createdAt: new Date().toISOString(),
            user: { id: userId, username: "Current User" },
          },
        };
        return { ...oldData, data: [...(oldData?.data || []), newReview] };
      });

      return { previousReviews };
    },
    onError: (error, variables, context) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(
          ["coursereviews", courseId],
          context.previousReviews
        );
      }
      message.error("Failed to post review. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["coursereviews", courseId] });
    },
    onSuccess: () => {
      message.success("Review updated successfully!");
      setComment("");
      setRating(0);
      setIsOpen(false);
    }

  })
  
  const handleModal = () => {
    setIsOpen(true)
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleReview = () => {
    if(rating === 0) {
      message.error("Rating has to be greater than 0")
      return
    }
    if(comment.trim()) {
      setIsPosting(true)
      setIsOpen(false)
      try {
        if(reviews.length > 0) {
          reviewUpdate()
        } else {
          reviewPosting()
        }
      } catch (error) {
        message.error("There was an error posting the review.");
      } finally {
        setIsPosting(false)
      }

    } else {
      message.error("Review cannot be empty")
    }
  }


  if(loadingreviews) {
    return <div className="flex items-center justify-center">
      <Loader/>
    </div>
  }

  if(reviewError) {
  message.error("Failed to fetch course reviews. Try again later!")
  }
  return (
    <div className="w-full">
      <div className="flex items-center justify-end sm:my-5">
        <button
          onClick={handleModal}
          className="bg-gray-900 sm:mb-0 sm:my-2 my-6 text-white px-4 py-2 rounded"
        >
          Leave review
        </button>
      </div>

      <div className="mt-5 space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center">
            No reviews available for this course.
          </div>
        ) : (
          <div className="font-semibold">
            {reviews.length} review(s) available for this course.
            {reviews?.map((review: any) => {
              const name =
                review?.attributes?.user?.data?.attributes?.username ||
                "Anonymous User"; 
              const image =
                review?.attributes?.user?.data?.attributes?.profilepicture?.data
                  ?.attributes?.url || "/Ellipse 445.webp"; 
              const reviewText = review?.attributes?.review;
              const reviewRating = review?.attributes?.score;

              return (
                <div
                  key={review.id}
                  className="w-full h-auto border border-gray-300 mt-5 rounded-lg p-4"
                >
                  <div className="flex items-center mb-2">
                    <Image
                      src={image}
                      alt={name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="ml-3">
                      <h2 className="font-semibold">{name}</h2>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, index) => (
                          <svg
                            key={index}
                            className={`w-5 h-5 ${
                              index < Math.floor(reviewRating)
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.184 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.088 2.25a1 1 0 00-.364 1.118l1.184 3.63c.3.921-.755 1.688-1.538 1.118l-3.088-2.25a1 1 0 00-1.175 0l-3.088 2.25c-.783.57-1.838-.197-1.538-1.118l1.184-3.63a1 1 0 00-.364-1.118l-3.088-2.25c-.783-.57-.381-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.184-3.63z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{reviewText}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isOpen && (
        <ReviewModal
          isOpen={isOpen}
          onClose={handleModalClose}
          onSubmit={handleReview}
          setComment={setComment}
          setRating={setRating}
          isPosting={isPosting}
          userId={userId}
          courseId={courseId}
          rating={rating}
          comment={comment}
        />
      )}
    </div>
  );
};

export default CourseReview;
