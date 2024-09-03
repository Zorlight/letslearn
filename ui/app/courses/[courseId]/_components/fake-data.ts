import { Course } from "@/models/course";
import { Purchase } from "@/models/purchase";

export const course: Course = {
  id: "1",
  title: "Introduction to Computer Science",
  description: "Course 1 description",
  imageUrl: "https://via.placeholder.com/150",
  category: {
    id: "1",
    name: "Category 1",
  },
  price: 100,
  isPublished: true,
  level: "beginner",
  resources: [],
  students: 10,
  chapters: [
    {
      id: "1",
      title: "Chapter 1",
      description: "Chapter 1 description",
      isFree: true,
      isPublished: true,
      position: 1,
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
      position: 2,
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
      position: 3,
      videoUrl: "https://www.youtube.com/watch?v=6g3Dc3e3LjE",
      userProgress: [],
    },
  ],
};

export const purchases: Purchase[] = [
  {
    id: "2",
    courseId: "1",
    userId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    courseId: "1",
    userId: "3",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    courseId: "1",
    userId: "4",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    courseId: "1",
    userId: "5",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    courseId: "1",
    userId: "6",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    courseId: "1",
    userId: "7",
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    courseId: "1",
    userId: "8",
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    courseId: "1",
    userId: "9",
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    courseId: "1",
    userId: "10",
    createdAt: new Date().toISOString(),
  },
];
