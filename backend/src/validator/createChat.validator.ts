import { z } from "zod";

const createChatSchema = z.object({
  chatName: z.string(),
  chatGroup: z.string(),
});

export default createChatSchema;
