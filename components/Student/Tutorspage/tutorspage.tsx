"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {useFetchTutorsPopulate } from "@/hooks/useCourses";
import Skeleton from "react-loading-skeleton";
import { message } from "antd";
import "react-loading-skeleton/dist/skeleton.css";
import { shouldBypassImageOptimization } from "@/lib/media";


const Tutorspage = () => {
  const {data, isLoading, error} = useFetchTutorsPopulate()
  const tutors = useMemo(() => data?.data || [], [data]);
  const [favorites, setFavorites] = useState<boolean[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
 
  useEffect(() => {
    if (tutors.length > 0) {
      setFavorites(new Array(tutors.length).fill(false));
    }
  }, [tutors]);

  const handleFavoriteClick = (index: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  if (isLoading) {
    return (
      <div className="ml-5">
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

  if (error) {
    message.error("Error fetching tutors. Please try again later.");
  }

  return (
    <div className="sm:pl-10 py-5 sm:w-full">
      {tutors.length === 0 ? (
        <div className="mt-10 flex min-h-[50vh] items-center justify-center">
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center">
            <p className="text-xl font-semibold text-slate-900">
              No tutors available right now.
            </p>
            <p className="mt-3 max-w-md text-sm text-slate-600">
              Tutor profiles will appear here as instructors complete their
              setup and publish their teaching presence.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {tutors?.map((tutor: any, index: number) => {
           const relativeUrl = tutor?.attributes?.user?.data?.attributes?.profilepicture?.data?.attributes?.url || "/profilepicture.webp"

             
          return (
            <div
              key={tutor.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {relativeUrl ? (
                <div className="relative h-[124px] w-[124px] sm:h-[148px] sm:w-[148px] lg:h-[164px] lg:w-[164px]">
                  <Image
                    src={relativeUrl}
                    alt={tutor.attributes.tutorname}
                    fill
                    unoptimized={shouldBypassImageOptimization(relativeUrl)}
                    className="rounded-full object-cover transition duration-300 hover:scale-105 hover:brightness-90"
                  />
                  {hovered === index && (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`absolute inset-0 m-auto text-3xl cursor-pointer ${
                        favorites[index] ? "text-red-500" : "text-white"
                      }`}
                      onClick={() => handleFavoriteClick(index)}
                    />
                  )}
                  <div className="absolute bottom-0 right-0 sm:hidden bg-gray-50 rounded-full p-2">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`text-2xl sm:text-3xl cursor-pointer ${
                        favorites[index] ? "text-red-500" : "text-gray-200"
                      }`}
                      onClick={() => handleFavoriteClick(index)}
                    />
                  </div>
                </div>
              ) : (
                <p>No Image</p>
              )}
              <div className="mt-3 text-center">
                <h1 className="text-sm font-medium text-slate-950 sm:text-[15px]">
                  {tutor.attributes.tutorname}
                </h1>
                <h1 className="mt-1 text-xs text-gray-600 sm:text-sm">
                  {tutor.attributes.role || "Tutor"}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Tutorspage;
