import type { User } from "../types";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  BookOpen,
  Trophy,
  Settings,
  LogOut,
  Bell,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Play,
  Clock,
  Target,
  Award,
  User as UserIcon,
  Mail,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Stock Market Fundamentals",
    description: "Understand the stock market, exchanges and investing basics.",
    progress: 72,
    completed: 18,
    total: 25,
    category: "Beginner",
  },
  {
    id: 2,
    title: "Technical Analysis Masterclass",
    description: "Learn charts, candlestick patterns and technical indicators.",
    progress: 35,
    completed: 7,
    total: 20,
    category: "Intermediate",
  },
  {
    id: 3,
    title: "Risk Management Essentials",
    description: "Learn position sizing, diversification and risk control.",
    progress: 100,
    completed: 12,
    total: 12,
    category: "Beginner",
  },
];

type Tab = "Overview" | "My Courses" | "Achievements" | "Settings";

const menuItems = [
  { label: "Overview" as Tab, icon: LayoutDashboard },
  { label: "My Courses" as Tab, icon: BookOpen },
  { label: "Achievements" as Tab, icon: Trophy },
  { label: "Settings" as Tab, icon: Settings },
];

export default function Dashboard({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [notifications, setNotifications] = useState(true);
  const [savedMessage, setSavedMessage] = useState("");

  const completedLessons = courses.reduce(
    (sum, course) => sum + course.completed,
    0,
  );

  const totalLessons = courses.reduce((sum, course) => sum + course.total, 0);

  const overallProgress = Math.round(
    courses.reduce((sum, course) => sum + course.progress, 0) / courses.length,
  );

  const completedCourses = courses.filter(
    (course) => course.progress === 100,
  ).length;

  const continueCourse =
    courses.find((course) => course.progress < 100) ?? courses[0];

  const handleSaveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUser = {
      name: name.trim(),
      email: email.trim(),
    };

    try {
      localStorage.setItem("tradelearn_user", JSON.stringify(updatedUser));
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setSavedMessage("Profile settings saved.");
    } catch {
      setSavedMessage("Unable to save settings in this browser.");
    }

    window.setTimeout(() => setSavedMessage(""), 3000);
  };

  const renderOverview = () => (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <p className="mb-3 text-sm font-bold tracking-widest text-blue-600">
            STUDENT DASHBOARD
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[#172B75] md:text-5xl">
            Welcome back, {name || "Student"}!
          </h1>
          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            Keep up your momentum. Every lesson brings you one step closer to
            your goals.
          </p>
        </div>

        <Link
          to="/courses"
          className="inline-flex items-center justify-center gap-3 self-start rounded-xl bg-[#172B75] px-6 py-4 font-semibold text-white hover:bg-blue-800"
        >
          Browse Courses <ArrowRight size={19} />
        </Link>
      </div>

      <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Enrolled Courses",
            value: courses.length,
            note: "Your learning library",
            icon: BookOpen,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Lessons Completed",
            value: completedLessons,
            note: `Out of ${totalLessons} lessons`,
            icon: CheckCircle2,
            color: "bg-emerald-50 text-emerald-600",
          },
          {
            label: "Overall Progress",
            value: `${overallProgress}%`,
            note: "Across your courses",
            icon: ChartNoAxesCombined,
            color: "bg-purple-50 text-purple-600",
          },
          {
            label: "Courses Completed",
            value: completedCourses,
            note: "Keep it up!",
            icon: Trophy,
            color: "bg-amber-50 text-amber-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-600">
                  {stat.label}
                </p>
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-2 text-3xl font-bold text-[#172B75]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{stat.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-9 rounded-3xl bg-gradient-to-r from-[#172B75] to-blue-700 p-6 text-white md:p-8">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold tracking-wide">
          PICK UP WHERE YOU LEFT OFF
        </span>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Continue your learning journey
            </h2>
            <p className="mt-2 max-w-lg leading-7 text-blue-100">
              {continueCourse.title} — you have completed{" "}
              {continueCourse.progress}% of this course.
            </p>
          </div>

          <Link
            to={`/courses/${continueCourse.id}`}
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 font-bold text-[#172B75] hover:bg-blue-50"
          >
            <Play size={16} fill="currentColor" />
            Continue Lesson
          </Link>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm text-blue-100">
            <span>Your progress</span>
            <span>{continueCourse.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${continueCourse.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#172B75]">Your courses</h2>
        <button
          onClick={() => setActiveTab("My Courses")}
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          View all
        </button>
      </div>

      <CourseList items={courses.slice(0, 2)} />
    </>
  );

  const renderMyCourses = () => (
    <section>
      <p className="text-sm font-bold tracking-widest text-blue-600">
        YOUR LEARNING LIBRARY
      </p>
      <h1 className="mt-3 text-4xl font-bold text-[#172B75]">My Courses</h1>
      <p className="mt-3 text-slate-600">
        Track your progress and continue learning at your own pace.
      </p>

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <CourseList items={courses} />
      </div>
    </section>
  );

  const renderAchievements = () => {
    const achievements = [
      {
        title: "First Steps",
        description: "Start your financial learning journey.",
        icon: GraduationCap,
        unlocked: true,
      },
      {
        title: "Lesson Champion",
        description: "Complete 10 lessons.",
        icon: Target,
        unlocked: completedLessons >= 10,
      },
      {
        title: "Course Finisher",
        description: "Complete your first course.",
        icon: Trophy,
        unlocked: completedCourses >= 1,
      },
      {
        title: "Knowledge Seeker",
        description: "Complete 50 lessons.",
        icon: Award,
        unlocked: completedLessons >= 50,
      },
    ];

    return (
      <section>
        <p className="text-sm font-bold tracking-widest text-blue-600">
          YOUR MILESTONES
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[#172B75]">Achievements</h1>
        <p className="mt-3 text-slate-600">
          Celebrate your progress and keep building your knowledge.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;

            return (
              <div
                key={achievement.title}
                className={`rounded-2xl border p-6 ${
                  achievement.unlocked
                    ? "border-blue-200 bg-white shadow-sm"
                    : "border-slate-200 bg-slate-100 opacity-70"
                }`}
              >
                <div
                  className={`mb-4 inline-flex rounded-2xl p-4 ${
                    achievement.unlocked
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Icon size={28} />
                </div>

                <h2 className="text-xl font-bold text-[#172B75]">
                  {achievement.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {achievement.description}
                </p>
                <p
                  className={`mt-4 text-sm font-semibold ${
                    achievement.unlocked ? "text-emerald-700" : "text-slate-500"
                  }`}
                >
                  {achievement.unlocked
                    ? "Achievement unlocked"
                    : "Keep learning to unlock"}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderSettings = () => (
    <section className="max-w-2xl">
      <p className="text-sm font-bold tracking-widest text-blue-600">
        ACCOUNT PREFERENCES
      </p>
      <h1 className="mt-3 text-4xl font-bold text-[#172B75]">Settings</h1>
      <p className="mt-3 text-slate-600">
        Manage your profile and dashboard preferences.
      </p>

      <form
        onSubmit={handleSaveSettings}
        className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Display name
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4">
            <UserIcon size={18} className="text-slate-400" />
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full py-3 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email address
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4">
            <Mail size={18} className="text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full py-3 outline-none"
              placeholder="student@example.com"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
          <div>
            <p className="font-semibold text-slate-800">Notifications</p>
            <p className="mt-1 text-sm text-slate-500">
              Enable dashboard notification preferences.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={notifications}
            onClick={() => setNotifications(!notifications)}
            className={`relative h-7 w-12 rounded-full transition ${
              notifications ? "bg-blue-700" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                notifications ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-[#172B75] px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Save Settings
        </button>

        {savedMessage && (
          <p role="status" className="text-sm font-medium text-emerald-700">
            {savedMessage}
          </p>
        )}

        <p className="text-xs leading-5 text-slate-500">
          Profile details are stored locally in this browser. Real account
          updates require backend integration.
        </p>
      </form>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="rounded-xl bg-[#172B75] p-3 text-white">
              <ChartNoAxesCombined size={25} />
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-[#172B75]">
              Trade<span className="text-blue-600">Learn</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 md:gap-7">
            <Link
              to="/courses"
              className="hidden font-medium text-slate-700 hover:text-blue-700 sm:block"
            >
              Explore Courses
            </Link>

            <button
              onClick={() =>
                window.alert(
                  notifications
                    ? "You are all caught up!"
                    : "Notifications are disabled in Settings.",
                )
              }
              aria-label="Notifications"
              className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
            >
              <Bell size={22} />
              {notifications && (
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
              )}
            </button>

            <div
              title={name}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-[#172B75]"
            >
              {(name.trim()[0] || "S").toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] md:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white p-5 md:min-h-[calc(100vh-73px)] md:border-b-0 md:border-r md:p-6">
          <p className="mb-4 px-3 text-xs font-bold tracking-widest text-slate-400">
            LEARNING SPACE
          </p>

          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left font-medium transition ${
                    active
                      ? "bg-blue-50 text-[#172B75]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {item.label === "My Courses" && (
                    <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-xs">
                      {courses.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 hidden rounded-2xl bg-gradient-to-br from-[#172B75] to-blue-700 p-5 text-white md:block">
            <div className="mb-4 inline-flex rounded-xl bg-white/15 p-3">
              <GraduationCap size={25} />
            </div>
            <h3 className="font-bold">Keep learning!</h3>
            <p className="mt-1 text-sm leading-6 text-blue-100">
              Small steps every day build strong financial knowledge.
            </p>
            <button
              onClick={() => setActiveTab("My Courses")}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold hover:underline"
            >
              My courses <ArrowRight size={16} />
            </button>
          </div>

          <Link
            to="/"
            className="mt-7 hidden items-center gap-3 px-3 py-3 text-slate-600 hover:text-blue-700 md:flex"
          >
            <ArrowRight size={19} />
            Back to home
          </Link>

          <button
            onClick={onLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </aside>

        <main className="min-w-0 p-5 md:p-8 xl:p-10">
          {activeTab === "Overview" && renderOverview()}
          {activeTab === "My Courses" && renderMyCourses()}
          {activeTab === "Achievements" && renderAchievements()}
          {activeTab === "Settings" && renderSettings()}
        </main>
      </div>
    </div>
  );
}

function CourseList({ items }: { items: typeof courses }) {
  return (
    <>
      {items.map((course) => (
        <article
          key={course.id}
          className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {course.category}
              </span>
              <h3 className="mt-3 text-lg font-bold text-[#172B75]">
                {course.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {course.description}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <BookOpen size={23} />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <Clock size={16} />
            <span>
              {course.completed} of {course.total} lessons completed
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-[#172B75]">
              {course.progress}% complete
            </span>

            {course.progress === 100 ? (
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                <CheckCircle2 size={17} />
                Completed
              </span>
            ) : (
              <Link
                to={`/courses/${course.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#172B75] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                <Play size={15} />
                Continue
              </Link>
            )}
          </div>
        </article>
      ))}
    </>
  );
}
