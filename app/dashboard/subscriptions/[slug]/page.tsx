"use client";
import React from "react";
import Image from "next/image";
import { useFetchCourses, useFetchTutorSlug } from "@/hooks/useCourses";
import { Course } from "@/lib/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import ProductContainer from "@/components/Student/courseCards/cardContainer";
import { FaFacebook, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { stripHtmlTags } from "@/lib/utility";
const TutorPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const {
    data: tutorData,
    isLoading: tutorLoading,
    error: tutorError,
  } = useFetchTutorSlug(slug);
  const { data, isLoading, error } = useFetchCourses();

  if (tutorLoading) {
    return (
      <div className="ml-5">
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

  if (isLoading) {
    <div>
      <Skeleton
        height={300}
        count={1}
        baseColor="#e0e0e0"
        highlightColor="#f5f5f5"
        enableAnimation={true}
      />
    </div>;
  }
  if (tutorError) {
    message.error("Error fetching tutor  data. Please try again later.");
  }

  if (error) {
    message.error("Error fetch tutor courses. Please try again later.");
  }

  if (!tutorData?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-700">Tutor not found</p>
        <a href="/dashboard" className="text-blue-500 hover:underline mt-4">
          Go back to Dashboard
        </a>
      </div>
    );
  }

  const tutor = tutorData?.data[0]?.attributes;

  const tutorImage =
    tutor?.user?.data?.attributes?.profilepicture?.data?.attributes?.url ||
    "/profilepicture.webp";
  const tutorName = tutor.tutorname;
  const tutorQualifications = tutor.Qualifications;
  const tutorBiography = tutor.Biography;
  const socialLinks = tutor?.user?.data?.attributes?.socialLinks || {};
  const email = socialLinks?.email;
  const twitter = socialLinks?.twitter;
  const linkedin = socialLinks?.linkedin;
  const facebook = socialLinks?.facebook;

  const tutorCourses: Course[] = [];
  data?.data.forEach((course: any) => {
    const courseTutor = course.attributes.tutor?.data?.attributes;

    if (courseTutor?.tutorname === tutorName) {
      tutorCourses.push(course);
    }
  });

  return (
    <div className="sm:p-0">
      <div className="flex mb-5 flex-col sm:w-full w-[345px] rounded-lg sm:px-4 p-2 sm:py-6 border border-black  h-auto relative">
        <div className="flex flex-col sm:flex-row items-start sm:gap-7 gap-3 mt-5">
          <Image
            src={tutorImage}
            alt={tutorName}
            width={150}
            height={150}
            className="flex-shrink-0 rounded-full object-cover"
          />
          <div className="flex flex-col sm:mt-6 mt-3">
            <h1 className="font-semibold text-[20px] mb-3">{tutorName}</h1>
            <h2 className="text-gray-600 sm:mb-3 flex flex-wrap items-center space-x-2">
              {(email || facebook || linkedin || twitter) && (
                <>
                  <span>Connect with {tutorName}:</span>
                  {facebook && (
                    <Link
                      href={`https://facebook.com/${facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="text-xl text-blue-700 hover:text-blue-500 mx-2" />
                    </Link>
                  )}
                  {linkedin && (
                    <Link
                      href={`https://linkedin.com/in/${linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="text-xl text-blue-700 hover:text-blue-500 mx-2" />
                    </Link>
                  )}
                  {twitter && (
                    <Link
                      href={`https://twitter.com/${twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="text-xl text-blue-500 hover:text-blue-400 mx-2" />
                    </Link>
                  )}
                  {email && (
                    <Link
                      href={`mailto:${email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEnvelope className="text-xl text-gray-700 hover:text-blue-500 mx-2" />
                    </Link>
                  )}
                </>
              )}
            </h2>

            <h2 className="mt-3 sm:mt-0">
              <span className="underline">Qualifications:</span>
              <span className="text-gray-600 sm:ml-2">
                {tutorQualifications || "No qualifications available"}
              </span>
            </h2>
          </div>
        </div>
        <div className="mt-5 sm:mt-10">
          <p className="mb-5">{stripHtmlTags(tutorBiography || "No biography available.")}</p>
        </div>
      </div>

      <div className="mt-8">
        {tutorCourses.length > 0 ? (
          <>
            <h1 className="mb-6">Courses by {tutorName}</h1>
            <ProductContainer courses={tutorCourses} />
          </>
        ) : (
          <div className="text-center mt-8 flex items-center justify-center">
            <p className=" text-center flex p-20 ">
              {tutorName} has not published any courses yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorPage;
