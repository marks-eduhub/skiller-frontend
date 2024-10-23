import { createContext } from "react";

export interface User {
  email: string;
  password: string;
  username: string;
  id:number
  // gender: string;
  // birthDate: string;
}
// export interface Course {
//   attributes: any;
//   id: number;
//   tutors: string;
//   card: string;
//   rating: number;
//   duration: string;
//   coursename: string;
//   topicname: string;
//   categories: string;
// }
export interface Wishlist {
  userId: number;
  courseId: number;
  course: Course[]; 
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
export interface LikedCourse {
  id: number;
  course: Course[]
  user: {
    id: number;
  };
  dateCreated: string;
}
export interface Category {
  id: number;
  coursecategories: string;
  slug: string;
  categorySlug: string;
  courses: Course[];
}
export interface RegisterResponse {
  jwt: string;
  user: {
    id: string;
    username: string;

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
