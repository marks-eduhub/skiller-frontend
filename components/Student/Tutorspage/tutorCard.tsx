"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { shouldBypassImageOptimization } from "@/lib/media";
import {
  addLikedTutor,
  removeLikedTutor,
  useLikedTutors,
} from "@/hooks/useLikedTutors";

interface TutorCardProps {
  tutor: any;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const [hovered, setHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const tutorId = tutor?.id;
  const tutorDocumentId = tutor?.attributes?.documentId;
  const relativeUrl =
    tutor?.attributes?.user?.data?.attributes?.profilepicture?.data
      ?.attributes?.url || "/profilepicture.webp";

  const { data: likedTutors } = useLikedTutors();

  useEffect(() => {
    if (likedTutors) {
      const likedTutorIds = likedTutors?.data
        ?.map((likedTutor: any) => likedTutor?.attributes?.tutor?.data?.id)
        .filter(Boolean);
      setIsLiked(likedTutorIds?.includes(tutorId));
    }
  }, [likedTutors, tutorId]);

  const { mutate: removeFromLiked } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      return await removeLikedTutor(tutorId, userId);
    },
    onMutate: async () => {
      if (!userId) return;
      setIsLiked(false);
      await queryClient.cancelQueries({ queryKey: ["likedTutors", userId] });
      const previousLikedTutors = queryClient.getQueryData(["likedTutors", userId]);
      queryClient.setQueryData(["likedTutors", userId], (oldData: any) => ({
        ...oldData,
        data: oldData?.data?.filter(
          (likedTutor: any) =>
            likedTutor?.attributes?.tutor?.data?.id !== tutorId
        ),
      }));
      return { previousLikedTutors };
    },
    onSuccess: () => {
      if (userId) queryClient.invalidateQueries({ queryKey: ["likedTutors", userId] });
      message.success("Removed from favorites.");
    },
    onError: (_err, _vars, context: any) => {
      setIsLiked(true);
      if (userId) {
        queryClient.setQueryData(["likedTutors", userId], context?.previousLikedTutors);
      }
      message.error("Failed to remove from favorites.");
    },
  });

  const { mutate: addToLiked } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      return await addLikedTutor(tutorId, userId);
    },
    onMutate: async () => {
      if (!userId) return;
      setIsLiked(true);
      await queryClient.cancelQueries({ queryKey: ["likedTutors", userId] });
      const previousLikedTutors = queryClient.getQueryData(["likedTutors", userId]);
      return { previousLikedTutors };
    },
    onSuccess: () => {
      if (userId) queryClient.invalidateQueries({ queryKey: ["likedTutors", userId] });
      message.success("Added to favorites.");
    },
    onError: (_err, _vars, context: any) => {
      setIsLiked(false);
      if (userId) {
        queryClient.setQueryData(["likedTutors", userId], context?.previousLikedTutors);
      }
      message.error("Failed to add to favorites.");
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      message.error("Please log in to like a tutor.");
      return;
    }

    if (isLiked) {
      removeFromLiked();
    } else {
      addToLiked();
    }
  };

  return (
    <Link
      href={`/dashboard/tutorspage/${tutorDocumentId}`}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[124px] w-[124px] sm:h-[148px] sm:w-[148px] lg:h-[164px] lg:w-[164px]">
        <Image
          src={relativeUrl}
          alt={tutor.attributes.tutorname}
          fill
          unoptimized={shouldBypassImageOptimization(relativeUrl)}
          className="rounded-full object-cover transition duration-300 hover:scale-105 hover:brightness-90"
        />
        {hovered && (
          <FontAwesomeIcon
            icon={faHeart}
            className={`absolute inset-0 m-auto text-3xl cursor-pointer ${
              isLiked ? "text-red-500" : "text-white"
            }`}
            onClick={handleFavoriteClick}
          />
        )}
        <div className="absolute bottom-0 right-0 sm:hidden bg-gray-50 rounded-full p-2">
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-2xl sm:text-3xl cursor-pointer ${
              isLiked ? "text-red-500" : "text-gray-200"
            }`}
            onClick={handleFavoriteClick}
          />
        </div>
      </div>
      <div className="mt-3 text-center">
        <h1 className="text-sm font-medium text-slate-950 sm:text-[15px]">
          {tutor.attributes.tutorname}
        </h1>
        <h1 className="mt-1 text-xs text-gray-600 sm:text-sm">
          {tutor.attributes.role || "Tutor"}
        </h1>
      </div>
    </Link>
  );
};

export default TutorCard;
