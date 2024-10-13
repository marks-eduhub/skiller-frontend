import { createContext } from "react";

export interface User {
    email: string;
    password: string;
    username: string;
    // gender: string;
    // birthDate: string;
  }
  export interface CarouselCourses {
    id: number;
   tutors: string;
    Image: string;
    rating: number;
    duration: string;
    description: string
    level: string;
    days: string;
  }
  export interface Category {
    id: number;
    coursecategories: string;
    slug: string;
    categorySlug: string;
    courses: Course[];
  }
  export interface Course {
    id: number;
    attributes: {
      course: any;
      coursename: string;
      rating: number;
      duration: string;
      tutor: string;
      card: string;
      categories: { data: Category[] };
    };
  }
  export interface RegisterResponse {
    jwt: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  }
  export interface AuthContextType {
    user: User | undefined;
    setUser: (user: User) => void;
    isLoading: boolean;
  }
  
  export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    setUser: () => {}, 
    isLoading: false,
  });