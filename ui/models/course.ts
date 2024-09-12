export type AttachedFile = {
  data: File;
  cloudUrl: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  category: Category | null;
  level: number | string | null;
  students: number | null;
  sections: Section[];
  resources: AttachedFile[];
  isPublished: boolean;
};

export type Section = {
  id: string;
  courseId: string;
  title: string;
  topics: Topic[];
};

export type Topic = {
  id: string;
  sectionId: string;
  type: keyof TopicMap;
  title: string;
  url?: string;
};

export type TopicMap = {
  link: any;
  meeting: any;
  learning: any;
  assignment: any;
  choice: any;
  file: {
    document: any;
    audio: any;
    video: any;
  };
  quiz: any;
};
