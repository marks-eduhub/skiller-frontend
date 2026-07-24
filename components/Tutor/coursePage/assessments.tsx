import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchCourseTopics } from "@/hooks/useCourses";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import QuizModal from "./testModal";
import { DeleteTest } from "@/hooks/useSetQuiz";
import { stripHtmlTags } from "@/lib/utility";

const Assessments = () => {
  const { slug } = useParams();
  const courseId = String(slug);
  const queryClient = useQueryClient();
  const { data: topicData } = useFetchCourseTopics(courseId);
  const [isDown, setIsDown] = useState<{ [key: number]: boolean }>({});
  const [deleteTarget, setDeleteTarget] = useState<{
    testDocumentId: string;
    testname: string;
  } | null>(null);

  const { mutate: deleteTestMutation, isPending: isDeleting } = useMutation({
    mutationFn: async (testDocumentId: string) => {
      return await DeleteTest(testDocumentId);
    },
    onSuccess: () => {
      message.success("Test deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["course_topics", courseId] });
      setDeleteTarget(null);
    },
    onError: () => {
      message.error("Error deleting test. Please try again later.");
    },
  });

  const toggleDown = (topicId: number) => {
    setIsDown((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<{
    testId: number;
    testDocumentId: string;
    topicId: number;
  } | null>(null);

  const handleModalOpen = (
    testId: number,
    testDocumentId: string,
    topicId: number
  ) => {
    setSelectedTest({ testId, testDocumentId, topicId });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTest(null);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-[#E7E8EA] p-3 sm:p-4">
      <div className="flex flex-col gap-2.5">
        {topicData?.data
          ?.filter(
            (topic: any) => topic.attributes?.topic_tests?.data?.length > 0
          )
          .map((topic: any, index: number) => (
            <div key={index} className="w-full min-w-0 overflow-hidden rounded-xl bg-gray-700">
              <div
                onClick={() => toggleDown(topic.id)}
                className="flex min-w-0 cursor-pointer items-center justify-between gap-3 px-4 py-3 transition hover:bg-gray-600 sm:px-5"
              >
                <h1 className="min-w-0 flex-1 truncate text-sm font-medium text-white sm:text-base">
                  {topic.attributes?.topicname}
                </h1>
                <Image
                  src="/drop.svg"
                  alt="toggle"
                  width={18}
                  height={18}
                  className={`shrink-0 transition-transform duration-200 ${
                    isDown[topic.id] ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isDown[topic.id] && (
                <div className="flex flex-col gap-3 p-3 pt-0 sm:p-4 sm:pt-0">
                  {topic.attributes?.topic_tests?.data.map(
                    (test: any, index: number) => (
                      <div
                        key={index}
                        className="flex min-w-0 flex-col gap-3 rounded-lg bg-[#1a1b1ab0] p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                      >
                        <div className="flex min-w-0 flex-col text-white sm:flex-row sm:items-center sm:gap-4">
                          <span className="truncate text-sm font-medium sm:text-base">
                            {test.attributes?.testname}
                          </span>
                          <span className="truncate text-xs text-white/75 sm:text-sm">
                            {stripHtmlTags(test.attributes?.testdescription || "")}
                          </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
                          <div
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-gray-800 transition hover:-translate-y-0.5 hover:shadow-sm"
                            onClick={() =>
                              handleModalOpen(
                                test.id,
                                test.attributes?.documentId,
                                topic.id
                              )
                            }
                          >
                            <Image
                              src="/pluss.svg"
                              alt="plus"
                              width={10}
                              height={10}
                            />
                            <span className="text-xs font-semibold sm:text-sm">
                              View Test
                            </span>
                          </div>

                          <button
                            className="cursor-pointer rounded-md border border-red-900 px-3 py-1.5 text-xs font-semibold text-red-900 transition hover:-translate-y-0.5 hover:bg-red-900 hover:text-white sm:text-sm"
                            onClick={() =>
                              setDeleteTarget({
                                testDocumentId: test.attributes?.documentId,
                                testname: test.attributes?.testname,
                              })
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
      </div>

      <Link href={`/tutor/dashboard/setQuiz?courseId=${courseId}`}>
        <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-300 px-4 py-3 cursor-pointer transition hover:-translate-y-0.5 hover:shadow-sm">
          <Image src="/pluss.svg" alt="plus" width={18} height={18} />
          <h1 className="text-sm font-semibold text-black sm:text-base">Add a quiz</h1>
        </div>
      </Link>

      {modalOpen && selectedTest && (
        <QuizModal
          modalOpen={modalOpen}
          onClose={handleModalClose}
          selectedTest={selectedTest}
          courseId={courseId}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[90%] max-w-md rounded-lg bg-white p-5 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete &quot;{deleteTarget.testname}&quot;?
              This cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={() => deleteTestMutation(deleteTarget.testDocumentId)}
                className="rounded bg-red-900 px-4 py-2 text-white hover:bg-red-800 disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments;
