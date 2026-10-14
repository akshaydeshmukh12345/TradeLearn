import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import type { User } from "./types";

const STORAGE_KEY = "tradelearn_user";

function readUser(): User | null {
  try {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (!savedUser) return null;

    const parsed: unknown = JSON.parse(savedUser);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "name" in parsed &&
      "email" in parsed &&
      typeof parsed.name === "string" &&
      typeof parsed.email === "string"
    ) {
      return { name: parsed.name, email: parsed.email };
    }

    return null;
  } catch {
    return null;
  }
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(readUser);

  const handleLogin = (email: string, password: string): boolean => {
    if (!email.trim() || !password) return false;

    const savedUser = readUser();

    const nextUser: User = {
      name:
        savedUser?.email.toLowerCase() === email.trim().toLowerCase()
          ? savedUser.name
          : email.trim().split("@")[0],
      email: email.trim(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return true;
  };

  const handleSignup = (name: string, email: string): boolean => {
    if (!name.trim() || !email.trim()) return false;

    const nextUser: User = {
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup onSignup={handleSignup} />
            )
          }
        />

        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
