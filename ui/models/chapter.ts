import { UserProgress } from "./user-progress";

export type Chapter = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  isPublished: boolean;
  isFree: boolean;
  userProgress: UserProgress[];
};
