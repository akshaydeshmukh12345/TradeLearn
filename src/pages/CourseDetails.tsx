import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  LockKeyhole,
  Play,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

const courseInfo = {
  title: "Stock Market Fundamentals",
  subtitle:
    "Build a strong foundation in investing and understand how the stock market works.",
  category: "Beginner",
  rating: "4.9",
  students: "2,450+",
  duration: "8 hours",
  lessons: 25,
  description:
    "Learn the fundamentals of stock markets, understand how stocks are traded, explore essential investing concepts, and build confidence with a structured learning path.",
  whatYouLearn: [
    "Understand stock markets and stock exchanges",
    "Learn how to read stock prices and market movements",
    "Understand investing, trading, and portfolio basics",
    "Identify common market risks and avoid beginner mistakes",
  ],
};

const modules = [
  {
    title: "Module 1: Introduction to the Stock Market",
    lessons: [
      { title: "What is the Stock Market?", duration: "12 min", done: true },
      { title: "How Stock Exchanges Work", duration: "15 min", done: true },
      { title: "Investing vs Trading", duration: "10 min", done: true },
      {
        title: "Understanding Market Participants",
        duration: "14 min",
        done: false,
      },
    ],
  },
  {
    title: "Module 2: Essential Market Concepts",
    lessons: [
      {
        title: "Stocks, Shares and Ownership",
        duration: "13 min",
        done: false,
      },
      {
        title: "Market Capitalization Explained",
        duration: "16 min",
        done: false,
      },
      { title: "Bull and Bear Markets", duration: "11 min", done: false },
      {
        title: "Indices: Nifty 50 and Sensex",
        duration: "18 min",
        done: false,
      },
    ],
  },
  {
    title: "Module 3: Your First Investment",
    lessons: [
      {
        title: "Understanding Demat Accounts",
        duration: "15 min",
        done: false,
      },
      {
        title: "Orders and Settlement Basics",
        duration: "17 min",
        done: false,
      },
      {
        title: "Building an Investment Checklist",
        duration: "20 min",
        done: false,
      },
    ],
  },
];

export default function CourseDetails() {
  const { id } = useParams();
  const [enrolled, setEnrolled] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([
    "What is the Stock Market?",
    "How Stock Exchanges Work",
    "Investing vs Trading",
  ]);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const isTechnical = id === "2";
  const isRisk = id === "3";

  const courseTitle = isTechnical
    ? "Technical Analysis Masterclass"
    : isRisk
      ? "Risk Management Essentials"
      : courseInfo.title;

  const courseSubtitle = isTechnical
    ? "Read price charts, recognize patterns, and understand technical indicators."
    : isRisk
      ? "Learn the fundamentals of protecting capital and managing investment risk."
      : courseInfo.subtitle;

  const allLessons = modules.flatMap((module) => module.lessons);
  const progress = Math.round(
    (completedLessons.length / allLessons.length) * 100,
  );

  const toggleModule = (index: number) => {
    setExpandedModules((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const handleEnroll = () => {
    setEnrolled(true);
    setNotice("You're enrolled in this demo course. Happy learning!");
  };

  const handleLessonClick = (title: string, index: number) => {
    if (!enrolled) {
      setNotice("Click Enroll Now to start this demo course.");
      return;
    }

    const previousLessons = allLessons.slice(0, index);
    const locked = previousLessons.some(
      (lesson) => !completedLessons.includes(lesson.title),
    );

    if (locked) {
      setNotice("Complete the previous lessons to unlock this lesson.");
      return;
    }

    setActiveLesson(title);
    setNotice("");
  };

  const markLessonComplete = () => {
    if (!activeLesson) return;

    setCompletedLessons((current) =>
      current.includes(activeLesson) ? current : [...current, activeLesson],
    );
    setNotice(`Completed: ${activeLesson}`);
    setActiveLesson(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-gradient-to-br from-[#101F55] via-[#172B75] to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <Link
            to="/courses"
            className="mb-8 inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white"
          >
            <ArrowLeft size={17} /> Back to Courses
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.8fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium">
                {courseInfo.category} Course
              </span>

              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
                {courseTitle}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
                {courseSubtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">
                <span className="inline-flex items-center gap-2">
                  <Star size={17} className="fill-amber-400 text-amber-400" />
                  {courseInfo.rating} rating
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users size={17} /> {courseInfo.students} learners
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={17} /> {courseInfo.duration}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Video size={17} /> {allLessons.length} demo lessons
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {!enrolled ? (
                  <button
                    onClick={handleEnroll}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#172B75] transition hover:bg-blue-50"
                  >
                    Enroll Now <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const nextLesson = allLessons.find(
                        (lesson) => !completedLessons.includes(lesson.title),
                      );
                      if (nextLesson) {
                        const index = allLessons.findIndex(
                          (lesson) => lesson.title === nextLesson.title,
                        );
                        setExpandedModules(
                          modules
                            .map((_, moduleIndex) => moduleIndex)
                            .filter((moduleIndex) =>
                              modules[moduleIndex].lessons.some(
                                (lesson) => lesson.title === nextLesson.title,
                              ),
                            ),
                        );
                        handleLessonClick(nextLesson.title, index);
                      } else {
                        setNotice(
                          "Congratulations! You've completed this course.",
                        );
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#172B75] transition hover:bg-blue-50"
                  >
                    <Play size={17} fill="currentColor" /> Start Learning
                  </button>
                )}
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  View Curriculum
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                <TrendingUp size={34} />
              </div>
              <p className="text-sm font-semibold tracking-wide text-blue-100">
                YOUR LEARNING JOURNEY
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {enrolled ? "You're enrolled!" : "Start learning today"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                {enrolled
                  ? "Continue through the curriculum and track the lessons you complete."
                  : "Follow the lessons in order and develop your financial knowledge step by step."}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-blue-100">Course progress</span>
                  <span className="font-bold">{enrolled ? progress : 0}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all"
                    style={{ width: `${enrolled ? progress : 0}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-4">
                  <BookOpen size={20} />
                  <p className="mt-3 text-2xl font-bold">{allLessons.length}</p>
                  <p className="mt-1 text-xs text-blue-100">Demo lessons</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <ShieldCheck size={20} />
                  <p className="mt-3 text-2xl font-bold">
                    {enrolled ? completedLessons.length : 0}
                  </p>
                  <p className="mt-1 text-xs text-blue-100">
                    Lessons completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <section>
            <h2 className="text-2xl font-bold text-[#172B75]">
              What you'll learn
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              {courseInfo.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {courseInfo.whatYouLearn.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="curriculum" className="mt-12 scroll-mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-[#172B75]">
                  Course curriculum
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {modules.length} modules · {allLessons.length} sample lessons
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                {enrolled ? `${progress}% completed` : "Preview curriculum"}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {modules.map((module, moduleIndex) => {
                const expanded = expandedModules.includes(moduleIndex);
                const moduleCompleted = module.lessons.filter((lesson) =>
                  completedLessons.includes(lesson.title),
                ).length;

                return (
                  <div
                    key={module.title}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <button
                      onClick={() => toggleModule(moduleIndex)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50"
                    >
                      <div>
                        <h3 className="font-bold text-[#172B75]">
                          {module.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                          {module.lessons.length} lessons · {moduleCompleted}{" "}
                          completed
                        </p>
                      </div>
                      {expanded ? (
                        <ChevronUp className="shrink-0 text-slate-500" />
                      ) : (
                        <ChevronDown className="shrink-0 text-slate-500" />
                      )}
                    </button>

                    {expanded && (
                      <div className="border-t border-slate-100">
                        {module.lessons.map((lesson) => {
                          const globalIndex = allLessons.findIndex(
                            (item) => item.title === lesson.title,
                          );
                          const done = completedLessons.includes(lesson.title);
                          const previousIncomplete = allLessons
                            .slice(0, globalIndex)
                            .some(
                              (item) => !completedLessons.includes(item.title),
                            );
                          const locked =
                            !enrolled || (previousIncomplete && !done);

                          return (
                            <button
                              key={lesson.title}
                              onClick={() =>
                                handleLessonClick(lesson.title, globalIndex)
                              }
                              className="flex w-full items-center gap-3 border-b border-slate-100 px-5 py-4 text-left last:border-b-0 hover:bg-blue-50/50"
                            >
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                  done
                                    ? "bg-emerald-50 text-emerald-600"
                                    : locked
                                      ? "bg-slate-100 text-slate-400"
                                      : "bg-blue-50 text-blue-700"
                                }`}
                              >
                                {done ? (
                                  <CheckCircle2 size={18} />
                                ) : locked ? (
                                  <LockKeyhole size={17} />
                                ) : (
                                  <Play size={17} />
                                )}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-medium text-slate-800">
                                  {lesson.title}
                                </span>
                                <span className="mt-1 block text-xs text-slate-500">
                                  {lesson.duration}
                                  {done ? " · Completed" : ""}
                                </span>
                              </span>
                              <ArrowRight
                                size={17}
                                className="shrink-0 text-slate-400"
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-[#172B75]">
              Course information
            </h2>
            <div className="mt-6 space-y-5">
              <InfoRow
                icon={Clock}
                label="Duration"
                value={courseInfo.duration}
              />
              <InfoRow
                icon={BookOpen}
                label="Lessons"
                value={`${allLessons.length} sample lessons`}
              />
              <InfoRow
                icon={TrendingUp}
                label="Level"
                value={courseInfo.category}
              />
              <InfoRow
                icon={Users}
                label="Learners"
                value={courseInfo.students}
              />
              <InfoRow
                icon={Star}
                label="Rating"
                value={`${courseInfo.rating} / 5`}
              />
            </div>

            <div className="my-6 border-t border-slate-200" />

            {!enrolled ? (
              <button
                onClick={handleEnroll}
                className="w-full rounded-xl bg-[#172B75] px-5 py-4 font-bold text-white transition hover:bg-blue-800"
              >
                Enroll Now — Free Demo
              </button>
            ) : (
              <div className="rounded-xl bg-emerald-50 p-4 text-center">
                <CheckCircle2 className="mx-auto text-emerald-600" size={25} />
                <p className="mt-2 font-bold text-emerald-800">
                  Enrolled in demo
                </p>
                <p className="mt-1 text-xs text-emerald-700">
                  Your progress is temporary and resets on refresh.
                </p>
              </div>
            )}

            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Demo experience only. Real enrollment and course access will
              require backend integration.
            </p>
          </div>
        </aside>
      </main>

      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl bg-[#172B75] px-5 py-4 text-sm font-medium text-white shadow-xl"
        >
          <div className="flex items-center justify-between gap-4">
            <p>{notice}</p>
            <button
              onClick={() => setNotice("")}
              className="shrink-0 text-blue-100 hover:text-white"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Play size={25} />
            </div>
            <p className="text-xs font-bold tracking-widest text-blue-600">
              LESSON PREVIEW
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#172B75]">
              {activeLesson}
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              This is a demo lesson screen. The actual video, lesson material,
              and assessments can be connected later through the backend.
            </p>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setActiveLesson(null)}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={markLessonComplete}
                className="rounded-xl bg-[#172B75] px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
        <Icon size={19} />
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
