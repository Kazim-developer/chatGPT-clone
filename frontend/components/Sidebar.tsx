"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ChatGroups from "./ChatGroups";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="bg-gray-800 h-screen w-[300px] px-4 py-5">
      <div className="flex flex-col gap-5">
        <button
          className="w-[fit-content] bg-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
          onClick={() => router.push("/")}
        >
          <Plus className="text-black" />
          Chat
        </button>
        <div>
          <h1 className="text-gray-100 mb-2">Groups</h1>
          <hr className="text-gray-100 mb-5" />
          <ChatGroups />
        </div>
      </div>
    </div>
  );
}
