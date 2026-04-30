import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { Files, Plus, FileText, ArrowRight, Trash2, Clock, LayoutTemplate, Search } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard/my-cvs')({
  component: MyCvsPage,
});

function MyCvsPage() {
  const navigate = useNavigate();
  const language = useAppStore((s) => s.language);
  const isKu = language === 'ku';
  const resumes = useAppStore((s) => s.resumes);
  const deleteResume = useAppStore((s) => s.deleteResume);
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = resumes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.data.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteResume(id);
    setConfirmDelete(null);
  };

  if (resumes.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-20 h-20 bg-blue-50 text-blue-400 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
          <Files className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
          {isKu ? 'هێشتا سیڤییەک نەدروستکراوە' : 'No CVs yet'}
        </h1>
        <p className="text-slate-500 font-medium text-sm max-w-xs mb-8">
          {isKu
            ? 'ژیرانەکەی یادگەی زیرەکی دەستکرد بۆ دروستکردنی سیڤیی تایبەتی خۆت بەکاربهێنە.'
            : 'Use the AI Memory Builder to generate your personalized CV in minutes.'}
        </p>
        <Link
          to="/onboarding"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 text-sm"
        >
          <Plus className="w-4 h-4" />
          {isKu ? 'دروستکردنی سیڤیی یەکەم' : 'Create Your First CV'}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {isKu ? 'سیڤییەکانم' : 'My CVs'}
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            {resumes.length} {isKu ? 'سیڤی پاشەکەوتکراوە' : `CV${resumes.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
        <Link
          to="/onboarding"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-bold shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 text-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          {isKu ? 'سیڤیی نوێ' : 'New CV'}
        </Link>
      </div>

      {/* Search */}
      {resumes.length > 3 && (
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isKu ? 'گەڕان...' : 'Search CVs...'}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm text-sm font-medium focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      )}

      {/* CV Grid */}
      <div className="grid gap-3">
        {filtered.map((cv) => (
          <div
            key={cv.id}
            className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-100 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{cv.title}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {new Date(cv.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full capitalize flex items-center gap-1">
                      <LayoutTemplate className="w-2.5 h-2.5" />
                      {cv.template}
                    </span>
                    {cv.jobTarget && (
                      <span className="text-[10px] font-medium text-slate-500 truncate max-w-[120px]">
                        {cv.jobTarget}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-4">
                {confirmDelete === cv.id ? (
                  <>
                    <button
                      onClick={() => handleDelete(cv.id)}
                      className="text-[11px] font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      {isKu ? 'دڵنیایت؟' : 'Confirm'}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      {isKu ? 'پاشگەزبوون' : 'Cancel'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setConfirmDelete(cv.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title={isKu ? 'سڕینەوە' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate({ to: '/editor/$id', params: { id: cv.id } })}
                      className="flex items-center gap-1.5 text-[12px] font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 px-4 py-2 rounded-xl transition-all"
                    >
                      {isKu ? 'کردنەوە' : 'Open'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && search && (
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-400 font-medium">
              {isKu ? 'هیچ ئەنجامێک نەدۆزرایەوە' : 'No results found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
