import { Chapter } from "./chapter";

export type AttachedFile = {
  data: File;
  cloudUrl: string;
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  category: string | null;
  level: number | string | null;
  students: null;
  chapters: Chapter[];
  resources: AttachedFile[];
  isPublished: boolean;
};
