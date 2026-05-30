"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/handlers/getData";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function ChatGroups() {
  const { data, isLoading } = useQuery({
    queryKey: ["chat-groups"],
    queryFn: () => getData("chat-groups"),
  });

  const pathname = usePathname();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  function toggleItem(id: string) {
    setOpenItems((s) => ({
      ...s,
      [id]: !s[id],
    }));
  }

  if (!data || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col gap-2">
      {data.groups.map((group: any) => {
        const isGroupActive = group.chat.some(
          (chat: any) => pathname === `/chat/${chat.id}`,
        );

        const isOpen = openItems[group.id] || isGroupActive;

        return (
          <div key={group.id} className="rounded-xl overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => toggleItem(group.id)}
              className="w-full flex items-center gap-2"
            >
              <span className="font-medium text-gray-100">{group.name}</span>
              <ChevronDown
                size={18}
                className={`transition-transform text-gray-100 duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Chats */}
            {isOpen && (
              <div className="flex flex-col px-2 pb-2">
                {group.chat.length > 0 ? (
                  group.chat.map((chat: any) => (
                    <Link
                      key={chat.id}
                      href={`/chat/${chat.id}`}
                      className={clsx(
                        "my-2 py-2 pl-2 rounded-lg text-sm",
                        pathname === `/chat/${chat.id}`
                          ? "bg-white text-black"
                          : "text-gray-100",
                      )}
                    >
                      {chat.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-gray-100">No chats</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
