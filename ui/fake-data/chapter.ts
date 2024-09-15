import { Chapter } from "@/models/chapter";

export const fakeChapters: Chapter[] = [
  {
    id: "1",
    title: "Chapter 1",
    description: "Chapter 1 description",
    isFree: true,
    isPublished: true,
    videoUrl: "https://www.youtube.com/watch?v=6g3Dc3e3LjE",
    userProgress: [
      {
        id: "1",
        chapterId: "1",
        userId: "1",
        isCompleted: true,
        completedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "2",
    title: "Chapter 2",
    description: "Chapter 2 description",
    isFree: true,
    isPublished: true,
    videoUrl: "https://www.youtube.com/watch?v=6g3Dc3e3LjE",
    userProgress: [
      {
        id: "1",
        chapterId: "1",
        userId: "1",
        isCompleted: false,
        completedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "3",
    title: "Chapter 3",
    description: "Chapter 3 description",
    isFree: false,
    isPublished: true,
    videoUrl: "https://www.youtube.com/watch?v=6g3Dc3e3LjE",
    userProgress: [],
  },
];
