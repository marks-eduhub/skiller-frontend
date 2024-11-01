"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useFetchSearchTutors } from "@/hooks/useCourses";
import { Tutor } from "@/lib/types";
import api from "@/lib/axios";

const Tutorspage = () => {
  const { data, isLoading, error } = useFetchSearchTutors();
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

  if (isLoading) return <p>Loading tutors...</p>;
  if (error) return <p>Error loading tutors</p>;

  return (
    <div className="sm:pl-10 py-5 sm:w-full">
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-10 ">
        {tutors.map((tutor: Tutor, index: number) => {
          const relativeUrl = tutor.attributes.profilepicture?.data?.[0]?.attributes?.url;
          const profilePictureUrl = relativeUrl ? `${api.defaults.baseURL}${relativeUrl}` : null;


          return (
            <div
              key={tutor.id}
              className="flex flex-col items-center relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {profilePictureUrl ? (
                <div className="sm:w-[300px] w-[150px] h-[150px] sm:h-[300px] relative">
                  <Image
                    src={profilePictureUrl}
                    alt={tutor.attributes.tutorname}
                    fill
                    className="hover:scale-110 transition duration-300 hover:brightness-75"
                  />
                  {hovered === index && (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`absolute inset-0 m-auto text-4xl cursor-pointer ${
                        favorites[index] ? 'text-red-500' : 'text-white'
                      }`}
                      onClick={() => handleFavoriteClick(index)}
                    />
                  )}
                  <div className="absolute bottom-0 right-0 sm:hidden bg-gray-50 rounded-full p-2">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`text-2xl sm:text-3xl cursor-pointer ${
                        favorites[index] ? 'text-red-500' : 'text-gray-200'
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
                <h1 className="text-gray-600">{tutor.attributes.role || "Tutor"}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tutorspage;
