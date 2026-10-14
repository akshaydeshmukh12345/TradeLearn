import { Link } from "react-router-dom";
import { ChartNoAxesCombined, ArrowRight, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#101F55] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-8 md:py-16">
        {/* Footer columns */}
        <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {/* Column 1: Brand */}
          <div className="w-full min-w-0 text-left">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#172B75]">
                <ChartNoAxesCombined size={27} />
              </span>
              <span className="whitespace-nowrap text-2xl font-extrabold tracking-tight">
                Trade<span className="text-blue-400">Learn</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-blue-100">
              Learn stock market fundamentals, technical analysis and investing
              concepts through structured online courses.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="w-full min-w-0 text-left">
            <h3 className="text-base font-bold">Explore</h3>

            <ul className="mt-5 space-y-3 text-sm text-blue-100">
              <li>
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="transition hover:text-white">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/#benefits" className="transition hover:text-white">
                  Why TradeLearn
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Learning Topics */}
          <div className="w-full min-w-0 text-left">
            <h3 className="text-base font-bold">Learning Topics</h3>

            <ul className="mt-5 space-y-3 text-sm text-blue-100">
              <li>
                <Link to="/courses" className="transition hover:text-white">
                  Stock Market Basics
                </Link>
              </li>
              <li>
                <Link to="/courses/2" className="transition hover:text-white">
                  Technical Analysis
                </Link>
              </li>
              <li>
                <Link to="/courses" className="transition hover:text-white">
                  Company Analysis
                </Link>
              </li>
              <li>
                <Link to="/courses/3" className="transition hover:text-white">
                  Risk Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Start Learning */}
          <div className="w-full min-w-0 text-left">
            <h3 className="text-base font-bold">Start Learning</h3>

            <p className="mt-5 max-w-xs text-sm leading-6 text-blue-100">
              Build your financial knowledge at your own pace.
            </p>

            <Link
              to="/courses"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-300 transition hover:text-white"
            >
              Explore Courses
              <ArrowRight size={17} />
            </Link>

            <p className="mt-4 flex items-center gap-2 text-sm leading-6 text-blue-100">
              <Mail size={16} className="shrink-0" />
              <span>Learn. Practice. Grow.</span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/15 pt-6 text-center">
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} TradeLearn. All rights reserved.
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-blue-300">
            Educational content is for learning purposes only and is not
            investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
