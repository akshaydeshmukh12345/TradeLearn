import { Link, NavLink } from "react-router-dom";
import { ChartNoAxesCombined, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-blue-600 ${
      isActive ? "text-blue-600 font-semibold" : "text-slate-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#172B75] text-white">
            <ChartNoAxesCombined size={25} />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-[#172B75]">
            Trade<span className="text-blue-600">Learn</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/courses" className={navLinkClass}>
            Courses
          </NavLink>
          <a
            href="/#benefits"
            className="text-slate-600 transition hover:text-blue-600"
          >
            Why TradeLearn
          </a>
          <a
            href="/#contact"
            className="text-slate-600 transition hover:text-blue-600"
          >
            Contact
          </a>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="/login"
            className="font-semibold text-[#172B75] hover:text-blue-600"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-[#172B75] px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="rounded-lg p-2 text-[#172B75] hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="space-y-4 border-t border-slate-100 bg-white px-6 py-5 md:hidden">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700"
          >
            Home
          </NavLink>

          <NavLink
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700"
          >
            Courses
          </NavLink>

          <a
            href="/#benefits"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700"
          >
            Why TradeLearn
          </a>

          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700"
          >
            Contact
          </a>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block font-semibold text-[#172B75]"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl bg-[#172B75] px-5 py-3 text-center font-semibold text-white hover:bg-blue-800"
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
