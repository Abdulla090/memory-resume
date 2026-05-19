import { createFileRoute } from '@tanstack/react-router';
import { BarChart2 } from 'lucide-react';
import { DashboardComingSoon } from '@/components/dashboard/DashboardComingSoon';

export const Route = createFileRoute('/dashboard/analytics')({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <DashboardComingSoon
      icon={BarChart2}
      title="Analytics"
      titleKu="شیکاری"
      description="Application and resume performance insights are coming soon."
      descriptionKu="زانیاری دەربارەی کار و سیڤی بەم زووانە دێت."
    />
  );
}
