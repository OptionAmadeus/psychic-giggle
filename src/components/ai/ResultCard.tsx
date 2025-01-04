import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { AIResult, SentimentResult, GenerationResult } from "@/types/ai";

interface ResultCardProps {
  result: AIResult;
}

// If the interface is truly empty and you want to allow any object, you can use `object` or `unknown` instead:
type SpecificType = object; // Replace with the actual type

const someFunction = (_param: SpecificType) => {
  // ...
};

const ResultCard = () => {
  return <div>{/* Your JSX code */}</div>;
};

export default ResultCard;
