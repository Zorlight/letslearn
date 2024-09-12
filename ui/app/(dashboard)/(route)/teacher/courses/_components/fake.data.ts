import { Course } from "@/models/course";
import { nanoid } from "@reduxjs/toolkit";

export const coursesData: Course[] = [
  {
    id: nanoid(),
    title: "Introduction to Computer Science",
    description: "",
    imageUrl: "",
    price: 1.65,
    category: null,
    level: null,
    students: null,
    sections: [],
    resources: [],
    isPublished: true,
  },
  {
    id: nanoid(),
    title: "Introduction to React JS",
    description: "",
    imageUrl: "",
    price: 1.99,
    category: null,
    level: null,
    students: null,
    sections: [],
    resources: [],
    isPublished: false,
  },
  {
    id: nanoid(),
    title: "Introduction to Next JS",
    description: "",
    imageUrl: "",
    price: 1.65,
    category: null,
    level: null,
    students: null,
    sections: [],
    resources: [],
    isPublished: false,
  },
];
