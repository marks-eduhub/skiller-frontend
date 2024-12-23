"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import SimilarCourses from "../details/similar";
import Image from "next/image";
import api from "@/lib/axios";
import { useFetchOverview, useFetchReviews } from "@/hooks/useCourseOverview";
import CourseOverview from "./courseOverview";
import CourseReview from "./courseReviews";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";

const Enroll = () => {
  const router = useRouter();
  const[isEnroll, setIsEnroll] = useState(false)
  const [tab, setTab] = useState("Course Overview");
  const { slug } = useParams();
  const { data, isLoading, error } = useFetchOverview(Number(slug));
  const { data: reviews, isLoading: loadingreviews, error: reviewError} = useFetchReviews(Number(slug));
  if (!slug) {
    return <div>Course ID is missing</div>;
  }
  if (isLoading || loadingreviews) {
    return (
      <div>
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
    message.error("Error fetching details. Please try again later.");
  }

  if (!data)
    return (
      <div className="flex items-center justify-center font-semibold text-[17px] p-7">
        Course details not available!
      </div>
    );

  const courseAttributes = data?.data?.attributes || {};
  const reviewData = reviews?.data?.attributes?.reviews?.data || [];

  const coursename = courseAttributes.coursename || "UI";
  const card = courseAttributes.card?.data?.attributes?.url || "";
  const tutorName = courseAttributes.tutor?.data?.attributes?.tutorname || "DS";
  const duration = courseAttributes.duration || "2 hours and 40 minutes";
  const introduction = courseAttributes?.coursedescription || "No introduction available";
  const requirements = courseAttributes?.requirements|| "No requirements available";
  const expectations = courseAttributes?.expectations || "No expectations available";
  const enrolled = courseAttributes.users?.data || [];
  const studentsenrolled = enrolled.length;
  const topics = courseAttributes?.topicname?.data || [];

  const firstTopicId = topics.length > 0 ? topics[0]?.id : null;

  const Reviews = reviewData.map((review: any) => {
  const imageUrl = review.attributes.profilepicture?.data?.attributes?.url;

    return {
      name: review.attributes.name,
      image: imageUrl
        ? `${api.defaults.baseURL}${imageUrl}`
        : "/default-image.jpg",
      comment: review.attributes.comment,
      rating: review.attributes.rating,
    };
  });

  const handleTab = (tabName: string) => setTab(tabName);

  const handleEnrollClick = () => {
    if (firstTopicId) {
      setIsEnroll(true);
      router.push(`/dashboard/overview/${slug}/topics?topicId=${firstTopicId}`);
    }
  };

  return (
    <div>
      <div className="w-full relative sm:h-[500px] h-[300px]">
        <Image
          src={card ? `${api.defaults.baseURL}${card}` : "/cake.svg"}
          alt="Course Image"
          fill
          className="object-cover bg-no-repeat rounded-2xl"
        />
        <div className="absolute inset-0 video-overlay rounded-lg"></div>
        <div className="flex justify-between w-full absolute inset-0 mb-5 z-50">
          <div className="flex flex-col text-white p-4 gap-2 self-end">
            <h1 className="font-bold text-[20px]">{coursename}</h1>
            <p className="font-semibold sm:mt-0">By {tutorName}</p>
          </div>
          <div className="p-4 self-end ">
          <button className="rounded-md max-md:hidden sm:px-7 py-2 bg-white text-black" onClick={handleEnrollClick}>
          {isEnroll ? "Please wait..." : "Enroll today!"}
          </button>
        </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 mb-3">
        <h1 className="font-semibold text-[18px] sm:mb-0 mb-2">
          Cost : <span className="font-bold text-[18px]">FREE</span>
        </h1>
        <h1 className="font-semibold text-[18px] sm:mb-0 mb-2">
          Duration :
          <span className="font-bold text-[18px] ml-1">{duration}</span>
        </h1>
        <h1 className="font-semibold text-[18px] sm:mb-0 mb-2">
          Students enrolled :{" "}
          <span className="font-bold text-[18px]">{studentsenrolled}</span>
        </h1>
        <div className="bg-black rounded-md w-full mt-4 flex items-center justify-center sm:hidden ">
          <button className="text-white px-6 py-2" onClick={handleEnrollClick}>
          {isEnroll ? "Please wait..." : "Enroll today!"}
          </button>
        </div>
      </div>
      <div className="flex w-full justify-around items-center mt-10 ">
        <div
          className={`cursor-pointer flex sm:w-1/4 h-full ${
            tab === "Course Overview"
              ? "text-black transition-all duration-300 ease-in-out border-b-2 border-black"
              : "text-gray-500"
          } `}
          onClick={() => handleTab("Course Overview")}
        >
          <h1 className="font-semibold sm:text-[20px] text-[17px] sm:ml-20">
            Course Overview
          </h1>
        </div>

        <div
          className={`cursor-pointer items-center justify-center flex sm:w-1/4 ${
            tab === "Course Reviews"
              ? "text-black transition-all duration-300 ease-in-out border-b-2 border-black"
              : "text-gray-500"
          } `}
          onClick={() => handleTab("Course Reviews")}
        >
          <h1 className="font-semibold sm:text-[20px] text-[17px]">
            Course Reviews
          </h1>
        </div>
      </div>
      {tab === "Course Overview" ? (
        <CourseOverview
          introduction={introduction}
          requirements={requirements}
          expectations={expectations}
          topics={topics}
        />
      ) : (
        <CourseReview reviews={Reviews} />
      )}

      <SimilarCourses/>
    </div>
  );
};

export default Enroll;
