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
  const totalStars = reviews.reduce((sum: any, review: { attributes: { score: any; }; }) => sum + (review.attributes.score || 0), 0);
  const averageRating = reviews.length > 0 ? totalStars / reviews.length : 0;
  
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
    if (rating === 0) {
      message.error("Rating has to be greater than 0");
      return;
    }
    if (comment.trim()) {
      setIsPosting(true);
      setIsOpen(false);
      try {
        const userReview = reviews.find(
          (review: any) =>
            review?.attributes?.user?.data?.id === userId
        );
        if (userReview) {
          reviewUpdate();
        } else {
          reviewPosting();
        }
      } catch (error) {
        message.error("There was an error posting the review.");
      } finally {
        setIsPosting(false);
      }
    } else {
      message.error("Review cannot be empty");
    }
  };


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
      <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between sm:my-5">
        <div className="flex items-center gap-2 sm:mt-0 mt-6">
          <span className="">Total number of stars({averageRating.toFixed(1)})</span>
          {[...Array(5)].map((_, index) => (
            <span key={index} className={index < Math.round(averageRating) ? "text-yellow-500 text-[20px]" : "text-gray-300 text-[20px]"}>
              ★
              </span>
             ))}
        </div>
        <div className="flex justify-end">
        <button
          onClick={handleModal}
          className="bg-gray-900 sm:mb-0 sm:my-2 my-6 text-white px-4 py-2 rounded"
        >
          Leave review
        </button>
        </div>
      </div>

      <div className="sm:mt-5 space-y-6">
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
                "User"; 
              const image =
                review?.attributes?.user?.data?.attributes?.profilepicture?.data
                  ?.attributes?.url || "/profilepicture.webp"; 
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
                      <h2 className="font-semibold sm:mb-2">{name}</h2>
                      <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < Math.round(reviewRating) ? "text-yellow-500 text-[20px]" : "text-gray-300 text-[20px]"}>
                           ★
                           </span>
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
