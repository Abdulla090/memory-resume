import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  Download,
  Loader2,
  Plus,
  Sparkles,
  Target,
  Trash2,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { exportResumePDF } from "@/components/resume/pdf-templates";
import { ResumePreview } from "@/components/resume/templates";
import { improveBullet, tailorToJob } from "@/lib/ai.functions";
import { useAppStore } from "@/lib/store";
import type { ExperienceItem, ResumeData, TemplateId } from "@/lib/types";

export const Route = createFileRoute("/resume/$id")({
  head: () => ({
    meta: [
      { title: "Resume Editor — MemoryCV" },
      { name: "description", content: "Edit, tailor, and export a resume generated from your memory profile." },
    ],
  }),
  component: ResumeEditor,
});

function ResumeEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const resume = useAppStore((state) => state.resumes.find((item) => item.id === id));
  const updateResume = useAppStore((state) => state.updateResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const improveFn = useServerFn(improveBullet);
  const tailorFn = useServerFn(tailorToJob);

  const [tailorOpen, setTailorOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [tailoring, setTailoring] = useState(false);
  const [exporting, setExporting] = useState(false);

  if (!resume) {
    return (
      <div className="page-shell flex min-h-[100dvh] items-center justify-center bg-background px-4 text-foreground">
        <div className="surface-panel max-w-md rounded-[2rem] p-8 text-center">
          <p className="text-muted-foreground">This resume draft could not be found.</p>
          <button onClick={() => navigate({ to: "/dashboard" })} className="primary-button mt-6 px-5 py-3 text-sm font-medium">
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  const data = resume.data;

  const updateData = (patch: Partial<ResumeData>) =>
    updateResume(id, { data: { ...data, ...patch } });

  const setTemplate = (template: TemplateId) => updateResume(id, { template });

  const updateExperience = (index: number, patch: Partial<ExperienceItem>) => {
    const next = [...data.experience];
    next[index] = { ...next[index], ...patch };
    updateData({ experience: next });
  };

  const updateAchievement = (experienceIndex: number, achievementIndex: number, value: string) => {
    const next = [...data.experience];
    const achievements = [...next[experienceIndex].achievements];
    achievements[achievementIndex] = value;
    next[experienceIndex] = { ...next[experienceIndex], achievements };
    updateData({ experience: next });
  };

  const handleImprove = async (
    experienceIndex: number,
    achievementIndex: number,
    mode: "impact" | "technical" | "quantify" | "concise",
  ) => {
    const original = data.experience[experienceIndex].achievements[achievementIndex];
    toast.loading("Improving bullet", { id: "improve" });

    try {
      const { bullet } = await improveFn({
        data: { apiKey, bullet: original, jobTitle: data.title, mode },
      });
      updateAchievement(experienceIndex, achievementIndex, bullet);
      toast.success("Bullet updated", { id: "improve" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to improve bullet.", { id: "improve" });
    }
  };

  const handleTailor = async () => {
    if (jobDescription.trim().length < 20) {
      toast.error("Paste a longer job description.");
      return;
    }

    setTailoring(true);
    try {
      const { resume: tailored } = await tailorFn({
        data: { apiKey, resume: data, jobDescription },
      });
      updateData(tailored);
      toast.success("Resume tailored to job description");
      setTailorOpen(false);
      setJobDescription("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to tailor resume.");
    } finally {
      setTailoring(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportResumePDF(
        data,
        resume.template,
        `${data.name.replace(/\s+/g, "_")}_${resume.title.slice(0, 30).replace(/\s+/g, "_")}`,
      );
      toast.success("PDF downloaded");
    } catch (error) {
      toast.error("PDF export failed");
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  const completionSignal =
    Math.min(
      100,
      Math.round(
        ((Number(Boolean(data.summary)) +
          Number(data.experience.length > 0) +
          Number(data.skills.length > 0) +
          Number(Boolean(data.email)) +
          Number(Boolean(data.phone))) /
          5) *
          100,
      ),
    ) || 0;

  return (
    <div className="page-shell bg-background text-foreground">
      <header className="saas-nav">
        <div className="app-frame px-4 sm:px-6">
          <div className="flex flex-col gap-4 py-3 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0">
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-bold tracking-tight text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">{resume.title}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={resume.template}
                onChange={(e) => setTemplate(e.target.value as TemplateId)}
                className="rounded-lg border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="minimal">Minimal</option>
                <option value="executive">Executive</option>
                <option value="noir">Noir</option>
                <option value="apex">Apex</option>
                <option value="slate">Slate</option>
                <option value="cipher">Cipher</option>
                <option value="monolith">Monolith</option>
                <option value="pinnacle">Pinnacle</option>
                <option value="avant">Avant</option>
                <option value="vanguard">Vanguard</option>
                <option value="nexus">Nexus</option>
                <option value="orbit">Orbit</option>
                <option value="metric">Metric</option>
                <option value="prism">Prism</option>
              </select>

              <button onClick={() => setTailorOpen(true)} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5" />
                Tailor
              </button>
              <button onClick={handleExport} disabled={exporting} className="primary-button px-4 py-2 text-xs font-medium disabled:opacity-50 flex items-center gap-1.5">
                {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-frame grid gap-6 px-4 pb-16 pt-3 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
        <aside className="grid gap-6 lg:sticky lg:top-6 lg:h-fit">
          <div className="surface-panel rounded-[2.25rem] p-6">
            <div className="eyebrow">Draft status</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Edit with tighter control before export.</h1>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              This workspace is split between structured editing and live document preview so the
              output stays readable while you refine details.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Completion signal</span>
                  <span className="font-mono text-muted-foreground">{completionSignal}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-foreground" style={{ width: `${completionSignal}%` }} />
                </div>
              </div>

              <div className="grid gap-3">
                <SignalCard label="Experience blocks" value={data.experience.length} />
                <SignalCard label="Skills retained" value={data.skills.length} />
                <SignalCard label="Template mode" value={resume.template} />
              </div>
            </div>
          </div>

          <div className="surface-panel rounded-[2rem] p-6">
            <div className="eyebrow">AI assist</div>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Use bullet actions to sharpen impact, quantify outcomes, or tighten phrasing.</p>
              <p>Use the job-tailoring panel when the brief is specific enough to rewrite the draft meaningfully.</p>
            </div>
          </div>
        </aside>

        <section className="grid gap-6">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-5">
              <Card title="Header">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Name" value={data.name} onChange={(value) => updateData({ name: value })} />
                  <Input label="Title" value={data.title} onChange={(value) => updateData({ title: value })} />
                  <Input label="Email" value={data.email ?? ""} onChange={(value) => updateData({ email: value })} />
                  <Input label="Phone" value={data.phone ?? ""} onChange={(value) => updateData({ phone: value })} />
                  <Input label="Location" value={data.location ?? ""} onChange={(value) => updateData({ location: value })} />
                  <Input
                    label="Photo URL (optional)"
                    value={data.photoUrl ?? ""}
                    onChange={(value) => updateData({ photoUrl: value })}
                  />
                </div>
              </Card>

              <Card title="Summary">
                <textarea
                  value={data.summary}
                  onChange={(event) => updateData({ summary: event.target.value })}
                  rows={5}
                  className="field-input resize-y"
                />
              </Card>

              <Card title="Skills">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground px-1">
                    <span className="flex-1">Skill Name</span>
                    <span className="w-20 text-center" title="Level used for stars/bars (1-5)">Level (1-5)</span>
                    <span className="w-8"></span>
                  </div>
                  {data.skills.map((skill, i) => {
                    const item = data.skillItems?.[i] ?? { name: skill, level: (skill.length % 3) + 3 };
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <input
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...data.skills];
                            newSkills[i] = e.target.value;
                            const newItems = [...(data.skillItems || data.skills.map(s => ({ name: s, level: (s.length % 3) + 3 })))];
                            newItems[i].name = e.target.value;
                            updateData({ skills: newSkills, skillItems: newItems });
                          }}
                          className="field-input flex-1"
                        />
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={item.level}
                          onChange={(e) => {
                            const newItems = [...(data.skillItems || data.skills.map(s => ({ name: s, level: (s.length % 3) + 3 })))];
                            newItems[i].level = Number(e.target.value) || 1;
                            updateData({ skillItems: newItems });
                          }}
                          className="field-input w-20 text-center px-1"
                          title="Skill Level (1-5)"
                        />
                        <button
                          onClick={() => {
                            const newSkills = data.skills.filter((_, idx) => idx !== i);
                            const newItems = (data.skillItems || data.skills.map(s => ({ name: s, level: (s.length % 3) + 3 }))).filter((_, idx) => idx !== i);
                            updateData({ skills: newSkills, skillItems: newItems });
                          }}
                          className="ghost-button p-2 text-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => {
                      updateData({
                        skills: [...data.skills, "New Skill"],
                        skillItems: [...(data.skillItems || data.skills.map(s => ({ name: s, level: (s.length % 3) + 3 }))), { name: "New Skill", level: 3 }]
                      });
                    }}
                    className="ghost-button mt-2 px-4 py-2 text-sm text-foreground self-start"
                  >
                    <Plus className="h-4 w-4" />
                    Add Skill
                  </button>
                </div>
              </Card>
            </div>

            <div className="surface-panel rounded-[2.25rem] p-4 sm:p-5">
              <div className="surface-muted rounded-[1.6rem] p-4">
                <div className="origin-top overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-24px_rgba(15,23,42,0.2)] lg:scale-[0.9]">
                  <ResumePreview data={data} template={resume.template} />
                </div>
              </div>
            </div>
          </div>

          <Card title="Experience">
            <div className="grid gap-4">
              {data.experience.map((experience, experienceIndex) => (
                <div key={`${experience.company}-${experienceIndex}`} className="surface-muted rounded-[1.6rem] p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Role"
                      value={experience.title}
                      onChange={(value) => updateExperience(experienceIndex, { title: value })}
                    />
                    <Input
                      label="Company"
                      value={experience.company}
                      onChange={(value) => updateExperience(experienceIndex, { company: value })}
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      label="Duration"
                      value={experience.duration}
                      onChange={(value) => updateExperience(experienceIndex, { duration: value })}
                    />
                  </div>

                  <div className="mt-5 space-y-3">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <div key={`${achievementIndex}-${achievement.slice(0, 12)}`} className="rounded-[1.3rem] bg-background p-4">
                        <textarea
                          value={achievement}
                          onChange={(event) => updateAchievement(experienceIndex, achievementIndex, event.target.value)}
                          rows={3}
                          className="field-input min-h-[90px] resize-y border-transparent bg-transparent p-0 shadow-none focus:border-transparent focus:shadow-none"
                        />

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-2">
                            {(["impact", "quantify", "concise"] as const).map((mode) => (
                              <button
                                key={mode}
                                onClick={() => handleImprove(experienceIndex, achievementIndex, mode)}
                                className="ghost-button px-3 py-2 text-xs text-foreground"
                              >
                                <Sparkles className="h-3.5 w-3.5" />
                                {mode}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => {
                              const next = [...data.experience];
                              next[experienceIndex] = {
                                ...next[experienceIndex],
                                achievements: next[experienceIndex].achievements.filter((_, index) => index !== achievementIndex),
                              };
                              updateData({ experience: next });
                            }}
                            className="ghost-button px-3 py-2 text-xs text-foreground"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const next = [...data.experience];
                      next[experienceIndex] = {
                        ...next[experienceIndex],
                        achievements: [...next[experienceIndex].achievements, "New achievement"],
                      };
                      updateData({ experience: next });
                    }}
                    className="ghost-button mt-4 px-4 py-2 text-sm text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                    Add bullet
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>

      {tailorOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(245,242,235,0.7)] p-4 backdrop-blur-md"
          onClick={() => setTailorOpen(false)}
        >
          <div
            className="surface-panel w-full max-w-3xl rounded-[2rem] p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="eyebrow">Job tailoring</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Paste the hiring brief and rewrite the draft against it.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              This operation updates the current resume draft, so use it when the target role is clear enough to justify a rewrite.
            </p>

            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the full job description here."
              rows={12}
              className="field-input mt-6 resize-y"
            />

            <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
              <button onClick={() => setTailorOpen(false)} className="ghost-button px-5 py-3 text-sm text-foreground">
                Cancel
              </button>
              <button onClick={handleTailor} disabled={tailoring} className="primary-button px-6 py-3 text-sm font-medium disabled:opacity-50">
                {tailoring ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                Tailor resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface-panel rounded-[2.25rem] p-6">
      <div className="eyebrow">{title}</div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="field-input" />
    </label>
  );
}

function SignalCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="surface-muted rounded-[1.4rem] px-4 py-4">
      <div className="eyebrow">{label}</div>
      <div className="mt-3 text-xl font-semibold tracking-tight capitalize">{value}</div>
    </div>
  );
}
