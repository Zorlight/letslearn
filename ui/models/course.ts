import { Chapter } from "./chapter";
import { UserProgress } from "./user-progress";

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
  chapters: Chapter[];
  resources: AttachedFile[];
  isPublished: boolean;
};
