"use client";

import { postData } from "@/handlers/postData";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { hasErrors } from "@/util/hasErrors.util";
import CreateChatForm from "@/components/CreateChatForm";

export type NewChat = {
  chatName: string;
  chatGroup: string;
};

export default function HomePage() {
  const [newChatData, setNewChatData] = useState<NewChat>({
    chatName: "",
    chatGroup: "",
  });

  const { mutate, data } = useMutation({
    mutationFn: () => postData("chat/create", newChatData),
    onSuccess: () => {
      toast.success("account created successfully, redirecting ...");
    },
    onError: (error) => {
      if (hasErrors(error)) {
        Object.values(error.errors).forEach((msg) => {
          toast.error(String(msg));
        });
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className=" w-[50%] flex flex-col gap-5 border-1 border-gray-300 rounded-lg py-4">
        <h1 className="text-2xl text-gray-800 text-center">Create new chat</h1>
        <CreateChatForm
          mutate={mutate}
          newChatData={newChatData}
          setNewChatData={setNewChatData}
        />
      </div>
    </div>
  );
}
