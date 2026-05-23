"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import clsx from "clsx";

export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className=" w-[80%] flex flex-col gap-5">
        <h1 className="text-2xl text-gray-500 text-center">
          How can i help you today?
        </h1>
        <form className="flex items-center gap-2">
          <input
            type="text"
            ref={inputRef}
            placeholder="ask anything"
            className="w-[100%] border-1 border-gray-500 p-2 rounded-lg focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className={clsx(
              "p-2 bg-gray-800 rounded-lg",
              query.length === 0 ? "opacity-[0.5]" : null,
            )}
          >
            <Send className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
