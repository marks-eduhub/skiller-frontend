"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  addTutor,
  updateStudent,
  useFetchUserDetails,
  useFetchTutorDetails,
  updateTutor,
  useFetchTutorId,
  deleteProfilePicture,
} from "@/hooks/useProfile";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { uploadMedia } from "@/hooks/useCourseUpload";
import { useAuthContext } from "@/components/AuthProvider/AuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import queryClient from "@/lib/queryClient";
import QualificationsDropdown from "../../../lib/Qualifications";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

const ProfilePage: React.FC = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const router = useRouter();
  const { data } = useFetchUserDetails(Number(userId));
  const { data: tutorDetails } = useFetchTutorDetails(Number(userId));
  const { data: tutor } = useFetchTutorId(Number(userId));
  const [image, setImage] = useState<File | null>(null);
  const [toggle, setToggle] = useState(false);
  const [Biography, setBiography] = useState("");
  const [role, setRole] = useState("");
  const [Qualifications, setQualifications] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    email: "",
    facebook: "",
    twitter: "",
    linkedin: "",
  });
  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    Biography: "",
    Qualifications: "",
    socialLinks: {
      email: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    profilePictureId: "",
  });

  const tutorId = tutor?.data[0]?.id;

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");

      setSocialLinks({
        email: data.socialLinks?.email || "",
        facebook: data.socialLinks?.facebook || "",
        twitter: data.socialLinks?.twitter || "",
        linkedin: data.socialLinks?.linkedin || "",
      });

      const profilePicUrl = data.profilepicture?.url;

      if (profilePicUrl) {
        setUploadImage(profilePicUrl);
        setIsImageLoading(true);
      } else {
        setUploadImage("/profilepicture.webp");
        setIsImageLoading(false);
      }

      setInitialData((prev) => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        socialLinks: {
          email: data.socialLinks?.email || "",
          facebook: data.socialLinks?.facebook || "",
          twitter: data.socialLinks?.twitter || "",
          linkedin: data.socialLinks?.linkedin || "",
        },
        profilePictureId: data.profilepicture?.id
          ? String(data.profilepicture?.id)
          : "",
      }));
    }
  }, [data]);

  useEffect(() => {
    if (tutorDetails && tutorDetails.data.length > 0) {
      const tutor = tutorDetails.data[0].attributes;

      setBiography(tutor.Biography || "");
      setRole(tutor.role || "");
      setQualifications(tutor.Qualifications || "");
      setToggle(true);

      setInitialData((prev) => ({
        ...prev,
        role: tutor.role || "",
        Biography: tutor.Biography || "",
        Qualifications: tutor.Qualifications || "",
      }));
    } else {
      setToggle(false);
    }
  }, [tutorDetails]);

  const handleSuccess = () => {
    message.success("Profile saved successfully!");
  };

  const handleError = () => {
    message.error("Failed to save changes.");
  };

  const exisitingprofileId = data?.profilepicture?.id || null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsUploading(true);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } else {
      message.error("No profile picture selected.");
    }
  };

  const handleRemoveImage = async () => {
    if (!exisitingprofileId || !userId) {
      message.warning("no image to remove");
    } else {
      try {
        await deleteProfilePicture(userId, String(exisitingprofileId));
        setUploadImage("/profilepicture.webp");
        setImage(null);
        message.success("Profile picture removed successfully.");
      } catch (error) {
        message.error("");
      }
    }
  };

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  const { mutateAsync: postTutorProfile } = useMutation({
    mutationFn: async ({
      userId,
      tutorname,
      role,
      lastName,
      firstName,
      Biography,
      Qualifications,
    }: {
      userId: number;
      tutorname: string;
      role: string;
      lastName: string;
      firstName: string;
      Biography: string;
      Qualifications: string;
    }) => {
      const response = await addTutor(
        userId,
        tutorname,
        role,
        lastName,
        firstName,
        Biography,
        Qualifications
      );

      const tutorId =
        response?.id || response?.data?.id || response?.data?.data?.id || null;

      if (!tutorId) {
        throw new Error("Failed to retrieve tutor ID from the response");
      }

      return tutorId;
    },
    onError: () => {
      message.error("Error creating tutor");
    },
    onSuccess: (tutorId) => {
      message.success("Tutor created successfully");
      queryClient.invalidateQueries({ queryKey: ["profile_tutorId", tutorId] });
    },
  });

  const { mutate: postStudentProfile } = useMutation({
    mutationFn: async ({
      studentname,
      profilepicture,
      lastName,
      firstName,
      userId,
      socialLinks,
    }: {
      studentname: string;
      profilepicture: string;
      lastName: string;
      firstName: string;
      userId: number | null;
      socialLinks: {
        email: string;
        facebook: string;
        twitter: string;
        linkedin: string;
      };
    }) => {
      return await updateStudent(
        studentname,
        profilepicture,
        lastName,
        firstName,
        userId,
        socialLinks
      );
    },
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { mutate: updateTutorProfile } = useMutation({
    mutationFn: async ({
      tutorId,
      tutorname,
      role,
      lastName,
      firstName,
      Biography,
      Qualifications,
    }: {
      tutorId: number;
      tutorname: string;
      role: string;
      lastName: string;
      firstName: string;
      Biography: string;
      Qualifications: string;
    }) => {
      return await updateTutor(
        tutorId,
        tutorname,
        role,
        lastName,
        firstName,
        Biography,
        Qualifications
      );
    },

    onSuccess: () => {
      message.success("Tutor details updated successfully");
    },

    onError: () => {
      message.error("Error updating tutor");
    },
  });

  const hasChanges = () => {
    return (
      firstName !== initialData.firstName ||
      lastName !== initialData.lastName ||
      role !== initialData.role ||
      Biography !== initialData.Biography ||
      Qualifications !== initialData.Qualifications ||
      socialLinks.email !== initialData.socialLinks.email ||
      socialLinks.facebook !== initialData.socialLinks.facebook ||
      socialLinks.twitter !== initialData.socialLinks.twitter ||
      socialLinks.linkedin !== initialData.socialLinks.linkedin ||
      image !== null
    );
  };

  const handleSaveChanges = async () => {
    const updatedSocialLinks = {
      email: socialLinks.email,
      facebook: socialLinks.facebook,
      twitter: socialLinks.twitter,
      linkedin: socialLinks.linkedin,
    };

    if (!userId) {
      message.error("Cannot update user details.");
      return;
    }

    if (!hasChanges()) {
      message.warning("No changes detected.");
      return;
    }

    let profilePictureId = null;

    if (image) {
      if (exisitingprofileId) {
        await deleteProfilePicture(userId, String(exisitingprofileId));
      }
      try {
        profilePictureId = await uploadMedia(image);
      } catch (error) {
        message.error("Error uploading image");
        return;
      }
    } else {
      profilePictureId = exisitingprofileId ? String(exisitingprofileId) : null;
    }
    setIsSaving(true);

    try {
      if (toggle) {
        if (tutorId) {
          await new Promise<void>((resolve, reject) => {
            updateTutorProfile(
              {
                tutorId,
                tutorname: `${firstName} ${lastName}`,
                role,
                lastName,
                firstName,
                Biography,
                Qualifications,
              },
              {
                onSuccess: () => resolve(),
                onError: reject,
                onSettled: () => setIsSaving(false),
              }
            );
          });

          await new Promise<void>((resolve, reject) => {
            postStudentProfile(
              {
                studentname: `${firstName} ${lastName}`,
                profilepicture: profilePictureId,
                lastName,
                firstName,
                userId,
                socialLinks: updatedSocialLinks,
              },
              {
                onSuccess: () => resolve(),
                onError: reject,
                onSettled: () => setIsSaving(false),
              }
            );
          });
        } else {
          await new Promise<void>((resolve, reject) => {
            postTutorProfile(
              {
                userId,
                tutorname: `${firstName} ${lastName}`,
                role,
                lastName,
                firstName,
                Biography,
                Qualifications,
              },
              {
                onSuccess: () => resolve(),
                onError: reject,
                onSettled: () => setIsSaving(false),
              }
            );
          });

          await new Promise<void>((resolve, reject) => {
            postStudentProfile(
              {
                studentname: `${firstName} ${lastName}`,
                profilepicture: profilePictureId,
                lastName,
                firstName,
                userId,
                socialLinks: updatedSocialLinks,
              },
              {
                onSuccess: () => resolve(),
                onError: reject,
                onSettled: () => setIsSaving(false),
              }
            );
          });
        }
      } else {
        postStudentProfile(
          {
            studentname: `${firstName} ${lastName}`,
            profilepicture: profilePictureId,
            lastName,
            firstName,
            userId,
            socialLinks: updatedSocialLinks,
          },
          {
            onSettled: () => setIsSaving(false),
          }
        );
      }
    } catch (error) {
      message.error("Failed to save profile data. Please try again.");
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-md:p-0 max-md:pr-4 sm:pl-10 items-center sm:w-1/2">
      <div className="flex sm:gap-10 gap-6 sm:mt-4 mt-0">
        <IoMdArrowRoundBack
          className="text-[30px] sm:mt-2 mt-2 cursor-pointer"
          onClick={handleBack}
        />
        <h2 className="font-bold text-[30px] mb-3 max-md:mt-0 ">Profile</h2>
      </div>
      <p>
        Add your personal details as you would like them to appear on your
        profile
      </p>

      <div className="h-[200px] border border-gray-200 rounded-lg mb-5 mt-5 items-center">
        <div className="flex items-center justify-center my-3">
          {isImageLoading && !uploadImage ? (
            <DotPulseWrapper size="30" speed="1.5" color="black" />
          ) : (
            <div className="w-32 h-32 overflow-hidden rounded-full">
              <Image
                src={uploadImage || "/profilepicture.webp"}
                alt="userimage"
                width={120}
                height={120}
                className="w-full h-full object-cover rounded-full"
                onLoad={() => {
                  setIsImageLoading(false);
                }}
                onError={() => {
                  setIsImageLoading(false);
                  setUploadImage("/profilepicture.webp");
                }}
              />
            </div>
          )}

          <div className="flex flex-col gap-5 ml-9">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              className="hidden"
              onChange={handleImageChange}
            />

            <label
              htmlFor="file-upload"
              className="bg-black text-white rounded-md px-4 py-1 cursor-pointer text-center flex items-center justify-center"
            >
              {isUploading ? (
                <DotPulseWrapper
                  type="ring"
                  size="30"
                  speed="1.75"
                  color="white"
                />
              ) : null}
              {isUploading ? "Uploading..." : "Upload Photo"}
            </label>

            <button
              onClick={handleRemoveImage}
              className="bg-white text-black border border-black rounded-md px-4 py-1"
              disabled={isUploading}
            >
              Remove Photo
            </button>
          </div>
        </div>

        <p className="ml-4 italic mt-2 text-[14px]">
          Maximum size: 1MB. Supported formats: JPG, GIF or PNG
        </p>
      </div>

      <div className="items-center justify-center">
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="flex-1">
              <label
                htmlFor="first-name"
                className="w-[100px] text-sm font-medium"
              >
                First Name
              </label>

              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="Enter your first name"
                required
                className="mt-1 w-[300px] rounded-lg block px-3 py-2 border border-gray-200 mb-6 bg-inherit"
                style={{ outline: "none", borderColor: "black" }}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="last-name"
                className="text-sm w-[100px] font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Enter your last name"
                required
                className="mt-1 w-[300px] block rounded-lg px-3 py-2 border border-gray-200 mb-6 bg-inherit"
                style={{ outline: "none", borderColor: "black" }}
              />
            </div>
          </div>
        </form>

        <div className="flex items-center my-5">
          <label htmlFor="toggle-switch" className="mr-3 text-sm font-medium">
            Click the toggle if you want a tutor profile
          </label>
          <div
            onClick={handleToggleChange}
            className={`relative w-12 h-4 bg-gray-300 rounded-full cursor-pointer ${
              toggle ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute w-6 h-4 bg-white rounded-full shadow transform transition ${
                toggle ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        {toggle && (
          <div className="flex flex-col">
            <div className="sm:mb-10 mt-4 ">
              <div className="flex items-center  w-full mb-5">
                <label className="block text-sm mb-1 mr-16">Tutor title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="border border-black sm:w-[250px] rounded-lg bg-[#F9F9F9] px-3 py-2 outline-none"
                />
              </div>

              <QualificationsDropdown
                value={Qualifications}
                onChange={setQualifications}
                label="Tutor qualifications"
                required
                className="w-2/3"
              />

              <label className="block text-sm mt-8 mb-3 font-semibold ">
                Enter your biography
              </label>

              <div>
                <ReactQuill
                  placeholder="Write content here"
                  value={Biography}
                  onChange={setBiography}
                  theme="snow"
                  className="bg-white h-[200px] mb-5"
                />
              </div>

              {/* <div className="mt-20 ">
                <span>
                  This screenshot shows how you can switch between your student
                  and tutor profile
                </span>
                <Image
                  src="/tutorprofile.png"
                  alt="Tutor Profile Screenshot"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div> */}
            </div>
          </div>
        )}
        <div className="mb-4  mt-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={socialLinks.email}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, email: e.target.value })
              }
              className="rounded-lg px-3 py-2 border border-gray-300 w-full"
              style={{ outline: "none", borderColor: "black" }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Facebook</label>
            <input
              type="text"
              value={socialLinks.facebook}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, facebook: e.target.value })
              }
              className="rounded-lg px-3 py-2 border border-gray-300 w-full"
              style={{ outline: "none", borderColor: "black" }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Twitter</label>
            <input
              type="text"
              value={socialLinks.twitter}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, twitter: e.target.value })
              }
              className="rounded-lg px-3 py-2 border border-gray-300 w-full"
              style={{ outline: "none", borderColor: "black" }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">LinkedIn</label>
            <input
              type="text"
              value={socialLinks.linkedin}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, linkedin: e.target.value })
              }
              className="rounded-lg px-3 py-2 border border-gray-300 w-full"
              style={{ outline: "none", borderColor: "black" }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveChanges}
          disabled={isSaving}
          className={`mt-5 bg-black text-white py-2 px-6 rounded-md transition-opacity ${
            isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          {isSaving ? (
            <DotPulseWrapper
              type="tailChase"
              size="25"
              speed="1.75"
              color="white"
            />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
