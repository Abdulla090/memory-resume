import { createFileRoute } from '@tanstack/react-router';
import { FileText } from 'lucide-react';
import { DashboardComingSoon } from '@/components/dashboard/DashboardComingSoon';

export const Route = createFileRoute('/dashboard/cover-letters')({
  component: CoverLettersPage,
});

function CoverLettersPage() {
  return (
    <DashboardComingSoon
      icon={FileText}
      title="Cover Letters"
      titleKu="نامەی ڕووپۆش"
      description="Cover letter generation is planned. Build your resume first, then we will match letters to each role."
      descriptionKu="دروستکردنی نامەی ڕووپۆش لە پلاندایە. سەرەتا سیڤی دروست بکە، دواتر نامە بۆ هەر ڕۆڵێک دەگونجێنین."
    />
  );
}
