import { createFileRoute } from '@tanstack/react-router';
import { PenTool } from 'lucide-react';
import { DashboardComingSoon } from '@/components/dashboard/DashboardComingSoon';

export const Route = createFileRoute('/dashboard/ai-writer')({
  component: AiWriterPage,
});

function AiWriterPage() {
  return (
    <DashboardComingSoon
      icon={PenTool}
      title="AI Writer"
      titleKu="نووسەری AI"
      description="AI writing for bullet points and summaries is coming soon. Use the resume editor to tailor content for now."
      descriptionKu="نووسینی AI بۆ خاڵ و کورتەنامە بەم زووانە دێت. ئێستا دەتوانیت لە دەستکاریکەری سیڤی ناوەڕۆک ڕێک بخەیت."
    />
  );
}
