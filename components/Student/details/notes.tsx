import { useFetchTopicDetails } from "@/hooks/useCourseTopics";
import { useSearchParams } from "next/navigation";
import React from "react";
import { TopicDetails } from "@/lib/types";
import { message } from "antd";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const Notes: React.FC = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const { data, isLoading, error } = useFetchTopicDetails(Number(topicId));
  

  if (isLoading) {
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
            count={1}
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
  const notes = (data as TopicDetails)?.data?.attributes?.notes || [];

  return (
    <div className="my-6 p-4 bg-gray-50 rounded-lg ">
      {notes?.length ? (
        notes?.map((note, index) => (
          <div key={index} className="my-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
              Topic Notes
            </h2>
            {note.type === "paragraph" && <p>{note.children[0]?.text}</p>}

            {note.type === "list" && note.format === "unordered" && (
              <ul className="list-disc ml-6">
                {note.children.map((listItem: any, i: number) => (
                  <li key={i} className="">
                    {listItem.children?.[0]?.text || listItem.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center font-bold p-10">
          <p className="text-[18px]">No notes available.</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
