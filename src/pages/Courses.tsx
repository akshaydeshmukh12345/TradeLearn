import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock3,
  BookOpen,
  ChartNoAxesCombined,
  ArrowRight,
  X,
  GraduationCap,
} from "lucide-react";

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  color: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Stock Market Fundamentals",
    description:
      "Understand how the stock market works, trading basics, exchanges and essential financial terminology.",
    category: "Stock Market",
    level: "Beginner",
    duration: "4 hours",
    lessons: 18,
    rating: 4.8,
    students: 1250,
    price: 499,
    originalPrice: 999,
    color: "from-blue-700 to-indigo-500",
  },
  {
    id: 2,
    title: "Technical Analysis Masterclass",
    description:
      "Learn candlestick charts, chart patterns, trends, support, resistance and technical indicators.",
    category: "Technical Analysis",
    level: "Intermediate",
    duration: "8 hours",
    lessons: 32,
    rating: 4.9,
    students: 980,
    price: 899,
    originalPrice: 1499,
    color: "from-violet-700 to-blue-500",
  },
  {
    id: 3,
    title: "Fundamentals of Investing",
    description:
      "Explore company fundamentals, financial statements, valuation concepts and long-term investing.",
    category: "Investing",
    level: "Beginner",
    duration: "5 hours",
    lessons: 20,
    rating: 4.7,
    students: 870,
    price: 599,
    originalPrice: 1199,
    color: "from-emerald-700 to-teal-500",
  },
  {
    id: 4,
    title: "Risk Management Essentials",
    description:
      "Understand position sizing, risk-reward ratios, diversification and responsible risk management.",
    category: "Risk Management",
    level: "Intermediate",
    duration: "3 hours",
    lessons: 14,
    rating: 4.8,
    students: 640,
    price: 399,
    originalPrice: 799,
    color: "from-orange-600 to-amber-400",
  },
  {
    id: 5,
    title: "Advanced Chart Patterns",
    description:
      "Study common chart formations, breakout concepts, market trends and price-action principles.",
    category: "Technical Analysis",
    level: "Advanced",
    duration: "7 hours",
    lessons: 26,
    rating: 4.6,
    students: 520,
    price: 999,
    originalPrice: 1799,
    color: "from-fuchsia-700 to-purple-500",
  },
  {
    id: 6,
    title: "Understanding Company Financials",
    description:
      "Learn to read balance sheets, income statements and cash flow statements for educational analysis.",
    category: "Investing",
    level: "Intermediate",
    duration: "6 hours",
    lessons: 24,
    rating: 4.7,
    students: 730,
    price: 749,
    originalPrice: 1299,
    color: "from-cyan-700 to-sky-500",
  },
  {
    id: 7,
    title: "Trading Psychology",
    description:
      "Explore emotional discipline, common behavioural biases and structured decision-making habits.",
    category: "Stock Market",
    level: "Beginner",
    duration: "3 hours",
    lessons: 12,
    rating: 4.5,
    students: 460,
    price: 349,
    originalPrice: 699,
    color: "from-rose-700 to-pink-500",
  },
  {
    id: 8,
    title: "Portfolio Diversification",
    description:
      "Learn the educational basics of asset allocation, diversification and portfolio risk.",
    category: "Risk Management",
    level: "Advanced",
    duration: "5 hours",
    lessons: 19,
    rating: 4.8,
    students: 390,
    price: 799,
    originalPrice: 1399,
    color: "from-slate-700 to-blue-500",
  },
];

const categories = [
  "All Categories",
  "Stock Market",
  "Technical Analysis",
  "Investing",
  "Risk Management",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [level, setLevel] = useState("All Levels");
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Categories" || course.category === category;

      const matchesLevel = level === "All Levels" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.students - a.students);
    }

    return result;
  }, [search, category, level, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setLevel("All Levels");
    setSort("popular");
  };

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
              <BookOpen size={18} /> Structured lessons
            </span>
            <span className="flex items-center gap-2">
              <ChartNoAxesCombined size={18} /> Practical concepts
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap size={18} /> Learn at your pace
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

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
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
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
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

        {filteredCourses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${course.color}`}
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
                  <div className="flex items-center gap-2 text-sm">
                    <Star
                      size={17}
                      fill="currentColor"
                      className="text-amber-400"
                    />
                    <span className="font-bold text-slate-800">
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-400">
                      ({course.students.toLocaleString("en-IN")} learners)
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug text-[#172B75] transition group-hover:text-blue-700">
                    {course.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>

                  <div className="mt-5 flex items-center gap-5 border-b border-slate-100 pb-5 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <Clock3 size={16} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <BookOpen size={16} />
                      {course.lessons} lessons
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-2xl font-extrabold text-[#172B75]">
                        ₹{course.price.toLocaleString("en-IN")}
                      </span>
                      <span className="ml-2 text-sm text-slate-400 line-through">
                        ₹{course.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
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
          Course details, prices, ratings and learner counts shown here are
          sample data for the frontend demo. Educational content is not
          investment advice.
        </p>
      </section>
    </div>
  );
}
