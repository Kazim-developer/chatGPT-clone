// /store/chat.store.ts
import { create } from "zustand";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatStore = {
  messages: Message[];

  addMessage: (msg: Message) => void;
  updateMessage: (id: string, content: string) => void;
  clear: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  updateMessage: (id, content) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, content } : m,
      ),
    })),

  clear: () => set({ messages: [] }),
}));
