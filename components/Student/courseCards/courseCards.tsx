"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import api from "@/lib/axios";
import { message } from "antd";
import { useAuthContext } from "@/Context/AuthContext";
import {
  addLikedCourse,
  removeLikedCourse,
  useLikedCourses,
} from "@/hooks/useLikedCourses";
import { ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { addRecentCourse } from "@/hooks/useRecentCourses";

interface ProductCardProps {
  course: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ course }) => {
  const { coursename, card, duration, rating } = course?.attributes || {};
  const tutorName =
    course?.attributes.tutor?.data?.attributes?.tutorname || "Tutor Name";
  const imageUrl = course?.attributes?.card?.data?.attributes?.url;
  const courseId = course?.id;
  const { user } = useAuthContext();
  const userId = user?.id;
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  const { data: likedCourses } = useLikedCourses();

  useEffect(() => {
    if (likedCourses) {
      const likedCourseIds = likedCourses?.data?.map(
        (likedCourse: any) => likedCourse.attributes.course.data.id
      );
      setIsLiked(likedCourseIds?.includes(courseId));
    }
  }, [likedCourses, courseId]);

  const { mutate: removeFromWishlist } = useMutation({
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
    onError: (err, variables, context: any) => {
      if (userId) {
        queryClient.setQueryData(
          ["likedCourses", userId],
          context.previousLikedCourses
        );
      }
      message.error("Failed to remove from wishlist.");
    },
  });

  const { mutate: addToWishlist } = useMutation({
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
        "likedCourses",
        userId,
      ]);

      queryClient.setQueryData(["likedCourses", userId], (oldData: any) => {
        return [...(oldData?.data || []), { id: courseId, attributes: {} }];
      });

      return { previousLikedCourses };
    },

    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["likedCourses", userId] });
      }
      message.success(`Added to wishlist.`);
    },
    onError: (err, variables, context: any) => {
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
    onError: (err, variables, context: any) => {
      if (userId) {
        queryClient.setQueryData(
          ["recentCourses", userId],
          context.previousLikedCourses
        );
      }
      message.error("Failed to add to recent");
    },
  });

  const handleCourseClick = () => {
    addRecent();
  };

  const handleToggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  return (
    <div className="mr-4 pb-10 sm:pb-0 h-full">
      <div className="border border-gray-400" onClick={handleCourseClick}>
        <div className="rounded-lg flex relative overflow-hidden h-[180px]">
          <Image
            src={imageUrl ? `${api.defaults.baseURL}${imageUrl}` : "/cake.svg"}
            alt={card?.data?.attributes?.alternativeText || "Cake"}
            fill
            className="object-cover object-center p-1"
          />

          <div className="flex items-center absolute justify-between p-2 w-full">
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                handleToggleWishlist();
              }}
            >
              {isLiked ? (
                <AiFillHeart size={30} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={30} className="text-gray-500" />
              )}
            </button>
            <p className="text-black bg-white px-4 py-0 rounded-full">Free</p>
          </div>
        </div>
      </div>

      <div
        className="p-2 bg-[#F3F4F3] cursor-pointer text-black"
        onClick={handleCourseClick}
      >
        <div className="mb-4 sm:h-[30px] h-[50px]">
          <h3 className="font-semibold line-clamp-2 text-ellipsis">
            {coursename || "Course Name"}
          </h3>
        </div>
        <div className="flex items-center mb-4">
          <p>{tutorName}</p>
        </div>
        <div className="flex justify-between mt-3 gap-2 text-[0.8rem]">
          <div className="flex gap-1">
            <StarFilledIcon className="w-4 h-4 text-black" />
            <p>{rating}</p>
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
