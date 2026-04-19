import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Sparkles,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { applyFollowUpAnswers, parseMemory, suggestFollowUpQuestions } from "@/lib/ai.functions";
import { SAMPLE_MEMORIES } from "@/lib/sample-memories";
import { useAppStore } from "@/lib/store";
import type { FollowUpAnswer, FollowUpQuestion, Profile } from "@/lib/types";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Import your memory — MemoryCV" },
      {
        name: "description",
        content: "Import memory from ChatGPT, Claude, Gemini, or your own notes to build a reusable career profile.",
      },
    ],
  }),
  component: Onboarding,
});

const SOURCES = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    where: "Settings, Personalization, Memory, then copy the relevant entries.",
  },
  {
    id: "claude",
    name: "Claude",
    where: "Profile and personal preference memory entries work best.",
  },
  {
    id: "gemini",
    name: "Gemini",
    where: "Saved info and profile facts are enough to build a first pass.",
  },
  {
    id: "manual",
    name: "Manual notes",
    where: "A free-form summary works if you do not want to export memory directly.",
  },
];

const LOADING_PHRASES = [
  "Reading context and identity markers",
  "Mapping skills, experience, and intent",
  "Rebuilding a professional profile from memory",
  "Extracting signals for role targeting",
];

function Onboarding() {
  const navigate = useNavigate();
  const setProfile = useAppStore((s) => s.setProfile);
  const parseMemoryFn = useServerFn(parseMemory);
  const apiKey = useAppStore((s) => s.apiKey);
  const suggestFollowUpsFn = useServerFn(suggestFollowUpQuestions);
  const applyFollowUpsFn = useServerFn(applyFollowUpAnswers);

  const [step, setStep] = useState(0);
  const [source, setSource] = useState<string | null>(null);
  const [memory, setMemory] = useState("");
  const [loading, setLoading] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [profile, setLocalProfile] = useState<Profile | null>(null);
  const [questions, setQuestions] = useState<FollowUpQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionLoading, setQuestionLoading] = useState(false);

  const sourceLabel = SOURCES.find((item) => item.id === source)?.name ?? "Source";

  const loadSample = (id: string) => {
    const sample = SAMPLE_MEMORIES.find((item) => item.id === id);
    if (!sample) return;
    setMemory(sample.text);
    toast.success(`Loaded ${sample.persona}`);
  };

  const handleExtract = async () => {
    if (memory.trim().length < 20) {
      toast.error("Add more context before extracting the profile.");
      return;
    }

    setLoading(true);
    setStep(2);
    const interval = setInterval(
      () => setPhraseIdx((current) => (current + 1) % LOADING_PHRASES.length),
      1800,
    );

    try {
      const { profile } = await parseMemoryFn({ data: { memory } });
      setLocalProfile(profile);
      const { questions } = await suggestFollowUpsFn({ data: { profile } });
      setQuestions(questions);
      setAnswers(
        Object.fromEntries(
          questions.map((question) => [question.id, ""]),
        ),
      );
      setQuestionIndex(0);
      setStep(questions.length > 0 ? 3 : 4);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to extract profile.");
      setStep(1);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!profile) return;
    setProfile(profile);
    toast.success("Profile saved");
    navigate({ to: "/dashboard" });
  };

  const handleApplyAnswers = async () => {
    if (!profile) return;

    const payload: FollowUpAnswer[] = questions
      .map((question) => ({
        questionId: question.id,
        field: question.field,
        answer: answers[question.id]?.trim() ?? "",
      }))
      .filter((item) => item.answer.length > 0);

    if (payload.length === 0) {
      setStep(4);
      return;
    }

    setQuestionLoading(true);
    try {
      const { profile: completedProfile } = await applyFollowUpsFn({
        data: {
          profile,
          answers: payload,
        },
      });
      setLocalProfile(completedProfile);
      toast.success("Profile updated with your answers");
      setStep(4);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to apply answers.");
    } finally {
      setQuestionLoading(false);
    }
  };

  return (
    <div className="page-shell bg-background text-foreground">
      <header className="saas-nav">
        <div className="app-frame px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 cursor-pointer" id="nav-logo">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-[1rem] font-bold tracking-tight text-slate-900">MemoryCV</span>
            </Link>

            <Stepper step={step} />
          </div>
        </div>
      </header>

      <main className="app-frame grid gap-6 px-4 pb-16 pt-3 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-8">
        <IntroRail
          step={step}
          sourceLabel={sourceLabel}
          memoryLength={memory.length}
          profile={profile}
          questionCount={questions.length}
          answeredCount={Object.values(answers).filter(Boolean).length}
        />

        <section className="surface-panel min-h-[680px] rounded-[2.25rem] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <Panel key="sources" title="Choose the memory source" subtitle="Pick the source format that most closely matches what you are about to paste.">
                <div className="grid gap-4 md:grid-cols-2">
                  {SOURCES.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06, type: "spring", stiffness: 100, damping: 20 }}
                      onClick={() => {
                        setSource(item.id);
                        setStep(1);
                      }}
                      className="surface-muted rounded-[1.6rem] p-5 text-left transition-transform hover:-translate-y-[1px]"
                    >
                      <div className="eyebrow">Source 0{index + 1}</div>
                      <div className="mt-4 text-xl font-semibold tracking-tight">{item.name}</div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.where}</p>
                    </motion.button>
                  ))}
                </div>
              </Panel>
            )}

            {step === 1 && (
              <Panel key="memory" title="Paste the raw memory" subtitle="Do not clean it up. The extraction performs better when the source material stays messy and complete.">
                <div className="grid gap-6">
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_MEMORIES.map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => loadSample(sample.id)}
                        className="ghost-button px-4 py-2 text-sm text-foreground"
                      >
                        {sample.persona}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Memory input</label>
                      <textarea
                        value={memory}
                        onChange={(event) => setMemory(event.target.value)}
                        placeholder="Paste memory, profile notes, or a free-form summary here."
                        className="field-input min-h-[360px] resize-y"
                      />
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{memory.length.toLocaleString()} characters</span>
                        <span>{sourceLabel}</span>
                      </div>
                    </div>

                    <div className="surface-muted rounded-[1.6rem] p-5">
                      <div className="eyebrow">What gets extracted</div>
                      <div className="mt-4 space-y-4">
                        {[
                          "identity and positioning",
                          "experience chronology",
                          "technical and soft skill clusters",
                          "career direction and role fit",
                        ].map((line, index) => (
                          <div key={line} className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background font-mono text-xs text-muted-foreground">
                              0{index + 1}
                            </div>
                            <span className="text-sm text-foreground">{line}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <button onClick={() => setStep(0)} className="ghost-button px-5 py-3 text-sm text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      onClick={handleExtract}
                      disabled={memory.trim().length < 20 || loading}
                      className="primary-button px-6 py-3 text-sm font-medium disabled:opacity-50"
                    >
                      Extract profile
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Panel>
            )}

            {step === 2 && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[540px] flex-col justify-between"
              >
                <div className="max-w-[480px]">
                  <div className="eyebrow">Extraction running</div>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Turning memory into a working profile.
                  </h1>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    The system is interpreting narrative fragments, role history, skills, and goals
                    into a structure the generator can use.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
                  <div className="surface-muted flex min-h-[220px] flex-col justify-between rounded-[1.8rem] p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-foreground text-background">
                      <Wand2 className="h-6 w-6" />
                    </div>
                    <div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={phraseIdx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="text-xl font-semibold tracking-tight"
                        >
                          {LOADING_PHRASES[phraseIdx]}
                        </motion.div>
                      </AnimatePresence>
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        AI analysis in progress
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {[88, 100, 76, 92].map((width, index) => (
                      <div key={width} className="surface-muted rounded-[1.3rem] p-4">
                        <div
                          className="shimmer h-3 rounded-full bg-foreground/8"
                          style={{ width: `${width}%`, animationDelay: `${index * 120}ms` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && profile && questions.length > 0 && (
              <Panel
                key="questions"
                title="Fill the missing details"
                subtitle="The AI found a few resume-critical gaps. Answer them here and the profile will be updated automatically."
              >
                <FollowUpSlides
                  questions={questions}
                  answers={answers}
                  questionIndex={questionIndex}
                  loading={questionLoading}
                  onAnswer={(questionId, value) =>
                    setAnswers((current) => ({ ...current, [questionId]: value }))
                  }
                  onBack={() => setQuestionIndex((current) => Math.max(0, current - 1))}
                  onNext={() =>
                    setQuestionIndex((current) => Math.min(questions.length - 1, current + 1))
                  }
                  onApply={handleApplyAnswers}
                />
              </Panel>
            )}

            {step === 4 && profile && (
              <Panel key="review" title={`Review ${profile.name.split(" ")[0]}'s profile`} subtitle="Adjust the extracted profile before entering the dashboard.">
                <ProfileEditor profile={profile} setProfile={setLocalProfile} />

                <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row">
                  <button onClick={() => setStep(questions.length > 0 ? 3 : 1)} className="ghost-button px-5 py-3 text-sm text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    {questions.length > 0 ? "Back to questions" : "Re-paste memory"}
                  </button>
                  <button onClick={handleConfirm} className="primary-button px-6 py-3 text-sm font-medium">
                    <Check className="h-4 w-4" />
                    Continue to dashboard
                  </button>
                </div>
              </Panel>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

function IntroRail({
  step,
  sourceLabel,
  memoryLength,
  profile,
  questionCount,
  answeredCount,
}: {
  step: number;
  sourceLabel: string;
  memoryLength: number;
  profile: Profile | null;
  questionCount: number;
  answeredCount: number;
}) {
  const statuses = [
    "Select source",
    "Paste memory",
    "Extract profile",
    "Fill gaps",
    "Review output",
  ];

  return (
    <aside className="grid gap-6 lg:sticky lg:top-6 lg:h-fit">
      <div className="surface-panel rounded-[2.25rem] p-6 sm:p-8">
        <div className="eyebrow">Guided intake</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Bring your memory in once. Reuse it everywhere after.
        </h1>
        <p className="mt-4 max-w-[34ch] text-base leading-7 text-muted-foreground">
          This flow is designed to turn unstructured memory into a controlled, reusable candidate profile.
        </p>
      </div>

      <div className="surface-panel rounded-[2rem] p-6">
        <div className="eyebrow">Progress</div>
        <div className="mt-5 space-y-4">
          {statuses.map((label, index) => {
            const active = index === step;
            const complete = index < step;

            return (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                    complete
                      ? "bg-foreground text-background"
                      : active
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {complete ? "✓" : `0${index + 1}`}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{label}</div>
                  <div className="text-xs text-muted-foreground">
                    {index === 0
                      ? sourceLabel
                      : index === 1
                        ? `${memoryLength.toLocaleString()} chars loaded`
                      : index === 3 && questionCount > 0
                        ? `${answeredCount}/${questionCount} answered`
                        : index === 4 && profile
                          ? profile.name
                          : "Pending"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="surface-panel rounded-[2rem] p-6">
        <div className="eyebrow">Operator note</div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Cleaner UI does not matter if the intake logic is weak. The goal here is confidence:
          the user should understand what is happening, what was extracted, and what gets saved.
        </p>
      </div>
    </aside>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className={`h-1.5 w-12 rounded-full transition-colors ${
            index <= step ? "bg-foreground" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-full flex-col"
    >
      <div className="max-w-[720px]">
        <div className="eyebrow">Intake step</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{subtitle}</p>
      </div>
      <div className="mt-8 flex-1">{children}</div>
    </motion.div>
  );
}

function ProfileEditor({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}) {
  const update = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile({ ...profile, [key]: value });

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Name">
          <input
            value={profile.name}
            onChange={(event) => update("name", event.target.value)}
            className="field-input"
          />
        </Field>
        <Field label="Location">
          <input
            value={profile.location}
            onChange={(event) => update("location", event.target.value)}
            className="field-input"
          />
        </Field>
        <Field label="Photo URL (optional)">
          <input
            value={profile.photoUrl ?? ""}
            onChange={(event) => update("photoUrl", event.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="field-input"
          />
        </Field>
        <Field label="Email">
          <input
            value={profile.email ?? ""}
            onChange={(event) => update("email", event.target.value)}
            className="field-input"
          />
        </Field>
      </div>

      <Field label="Summary">
        <textarea
          value={profile.summary}
          onChange={(event) => update("summary", event.target.value)}
          rows={4}
          className="field-input resize-y"
        />
      </Field>

      <Field label="Career goals">
        <textarea
          value={profile.careerGoals}
          onChange={(event) => update("careerGoals", event.target.value)}
          rows={3}
          className="field-input resize-y"
        />
      </Field>

      <div className="grid gap-4 lg:grid-cols-2">
        <Pills
          label="Technical skills"
          values={profile.skills.technical}
          onChange={(values) => update("skills", { ...profile.skills, technical: values })}
        />
        <Pills
          label="Tools"
          values={profile.skills.tools}
          onChange={(values) => update("skills", { ...profile.skills, tools: values })}
        />
        <Pills
          label="Soft skills"
          values={profile.skills.soft}
          onChange={(values) => update("skills", { ...profile.skills, soft: values })}
        />
        <Pills
          label="Languages"
          values={profile.skills.languages_spoken}
          onChange={(values) => update("skills", { ...profile.skills, languages_spoken: values })}
        />
      </div>

      <div className="surface-muted rounded-[1.6rem] p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="eyebrow">Experience review</div>
            <div className="mt-2 text-xl font-semibold tracking-tight">
              {profile.experience.length} roles extracted
            </div>
          </div>
          <div className="font-mono text-xs text-muted-foreground">chronology</div>
        </div>

        <div className="mt-5 space-y-3">
          {profile.experience.slice(0, 4).map((item, index) => (
            <div key={`${item.company}-${index}`} className="rounded-[1.2rem] bg-background px-4 py-4">
              <div className="text-sm font-semibold text-foreground">
                {item.title} at {item.company}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{item.duration}</div>
            </div>
          ))}
          {profile.experience.length > 4 && (
            <div className="text-sm text-muted-foreground">
              + {profile.experience.length - 4} more roles retained in the profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FollowUpSlides({
  questions,
  answers,
  questionIndex,
  loading,
  onAnswer,
  onBack,
  onNext,
  onApply,
}: {
  questions: FollowUpQuestion[];
  answers: Record<string, string>;
  questionIndex: number;
  loading: boolean;
  onAnswer: (questionId: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  onApply: () => void;
}) {
  const question = questions[questionIndex];
  const currentValue = answers[question.id] ?? "";
  const isLast = questionIndex === questions.length - 1;

  return (
    <div className="grid gap-6">
      <div className="surface-muted rounded-[1.8rem] p-6">
        <div className="flex items-center justify-between">
          <div className="eyebrow">Question {questionIndex + 1}</div>
          <div className="font-mono text-xs text-muted-foreground">
            {questionIndex + 1}/{questions.length}
          </div>
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight">{question.question}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{question.helperText}</p>

        {question.inputType === "select" && question.options.length > 0 ? (
          <div className="mt-6 grid gap-3">
            {question.options.map((option) => {
              const active = currentValue === option;
              return (
                <button
                  key={option}
                  onClick={() => onAnswer(question.id, option)}
                  className={`rounded-[1.2rem] px-4 py-4 text-left text-sm transition-colors ${
                    active ? "bg-foreground text-background" : "surface-panel"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="mt-4">
          <textarea
            value={currentValue}
            onChange={(event) => onAnswer(question.id, event.target.value)}
            placeholder={question.placeholder ?? "Type your answer here."}
            rows={question.inputType === "select" ? 2 : 4}
            className="field-input resize-y"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <button
          onClick={onBack}
          disabled={questionIndex === 0}
          className="ghost-button px-5 py-3 text-sm text-foreground disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        {isLast ? (
          <button
            onClick={onApply}
            disabled={loading}
            className="primary-button px-6 py-3 text-sm font-medium disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Apply answers
          </button>
        ) : (
          <button onClick={onNext} className="primary-button px-6 py-3 text-sm font-medium">
            Next question
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function Pills({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const [input, setInput] = useState("");

  return (
    <div className="surface-muted rounded-[1.6rem] p-5">
      <div className="mb-3 text-sm font-medium text-foreground">{label}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-2 text-xs text-foreground"
          >
            {value}
            <button
              onClick={() => onChange(values.filter((_, current) => current !== index))}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && input.trim()) {
            event.preventDefault();
            onChange([...values, input.trim()]);
            setInput("");
          }
        }}
        placeholder="Add a skill and press Enter"
        className="field-input mt-3"
      />
    </div>
  );
}
