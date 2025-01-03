import { useState } from 'react';
import { AIInput } from './ai/AIInput';
import { AIResults } from './ai/AIResults';
import type { AIResult, SentimentResult, GenerationResult } from '../types/ai';

export function AIDemo() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<AIResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleInputChange = (value: string) => {
    setInput(value);
    setError(null);
  };

  const handleClassify = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Mock classification for demo
      const result: AIResult = {
        type: 'sentiment',
        input,
        result: {
          label: 'POSITIVE',
          score: 0.85
        } as SentimentResult,
        timestamp: Date.now()
      };
      setResults(prev => [result, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Classification failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Mock generation for demo
      const result: AIResult = {
        type: 'generation',
        input,
        result: {
          generated_text: 'Generated response based on input'
        } as GenerationResult,
        timestamp: Date.now()
      };
      setResults(prev => [result, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Generation failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <AIInput
        value={input}
        onChange={handleInputChange}
        onClassify={handleClassify}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
      {results.length > 0 && (
        <AIResults results={results} error={error} />
      )}
    </div>
  );
}