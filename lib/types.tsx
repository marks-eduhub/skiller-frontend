import { createContext } from "react";

export interface User {
  email: string;
  password: string;
  username: string;
  // gender: string;
  // birthDate: string;
}
export interface Course {
  attributes: any;
  id: number;
  tutors: string;
  card: string;
  rating: number;
  duration: string;
  coursename: string;
  topicname: string;
  categories: string;
}
// interface Course {
//   id: number;
//   attributes: {
//     coursename: string;
//     rating: number;
//     duration: string;
//     tutor: string;
//     card: string;
//     categories: { data: Category[] };
//   };
// }
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
