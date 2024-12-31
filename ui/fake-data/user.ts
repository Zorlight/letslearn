import { Role, User } from "@/models/user";

export const fakeUser: User = {
  id: "1",
  username: "Pham Tien Dat",
  email: "ptdat@gmail.com",
  password: "",
  avatar: "",
  role: Role.TEACHER,
  courses: [],
};

export const fakeUserList: User[] = [
  {
    id: "1",
    username: "Nguyen Van A",
    email: "nva@gmail.com",
    password: "",
    avatar: "",
    role: Role.STUDENT,
    courses: [],
  },
  {
    id: "2",
    username: "Nguyen Van B",
    email: "nvb@gmail.com",
    password: "",
    avatar: "",
    role: Role.STUDENT,
    courses: [],
  },
  {
    id: "3",
    username: "Nguyen Van C",
    email: "nvc@gmail.com",
    password: "",
    avatar: "",
    role: Role.STUDENT,
    courses: [],
  },
  {
    id: "4",
    username: "Nguyen Van D",
    email: "nvd@gmail.com",
    password: "",
    avatar: "",
    role: Role.STUDENT,
    courses: [],
  },
  {
    id: "5",
    username: "Nguyen Van E",
    email: "nve@gmail.com",
    password: "",
    avatar: "",
    role: Role.STUDENT,
    courses: [],
  },
  {
    id: "6",
    username: "Nguyen Van F",
    email: "nvf@gmail.com",
    password: "",
    avatar: "",
    role: Role.STUDENT,
    courses: [],
  },
];
