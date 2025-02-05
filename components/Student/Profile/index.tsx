"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  addTutor,
  addStudent,
  useFetchUserDetails,
  useFetchTutorDetails,
  updateTutor,
  useFetchTutorId,
  linkTutorToUser,
} from "@/hooks/useProfile";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { uploadMedia } from "@/hooks/useCourseUpload";
import { useAuthContext } from "@/Context/AuthContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProfilePage: React.FC = () => {
  const { user } = useAuthContext();
  const userId = user?.id;
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

  const [socialLinks, setSocialLinks] = useState({
    email: "",
    facebook: "",
    twitter: "",
    linkedin: "",
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

      if (data?.profilepicture?.url) {
        const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.profilepicture.url}`;
        setUploadImage(imageUrl);
      } else {
        setUploadImage("/Ellipse 445.webp");
      }
    }
  }, [data]);

  useEffect(() => {
    if (tutorDetails && tutorDetails.data.length > 0) {
      const tutor = tutorDetails.data[0].attributes;
      setBiography(tutor?.Biography || "dummy");
      setRole(tutor?.role || "dummy");
      setQualifications(tutor?.Qualifications || "dummy");
      setSocialLinks({
        email: tutor.socialLinks?.email || "",
        facebook: tutor.socialLinks?.facebook || "",
        twitter: tutor.socialLinks?.twitter || "",
        linkedin: tutor.socialLinks?.linkedin || "",
      });

      if (tutor?.profilepicture?.data?.attributes?.url) {
        const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${tutor?.profilepicture?.data?.attributes?.url}`;
        setUploadImage(imageUrl);
      } else {
        setUploadImage("/Ellipse 445.webp");
      }
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
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      message.error("No profile picture selected.");
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

 

  const { mutateAsync: postTutorProfile } = useMutation({
    mutationFn: async ({
      tutorname,
      profilepicture,
      role,
      lastName,
      firstName,
      Biography,
      Qualifications,
      socialLinks,
    }: {
      tutorname: string;
      profilepicture: string;
      role: string;
      lastName: string;
      firstName: string;
      Biography: string;
      Qualifications: string;
      socialLinks: {
        email: string;
        facebook: string;
        twitter: string;
        linkedin: string;
      };
    }) => {
      const response = await addTutor(
        tutorname,
        profilepicture,
        role,
        lastName,
        firstName,
        Biography,
        Qualifications,
        socialLinks
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
      return await addStudent(
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
      profilepicture,
      role,
      lastName,
      firstName,
      Biography,
      Qualifications,
      socialLinks,
    }: {
      tutorId: number;
      tutorname: string;
      profilepicture: string;
      role: string;
      lastName: string;
      firstName: string;
      Biography: string;
      Qualifications: string;
      socialLinks: {
        email: string;
        facebook: string;
        twitter: string;
        linkedin: string;
      };
    }) => {
      return await updateTutor(
        tutorId,
        tutorname,
        profilepicture,
        role,
        lastName,
        firstName,
        Biography,
        Qualifications,
        socialLinks
      );
    },

    onSuccess: () => {
      message.success("Tutor details updated successfully");
    },

    onError: () => {
      message.error("Error updating tutor");
    },
  });

  const { mutate: linkTutor } = useMutation({
    mutationFn: async ({
      userId,
      tutorId,

    }: {
      userId: number;
      tutorId: number;

    }) => {
      return await linkTutorToUser(userId, tutorId );
    },

    onSuccess: () => {
      message.success("Tutor linked successfully");
    },

    onError: () => {
      message.error("Error in linking tutor to user");
    },
  });

  
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
  
    let profilePictureId: string = "";
    if (image) {
      try {
        profilePictureId = await uploadMedia(image);
      } catch (error) {
        message.error("Error uploading image");
        return;
      }
    } else {
      profilePictureId = exisitingprofileId ? String(exisitingprofileId) : "";
    }
    
    
    try {
      if (toggle) {
        if (tutorId) {
          updateTutorProfile({
            tutorId,
            tutorname: `${firstName} ${lastName}`,
            profilepicture: profilePictureId,
            role,
            lastName,
            firstName,
            Biography,
            Qualifications,
            socialLinks: updatedSocialLinks,
          });
        } else {
          const newTutorId = await postTutorProfile({
            tutorname: `${firstName} ${lastName}`,
            profilepicture: profilePictureId,
            role,
            lastName,
            firstName,
            Biography,
            Qualifications,
            socialLinks: updatedSocialLinks,
          });
  
  
          if (newTutorId) {
            linkTutor({ userId, tutorId: newTutorId });
            message.success("Tutor profile created and linked successfully!");
          } else {
            throw new Error("Tutor ID is not available after creation");
          }
        }
      } else {
        postStudentProfile({
          studentname: `${firstName} ${lastName}`,
          profilepicture: profilePictureId,
          lastName,
          firstName,
          userId,
          socialLinks: updatedSocialLinks,
        });
        message.success("Student profile created successfully!");
      }
    } catch (error) {
      message.error("Failed to save profile data. Please try again.");
    }
  
    setImage(null);
    setUploadImage("/Ellipse 445.webp");
    setToggle(false);
    setBiography("");
    setSocialLinks({
      email: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    });
    setFirstName("");
    setLastName("");
    setRole("");
    setQualifications("");
  };
  
  return (
    <div className="max-md:p-0 max-md:pr-4 sm:pl-10 items-center sm:w-1/2">
      <h2 className="font-bold text-[30px] mb-3 max-md:mt-0">Profile</h2>
      <p>
        Add your personal details as you would like them to appear on your
        profile
      </p>

      <div className="h-[200px] border border-gray-200 rounded-lg mb-5 mt-5 items-center">
        <div className="flex items-center justify-center my-3">
          <Image
            src={uploadImage}
            alt={image ? "userimage" : "no image selected"}
            width={120}
            height={120}
            className="rounded-full object-cover"
          />

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
              className="bg-black text-white rounded-md px-4 py-1 cursor-pointer text-center"
            >
              Change Photo
            </label>
            <button
              onClick={handleRemoveImage}
              className="bg-white text-black border border-black rounded-md px-4 py-1"
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
                <label className="block text-sm mb-1 mr-16">Tutor role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="border border-black w-2/3 rounded-lg bg-[#F9F9F9] px-3 py-2 outline-none"
                />
              </div>

              <div className="flex items-center  w-full my-5">
                <label className="block text-sm mb-1 mr-2">
                  Tutor qualifications
                </label>
                <input
                  type="text"
                  value={Qualifications}
                  onChange={(e) => {
                    setQualifications(e.target.value);
                  }}
                  className="border border-black w-2/3 rounded-lg bg-[#F9F9F9] px-3 py-2 outline-none"
                />
              </div>

              <label className="block text-sm mb-4 ">
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

              <div className="mt-20 ">
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
              </div>
            </div>
          </div>
        )}
        <div className="mb-4 grid grid-cols-2 gap-4">
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
          className="mt-5 bg-black text-white py-2 px-6 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
