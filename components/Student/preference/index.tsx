"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import data from "./data.json";
import BottomSlider from "./bottom-slider";
import Content from "./content";
import Header from "./header";
import { useAuthContext } from "@/Context/AuthContext";
import { postPreferences, postBio } from "@/hooks/usePreference";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
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
    phone: "",
    gender: "",
    date_birth: "",
  });

  const [prefData, setPrefData] = useState({});

  // Update form data from child components
  const updateFormData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      preferences,
    }: {
      userId: number;
      preferences: Record<string, any>;
    }) => {
      return postPreferences(userId, preferences);
    },
  });
  const mutationBio = useMutation({
    mutationFn: async ({
      userId,
      date_birth,
      gender,
      phone,
    }: {
      userId: number;
      date_birth: string;
      gender: string;
      phone: string;
    }) => {
      return postBio(userId, date_birth, gender, phone);
    },
  });

  const updatePreferences = (preference: any) => {
    setPrefData({ preference });
  };

  const handleSubmitBio = async () => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }
    try {
      mutationBio.mutate(
        { userId, ...formData },
        {
          onSuccess: () => {
            message.success("Bio submitted successfully!");
            console.log("Bio submitted successfully!");
          },
          onError: (error: any) => {
            message.error("Error submitting bio:", error);
            console.error("Error submitting bio:", error);
          },
        }
      );
    } catch (e) {
      console.error("Error submitting bio:", e);
      message.error("Error submitting bio");
    }
  };

  const handleSubmitPreferences = async () => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }
    try {
      mutation.mutate(
        { userId, preferences: prefData },
        {
          onSuccess: () => {
            message.success("Preferences submitted successfully!");
            console.log("Preference submitted successfully!");
            router.push("/splash"); // Redirect after successful submission
          },
          onError: (error: any) => {
            message.error("Error submitting preferences:", error);
            console.error("Error submitting preferences:", error);
          },
        }
      );
    } catch (e) {
      console.error("Error submitting preferences:", e);
      message.error("Error submitting preferences");
    }
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
      <Content
        data2={{ currentIndex }}
        updateForm={updateFormData}
        updatePreferences={updatePreferences}
      />

      {/* Bottom Slider */}
      <BottomSlider
        nextSlide={nextSlide}
        skipToSplash={handleSkip}
        data2={{ currentIndex }}
        prevSlide={prevSlide}
        handleSubmitBio={handleSubmitBio}
        handleSubmitPreferences={handleSubmitPreferences}
        formData={formData}
        prefData={prefData}
        // Pass handleSubmit to trigger API call
      />

      {/* Show loading state if needed */}
      {/* {isLoading && <p>Submitting...</p>} */}
      {/* {error && <p className="text-red-500">Error: {error.message}</p>} */}
    </div>
  );
};

export default Preference;
