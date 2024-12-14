import Avatar from "@/components/ui/simple/avatar";
import { User } from "@/models/user";
import React from "react";

interface Props {
  user: User;
}
export default function UserRow({ user }: Props) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar src={user.image} className="w-12" />
      <span className="text-cyan-500 font-bold text-sm">{user.username}</span>
    </div>
  );
}
