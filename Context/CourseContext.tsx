import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface CourseContextType {
  courseId: number | null;
  setCourseId: (id: number | null) => void;
  topicId:number | null;
  setTopicId: (id: number | null) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courseId, setCourseId] = useState<number | null>(null);
  const [topicId, setTopicId] = useState<number | null>(null);

  const value = useMemo(() => ({ courseId, setCourseId, topicId, setTopicId }), [courseId, topicId]);

return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};
