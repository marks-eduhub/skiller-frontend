import React, { createContext, useContext, useState, ReactNode } from "react";

interface CourseContextType {
  courseId: number | null;
  setCourseId: (id: number | null) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courseId, setCourseId] = useState<number | null>(null);

  return (
    <CourseContext.Provider value={{ courseId, setCourseId }}>
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
