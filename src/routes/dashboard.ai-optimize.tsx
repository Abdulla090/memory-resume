import { createFileRoute } from '@tanstack/react-router';
import { Wand2 } from 'lucide-react';
import { DashboardComingSoon } from '@/components/dashboard/DashboardComingSoon';

export const Route = createFileRoute('/dashboard/ai-optimize')({
  component: AiOptimizePage,
});

function AiOptimizePage() {
  return (
    <DashboardComingSoon
      icon={Wand2}
      title="AI Optimize"
      titleKu="باشترکردنی AI"
      description="Full-page AI optimization is on the way. Open any CV in the editor and use Optimize there today."
      descriptionKu="باشترکردنی تەواوی AI بەم زووانە دێت. ئێستا سیڤیەکەت لە دەستکاریکەر بکەرەوە و Optimize بەکاربهێنە."
    />
  );
}
