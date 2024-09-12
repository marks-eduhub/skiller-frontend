"use client"
import React, { useState } from "react";
import alltutors from "./data.json";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface Tutorspage {
  image: string | undefined;
  title: string;
  name: string;
}

const Tutorspage = () => {
  const [favorites, setFavorites] = useState<boolean[]>(new Array(alltutors.length).fill(false));
  const [hovered, setHovered] = useState<number | null>(null);

  const handleFavoriteClick = (index: number) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  return (
    <div className="pl-10 py-5 sm:w-full">
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-10">
        {alltutors.map((tutor, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {tutor.image ? (
              <div className="w-[300px] h-[300px] relative">
                <Image src={tutor.image} alt={tutor.name} fill className="hover:scale-110 transition duration-300 hover:brightness-75" />
                {hovered === index && (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`absolute inset-0 m-auto text-4xl cursor-pointer ${favorites[index] ? 'text-red-500' : 'text-white'}`}
                    onClick={() => handleFavoriteClick(index)}
                  />
                )}
              </div>
            ) : (
              <p>No Image</p>
            )}
            <div className="mt-3 text-center">
              <h1>{tutor.name}</h1>
              <h1 className="text-gray-600">{tutor.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorspage;
