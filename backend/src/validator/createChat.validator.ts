import { z } from "zod";

const createChatSchema = z.object({
  chatName: z
    .string()
    .min(5, { error: "chat name should be of min 5 characters" })
    .max(20, { error: "chat name should be of max 20 characters" }),
  chatGroup: z
    .string()
    .min(5, { error: "group name should be of min 5 characters" })
    .max(20, { error: "group name should be of max 20 characters" }),
});

export default createChatSchema;
