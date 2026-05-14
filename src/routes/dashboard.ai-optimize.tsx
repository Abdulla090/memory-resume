import { createFileRoute } from '@tanstack/react-router';
import { Wand2 } from 'lucide-react';

export const Route = createFileRoute('/dashboard/ai-optimize')({
  component: AiOptimizePage,
});

function AiOptimizePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="size-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <Wand2 className="size-8" />
      </div>
      <h1 className="text-3xl font-semibold text-zinc-900 mb-2">AI Optimize</h1>
      <p className="text-zinc-500 font-medium">This page is under construction.</p>
    </div>
  );
}
