"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { useFetchTutorProfile } from "@/hooks/useTutorProfile";
import {
  addLikedTutor,
  removeLikedTutor,
  useLikedTutors,
} from "@/hooks/useLikedTutors";
import { shouldBypassImageOptimization } from "@/lib/media";
import { stripHtmlTags } from "@/lib/utility";
import ProductContainer from "../courseCards/cardContainer";

const TutorProfile = () => {
  const { tutorId } = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(false);

  const { data, isLoading, error } = useFetchTutorProfile(String(tutorId));
  const { data: likedTutors } = useLikedTutors();

  const tutor = data?.data;
  const tutorAttributes = tutor?.attributes;
  const tutorNumericId = tutor?.id;
  const profilePicture =
    tutorAttributes?.user?.data?.attributes?.profilepicture?.data?.attributes
      ?.url || "/profilepicture.webp";
  const courses = tutorAttributes?.courses?.data || [];

  useEffect(() => {
    if (likedTutors) {
      const likedTutorIds = likedTutors?.data
        ?.map((likedTutor: any) => likedTutor?.attributes?.tutor?.data?.id)
        .filter(Boolean);
      setIsLiked(likedTutorIds?.includes(tutorNumericId));
    }
  }, [likedTutors, tutorNumericId]);

  const { mutate: removeFromLiked } = useMutation({
    mutationFn: async () => {
      if (!userId || !tutorNumericId) throw new Error("Unable to unlike tutor");
      return await removeLikedTutor(tutorNumericId, userId);
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
            likedTutor?.attributes?.tutor?.data?.id !== tutorNumericId
        ),
      }));
      return { previousLikedTutors };
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["likedTutors", userId] });
      }
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
      if (!userId || !tutorNumericId) throw new Error("Unable to like tutor");
      return await addLikedTutor(tutorNumericId, userId);
    },
    onMutate: async () => {
      if (!userId) return;
      setIsLiked(true);
      await queryClient.cancelQueries({ queryKey: ["likedTutors", userId] });
      const previousLikedTutors = queryClient.getQueryData(["likedTutors", userId]);
      return { previousLikedTutors };
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["likedTutors", userId] });
      }
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

  const handleToggleLike = () => {
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

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <Skeleton width={200} height={24} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
        <div className="mt-6">
          <Skeleton height={200} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
        </div>
      </div>
    );
  }

  if (error || !tutorAttributes) {
    return (
      <div className="p-6 text-center text-slate-600">
        Tutor profile not found.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6">
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        <IoMdArrowRoundBack className="h-5 w-5" />
        Back
      </button>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg sm:h-32 sm:w-32">
            <Image
              src={profilePicture}
              alt={tutorAttributes?.tutorname || "Tutor"}
              fill
              unoptimized={shouldBypassImageOptimization(profilePicture)}
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-slate-950 sm:text-2xl">
                  {tutorAttributes?.tutorname}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  {tutorAttributes?.role || "Tutor"}
                </p>
              </div>

              <button
                onClick={handleToggleLike}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {isLiked ? (
                  <AiFillHeart size={18} className="text-red-500" />
                ) : (
                  <AiOutlineHeart size={18} className="text-gray-500" />
                )}
                {isLiked ? "Liked" : "Like"}
              </button>
            </div>

            {tutorAttributes?.Qualifications && (
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-medium text-slate-800">Qualifications: </span>
                {tutorAttributes.Qualifications}
              </p>
            )}
          </div>
        </div>

        {tutorAttributes?.Biography && (
          <div className="mt-6 border-t border-slate-100 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              About
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              {stripHtmlTags(tutorAttributes.Biography)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-slate-950">Courses by this tutor</h2>
        {courses.length > 0 ? (
          <ProductContainer courses={courses} />
        ) : (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/80 px-6 py-10 text-center">
            <p className="text-sm text-slate-600">
              This tutor hasn&apos;t published any courses yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;
