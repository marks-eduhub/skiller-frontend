import { createContext } from "react";
export interface Child {
  text: string;
  type: string; 
}

export interface Expectation {
  type: string; 
  format: string;
  children: Array<{
    type: string;
    children: Child[]; 
  }>;
}

export interface Option {
  id: number; 
  label: string; 
}

export interface Question {
  id: number; 
  attributes: {
    questions: string; 
    options: Option[]; 
    answer: string;
  };
}
interface TestResult {
  userId: number;
  topicId: number;
  score: number;
  timesAttempted: number;
  userQuestionResults: any[]; 
}
export interface Test {
  id: number; 
  attributes: {
    quizname: string; 
    questions: {
      data: Question[]; 
    };
  };
}

export interface QuizData {
  data: Test[]; 
  meta: object; 
}

export interface TopicAttributes {
  name: string;
  duration: string;
}

export interface Topic {
  id: number;
  attributes: TopicAttributes;
}



export interface Course {
  id: number;
  attributes: CourseAttributes;
}



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
    email: string;
    password: string;
    username: string;
  };
}

export interface Wishlist {
  userId: number;
  courseId: number;
  course: Course[]; 
}

export interface Category {
  id: number;
  coursecategories: string;
  slug: string;
  categorySlug: string;
  courses: Course[];
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
  id: number;
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




export interface LikedCourse {
  id: number;
  course: Course[];
  user: {
    id: number;
  };
  dateCreated: string;
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
  profilepicture: string;
  name: string;
  comment: string;
  rating: number;
  courseName: string;
}

export interface RegisterResponse {
  jwt: string;
  user: {
    id: string;
    username: string;
  }
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
  // export interface Course {
  //   id: number;
  //   attributes: {
  //     course: any;
  //     coursename: string;
  //     rating: number;
  //     duration: string;
  //     tutor: string;
  //     card: string;
  //     categories: { data: Category[] };
  //   };
  // }
  // export interface RegisterResponse {
  //   jwt: string;
  //   user: {
  //     id: string;
  //     username: string;
  //     email: string;
  //   };
  // }
  export interface AuthContextType {
    user: User | undefined;
    setUser: (user: User) => void;
    isLoading: boolean;
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

export interface NoteTypes {
  type: string;
  children: Array<{ text: string }>;
  format?: string; 
}

export interface TopicDetails {
  data: {
    attributes: {
      notes: NoteTypes[];
    };
  };
}