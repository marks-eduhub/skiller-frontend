import React, { useState, useCallback, useMemo,Dispatch, SetStateAction  } from "react";
import Image from "next/image";
import { GrCloudUpload } from "react-icons/gr";
import { RxSwitch } from "react-icons/rx";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import CustomModal from "../topicUpload/modal";
import {message} from "antd"
import FileModal from "./filemodal";
import { uploadMedia } from "@/hooks/useCourseUpload";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface StepProps{
  topicname: string;
  setTopicname: Dispatch<SetStateAction<string>>;
  topicdescription: string;
  setTopicdescription: Dispatch<SetStateAction<string>>;
  instructions: string;
  setInstructions: Dispatch<SetStateAction<string>>;
  topicresource: string;
  setTopicresource: Dispatch<SetStateAction<string>>;
  topicexpectation: string;
  setTopicexpectation: Dispatch<SetStateAction<string>>;
  videoFile:File | null
  setVideoFile: Dispatch<SetStateAction<File | null>>
  resourceFile:File | null
  setResourceFile: Dispatch<SetStateAction<File | null>>
}
const Step2:React.FC<StepProps> = ({topicname,
  setTopicname,
  topicdescription,
  instructions,
  topicresource,
  setTopicdescription,
  setInstructions,
  topicexpectation,
  setTopicexpectation,
  videoFile,
  setVideoFile,
  resourceFile,
  setResourceFile,
  setTopicresource,}) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [ModalOpen, setModalOpen] = useState(false);


  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validVideoTypes = ["video/mp4", "video/avi", "video/mov"];
      if (validVideoTypes.includes(file.type)) {
        setVideoFile(file);
        setFileName(file.name);
      } else {
        message.error("Please select a valid video file.");
      }
    } else {
      message.error("No topic video selected. Please try again.");
    }
  };
 
  
  const addTopic = () => {
    setTopics([...topics, `Topic ${topics.length + 1}`]);
  };

  const deleteTopic = (indexToDelete: number) => {
    setTopics(topics.filter((_, index) => index !== indexToDelete));
    setIsModalOpen(false);
  };

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  const handleFileChange = async (file: File | null) => {
    console.log("Selected file:", file);
  
    if (file) {
      const fileType = file.type;
      console.log("File type:", fileType);
  
      if (
        fileType === "application/pdf" ||
        fileType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        fileType === "application/vnd.ms-powerpoint"
      ) {
        console.log("Valid file type detected. Uploading file...");
  
        try {
          const resourceId = await uploadMedia(file);
          console.log("Resource upload result:", resourceId);
  
          if (resourceId) {
            setResourceFile(resourceId); 
            setTopicresource(resourceId);
            console.log("Resource file ID saved:", resourceId);
          } else {
            message.error("Resource upload failed.");
          }
        } catch (error) {
          message.error("Failed to upload the resource.");
          console.error("Error uploading resource:", error);
        }
      } else {
        message.error("Unsupported file type. Please upload a PDF or PowerPoint.");
        console.log("Unsupported file type:", fileType);
      }
    }
  };
  
 
  
  const handleTextChange = (text: string) => {};
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const imageHandler = useCallback(() => {
    setModalOpen(true);
  }, []);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  );
  return (
    <div className="sm:p-4">
      {topics.map((topic, index) => (
        <div key={index} className="flex flex-col mt-5 mb-5 cursor-pointer">
          <div className="w-full sm:h-[100px] h-[90px] sm:bg-gray-300  bg-gray-100 sm:mt-3">
            <div
              onClick={() => toggleExpanded(index)}
              className="flex items-center justify-between p-9 relative"
            >
              <h1 className="font-bold text-[20px]">{topic}</h1>
              <div
                className={`transition-transform duration-200 transform ${
                  expandedIndex === index ? "rotate-90" : ""
                }`}
              >
                <Image src="/edit.svg" alt="arrow" width={20} height={20} />
              </div>
            </div>
          </div>
          {expandedIndex === index && (
             <div className="p-4 w-full h-auto  bg-gray-100 rounded-md overflow-hidden break-words">
             <div className="mt-5 flex sm:flex-row flex-col sm:items-center w-full">
               <label className="flex-shrink-0 sm:mb-0 mb-2">Topic name</label>
               <input
                 type="text"
                 value={topicname}
                 onChange={(e) => setTopicname(e.target.value)}
                 className="border sm:ml-5 border-black w-full bg-[#F9F9F9] px-3 py-2 outline-none"
               />
             </div>
             <div className="sm:mb-10 mt-4 ">
               <label className="block text-sm font-medium mb-4 mt-6">
                 Enter a brief description about the topic
               </label>
               <div className="bg-white w-full overflow-hidden">
                 <ReactQuill
                   placeholder="Write content here"
                   value={topicdescription}
                   onChange={(value) => {
                     setTopicdescription(value);
                   }}
                   className="bg-white h-[200px]"
                 />
               </div>
             </div>
             <div>
               <div className="sm:mb-6 sm:mt-10">
                 <label className="block text-sm font-medium mb-4 sm:mt-20 mt-5">
                   What will the student learn?
                 </label>
                 <div className="bg-white w-full overflow-hidden">
                   <ReactQuill
                     placeholder="Write content here"
                     value={topicexpectation}
                     onChange={(value) => {
                       setTopicexpectation(value);
                     }}
                     className="bg-white h-[200px]"
                   />
                 </div>
               </div>
             </div>
             <div>
               <div>
                 <div className="sm:mb-6 sm:mt-10">
                   <label className="block sm:text-sm font-medium mb-6 sm:mt-6">
                     Add instructions on how to use the resources
                   </label>
                   <div className="bg-white w-full overflow-hidden">
                     <ReactQuill
                       modules={modules}
                       formats={[
                         "header",
                         "font",
                         "size",
                         "bold",
                         "italic",
                         "underline",
                         "strike",
                         "blockquote",
                         "list",
                         "bullet",
                         "indent",
                         "link",
                         "image",
                       ]}
                       className="bg-white h-[210px]"
                       placeholder="Write content here..."
                       onChange={(value) => {
                         setInstructions(value);
                       }}
                     />
                     <div className="p-3 bg-gray-100 text-gray-700 text-sm rounded-md border-l-4 border-blue-500">
                       <span className="font-semibold">Tip:</span> Click the
                       <strong> Image icon</strong> in the toolbar to add PDFs,
                       PowerPoints, or links as resources for this topic.
                     </div>
                   </div>
                 </div>
               </div>
               <div className="sm:mt-10 mt-5">
                 <h1>Upload Video</h1>
   
                 <div className="flex flex-col mt-5 items-center justify-center border border-dashed border-black p-3 relative h-[200px] rounded">
                   {!videoFile ? (
                     <>
                       <GrCloudUpload className="text-blue-800 w-10 h-10" />
                       <span className="text-gray-500">
                         Drag & drop files or
                         <span className="text-blue-500 ml-1 cursor-pointer">
                           Browse
                         </span>
                       </span>
                     </>
                   ) : (
                     <div className="flex flex-col items-center">
                       <p className="text-gray-600">{fileName}</p>
                       <video width="200" controls>
                         <source
                           src={URL.createObjectURL(videoFile)}
                           type={videoFile.type}
                         />
                         Your browser does not support the video tag.
                       </video>
                     </div>
                   )}
                   <input
                     type="file"
                     className="absolute inset-0 opacity-0 cursor-pointer"
                     onChange={handleVideoChange}
                   />
                 </div>
               </div>
               <div className="flex justify-between items-center my-4">
                 <button
                   onClick={openModal}
                   className="bg-black text-white rounded-md py-2 px-4"
                 >
                   Delete Topic
                 </button>
   
                 <button
                   className="border border-black justify-end mb-4 sm:mt-0 mt-4 py-2 px-4 flex items-center rounded w-[150px]"
                 >
                   Save changes
                 </button>
               </div>
             </div>
           </div>
          )}
        </div>
      ))}

      <div className="border border-gray w-full mt-6 p-3">
        <div
          className="w-full bg-gray-200 sm:h-[90px] h-[70px] cursor-pointer flex items-center justify-center gap-2"
          onClick={addTopic}
        >
          <Image src="/pluss.svg" alt="pluss" width={20} height={20} />
          <p>Add your topics</p>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => deleteTopic(expandedIndex!)}
      />
       {ModalOpen && (
        <FileModal
          closeModal={handleModalClose}
          handleFileChange={handleFileChange}
          handleTextChange={handleTextChange}
          isModalOpen={ModalOpen}
        />
      )}
    </div>
  );
};

export default Step2;
