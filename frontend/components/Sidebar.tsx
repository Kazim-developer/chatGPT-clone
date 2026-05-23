"use client";

import { searchChats } from "@/handlers/searchChats";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { data, isLoading } = useQuery({
    queryKey: ["all-chats"],
    queryFn: searchChats,
  });

  const router = useRouter();

  if (!data || isLoading) {
    return <h1>Loading ...</h1>;
  }

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
          <h1 className="text-gray-100 mb-2">Chats</h1>
          <hr className="text-gray-100 mb-5" />
          <div>
            {data.chats.map((chat: any, index: any) => {
              return (
                <a key={index} href={chat.id} className="mb-2">
                  {chat.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
