import { useTimetable } from "@/context/TimetableProvider";
import React from "react";

function Timetable() {
  const { timetable, courses, getCourses, getTimetable } = useTimetable();
  const [body, setBody] = React.useState({ stream: "", course: "", semester: "" });
  const [semester, setSemester] = React.useState<number[]>([]);
  const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  React.useEffect(() => {
    courses.map((course) => {
      if (course.course === body.course) setSemester(course.semester);
    });
  }, [body.course]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getTimetable(body.stream, body.course, body.semester);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .tt-root { min-height:100vh; background:#0a0a0f; padding:48px 24px; font-family:'DM Sans',sans-serif; }
        .tt-inner { max-width:900px; margin:0 auto; }
        .tt-eyebrow { font-size:11px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:12px; }
        .tt-title { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:300; color:white; line-height:1; margin-bottom:32px; }
        .tt-title em { font-style:italic; color:rgba(255,255,255,0.35); }

        .tt-card { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:28px; margin-bottom:32px; }
        .tt-filter-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:24px; }
        @media(max-width:600px){ .tt-filter-row { grid-template-columns:1fr; } }

        .tt-field-label { display:block; font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:8px; }
        .tt-select { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:12px 14px; font-family:'DM Sans',sans-serif; font-size:14px; color:white; outline:none; cursor:pointer; transition:all 0.2s; box-sizing:border-box; }
        .tt-select option { background:#13131f; color:white; }
        .tt-select:focus { background:rgba(255,255,255,0.06); border-color:rgba(150,120,255,0.5); box-shadow:0 0 0 3px rgba(120,90,255,0.1); }
        .tt-select-placeholder { color:rgba(255,255,255,0.25); }

        .tt-submit { padding:12px 28px; background:linear-gradient(135deg,#7c5cfc,#5c3ef5); border:none; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; letter-spacing:0.06em; text-transform:uppercase; color:white; cursor:pointer; transition:all 0.2s; box-shadow:0 6px 20px rgba(100,70,255,0.25); }
        .tt-submit:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 10px 28px rgba(100,70,255,0.35); }
        .tt-submit:disabled { opacity:0.35; cursor:not-allowed; }

        .tt-section-label { font-size:11px; font-weight:500; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; }
        .tt-table-wrap { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; overflow:hidden; overflow-x:auto; }
        .tt-table { width:100%; border-collapse:collapse; min-width:600px; }
        .tt-thead th { padding:14px 20px; text-align:left; font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.25); border-bottom:1px solid rgba(255,255,255,0.06); white-space:nowrap; }
        .tt-tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
        .tt-tbody tr:last-child { border-bottom:none; }
        .tt-tbody tr:hover { background:rgba(255,255,255,0.03); }
        .tt-tbody td { padding:14px 20px; font-size:14px; color:rgba(255,255,255,0.65); white-space:nowrap; }
        .tt-badge { display:inline-block; padding:2px 10px; border-radius:20px; font-size:11px; background:rgba(100,70,255,0.12); color:rgba(150,120,255,0.8); border:1px solid rgba(100,70,255,0.18); }
        .tt-day-badge { display:inline-block; padding:2px 10px; border-radius:20px; font-size:11px; background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.45); border:1px solid rgba(255,255,255,0.08); }
        .tt-empty { padding:48px 20px; text-align:center; color:rgba(255,255,255,0.2); font-size:14px; }
      `}</style>

      <div className="tt-root">
        <div className="tt-inner">
          <p className="tt-eyebrow">Academic · Schedule</p>
          <h1 className="tt-title">Course <em>Timetable</em></h1>

          <form onSubmit={handleSubmit}>
            <div className="tt-card">
              <div className="tt-filter-row">
                <div>
                  <label className="tt-field-label">Stream</label>
                  <select className="tt-select" value={body.stream} onChange={e => { getCourses(e.target.value); setBody({ ...body, stream: e.target.value, course: "", semester: "" }); setSemester([]); }}>
                    <option value="" disabled>Select stream</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="tt-field-label">Course</label>
                  <select className="tt-select" value={body.course} onChange={e => setBody({ ...body, course: e.target.value, semester: "" })} disabled={!courses.length}>
                    <option value="" disabled>Select course</option>
                    {courses.length ? courses.map((course, i) => (
                      <option key={i} value={course.course}>{course.course}</option>
                    )) : <option disabled>No courses</option>}
                  </select>
                </div>
                <div>
                  <label className="tt-field-label">Semester</label>
                  <select className="tt-select" value={body.semester} onChange={e => setBody({ ...body, semester: e.target.value })} disabled={!semester.length}>
                    <option value="" disabled>Select semester</option>
                    {semester.map((sem, i) => (
                      <option key={i} value={sem.toString()}>{semesters[sem - 1]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="tt-submit" disabled={!body.stream || !body.course || !body.semester}>
                View Timetable
              </button>
            </div>
          </form>

          {timetable.classes.length > 0 && (
            <p className="tt-section-label">{timetable.classes.length} classes found</p>
          )}

          <div className="tt-table-wrap">
            <table className="tt-table">
              <thead className="tt-thead">
                <tr>
                  <th>Time</th>
                  <th>Day</th>
                  <th>Subject</th>
                  <th>Room</th>
                  <th>Teacher</th>
                  <th>Paper ID</th>
                </tr>
              </thead>
              <tbody className="tt-tbody">
                {timetable.classes.length ? timetable.classes.map((cls, i) => (
                  <tr key={i}>
                    <td><span className="tt-badge">{cls.allotedTime.split("-").join(" – ")}</span></td>
                    <td><span className="tt-day-badge">{cls.day}</span></td>
                    <td><strong style={{ color: "white" }}>{cls.subject}</strong></td>
                    <td>{cls.allotedRoom?.roomNumber || "—"}</td>
                    <td>{cls.teacher?.fullName || "—"}</td>
                    <td style={{ color: "rgba(255,255,255,0.35)" }}>{cls.paperId}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="tt-empty">Select a stream, course and semester to view the timetable</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Timetable;