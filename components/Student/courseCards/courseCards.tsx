"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; 
import api from "@/lib/axios";
import { message } from "antd";
import { useAuthContext } from "@/Context/AuthContext";
import { addLikedCourse, removeLikedCourse } from "@/hooks/useLikedCourses";
import { ClockIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { addRecentCourse } from "@/hooks/useRecentCourses";

interface ProductCardProps {
  course: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ course }) => {
  const { coursename, card, tutors, duration, rating } = course?.attributes || {};
  const tutorName = tutors?.data[0]?.attributes?.tutorname || "Tutor Name";
  const imageUrl = course?.attributes?.card?.data?.attributes?.url;
  const courseId = course?.id; 
  
  const { user } = useAuthContext(); 
  const userId = user?.id; 
  const [isLiked, setIsLiked] = useState(false); 
 
  useEffect(() => {
    const fetchLikedCourses = async () => {
      try {
        const response = await api.get(`/api/liked-courses?filters[user][id][$eq]=${userId}&populate=*`);
        const likedCourses = response.data?.data?.map(
          (likedCourse: any) => likedCourse.attributes.course.data.id
        );
        
        if (likedCourses?.includes(courseId)) {
          setIsLiked(true);
        }
      } catch (error) {
        message.error("Error fetching liked courses");
      }
    };
  
    fetchLikedCourses();
  }, [userId, courseId]);

  
  const queryClient = useQueryClient(); 

const { mutate: removeFromWishlist } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      const result = await removeLikedCourse(courseId, userId);
      return result;
    },
    onMutate: async () => {
      if (!userId) return;
  
      setIsLiked(false);
  
      await queryClient.cancelQueries(["likedCourses", userId]);
  
      const previousLikedCourses = queryClient.getQueryData(["likedCourses", userId]);
  
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
        queryClient.setQueryData(["likedCourses", userId], context.previousLikedCourses);
      }
      message.error("Failed to remove from wishlist.");
    },
  });
  
  
  const { mutate: addToWishlist } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      const result = await addLikedCourse(courseId, userId);
      return result;
    },
    onMutate: async () => {
      if (!userId) return; 
      
      setIsLiked(true);
      await queryClient.cancelQueries(["likedCourses", userId]); 
  
      const previousLikedCourses = queryClient.getQueryData(["likedCourses", userId]);
  
      queryClient.setQueryData(["likedCourses", userId], (oldData: any) => {
        return [...(oldData?.data || []), { id: courseId, attributes: { /* course data */ }}];
      });
  
      return { previousLikedCourses };
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries(["likedCourses", userId]); 
      }
      message.success(`Added to wishlist.`);
    },
    onError: (err, variables, context: any) => {
      if (userId) {
        queryClient.setQueryData(["likedCourses", userId], context.previousLikedCourses); 
      }
      message.error("Failed to add to wishlist");
    },
  });
  

  const handleToggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };
  
 
 
  return (
    <div className="mr-4 pb-10 sm:pb-0 h-full" >
      <div className="border border-gray-400">
        <div className="rounded-lg flex relative overflow-hidden h-[180px]">
          <Image
            src={imageUrl ? `${api.defaults.baseURL}${imageUrl}` : "/cake.svg"}
            alt={card?.data?.attributes?.alternativeText || "Cake"}
            fill
            className="object-cover object-center p-1"
          />

          <div className="flex items-center absolute justify-between p-2 w-full">
            <button onClick={handleToggleWishlist}>
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
      <div className="p-2 bg-[#F3F4F3] text-black">
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
