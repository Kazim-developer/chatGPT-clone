# ChatGPT Clone (Group-Based Chat System)

A ChatGPT-like AI chat application with an improved conversation structure where chats are organized into groups, making history management clean, scalable, and easy to navigate.

## 🚀 Features

- AI-powered chat using OpenAI LLM
- Group-based chat organization (Groups → Chats → Messages)
- Persistent chat history
- Real-time conversational experience
- Easy retrieval and management of past conversations
- Clean and responsive UI

## 🛠️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **AI:** OpenAI API

## 🧠 Key Idea

Instead of a flat chat history, this project introduces a hierarchical structure:

- A **Group** contains multiple related chats
- Each **Chat** contains messages between user and AI

This makes large-scale conversation management much more structured and user-friendly.

## 📦 How It Works

1. User creates a group (e.g., "Job Prep", "Coding Help")
2. Inside each group, multiple chats can be created
3. Each chat stores messages between user and AI
4. OpenAI API generates responses in real time
5. All data is stored in PostgreSQL via Prisma

## 🎯 Purpose

To improve upon traditional chat applications by introducing better organization of conversations, making it easier to manage long-term AI interactions.

## 📌 Future Improvements

- Search across chats and groups
- File uploads in conversations
- Role-based access control
- Streaming responses from AI
- Mobile app version

## 🧑‍💻 Author

Built by Muhammad Kazim Raza, a full-stack developer passionate about AI systems and scalable backend architectures.
