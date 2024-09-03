import { CourseWithProgress } from "@/components/ui/course-list";
import { Chapter } from "@/models/chapter";
import { Category } from "@/models/course";

export const categoryList: Category[] = [
  {
    id: "1",
    name: "Accounting",
  },
  {
    id: "2",
    name: "Computer Science",
  },
  {
    id: "3",
    name: "Engineering",
  },
  {
    id: "4",
    name: "Filming",
  },
  {
    id: "5",
    name: "Music",
  },
  {
    id: "6",
    name: "Sport",
  },
  {
    id: "7",
    name: "Photography",
  },
];

export const courseWithProgress: CourseWithProgress[] = [
  {
    id: "1",
    title: "Introduction to Accounting",
    category: categoryList[0],
    chapters: [] as Chapter[],
    progress: 10,
    description:
      "This is a course that introduces you to the basics of accounting.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWNjb3VudGluZ3xlbnwwfDB8MHx8fDI%3D",
    price: 79.99,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "2",
    title: "Introduction to Computer Science",
    category: categoryList[1],
    chapters: [] as Chapter[],
    progress: 20,
    description:
      "This is a course that introduces you to the basics of computer science.",
    imageUrl:
      "https://images.unsplash.com/photo-1675495666895-9091741bfd78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfDB8MHx8fDI%3D",
    price: 59.99,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "3",
    title: "Introduction to Engineering",
    category: categoryList[2],
    chapters: [] as Chapter[],
    progress: null,
    description:
      "This is a course that introduces you to the basics of engineering.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW5naW5lZXJpbmd8ZW58MHwwfDB8fHwy",
    price: 99.99,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "4",
    title: "Introduction to Filming",
    category: categoryList[3],
    chapters: [] as Chapter[],
    progress: null,
    description:
      "This is a course that introduces you to the basics of filming.",
    imageUrl:
      "https://images.unsplash.com/photo-1500705479396-0e1d0bee4076?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlsbWluZ3xlbnwwfDB8MHx8fDI%3D",
    price: 12.49,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
  {
    id: "5",
    title: "Introduction to Music",
    category: categoryList[4],
    chapters: [] as Chapter[],
    progress: 20,
    description: "This is a course that introduces you to the basics of music.",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHwwfDB8fHwy",
    price: 29.99,
    level: "Beginner",
    students: 0,
    resources: [],
    isPublished: true,
  },
];
