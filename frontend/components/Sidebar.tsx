import { Plus } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="bg-gray-800 h-screen w-[300px] p-4">
      <div>
        <button className="bg-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus className="text-black" />
          Chat
        </button>
        <div></div>
      </div>
    </div>
  );
}
