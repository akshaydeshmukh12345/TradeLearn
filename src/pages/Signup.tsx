import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChartNoAxesCombined,
  User,
  Mail,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

export default function Signup({
  onSignup,
}: {
  onSignup: (name: string, email: string) => boolean;
}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (onSignup(name, email)) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Unable to create your demo account. Please try again.");
    }
  };

  return (
    <div className="grid min-h-[80vh] bg-slate-50 lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-gradient-to-br from-[#101F55] to-blue-700 p-12 text-white lg:flex">
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-extrabold"
        >
          <ChartNoAxesCombined size={32} /> TradeLearn
        </Link>
        <div className="max-w-lg">
          <h1 className="text-5xl font-extrabold leading-tight">
            Start building your financial knowledge today.
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Learn market fundamentals and grow your skills step by step.
          </p>
        </div>
        <p className="text-sm text-blue-100">TradeLearn · Learn at your pace</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <Link
            to="/"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            ← Back to home
          </Link>
          <h2 className="mt-7 text-3xl font-extrabold text-[#172B75]">
            Create account
          </h2>
          <p className="mt-3 text-slate-600">
            Sign up to start your learning journey.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-blue-600">
                <User size={19} className="text-slate-400" />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  className="w-full py-3.5 outline-none"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-blue-600">
                <Mail size={19} className="text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full py-3.5 outline-none"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-blue-600">
                <LockKeyhole size={19} className="text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full py-3.5 outline-none"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#172B75] py-4 font-bold text-white hover:bg-blue-800"
            >
              Create account <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-700 hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Demo only: account details are stored in this browser, not on a
            server.
          </p>
        </div>
      </section>
    </div>
  );
}
