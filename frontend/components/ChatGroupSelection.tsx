"use client";

import { NewChat } from "@/app/page";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/handlers/getData";

type ChatGroups = {
  setNewChatData: React.Dispatch<React.SetStateAction<NewChat>>;
  setIsNewGroup: (value: boolean) => void;
};

export default function ChatGroupSelection({
  setNewChatData,
  setIsNewGroup,
}: ChatGroups) {
  const { data, isLoading } = useQuery({
    queryKey: ["chat-groups"],
    queryFn: () => getData("chat-groups"),
  });

  // if (isLoading) {
  //   return <h1>Loading ...</h1>;
  // }

  return (
    <select
      defaultValue=""
      onChange={(e) => {
        const value = e.target.value;

        if (value === "new-group") {
          setIsNewGroup(true);
        } else {
          setIsNewGroup(false);

          setNewChatData((s) => ({
            ...s,
            chatGroup: value,
          }));
        }
      }}
    >
      <option value="" disabled>
        Select group
      </option>

      <option value="new-group">New Group</option>

      {isLoading ? (
        <h1>Loading ...</h1>
      ) : (
        data.groups.map((group: any) => (
          <option key={group.id} value={group.name}>
            {group.name}
          </option>
        ))
      )}
    </select>
  );
}
