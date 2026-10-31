import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  RefreshCw,
  BarChart3,
} from "lucide-react";

type CourseAnalytics = {
  courseId: number;
  courseTitle: string;
  enrollmentCount: number;
};

type DashboardAnalytics = {
  totalCourses: number;
  totalStudents: number;
  totalEnrollments: number;
  activeEnrollments: number;
  inactiveEnrollments: number;
  courseAnalytics: CourseAnalytics[];
};

const API = "http://localhost:8081/api/analytics/dashboard";

type StatCardProps = {
  icon: typeof BookOpen;
  label: string;
  value: number;
  detail: string;
};

function StatCard({ icon: Icon, label, value, detail }: StatCardProps) {
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

export default function AnalyticsPanel() {
  const [data, setData] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = useCallback(async () => {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error(`Analytics request failed (${response.status})`);
      }

      const result: DashboardAnalytics = await response.json();
      setData(result);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load analytics.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchAnalytics = async () => {
      try {
        const response = await fetch(API);

        if (!response.ok) {
          throw new Error(`Analytics request failed (${response.status})`);
        }

        const result: DashboardAnalytics = await response.json();

        if (!cancelled) {
          setData(result);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load analytics.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError("");
    void loadAnalytics();
  };

  const maxEnrollments = Math.max(
    1,
    ...(data?.courseAnalytics ?? []).map((course) => course.enrollmentCount),
  );

  return (
    <>
      <div className="admin-welcome">
        <div>
          <p className="admin-eyebrow">PLATFORM PERFORMANCE</p>
          <h1>Analytics</h1>
          <p>Live statistics from your TradeLearn database.</p>
        </div>

        <button
          className="admin-outline-button"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw size={16} />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {loading && !data && (
        <div className="admin-panel admin-empty">
          Loading analytics from backend...
        </div>
      )}

      {data && (
        <>
          <div className="admin-stats-grid">
            <StatCard
              icon={BookOpen}
              label="Total Courses"
              value={data.totalCourses}
              detail="Courses in catalog"
            />
            <StatCard
              icon={Users}
              label="Total Students"
              value={data.totalStudents}
              detail="Registered learners"
            />
            <StatCard
              icon={GraduationCap}
              label="Total Enrollments"
              value={data.totalEnrollments}
              detail="All registrations"
            />
            <StatCard
              icon={TrendingUp}
              label="Active Enrollments"
              value={data.activeEnrollments}
              detail="Currently active"
            />
          </div>

          <div className="admin-content-grid">
            <div className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Enrollment Status</h2>
                  <p>Active and inactive registrations</p>
                </div>
                <BarChart3 size={20} />
              </div>

              <div className="admin-analytics-status">
                <div className="admin-analytics-status-row">
                  <span>Active</span>
                  <strong>{data.activeEnrollments}</strong>
                </div>

                <div className="admin-analytics-track">
                  <div
                    className="admin-analytics-fill active"
                    style={{
                      width: `${
                        data.totalEnrollments
                          ? (data.activeEnrollments / data.totalEnrollments) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>

                <div className="admin-analytics-status-row">
                  <span>Inactive</span>
                  <strong>{data.inactiveEnrollments}</strong>
                </div>

                <div className="admin-analytics-track">
                  <div
                    className="admin-analytics-fill inactive"
                    style={{
                      width: `${
                        data.totalEnrollments
                          ? (data.inactiveEnrollments / data.totalEnrollments) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Enrollment Summary</h2>
                  <p>Current platform totals</p>
                </div>
              </div>

              <div className="admin-analytics-summary">
                <div>
                  <span>Total Enrollments</span>
                  <strong>{data.totalEnrollments}</strong>
                </div>
                <div>
                  <span>Active</span>
                  <strong>{data.activeEnrollments}</strong>
                </div>
                <div>
                  <span>Inactive</span>
                  <strong>{data.inactiveEnrollments}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-panel admin-analytics-courses">
            <div className="admin-panel-heading">
              <div>
                <h2>Course-wise Enrollments</h2>
                <p>Number of students enrolled in each course</p>
              </div>
            </div>

            {data.courseAnalytics.length === 0 ? (
              <div className="admin-empty">No course analytics available.</div>
            ) : (
              <div className="admin-analytics-course-list">
                {data.courseAnalytics.map((course) => (
                  <div className="admin-analytics-course" key={course.courseId}>
                    <div className="admin-analytics-course-heading">
                      <span>{course.courseTitle}</span>
                      <strong>{course.enrollmentCount}</strong>
                    </div>

                    <div className="admin-analytics-track">
                      <div
                        className="admin-analytics-fill"
                        style={{
                          width: `${
                            (course.enrollmentCount / maxEnrollments) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="admin-muted-note">
            Analytics are loaded directly from the backend database. Payment and
            actual revenue tracking are not connected yet.
          </p>
        </>
      )}
    </>
  );
}
