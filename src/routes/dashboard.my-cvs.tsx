import { createFileRoute } from '@tanstack/react-router';
import { Files } from 'lucide-react';

export const Route = createFileRoute('/dashboard/my-cvs')({
  component: MyCvsPage,
});

function MyCvsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <Files className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">My CVs</h1>
      <p className="text-slate-500 font-medium">This page is under construction.</p>
    </div>
  );
}
