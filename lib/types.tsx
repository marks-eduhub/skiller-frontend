export interface Child {
  text: string;
  type: string; 
}
export type SearchResult = (Course & { type: 'course' }) | (Tutor & { type: 'tutor' });

export interface  ProfilePicture {
  id: number
  url?: string;
  alternativeText?: string;
  caption?: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

export interface SocialLinks {
  email: string;
  facebook: string;
  twitter: string;
  linkedin: string;
}

export interface UserDetails {
  id: number;
  username: string;
  email: string;
  provider?: string | null;
  firstName: string | null;
  lastName: string | null;
  profilepicture: ProfilePicture
  socialLinks: SocialLinks
  studentname: string | null;
}
 

export  interface Reply {
  id: number;
  attributes: {
    createdAt: string;
    replyText: string;
    parentComment: number;
    user: {
      data: {
        attributes: {
          username: string;
        };
      };
    };
  };
};
export interface Option {
  id: number; 
  label: string; 
}
export interface CommunityQuestions {
  id: string;
  Question: string;
  nameofquestioner: string;
  responses: Responses[];
}
export interface Responses {
  id: string;
  questionId: number;
  responseText: string[] | string;
  responderName: string;
}
export interface Question {
  id: number;
  attributes: {
    questions: string;
    options: Option[];
    answers: string;
  };
}
export interface TestResult {
  userId: number;
  topicId: number;
  score: number;
  timesAttempted: number;
  userQuestionResults: any[]; 
}
export interface Test {
  id: number;
  attributes: {
    test_results:[];
    quizname: string;
    testdescription: string;
    passmark: number;
    testduration: string;
    testname: string;
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
  id:number
  documentId: string;
  topicname: string;
  duration: string;
  topicExpectations: string;
  topicdescription: string;
  isCompleted: boolean;
  position: number;
}

export interface Topic {
  id: number;
  attributes: TopicAttributes;
}



export interface CourseResponse {
  data: Course[]; 
}

export interface Course {
  id: number;
  attributes: Coursedata;
}

export interface Coursedata {
  id: number;
  documentId: string;
  rating: number;
  duration: string;
  coursename: string;
  type: 'course';
  card: CourseImage;  
  users: {
    data: User[];
  };
  topicname: {
    data: Topic[];
  };
  tutor: {
    data: Tutor[];
  };
  reviews: {
    data: CourseReview[];
  };
  categories: {
    data: CourseCategory[];
  };
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
      alternativeText: string;
      name: string;
      url: string; 
    };
  };
}
export interface CorrectAnswer {
  questionId: number;
  correctAnswer: string;
}
export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  studentname: string;
  provider?: string | null;
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
  attributes: {
    documentId: string;
    tutorname: string;
    profilepicture: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    role: string;
    type: 'tutor';
    slug: string;
    createdAt: string;  
    updatedAt: string;  
    publishedAt: string; 
    Qualifications:string
    Biography: string;
  };
  id: number;

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



