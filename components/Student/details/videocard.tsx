import { useSearchParams } from "next/navigation";
import { useFetchTopicDetails } from "@/hooks/useCourseTopics";
import api from "@/lib/axios";
import "react-loading-skeleton/dist/skeleton.css";
import { message } from "antd";
import Skeleton from "react-loading-skeleton";


const VideoCard: React.FC = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { data, isLoading, error} = useFetchTopicDetails(Number(topicId));
  if (isLoading) {
    return (
      <div>
        <h2 className="text-lg font-300 my-4 ">
          <Skeleton
            width={1000}
            height={500}
            baseColor="#e0e0e0"
            highlightColor="#f0f0f0"
            enableAnimation={true}
          />
        </h2>

       
      </div>
    );
  }

  if (error) {
    message.error("Error fetching details. Please try again later.");
  }

  const topicdata = data?.data?.attributes || [];
  const videoFilePath = topicdata?.video?.data?.[0]?.attributes?.url;
  const videoUrl = videoFilePath ? `${api.defaults.baseURL}${videoFilePath}` : null; 
  const tutorName = topicdata?.course?.data?.attributes?.tutors?.data?.[0]?.attributes?.tutorname;
  const tutorRole = topicdata?.course?.data?.attributes?.tutors?.data?.[0]?.attributes?.role;
  const topicname = topicdata?.name;

  return (
    <>
      <div className=" max-md:hidden relative w-full rounded-lg">
        {videoUrl ? (
          <video controls className="w-full rounded-lg">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="flex items-center justify-center font-bold p-10 w-[1000px] h-[500px]">
            <p>No video available</p>
          </div>
        )}

        <div className="text-left mt-6 text-black max-md:text-lg">
          <h2 className="text-md  mb-2 font-bold">{topicname}</h2>
          <p className="text-md max-md:mt-4">
            {tutorName} : {tutorRole}
          </p>
        </div>
      </div>

      <div className="sm:hidden w-full rounded-lg relative">
        <div className="flex items-center mb-3">
          <h2 className="p-1 text-[19px] font-bold text-gray-600">
            {topicname}
          </h2>
        </div>
        {videoUrl ? (
          <video controls className="w-full rounded-lg">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="flex items-center justify-center font-bold p-10 w-[1000px] h-[500px]">
            <p>No video available</p>
          </div>
        )}

        <div className="text-left mt-4 text-black max-md:text-lg">
          <h2 className="text-md font-bold">{topicname}</h2>
          <p className="text-md max-md:mt-4">
            {tutorName} : {tutorRole}
          </p>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
