import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserProvider";
import { useRoom } from "@/context/RoomProvider";

function TeachersAbsentAdmin() {
  const navigate = useNavigate();
  const { user, teachers, getAllTeachers, addTeachersAbsent, teachersAbsent, getTeachersAbsent, setTeachers } = useUser();
  const { time } = useRoom();
  const [body, setBody] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!user._id) navigate("/login");
    else if (!user.isAdmin) navigate("/bookroom");
  }, [user]);

  React.useEffect(() => {
    if (time !== "closed") { getAllTeachers(); getTeachersAbsent(); }
    else setTeachers([]);
  }, []);

  function handleChange(checked: boolean, teacherId: string) {
    if (!checked) return setBody(prev => prev.filter(t => t !== teacherId));
    const teacher = teachers.find(t => t._id === teacherId);
    if (!teacher) return;
    setBody([...body, teacher._id]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addTeachersAbsent(body);
    setBody([]);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .taa-root { min-height: 100vh; background: #0a0a0f; padding: 48px 24px; font-family: 'DM Sans', sans-serif; }
        .taa-inner { max-width: 780px; margin: 0 auto; }
        .taa-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 12px; }
        .taa-title { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 300; color: white; line-height: 1; margin-bottom: 32px; }
        .taa-title em { font-style: italic; color: rgba(255,255,255,0.35); }
        .taa-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 28px; margin-bottom: 32px; }
        .taa-card-title { font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 20px; }
        .taa-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        @media(max-width:600px) { .taa-grid { grid-template-columns: 1fr; } }
        .taa-check-row { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; cursor: pointer; transition: background 0.15s; }
        .taa-check-row:hover { background: rgba(255,255,255,0.04); }
        .taa-checkbox { width: 16px; height: 16px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.15); background: transparent; cursor: pointer; accent-color: #7c5cfc; }
        .taa-check-label { font-size: 14px; color: rgba(255,255,255,0.65); cursor: pointer; }
        .taa-empty { color: rgba(255,255,255,0.2); font-size: 14px; }
        .taa-submit { margin-top: 20px; padding: 12px 24px; background: linear-gradient(135deg,#7c5cfc,#5c3ef5); border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: white; cursor: pointer; transition: all 0.2s; box-shadow: 0 6px 20px rgba(100,70,255,0.25); }
        .taa-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(100,70,255,0.35); }
        .taa-submit:disabled { opacity: 0.35; cursor: not-allowed; }
        .taa-table-wrap { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden; }
        .taa-table { width: 100%; border-collapse: collapse; }
        .taa-thead th { padding: 14px 20px; text-align: left; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.25); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .taa-tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .taa-tbody tr:last-child { border-bottom: none; }
        .taa-tbody tr:hover { background: rgba(255,255,255,0.03); }
        .taa-tbody td { padding: 14px 20px; font-size: 14px; color: rgba(255,255,255,0.65); }
        .taa-section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-bottom: 16px; }
        .taa-closed { text-align: center; color: rgba(255,80,80,0.7); font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase; margin: 24px 0; }
        .taa-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,80,80,0.7); display: inline-block; margin-right: 8px; box-shadow: 0 0 8px rgba(255,80,80,0.4); }
      `}</style>
      <div className="taa-root">
        <div className="taa-inner">
          <p className="taa-eyebrow">Admin · {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
          <h1 className="taa-title">Mark <em>Absent</em></h1>

          {time === "closed" && <p className="taa-closed">⚠ College is closed today</p>}

          <form onSubmit={handleSubmit}>
            <div className="taa-card">
              <p className="taa-card-title">Select absent teachers</p>
              <div className="taa-grid">
                {teachers.length ? teachers.map((teacher, i) => {
                  if (!teachersAbsent.some(t => t._id === teacher._id) && !teacher.isAdmin)
                    return (
                      <label key={i} className="taa-check-row">
                        <input
                          type="checkbox"
                          className="taa-checkbox"
                          checked={body.includes(teacher._id)}
                          onChange={e => handleChange(e.target.checked, teacher._id)}
                        />
                        <span className="taa-check-label" title={teacher.email}>{teacher.fullName}</span>
                      </label>
                    );
                }) : <span className="taa-empty">No teachers found</span>}
              </div>
              <button type="submit" className="taa-submit" disabled={body.length === 0}>
                Mark as Absent
              </button>
            </div>
          </form>

          <p className="taa-section-label">Currently absent</p>
          <div className="taa-table-wrap">
            <table className="taa-table">
              <thead className="taa-thead">
                <tr><th>Teacher</th><th>Email</th></tr>
              </thead>
              <tbody className="taa-tbody">
                {teachersAbsent.length ? teachersAbsent.map((teacher, i) => (
                  <tr key={i}>
                    <td><span className="taa-dot" /><strong style={{color:"white"}}>{teacher.fullName}</strong></td>
                    <td>{teacher.email}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={2} style={{padding:"32px 20px",textAlign:"center",color:"rgba(255,255,255,0.2)",fontSize:"14px"}}>No teachers absent</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeachersAbsentAdmin;