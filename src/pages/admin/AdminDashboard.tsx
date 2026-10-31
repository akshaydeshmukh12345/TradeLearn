import AnalyticsPanel from "./AnalyticsPanel";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Menu,
  TrendingUp,
  Layers,
  ChevronRight,
  RefreshCw,
  UserCircle,
} from "lucide-react";
import "./Admin.css";

const API = "http://localhost:8081/api";

type Section =
  | "overview"
  | "courses"
  | "curriculum"
  | "students"
  | "enrollments"
  | "analytics"
  | "settings";

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  instructor: string;
};

type Student = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  createdAt: string;
};

type Enrollment = {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  courseId: number;
  courseTitle: string;
  coursePrice: number;
  status: string;
  enrolledAt: string;
};

type DashboardAnalytics = {
  totalCourses: number;
  totalStudents: number;
  totalEnrollments: number;
  activeEnrollments: number;
  inactiveEnrollments: number;
};

type ModuleItem = {
  id?: number;
  title?: string;
  name?: string;
  lessons?: Array<{
    id?: number;
    title?: string;
    name?: string;
  }>;
};

type CourseForm = Omit<Course, "id">;

type StudentForm = {
  name: string;
  email: string;
  phone: string;
};

const emptyCourse: CourseForm = {
  title: "",
  description: "",
  category: "",
  level: "Beginner",
  price: 0,
  instructor: "",
};

const emptyStudent: StudentForm = {
  name: "",
  email: "",
  phone: "",
};

const navigation = [
  { section: "overview" as Section, label: "Overview", icon: LayoutDashboard },
  { section: "courses" as Section, label: "Courses", icon: BookOpen },
  { section: "curriculum" as Section, label: "Curriculum", icon: Layers },
  { section: "students" as Section, label: "Students", icon: Users },
  {
    section: "enrollments" as Section,
    label: "Enrollments",
    icon: GraduationCap,
  },
  { section: "analytics" as Section, label: "Analytics", icon: BarChart3 },
];

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const body = await response.json();
      message =
        body.detail || body.message || body.error || body.title || message;
    } catch {
      // Keep the HTTP status message.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export default function AdminDashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [dashboardAnalytics, setDashboardAnalytics] =
    useState<DashboardAnalytics | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [search, setSearch] = useState("");

  const [courseModal, setCourseModal] = useState(false);
  const [studentModal, setStudentModal] = useState(false);
  const [enrollmentModal, setEnrollmentModal] = useState(false);

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [courseForm, setCourseForm] = useState<CourseForm>(emptyCourse);
  const [studentForm, setStudentForm] = useState<StudentForm>(emptyStudent);

  const [enrollmentStudentId, setEnrollmentStudentId] = useState("");
  const [enrollmentCourseId, setEnrollmentCourseId] = useState("");

  const [saving, setSaving] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<number | "">("");
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [curriculumLoading, setCurriculumLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    setError("");

    try {
      const [courseData, studentData, enrollmentData, analyticsData] =
        await Promise.all([
          apiRequest<Course[]>("/courses"),
          apiRequest<Student[]>("/students"),
          apiRequest<Enrollment[]>("/enrollments"),
          apiRequest<DashboardAnalytics>("/analytics/dashboard"),
        ]);

      setCourses(Array.isArray(courseData) ? courseData : []);
      setStudents(Array.isArray(studentData) ? studentData : []);
      setEnrollments(Array.isArray(enrollmentData) ? enrollmentData : []);
      setDashboardAnalytics(analyticsData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialData = async () => {
      try {
        const [courseData, studentData, enrollmentData, analyticsData] =
          await Promise.all([
            apiRequest<Course[]>("/courses"),
            apiRequest<Student[]>("/students"),
            apiRequest<Enrollment[]>("/enrollments"),
            apiRequest<DashboardAnalytics>("/analytics/dashboard"),
          ]);

        if (!cancelled) {
          setCourses(Array.isArray(courseData) ? courseData : []);
          setStudents(Array.isArray(studentData) ? studentData : []);
          setEnrollments(Array.isArray(enrollmentData) ? enrollmentData : []);
          setDashboardAnalytics(analyticsData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load dashboard data.",
          );
        }
      }
    };

    void loadInitialData();

    return () => {
      cancelled = true;
    };
  }, []);
  const activeStudents = students.filter(
    (student) => student.status?.toUpperCase() === "ACTIVE",
  );

  const activeEnrollments = enrollments.filter(
    (enrollment) => enrollment.status?.toUpperCase() === "ACTIVE",
  );

  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return courses;

    return courses.filter((course) =>
      [course.title, course.category, course.level, course.instructor].some(
        (value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(q),
      ),
    );
  }, [courses, search]);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return students;

    return students.filter((student) =>
      [student.name, student.email, student.phone].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [students, search]);

  const filteredEnrollments = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return enrollments;

    return enrollments.filter((enrollment) =>
      [
        enrollment.studentName,
        enrollment.studentEmail,
        enrollment.courseTitle,
        enrollment.status,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [enrollments, search]);

  const showMessage = (message: string) => {
    setNotice(message);
    setError("");
  };

  const showError = (message: string) => {
    setError(message);
    setNotice("");
  };

  // COURSE MANAGEMENT

  const openAddCourse = () => {
    setEditingCourse(null);
    setCourseForm(emptyCourse);
    setCourseModal(true);
  };

  const openEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title ?? "",
      description: course.description ?? "",
      category: course.category ?? "",
      level: course.level ?? "Beginner",
      price: Number(course.price ?? 0),
      instructor: course.instructor ?? "",
    });
    setCourseModal(true);
  };

  const saveCourse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const isEditing = Boolean(editingCourse);

      await apiRequest(
        isEditing ? `/courses/${editingCourse!.id}` : "/courses",
        {
          method: isEditing ? "PUT" : "POST",
          body: JSON.stringify({
            ...courseForm,
            price: Number(courseForm.price),
          }),
        },
      );

      setCourseModal(false);
      setCourseForm(emptyCourse);
      setEditingCourse(null);

      showMessage(isEditing ? "Course updated." : "Course created.");
      await refreshData();
    } catch (err) {
      showError(err instanceof Error ? err.message : "Course save failed.");
    } finally {
      setSaving(false);
    }
  };

  const deleteCourse = async (course: Course) => {
    if (!window.confirm(`Delete course "${course.title}"?`)) return;

    try {
      await apiRequest(`/courses/${course.id}`, { method: "DELETE" });
      showMessage("Course deleted successfully.");
      await refreshData();
    } catch (err) {
      showError(
        err instanceof Error
          ? err.message
          : "Delete enrollments before deleting this course.",
      );
    }
  };

  // STUDENT MANAGEMENT

  const openAddStudent = () => {
    setEditingStudent(null);
    setStudentForm(emptyStudent);
    setStudentModal(true);
  };

  const openEditStudent = (student: Student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name,
      email: student.email,
      phone: student.phone ?? "",
    });
    setStudentModal(true);
  };

  const saveStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const isEditing = Boolean(editingStudent);

      await apiRequest(
        isEditing ? `/students/${editingStudent!.id}` : "/students",
        {
          method: isEditing ? "PUT" : "POST",
          body: JSON.stringify(studentForm),
        },
      );

      setStudentModal(false);
      setStudentForm(emptyStudent);
      setEditingStudent(null);

      showMessage(isEditing ? "Student updated." : "Student registered.");
      await refreshData();
    } catch (err) {
      showError(err instanceof Error ? err.message : "Student save failed.");
    } finally {
      setSaving(false);
    }
  };

  const toggleStudentStatus = async (student: Student) => {
    const nextStatus =
      student.status?.toUpperCase() === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      await apiRequest(`/students/${student.id}/status?status=${nextStatus}`, {
        method: "PATCH",
      });

      showMessage(`Student status changed to ${nextStatus}.`);
      await refreshData();
    } catch (err) {
      showError(err instanceof Error ? err.message : "Status update failed.");
    }
  };

  const deleteStudent = async (student: Student) => {
    if (!window.confirm(`Delete student "${student.name}"?`)) return;

    try {
      await apiRequest(`/students/${student.id}`, { method: "DELETE" });
      showMessage("Student deleted successfully.");
      await refreshData();
    } catch (err) {
      showError(
        err instanceof Error
          ? err.message
          : "Delete this student's enrollments first.",
      );
    }
  };

  // ENROLLMENT MANAGEMENT

  const openEnrollmentModal = () => {
    setEnrollmentStudentId("");
    setEnrollmentCourseId("");
    setEnrollmentModal(true);
  };

  const createEnrollment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!enrollmentStudentId || !enrollmentCourseId) {
      showError("Please select both a student and a course.");
      return;
    }

    setSaving(true);

    try {
      await apiRequest("/enrollments", {
        method: "POST",
        body: JSON.stringify({
          studentId: Number(enrollmentStudentId),
          courseId: Number(enrollmentCourseId),
        }),
      });

      setEnrollmentModal(false);
      showMessage("Student enrolled successfully.");
      await refreshData();
    } catch (err) {
      showError(
        err instanceof Error ? err.message : "Enrollment creation failed.",
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleEnrollmentStatus = async (enrollment: Enrollment) => {
    const nextStatus =
      enrollment.status?.toUpperCase() === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      await apiRequest(
        `/enrollments/${enrollment.id}/status?status=${nextStatus}`,
        { method: "PATCH" },
      );

      showMessage(`Enrollment changed to ${nextStatus}.`);
      await refreshData();
    } catch (err) {
      showError(err instanceof Error ? err.message : "Status update failed.");
    }
  };

  const deleteEnrollment = async (enrollment: Enrollment) => {
    if (!window.confirm("Delete this enrollment?")) return;

    try {
      await apiRequest(`/enrollments/${enrollment.id}`, {
        method: "DELETE",
      });

      showMessage("Enrollment deleted.");
      await refreshData();
    } catch (err) {
      showError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  // CURRICULUM

  const loadCurriculum = async (courseId: number) => {
    setSelectedCourse(courseId);
    setCurriculumLoading(true);
    setModules([]);

    try {
      const data = await apiRequest<ModuleItem[]>(
        `/courses/${courseId}/curriculum`,
      );

      setModules(Array.isArray(data) ? data : []);
    } catch (err) {
      showError(err instanceof Error ? err.message : "Curriculum load failed.");
    } finally {
      setCurriculumLoading(false);
    }
  };

  const pageTitle =
    navigation.find((item) => item.section === section)?.label ?? "Settings";

  const renderOverview = () => (
    <>
      <div className="admin-welcome">
        <div>
          <p className="admin-eyebrow">ADMINISTRATION</p>
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with TradeLearn.</p>
        </div>
        <button
          className="admin-outline-button"
          onClick={() => void refreshData()}
          disabled={loading}
        >
          <RefreshCw size={16} /> {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="admin-stats-grid">
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={String(dashboardAnalytics?.totalCourses ?? courses.length)}
          detail="Courses in catalog"
        />
        <StatCard
          icon={Users}
          label="Total Students"
          value={String(dashboardAnalytics?.totalStudents ?? students.length)}
          detail={`${activeStudents.length} active students`}
        />
        <StatCard
          icon={GraduationCap}
          label="Total Enrollments"
          value={String(
            dashboardAnalytics?.totalEnrollments ?? enrollments.length,
          )}
          detail="All course registrations"
        />
        <StatCard
          icon={TrendingUp}
          label="Active Enrollments"
          value={String(
            dashboardAnalytics?.activeEnrollments ?? activeEnrollments.length,
          )}
          detail="Currently active registrations"
        />
      </div>

      <div className="admin-content-grid">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent Students</h2>
              <p>Latest registered learners</p>
            </div>
            <button
              className="admin-text-button"
              onClick={() => setSection("students")}
            >
              View all <ChevronRight size={15} />
            </button>
          </div>

          {students.length === 0 ? (
            <div className="admin-empty">No students registered yet.</div>
          ) : (
            <div className="admin-mini-list">
              {students
                .slice(-5)
                .reverse()
                .map((student) => (
                  <div className="admin-mini-row" key={student.id}>
                    <div className="admin-course-icon">
                      <Users size={18} />
                    </div>
                    <div className="admin-mini-info">
                      <strong>{student.name}</strong>
                      <span>{student.email}</span>
                    </div>
                    <span className="admin-level-tag">{student.status}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Manage your platform</p>
            </div>
          </div>

          <button className="admin-quick-action" onClick={openAddStudent}>
            <span className="quick-action-icon">
              <Plus size={18} />
            </span>
            <span>
              <strong>Add Student</strong>
              <small>Register a new learner</small>
            </span>
            <ChevronRight size={17} />
          </button>

          <button className="admin-quick-action" onClick={openEnrollmentModal}>
            <span className="quick-action-icon">
              <GraduationCap size={18} />
            </span>
            <span>
              <strong>Create Enrollment</strong>
              <small>Enroll a student in a course</small>
            </span>
            <ChevronRight size={17} />
          </button>

          <button className="admin-quick-action" onClick={openAddCourse}>
            <span className="quick-action-icon">
              <BookOpen size={18} />
            </span>
            <span>
              <strong>Add Course</strong>
              <small>Create a new course</small>
            </span>
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </>
  );

  const renderCourses = () => (
    <>
      <div className="admin-welcome">
        <div>
          <p className="admin-eyebrow">CONTENT MANAGEMENT</p>
          <h1>Course Management</h1>
          <p>Add, update, search and manage your courses.</p>
        </div>
        <button className="admin-primary-button" onClick={openAddCourse}>
          <Plus size={17} /> Add Course
        </button>
      </div>

      <div className="admin-panel">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search courses..."
        />
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Level</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <strong>{course.title}</strong>
                    <br />
                    <small>#{course.id}</small>
                  </td>
                  <td>{course.category}</td>
                  <td>
                    <span className="admin-level-tag">{course.level}</span>
                  </td>
                  <td>{course.instructor}</td>
                  <td>₹{Number(course.price).toLocaleString("en-IN")}</td>
                  <td>
                    <ActionButtons
                      onEdit={() => openEditCourse(course)}
                      onDelete={() => void deleteCourse(course)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filteredCourses.length === 0 && (
            <div className="admin-empty">No courses found.</div>
          )}
        </div>
      </div>
    </>
  );

  const renderStudents = () => (
    <>
      <div className="admin-welcome">
        <div>
          <p className="admin-eyebrow">USER MANAGEMENT</p>
          <h1>Student Management</h1>
          <p>Register, search and manage your learners.</p>
        </div>
        <button className="admin-primary-button" onClick={openAddStudent}>
          <Plus size={17} /> Add Student
        </button>
      </div>

      <div className="admin-stats-grid">
        <StatCard
          icon={Users}
          label="All Students"
          value={String(students.length)}
          detail="Registered students"
        />
        <StatCard
          icon={TrendingUp}
          label="Active"
          value={String(activeStudents.length)}
          detail="Active accounts"
        />
      </div>

      <div className="admin-panel">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name, email or phone..."
        />

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="admin-table-course">
                      <div className="admin-course-icon">
                        <UserCircle size={18} />
                      </div>
                      <div>
                        <strong>{student.name}</strong>
                        <span>#{student.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{student.email}</td>
                  <td>{student.phone || "—"}</td>
                  <td>
                    {student.createdAt
                      ? new Date(student.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`admin-level-tag ${student.status === "ACTIVE" ? "" : "inactive-tag"}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button
                        className="admin-icon-button"
                        title="Edit"
                        onClick={() => openEditStudent(student)}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-icon-button"
                        title="Change status"
                        onClick={() => void toggleStudentStatus(student)}
                      >
                        <RefreshCw size={15} />
                      </button>
                      <button
                        className="admin-icon-button danger"
                        title="Delete"
                        onClick={() => void deleteStudent(student)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filteredStudents.length === 0 && (
            <div className="admin-empty">
              <Users size={30} />
              <strong>No students found</strong>
              <span>Add your first student to get started.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderEnrollments = () => (
    <>
      <div className="admin-welcome">
        <div>
          <p className="admin-eyebrow">LEARNING ACCESS</p>
          <h1>Enrollment Management</h1>
          <p>Manage student course registrations.</p>
        </div>
        <button
          className="admin-primary-button"
          onClick={openEnrollmentModal}
          disabled={!students.length || !courses.length}
        >
          <Plus size={17} /> Enroll Student
        </button>
      </div>

      <div className="admin-stats-grid">
        <StatCard
          icon={GraduationCap}
          label="Total Enrollments"
          value={String(enrollments.length)}
          detail="All course registrations"
        />
        <StatCard
          icon={TrendingUp}
          label="Active Enrollments"
          value={String(activeEnrollments.length)}
          detail="Currently active"
        />
      </div>

      <div className="admin-panel">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search student or course..."
        />

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Price</th>
                <th>Enrolled Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td>
                    <strong>{enrollment.studentName}</strong>
                    <br />
                    <small>{enrollment.studentEmail}</small>
                  </td>
                  <td>{enrollment.courseTitle}</td>
                  <td>
                    ₹{Number(enrollment.coursePrice).toLocaleString("en-IN")}
                  </td>
                  <td>
                    {enrollment.enrolledAt
                      ? new Date(enrollment.enrolledAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <span className="admin-level-tag">{enrollment.status}</span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button
                        className="admin-icon-button"
                        title="Change status"
                        onClick={() => void toggleEnrollmentStatus(enrollment)}
                      >
                        <RefreshCw size={15} />
                      </button>
                      <button
                        className="admin-icon-button danger"
                        title="Delete enrollment"
                        onClick={() => void deleteEnrollment(enrollment)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && filteredEnrollments.length === 0 && (
            <div className="admin-empty">
              <GraduationCap size={30} />
              <strong>No enrollments yet</strong>
              <span>
                Enroll a student in a course to see registrations here.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderCurriculum = () => (
    <>
      <div className="admin-welcome">
        <div>
          <p className="admin-eyebrow">LEARNING CONTENT</p>
          <h1>Curriculum</h1>
          <p>Explore course modules and lessons.</p>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-field admin-curriculum-select">
          <label htmlFor="curriculum-course">Select a course</label>
          <select
            id="curriculum-course"
            value={selectedCourse}
            onChange={(event) => {
              const id = Number(event.target.value);
              if (id) void loadCurriculum(id);
              else {
                setSelectedCourse("");
                setModules([]);
              }
            }}
          >
            <option value="">Choose a course...</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {curriculumLoading && (
          <div className="admin-empty">Loading curriculum...</div>
        )}

        <div className="admin-module-list">
          {modules.map((module, index) => (
            <div className="admin-module-card" key={module.id ?? index}>
              <div className="admin-module-heading">
                <span className="admin-module-number">{index + 1}</span>
                <div>
                  <strong>
                    {module.title || module.name || `Module ${index + 1}`}
                  </strong>
                  <span>{module.lessons?.length ?? 0} lessons</span>
                </div>
              </div>
              {module.lessons?.map((lesson, lessonIndex) => (
                <div
                  className="admin-lesson-row"
                  key={lesson.id ?? lessonIndex}
                >
                  <BookOpen size={15} />
                  <span>
                    {lesson.title || lesson.name || `Lesson ${lessonIndex + 1}`}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="admin-muted-note">
          Curriculum is currently read-only. Module and lesson editing needs
          additional backend endpoints.
        </p>
      </div>
    </>
  );

  // LIVE ANALYTICS COMPONENT
  const renderAnalytics = () => <AnalyticsPanel />;

  const renderSettings = () => (
    <>
      <div className="admin-welcome">
        <div>
          <p className="admin-eyebrow">PREFERENCES</p>
          <h1>Admin Settings</h1>
          <p>Platform information.</p>
        </div>
      </div>
      <div className="admin-panel admin-settings-card">
        <div className="admin-profile-avatar">
          <UserCircle size={38} />
        </div>
        <div>
          <h2>TradeLearn Administrator</h2>
          <p>Admin dashboard</p>
          <span className="admin-level-tag">Local development</span>
        </div>
      </div>
      <div className="admin-panel admin-settings-info">
        <h2>Platform information</h2>
        <div className="admin-setting-row">
          <span>Application</span>
          <strong>TradeLearn</strong>
        </div>
        <div className="admin-setting-row">
          <span>Backend API</span>
          <strong>localhost:8081</strong>
        </div>
        <div className="admin-setting-row">
          <span>Database</span>
          <strong>MySQL</strong>
        </div>
      </div>
    </>
  );

  return (
    <div className="admin-root">
      {sidebarOpen && (
        <button
          className="admin-mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark">T</div>
          <div>
            <strong>TradeLearn</strong>
            <span>ADMIN PANEL</span>
          </div>
          <button
            className="admin-close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={19} />
          </button>
        </div>

        <div className="admin-nav-label">MENU</div>

        <nav className="admin-navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.section}
                className={`admin-nav-item ${section === item.section ? "active" : ""}`}
                onClick={() => {
                  setSection(item.section);
                  setSearch("");
                  setSidebarOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <button
            className={`admin-nav-item ${section === "settings" ? "active" : ""}`}
            onClick={() => setSection("settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="admin-sidebar-user">
            <div className="admin-user-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>Platform admin</span>
            </div>
          </div>

          <button
            className="admin-logout-button"
            onClick={() => (window.location.href = "/")}
          >
            <LogOut size={17} /> Back to website
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>
            <div className="admin-breadcrumb">
              Admin <ChevronRight size={14} /> {pageTitle}
            </div>
          </div>

          <div className="admin-topbar-right">
            <span className="admin-online-dot" />
            <span>System online</span>
            <div className="admin-top-avatar">A</div>
          </div>
        </header>

        <div className="admin-page-content">
          {error && <div className="admin-error">{error}</div>}
          {notice && <div className="admin-notice">{notice}</div>}
          {loading && (
            <div className="admin-muted-note">Refreshing dashboard data...</div>
          )}

          {section === "overview" && renderOverview()}
          {section === "courses" && renderCourses()}
          {section === "curriculum" && renderCurriculum()}
          {section === "students" && renderStudents()}
          {section === "enrollments" && renderEnrollments()}
          {section === "analytics" && renderAnalytics()}
          {section === "settings" && renderSettings()}
        </div>
      </main>

      {/* COURSE MODAL */}
      {courseModal && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={() => setCourseModal(false)}
        >
          <div
            className="admin-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <p className="admin-eyebrow">COURSE MANAGEMENT</p>
                <h2>{editingCourse ? "Edit Course" : "Add New Course"}</h2>
              </div>
              <button
                className="admin-icon-button"
                onClick={() => setCourseModal(false)}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={saveCourse}>
              <Field label="Course title">
                <input
                  required
                  value={courseForm.title}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, title: e.target.value })
                  }
                />
              </Field>
              <Field label="Description">
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) =>
                    setCourseForm({
                      ...courseForm,
                      description: e.target.value,
                    })
                  }
                />
              </Field>
              <div className="admin-form-grid">
                <Field label="Category">
                  <input
                    required
                    value={courseForm.category}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, category: e.target.value })
                    }
                  />
                </Field>
                <Field label="Level">
                  <select
                    value={courseForm.level}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, level: e.target.value })
                    }
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </Field>
                <Field label="Price (₹)">
                  <input
                    type="number"
                    min="0"
                    required
                    value={courseForm.price}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </Field>
                <Field label="Instructor">
                  <input
                    required
                    value={courseForm.instructor}
                    onChange={(e) =>
                      setCourseForm({
                        ...courseForm,
                        instructor: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>
              <ModalActions
                saving={saving}
                onCancel={() => setCourseModal(false)}
                label={editingCourse ? "Save Changes" : "Create Course"}
              />
            </form>
          </div>
        </div>
      )}

      {/* STUDENT MODAL */}
      {studentModal && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={() => setStudentModal(false)}
        >
          <div
            className="admin-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <p className="admin-eyebrow">STUDENT MANAGEMENT</p>
                <h2>{editingStudent ? "Edit Student" : "Register Student"}</h2>
              </div>
              <button
                className="admin-icon-button"
                onClick={() => setStudentModal(false)}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={saveStudent}>
              <Field label="Full name">
                <input
                  required
                  maxLength={100}
                  value={studentForm.name}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, name: e.target.value })
                  }
                />
              </Field>
              <Field label="Email address">
                <input
                  type="email"
                  required
                  value={studentForm.email}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, email: e.target.value })
                  }
                />
              </Field>
              <Field label="Phone number">
                <input
                  type="tel"
                  value={studentForm.phone}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, phone: e.target.value })
                  }
                />
              </Field>
              <ModalActions
                saving={saving}
                onCancel={() => setStudentModal(false)}
                label={editingStudent ? "Save Changes" : "Register Student"}
              />
            </form>
          </div>
        </div>
      )}

      {/* ENROLLMENT MODAL */}
      {enrollmentModal && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={() => setEnrollmentModal(false)}
        >
          <div
            className="admin-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <p className="admin-eyebrow">ENROLLMENT MANAGEMENT</p>
                <h2>Enroll Student</h2>
              </div>
              <button
                className="admin-icon-button"
                onClick={() => setEnrollmentModal(false)}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={createEnrollment}>
              <Field label="Select student">
                <select
                  required
                  value={enrollmentStudentId}
                  onChange={(e) => setEnrollmentStudentId(e.target.value)}
                >
                  <option value="">Choose student...</option>
                  {activeStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} — {student.email}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Select course">
                <select
                  required
                  value={enrollmentCourseId}
                  onChange={(e) => setEnrollmentCourseId(e.target.value)}
                >
                  <option value="">Choose course...</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} — ₹{course.price}
                    </option>
                  ))}
                </select>
              </Field>

              <p className="admin-muted-note">
                Duplicate enrollments are prevented by the backend.
              </p>

              <ModalActions
                saving={saving}
                onCancel={() => setEnrollmentModal(false)}
                label="Create Enrollment"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="admin-toolbar">
      <div className="admin-search">
        <Search size={17} />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function ActionButtons({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="admin-row-actions">
      <button className="admin-icon-button" title="Edit" onClick={onEdit}>
        <Pencil size={15} />
      </button>
      <button
        className="admin-icon-button danger"
        title="Delete"
        onClick={onDelete}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function ModalActions({
  saving,
  onCancel,
  label,
}: {
  saving: boolean;
  onCancel: () => void;
  label: string;
}) {
  return (
    <div className="admin-modal-actions">
      <button type="button" className="admin-outline-button" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className="admin-primary-button" disabled={saving}>
        {saving ? "Saving..." : label}
      </button>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-top">
        <span>{label}</span>
        <div className="admin-stat-icon">
          <Icon size={19} />
        </div>
      </div>
      <strong className="admin-stat-value">{value}</strong>
      <span className="admin-stat-detail">{detail}</span>
    </div>
  );
}
