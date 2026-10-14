import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";

const learningPath = [
  {
    number: "01",
    title: "Market fundamentals",
    description: "Understand the basics",
  },
  {
    number: "02",
    title: "Technical analysis",
    description: "Study charts and patterns",
  },
  {
    number: "03",
    title: "Company analysis",
    description: "Learn financial concepts",
  },
  {
    number: "04",
    title: "Risk management",
    description: "Understand market risks",
  },
];

const benefits = [
  {
    icon: BookOpen,
    title: "Structured learning",
    description:
      "Learn step by step, from stock market fundamentals to advanced concepts.",
  },
  {
    icon: GraduationCap,
    title: "Learn at your pace",
    description:
      "Explore lessons when it suits you and build your knowledge consistently.",
  },
  {
    icon: ShieldCheck,
    title: "Learn risk awareness",
    description:
      "Understand risk management and responsible investing principles.",
  },
];

const featuredCourses = [
  {
    category: "BEGINNER",
    title: "Stock Market Fundamentals",
    description:
      "Understand how the stock market works, its participants and essential terminology.",
    duration: "4 hours",
    lessons: "18 lessons",
    color: "bg-blue-100 text-blue-800",
  },
  {
    category: "INTERMEDIATE",
    title: "Technical Analysis Masterclass",
    description:
      "Explore chart patterns, trends, support, resistance and technical indicators.",
    duration: "6 hours",
    lessons: "24 lessons",
    color: "bg-violet-100 text-violet-800",
  },
  {
    category: "BEGINNER",
    title: "Fundamentals of Investing",
    description:
      "Discover company fundamentals, financial statements and long-term investing concepts.",
    duration: "5 hours",
    lessons: "20 lessons",
    color: "bg-emerald-100 text-emerald-800",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-white text-slate-900">
      <section className="bg-gradient-to-br from-[#172554] via-[#172B75] to-[#203D83] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-sm text-blue-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Your financial learning journey starts here
            </div>

            <h1 className="mt-9 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[56px]">
              Learn the market.
              <span className="mt-2 block text-blue-300">
                Build your knowledge.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              Explore stock market fundamentals, technical analysis and
              investing concepts through structured online courses. Learn at
              your own pace.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-[#172B75] transition hover:bg-blue-50"
              >
                Explore Courses <ArrowRight size={19} />
              </Link>
              <a
                href="#benefits"
                className="rounded-xl border border-white/25 px-6 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Discover More
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} /> Beginner-friendly
              </span>
              <span className="flex items-center gap-2">
                <BookOpen size={18} /> Structured courses
              </span>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-200">
                  Your learning path
                </p>
                <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                  Start from the basics
                </h2>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <GraduationCap size={30} />
              </span>
            </div>

            <div className="mt-7 space-y-4">
              {learningPath.map((item, index) => (
                <div
                  key={item.number}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#101F50]/50 p-4 sm:p-5"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-extrabold ${
                      index === 0
                        ? "bg-white text-[#172B75]"
                        : "bg-white/10 text-blue-100"
                    }`}
                  >
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-blue-100/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-blue-100/70">
              Educational content builds knowledge but does not guarantee
              investment returns.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:grid-cols-3 lg:px-8">
          {[
            {
              icon: Users,
              title: "Built for learners",
              text: "Start with the essentials",
            },
            {
              icon: ChartNoAxesCombined,
              title: "Practical concepts",
              text: "Understand market terminology",
            },
            {
              icon: ShieldCheck,
              title: "Risk awareness",
              text: "Learn responsible principles",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#172B75]">
                  <Icon size={24} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="courses" className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                Learn something new
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172B75] sm:text-4xl">
                Explore popular courses
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Find a learning path that matches your current knowledge and
                goals.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 font-bold text-blue-700 hover:text-blue-900"
            >
              View all courses <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <article
                key={course.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#172B75] to-blue-500">
                  <ChartNoAxesCombined
                    size={62}
                    strokeWidth={1.5}
                    className="text-white/90"
                  />
                </div>
                <div className="p-6">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${course.color}`}
                  >
                    {course.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {course.title}
                  </h3>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <BookOpen size={16} /> {course.lessons}
                    </span>
                    <span>{course.duration}</span>
                  </div>
                  <Link
                    to="/courses"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#172B75] px-4 py-3 font-semibold text-white transition hover:bg-blue-800"
                  >
                    Explore Course <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
              Why TradeLearn
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172B75] sm:text-4xl">
              Learn with clarity and confidence
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Build your understanding of financial markets with a clear,
              structured learning experience.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 p-7 transition hover:border-blue-200 hover:shadow-lg"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#172B75]">
                    <Icon size={27} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-3xl bg-[#172B75] p-8 text-white sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              Your next step starts here
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Ready to start learning?
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-blue-100">
              Explore our course catalog and start building your financial
              knowledge one lesson at a time.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-[#172B75] transition hover:bg-blue-50"
          >
            Browse Courses <ArrowRight size={19} />
          </Link>
        </div>
      </section>
    </div>
  );
}
