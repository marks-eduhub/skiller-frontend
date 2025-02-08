"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import data from "./data.json";
import BottomSlider from "./bottom-slider";
import Content from "./content";
import Header from "./header";
import { useAuthContext } from "@/Context/AuthContext";
import { usePostBio } from "@/hooks/usePreference";

interface PreferenceProps {
  errorMessage?: string;
}

const Preference: React.FC<PreferenceProps> = ({ errorMessage }) => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const router = useRouter();
  const images = [data.slider, data.slider1, data.slider2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 2;

  // Store form data
  const [formData, setFormData] = useState({
    selectedCode: "+256",
    phone: "",
    gender: "",
    date_birth: "",
  });

  // ✅ Use mutation hook correctly
  const { mutate: postBio, isLoading, error } = usePostBio();

  // Update form data from child components
  const updateFormData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // ✅ Handle form submission
  const handleSubmit = async () => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    postBio(
      { userId, ...formData },
      {
        onSuccess: () => {
          console.log("Bio submitted successfully!");
          router.push("/splash"); // Redirect after successful submission
        },
        onError: (error: any) => {
          console.error("Error submitting bio:", error);
        },
      }
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleSkip = () => {
    router.push("/splash");
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative flex flex-col justify-center md:grid md:grid-cols-4 md:grid-rows-4 md:gap-2 bg-grey h-screen p-4 overflow-y-auto">
      {/* Header */}
      <Header data2={{ currentIndex }} />

      {/* Content */}
      <Content data2={{ currentIndex }} />

      {/* Bottom Slider */}
      <BottomSlider
        nextSlide={nextSlide}
        skipToSplash={handleSkip}
        data2={{ currentIndex }}
        prevSlide={prevSlide}
        handleSubmit={handleSubmit} // Pass handleSubmit to trigger API call
      />

      {/* Show loading state if needed */}
      {isLoading && <p>Submitting...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default Preference;
