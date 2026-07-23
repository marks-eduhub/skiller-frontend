"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {useFetchTutorsPopulate } from "@/hooks/useCourses";
import Skeleton from "react-loading-skeleton";
import { message } from "antd";
import "react-loading-skeleton/dist/skeleton.css";


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
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-10 ">
          {tutors?.map((tutor: any, index: number) => {
           const relativeUrl = tutor?.attributes?.user?.data?.attributes?.profilepicture?.data?.attributes?.url || "/profilepicture.webp"

             
          return (
            <div
              key={tutor.id}
              className="flex flex-col items-center relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {relativeUrl ? (
                <div className="sm:w-[200px] w-[150px] h-[150px] sm:h-[200px] relative">
                  <Image
                    src={relativeUrl}
                    alt={tutor.attributes.tutorname}
                    fill
                    className="hover:scale-110 rounded-full object-cover transition duration-300 hover:brightness-75"
                  />
                  {hovered === index && (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`absolute inset-0 m-auto text-4xl cursor-pointer ${
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
                <h1>{tutor.attributes.tutorname}</h1>
                <h1 className="text-gray-600">
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
