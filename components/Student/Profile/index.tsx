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
import { useRouter, useSearchParams } from "next/navigation";
import queryClient from "@/lib/queryClient";
import QualificationsDropdown from "../../../lib/Qualifications";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const DotPulseWrapper = dynamic(() => import("@/hooks/pulse"), { ssr: false });

const ProfilePage: React.FC = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const shouldSetupTutor = searchParams.get("setupTutor") === "yes";
  const loginMethod =
    user?.provider && user.provider !== "local" ? "Google" : "Email";
  const socialIconLinks = [
    {
      key: "email",
      href: socialLinks.email ? `mailto:${socialLinks.email}` : "",
      icon: FaEnvelope,
      label: "Email",
    },
    {
      key: "facebook",
      href: socialLinks.facebook || "",
      icon: FaFacebookF,
      label: "Facebook",
    },
    {
      key: "twitter",
      href: socialLinks.twitter || "",
      icon: FaXTwitter,
      label: "X",
    },
    {
      key: "linkedin",
      href: socialLinks.linkedin || "",
      icon: FaLinkedinIn,
      label: "LinkedIn",
    },
  ];

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

      const profilePicUrl =
        data.profilepicture?.formats?.thumbnail?.url ||
        data.profilepicture?.formats?.small?.url ||
        data.profilepicture?.url;

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

  useEffect(() => {
    if (shouldSetupTutor && !tutorDetails?.data?.length) {
      setToggle(true);
    }
  }, [shouldSetupTutor, tutorDetails]);

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
      profilepicture: number | null;
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
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["user_details", variables.userId],
      });
      handleSuccess();
    },
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
      tutorId: string;
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

    let profilePictureId: number | null = null;

    if (image) {
      try {
        profilePictureId = await uploadMedia(image);
      } catch (error) {
        message.error("Error uploading image");
        return;
      }
    } else {
      profilePictureId = exisitingprofileId ? Number(exisitingprofileId) : null;
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
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start gap-4 sm:items-center sm:gap-6">
        <IoMdArrowRoundBack
          className="mt-1 cursor-pointer text-[28px] sm:mt-0 sm:text-[30px]"
          onClick={handleBack}
        />
        <div>
          <h2 className="text-[30px] font-bold leading-tight text-slate-950 sm:text-[34px]">
            Profile
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Add your personal details as you would like them to appear across your student and tutor profile.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
          <div className="rounded-[24px] bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-5">
            <div className="flex flex-col items-center text-center">
              {isImageLoading && !uploadImage ? (
                <DotPulseWrapper size="30" speed="1.5" color="black" />
              ) : (
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <Image
                    src={uploadImage || "/profilepicture.webp"}
                    alt="userimage"
                    width={120}
                    height={120}
                    className="h-full w-full rounded-full object-cover"
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

              <h3 className="mt-4 text-xl font-semibold text-slate-950">
                {firstName || lastName
                  ? `${firstName} ${lastName}`.trim()
                  : "Your profile"}
              </h3>
              {toggle && (
                <span className="mt-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  Tutor Profile
                </span>
              )}
              <p className="mt-2 text-sm text-slate-600">
                Upload a clean profile image and keep your public details up to date.
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Login Method:{" "}
                <span className="font-medium text-slate-800">{loginMethod}</span>
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {socialIconLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = Boolean(item.href);

                  if (isActive) {
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        target={item.key === "email" ? undefined : "_blank"}
                        rel={item.key === "email" ? undefined : "noreferrer"}
                        aria-label={item.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  }

                  return (
                    <div
                      key={item.key}
                      aria-label={`${item.label} unavailable`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-400"
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                className="hidden"
                onChange={handleImageChange}
              />

              <label
                htmlFor="file-upload"
                className="flex cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-center text-sm font-medium text-white"
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
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900"
                disabled={isUploading}
              >
                Remove Photo
              </button>
            </div>

            <p className="mt-4 text-center text-xs italic text-slate-500 lg:text-left">
              Maximum size: 1MB. Supported formats: JPG, GIF or PNG
            </p>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="text-sm font-medium text-slate-700">
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
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
                style={{ outline: "none" }}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="text-sm font-medium text-slate-700">
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
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
                style={{ outline: "none" }}
              />
            </div>
          </div>

        <div className="my-6 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
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
            <div className="mt-4 sm:mb-10">
              <div className="mb-5 flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                <label className="block text-sm font-medium text-slate-700 sm:min-w-[120px]">
                  Tutor title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 outline-none sm:max-w-[320px]"
                />
              </div>

              <QualificationsDropdown
                value={Qualifications}
                onChange={setQualifications}
                label="Tutor qualifications"
                required
                className="w-2/3"
              />

                <label className="mb-3 mt-8 block text-sm font-semibold text-slate-800">
                  Enter your biography
                </label>

                <div>
                  <ReactQuill
                  placeholder="Write content here"
                  value={Biography}
                  onChange={setBiography}
                  theme="snow"
                    className="mb-5 h-[200px] bg-white"
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
        <div className="mb-4 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={socialLinks.email}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, email: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 px-3 py-3"
              style={{ outline: "none" }}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Facebook</label>
            <input
              type="text"
              value={socialLinks.facebook}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, facebook: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 px-3 py-3"
              style={{ outline: "none" }}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Twitter</label>
            <input
              type="text"
              value={socialLinks.twitter}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, twitter: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 px-3 py-3"
              style={{ outline: "none" }}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">LinkedIn</label>
            <input
              type="text"
              value={socialLinks.linkedin}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, linkedin: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 px-3 py-3"
              style={{ outline: "none" }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveChanges}
          disabled={isSaving}
          className={`mt-6 rounded-xl bg-black px-6 py-3 text-white transition-opacity ${
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
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
