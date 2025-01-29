import { CircleDot, Code } from "lucide-react";

export function QuestionTypeIcon({ type }) {
  return (
    <div className="flex items-center gap-1">
      {type === "mcq" ? (
        <CircleDot className="w-4 h-4 text-gray-600" />
      ) : (
        <Code className="w-4 h-4 text-gray-600" />
      )}
      <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-[10px] font-medium">?</span>
      </span>
    </div>
  );
}
