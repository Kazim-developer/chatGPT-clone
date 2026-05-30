"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import clsx from "clsx";

export default function QueryForm({ chatId }: { chatId: string }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <p>{response}</p>

      <div className="absolute py-2 bottom-0 w-[100%] flex justify-center items-center">
        <form
          className="flex items-center gap-2 w-[80%]"
          onSubmit={async (e) => {
            e.preventDefault();

            setQuery("");

            setResponse("");

            const response = await fetch(
              `http://localhost:5000/chat/${chatId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  question: query,
                }),
              },
            );

            const reader = response.body?.getReader();

            if (!reader) return;

            const decoder = new TextDecoder();

            while (true) {
              const { done, value } = await reader.read();

              if (done) break;

              const chunk = decoder.decode(value);

              setResponse((prev) => prev + chunk);
            }
          }}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="ask anything"
            value={query}
            className="w-[100%] border-2 border-gray-500 p-5 rounded-lg focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            disabled={query.length === 0}
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
