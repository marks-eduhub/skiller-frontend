"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { message } from "antd";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import {
  addLikedCourse,
  removeLikedCourse,
  useLikedCourses,
} from "@/hooks/useLikedCourses";
import { ClockIcon} from "@radix-ui/react-icons";
import { addRecentCourse } from "@/hooks/useRecentCourses";
import { useFetchSpecificCourseRate } from "@/hooks/useSubmit";

interface ProductCardProps {
  course: any;
  imageHeightClass?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ course, imageHeightClass = "h-[190px]" }) => {
  const { coursename, card, duration} = course?.attributes || {};
  const tutorName = course?.attributes.tutor?.data?.attributes?.tutorname || "Tutor Name";
  const imageUrl = course?.attributes?.card?.data?.attributes?.url;
  const courseId = course?.id;
  const courseDocumentId = course?.attributes?.documentId;
  const { user } = useAuthContext();
  const userId = user?.id;
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  const { data: likedCourses } = useLikedCourses();

  const { data: specificCourseRate } = useFetchSpecificCourseRate(courseDocumentId);
  const ratings = specificCourseRate?.data || [];
  const totalRatings = ratings.length;
  const averageRating = totalRatings > 0  ? ratings.reduce((sum: number, rating: any) => sum + rating.attributes.score, 0 ) / totalRatings : 0;

  useEffect(() => {
    if (likedCourses) {
      const likedCourseIds = likedCourses?.data?.map(
        (likedCourse: any) => likedCourse.attributes.course.data.id
      );
      setIsLiked(likedCourseIds?.includes(courseId));
    }
  }, [likedCourses, courseId]);

  const { mutate: removeFromWishlist, isPending: isUnLiking } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      const response = await removeLikedCourse(courseId, userId);
      return response;
    },
    onMutate: async () => {
      if (!userId) return;

      setIsLiked(false);

      await queryClient.cancelQueries({ queryKey: ["likedCourses", userId] });

      const previousLikedCourses = queryClient.getQueryData([
        "likedCourses",
        userId,
      ]);

      queryClient.setQueryData(["likedCourses", userId], (oldData: any) => {
        return {
          ...oldData,
          data: oldData?.data?.filter((course: any) => course.id !== courseId),
        };
      });

      return { previousLikedCourses };
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["likedCourses", userId] });
      }
      message.success(`Removed from wishlist.`);
    },
    onError: (context: any) => {
      if (userId) {
        queryClient.setQueryData(
          ["likedCourses", userId],
          context.previousLikedCourses
        );
      }
      message.error("Failed to remove from wishlist.");
    },
  });

  const { mutate: addToWishlist, isPending } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      const response = await addLikedCourse(courseId, userId);
      return response;
    },
    onMutate: async () => {
      if (!userId) return;
  
      setIsLiked(true);
  
      await queryClient.cancelQueries({ queryKey: ["likedCourses", userId] });
  
      const previousLikedCourses = queryClient.getQueryData([
        "likedCourses", userId
      ]);
        queryClient.setQueryData(["likedCourses", userId], (oldData: any) => {
        const updatedData = oldData?.data.map((course: any) => {
          if (course.id === courseId) {
            return { ...course, isLiked: true }; 
          }
          return course; 
        });
        return { ...oldData, data: updatedData };
      });
  
      return { previousLikedCourses }; 
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["likedCourses", userId] });
      }
      message.success(`Added to wishlist.`);
    },
    onError: (context: any) => {
      if (userId) {
        queryClient.setQueryData(
          ["likedCourses", userId],
          context.previousLikedCourses
        );
      }
      message.error("Failed to add to wishlist");
    },
  });
  

  const { mutate: addRecent } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      return await addRecentCourse(courseId, userId);
    },
    onMutate: async () => {
      if (!userId) return;

      await queryClient.cancelQueries({ queryKey: ["recentCourses", userId] });

      const previousLikedCourses = queryClient.getQueryData([
        "recentCourses",
        userId,
      ]);

      queryClient.setQueryData(["recentCourses", userId], (oldData: any) => {
        return [...(oldData?.data || []), { id: courseId, attributes: {} }];
      });

      return { previousLikedCourses };
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["recentCourses", userId] });
      }
    },
    onError: (context: any) => {
      if (userId) {
        queryClient.setQueryData(
          ["recentCourses", userId],
          context.previousLikedCourses
        );
      }
      message.error("Failed to add to recent");
    },
  });

  const handleCourseRecent= () => {
    addRecent();
  };

  const handleToggleWishlist = () => {
    if(isPending || isUnLiking) return
    if (isLiked) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  return (
    <div className="h-full pb-6 pr-3 sm:pb-0">
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition hover:shadow-md" onClick={handleCourseRecent}>
        <div className={`relative flex ${imageHeightClass} overflow-hidden`}>
          <Image
            src={imageUrl || "/course-placeholder.svg"}
            alt={card?.data?.attributes?.alternativeText || "Fallback Image"}
            fill
            className="object-cover object-center p-1"
          />

          <div className="absolute flex w-full items-center justify-between p-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleWishlist();
              }}
              disabled={isPending || isUnLiking}

            >
              {isLiked ? (
                <AiFillHeart size={24} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={24} className="text-gray-500" />
              )}
            </button>
            <p className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black">Free</p>
          </div>
        </div>
      </div>

      <div className="cursor-pointer bg-[#F3F4F3] p-3 text-black" onClick={handleCourseRecent}>
      
        <div className="mb-3 h-[48px] sm:h-[42px]">
          <h3 className="font-semibold line-clamp-2 text-ellipsis">
            {coursename || "Course name not available"}
          </h3>
        </div>
        <div className="mb-3 flex items-center">
          <p className="text-sm text-gray-700">{tutorName}</p>
        </div>
        <div className="mt-2 flex justify-between gap-2 text-[13px] sm:text-[0.8rem]">
          <div className="flex gap-1">
            <p>
              {totalRatings > 0 ? `⭐ ${averageRating} ` : "No ratings yet."}
            </p>
          </div>
          <div className="flex gap-1">
            <ClockIcon className="w-4 h-4 text-black" />
            <p>{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
