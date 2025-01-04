import type { AIResult, AIError } from "@/types/ai";
import { ErrorMessage } from "../ui/ErrorMessage";

interface AIResultsProps {
  results: AIResult[];
  error: AIError | null;
}

export function AIResults({ results, error }: AIResultsProps) {
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-2">
            Input: {result.input}
            <span className="ml-2 text-gray-400">
              {new Date(result.timestamp).toLocaleTimeString()}
            </span>
          </div>
          {result.type === "sentiment" ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {result.result.label} (
                {(result.result as SentimentResult).score * 100}%)
              </span>
            </div>
          ) : (
            <div className="prose max-w-none">
              {(result.result as GenerationResult).generated_text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
