"use client";

import { NewChat } from "@/app/page";
import { useState } from "react";
import ChatGroupSelection from "./ChatGroupSelection";

type CreateChat = {
  mutate: () => void;
  newChatData: NewChat;
  setNewChatData: React.Dispatch<React.SetStateAction<NewChat>>;
};

export default function CreateChatForm({
  mutate,
  newChatData,
  setNewChatData,
}: CreateChat) {
  const [isNewGroup, setIsNewGroup] = useState<boolean>(false);

  return (
    <form
      className="w-[80%] mx-auto flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <input
        type="text"
        placeholder="Enter new chat name"
        required
        value={newChatData.chatName}
        onChange={(e) => {
          setNewChatData((s) => ({ ...s, chatName: e.target.value }));
        }}
      />
      <ChatGroupSelection
        key={newChatData.chatName}
        setNewChatData={setNewChatData}
        setIsNewGroup={setIsNewGroup}
      />
      {isNewGroup ? (
        <input
          type="text"
          placeholder="Enter group name"
          required
          value={newChatData.chatGroup}
          onChange={(e) =>
            setNewChatData((s) => ({ ...s, chatGroup: e.target.value }))
          }
        />
      ) : null}
      <button type="submit" className="bg-gray-800 text-white rounded-lg py-2">
        Create
      </button>
    </form>
  );
}
