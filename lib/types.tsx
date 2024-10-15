import { createContext } from "react";
export interface ImageData {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    caption?: string;
  };
}

export interface CourseImage {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string; 
    };
  };
}

export interface User {
  id: number;
  attributes: {
    username: string;
    email: string;
  };
}


export interface Tutor {
  id: number;
  attributes: {
    tutorname: string;
  };
}

export interface CourseReview {
  id: number;
  attributes: {
    comment: string;
    rating: number;
    name: string;
  };
}

export interface CourseCategory {
  id: number;
  attributes: {
    coursecategories: string;
  };
}

export interface CourseAttributes {
  id:number
  rating: number;
  duration: string;
  coursename: string;
  card: CourseImage;
  users: {
    data: User[];
  };
  topicname: {
    data: Topic[];
  };
  tutors: {
    data: Tutor[];
  };
  reviews: {
    data: CourseReview[];
  };
  categories: {
    data: CourseCategory[];
  };
}

export interface Course {
  id: number;
  attributes: CourseAttributes;
}

export interface Category {
  id: number;
  coursecategories: string;
  slug: string;
  categorySlug: string;
  courses: Course[];
}
export interface Topic {
  id: number;
  attributes: {
    name: string;
    description: string;
  };
}

export interface Review {
  id: number;
  attributes: {
    comment: string;
    rating: number;
    name: string;
  };
}


export interface courseDetail {
  id: number;
  attributes: {
    introduction?: Array<{ children: Array<{ text: string }> }>;
    requirements?: Array<{ children: Array<{ text: string }> }>;
    expectations?: Array<any>;
    tutor?: { data?: { attributes: { tutorname: string } } };
    course?: { data?: { attributes: { coursename: string } } };
    topics?: { data: Array<any> };
  };
}
  export interface Reviews {
    Image:string
    name: string;
    comment: string;
    rating: number;
    courseName: string;
  }
  // export interface CourseOverview{
  //   Image: string
  //   reviews:Reviews
  //   requirements: string
  //   expectations:string
  //   introduction: string
  //   tutorName: string
  //   courseName: string
  //   topic: string

  // }
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