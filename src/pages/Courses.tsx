import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  ChartNoAxesCombined,
  ArrowRight,
  X,
  GraduationCap,
  UserRound,
  RefreshCw,
} from "lucide-react";

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  instructor: string;
};

const API_URL = "http://localhost:8081/api/courses";

const categories = [
  "All Categories",
  "Stock Market",
  "Technical Analysis",
  "Investing",
  "Risk Management",
  "Intraday",
  "Swing Trading",
  "Futures & Options",
  "Crypto",
  "Forex",
  "Commodities",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const gradients = [
  "from-blue-700 to-indigo-500",
  "from-violet-700 to-blue-500",
  "from-emerald-700 to-teal-500",
  "from-orange-600 to-amber-400",
  "from-fuchsia-700 to-purple-500",
  "from-cyan-700 to-sky-500",
  "from-rose-700 to-pink-500",
  "from-slate-700 to-blue-500",
];

function getGradient(id: number): string {
  return gradients[(Math.max(1, id) - 1) % gradients.length];
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

function isCourseArray(data: unknown): data is Course[] {
  if (!Array.isArray(data)) return false;

  return data.every((item: unknown) => {
    if (typeof item !== "object" || item === null) return false;

    const course = item as Record<string, unknown>;

    return (
      typeof course.id === "number" &&
      typeof course.title === "string" &&
      typeof course.description === "string" &&
      typeof course.category === "string" &&
      typeof course.level === "string" &&
      typeof course.price === "number" &&
      typeof course.instructor === "string"
    );
  });
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [level, setLevel] = useState("All Levels");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadCourses() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!isCourseArray(data)) {
          throw new Error("The API returned invalid course data.");
        }

        if (!cancelled) {
          setCourses(data);
          setError("");
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);

        if (!cancelled) {
          setError(
            "Courses load nahi ho paaye. Check karo ki backend port 8081 par running hai.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCourses();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  function retryLoading() {
    setError("");
    setLoading(true);
    setRetryCount((count) => count + 1);
  }

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = courses.filter((course) => {
      const matchesSearch = [
        course.title,
        course.description,
        course.category,
        course.instructor,
        course.level,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesCategory =
        category === "All Categories" || course.category === category;

      const matchesLevel = level === "All Levels" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [courses, search, category, level, sort]);

  function clearFilters() {
    setSearch("");
    setCategory("All Categories");
    setLevel("All Levels");
    setSort("default");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-[#172554] via-[#172B75] to-[#203D83] px-5 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100">
            <GraduationCap size={17} />
            Your learning journey starts here
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Explore our
            <span className="block text-blue-300">courses</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Discover structured courses covering stock market fundamentals,
            technical analysis, investing and risk management.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-100">
            <span className="flex items-center gap-2">
              <BookOpen size={18} />
              Structured courses
            </span>
            <span className="flex items-center gap-2">
              <ChartNoAxesCombined size={18} />
              Practical concepts
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap size={18} />
              Learn at your pace
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
              Course catalog
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#172B75] sm:text-3xl">
              Find your next course
            </h2>

            <p className="mt-2 text-slate-600">
              Browse courses and choose what you want to learn next.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="font-semibold text-[#172B75]">
              {filteredCourses.length}
            </span>
            {filteredCourses.length === 1 ? "course found" : "courses found"}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses, topics..."
              aria-label="Search courses"
              className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              aria-expanded={showFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-[#172B75] hover:bg-blue-50"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort courses"
              className="min-w-40 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="default">Default order</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#172B75]">
                Filter courses
              </h3>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="level"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Difficulty level
                </label>

                <select
                  id="level"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  {levels.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              Clear all filters
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <RefreshCw size={30} className="mb-4 animate-spin text-blue-700" />
            <p>Loading courses from TradeLearn...</p>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-white px-6 py-16 text-center"
          >
            <h3 className="text-xl font-bold text-red-700">
              Unable to load courses
            </h3>

            <p className="mt-3 text-slate-600">{error}</p>

            <button
              type="button"
              onClick={retryLoading}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#172B75] px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${getGradient(course.id)}`}
                >
                  <ChartNoAxesCombined
                    size={68}
                    strokeWidth={1.4}
                    className="text-white/90 transition duration-300 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#172B75]">
                    {course.category}
                  </span>

                  <span className="absolute right-4 top-4 rounded-full bg-black/15 px-3 py-1.5 text-xs font-semibold text-white">
                    {course.level}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold leading-snug text-[#172B75] transition group-hover:text-blue-700">
                    {course.title}
                  </h3>

                  <p className="mt-3 min-h-[96px] text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-slate-100 pb-5 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <UserRound size={16} />
                      {course.instructor}
                    </span>

                    <span className="text-slate-500">{course.level}</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-2xl font-extrabold text-[#172B75]">
                      {formatPrice(course.price)}
                    </span>

                    <Link
                      to={`/courses/${course.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#172B75] px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                    >
                      Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Search size={40} className="mx-auto text-slate-300" />

            <h3 className="mt-4 text-xl font-bold text-[#172B75]">
              No courses found
            </h3>

            <p className="mt-2 text-slate-500">
              Try a different search term or clear your filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-[#172B75] px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-extrabold text-[#172B75]">
                Not sure where to begin?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Start with Stock Market Fundamentals and build your knowledge
                from the basics.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex shrink-0 items-center gap-2 font-bold text-blue-700 hover:text-blue-900"
            >
              Back to Home <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-slate-500">
          Courses and prices are loaded from the TradeLearn backend. Educational
          content is not investment advice.
        </p>
      </section>
    </div>
  );
}
