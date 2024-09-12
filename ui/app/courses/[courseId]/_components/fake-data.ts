import { Chapter } from "@/models/chapter";
import { Course, Section, Topic } from "@/models/course";
import { Purchase } from "@/models/purchase";

export const sections: Section[] = [
  {
    id: "1",
    courseId: "1",
    title: "Section 1",
    topics: [
      {
        id: "1",
        sectionId: "1",
        type: "link",
        title: "Topic 1 Link",
      },
      {
        id: "2",
        sectionId: "1",
        type: "learning",
        title: "Topic 1 Video",
      },
      {
        id: "3",
        sectionId: "1",
        type: "meeting",
        title: "Topic 1 Meeting",
      },
      {
        id: "4",
        sectionId: "1",
        type: "assignment",
        title: "Topic 1 Assignment",
      },
      {
        id: "5",
        sectionId: "1",
        type: "choice",
        title: "Topic 1 Choice",
      },
      {
        id: "6",
        sectionId: "1",
        type: "file",
        title: "Topic 1 File",
      },
      {
        id: "7",
        sectionId: "1",
        type: "quiz",
        title: "Topic 1 Quiz",
      },
    ],
  },
  {
    id: "2",
    courseId: "1",
    title: "Section 2",
    topics: [
      {
        id: "4",
        sectionId: "2",
        type: "link",
        title: "Topic 2 Link",
      },
      {
        id: "5",
        sectionId: "2",
        type: "learning",
        title: "Topic 2 Video",
      },
      {
        id: "6",
        sectionId: "2",
        type: "meeting",
        title: "Topic 2 Meeting",
      },
    ],
  },
  {
    id: "3",
    courseId: "1",
    title: "Section 3",
    topics: [
      {
        id: "7",
        sectionId: "3",
        type: "link",
        title: "Topic 3 Link",
      },
      {
        id: "8",
        sectionId: "3",
        type: "learning",
        title: "Topic 3 Video",
      },
    ],
  },
];

export const topics: Topic[] = sections.reduce(
  (acc: Topic[], section) => acc.concat(section.topics),
  []
);

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
  sections: sections,
};

export const chapters: Chapter[] = [
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
];

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
