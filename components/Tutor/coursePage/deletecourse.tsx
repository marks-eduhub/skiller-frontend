import { courseDelete } from "@/hooks/useCourses";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface DeletecourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
}
const DeletecourseModal: React.FC<DeletecourseModalProps> = ({
  onClose,
  courseId,
}) => {
  const router = useRouter()  
  
  const { mutate: deleteCourse, isPending } = useMutation({
    mutationFn: async (courseId: number) => {
      return await courseDelete(courseId);
    },
    onSuccess: () => {
      message.success("Course deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      queryClient.invalidateQueries({ queryKey: ["tutor_courses", courseId] });
  
      onClose();
      router.push("/tutor/dashboard");
    },
    onError: () => {
      message.error("Error deleting course. Please try again later.");
    },
  });
  
  const handleDelete = () => {
    deleteCourse(courseId);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
        <p className="mb-6">Are you sure you want to delete this course</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-900"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletecourseModal;
