import React from "react";
import { useUser } from "@/context/UserProvider";

function TeachersAbsent() {
  const { teachersAbsent, getTeachersAbsent } = useUser();
  React.useEffect(() => { getTeachersAbsent(); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .ta-root { min-height: 100vh; background: #0a0a0f; padding: 48px 24px; font-family: 'DM Sans', sans-serif; }
        .ta-inner { max-width: 680px; margin: 0 auto; }
        .ta-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 12px; }
        .ta-title { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 300; color: white; line-height: 1; margin-bottom: 32px; }
        .ta-title em { font-style: italic; color: rgba(255,255,255,0.35); }
        .ta-table-wrap { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden; }
        .ta-table { width: 100%; border-collapse: collapse; }
        .ta-thead th { padding: 14px 20px; text-align: left; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.25); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ta-tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .ta-tbody tr:last-child { border-bottom: none; }
        .ta-tbody tr:hover { background: rgba(255,255,255,0.03); }
        .ta-tbody td { padding: 14px 20px; font-size: 14px; color: rgba(255,255,255,0.65); }
        .ta-empty { padding: 48px 20px; text-align: center; color: rgba(255,255,255,0.2); font-size: 14px; }
        .ta-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,80,80,0.7); display: inline-block; margin-right: 8px; box-shadow: 0 0 8px rgba(255,80,80,0.4); }
      `}</style>
      <div className="ta-root">
        <div className="ta-inner">
          <p className="ta-eyebrow">Today · {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
          <h1 className="ta-title">Teachers <em>Absent</em></h1>
          <div className="ta-table-wrap">
            <table className="ta-table">
              <thead className="ta-thead">
                <tr><th>Teacher</th><th>Email</th></tr>
              </thead>
              <tbody className="ta-tbody">
                {teachersAbsent.length ? teachersAbsent.map((teacher, i) => {
                  if (!teacher.isAdmin) return (
                    <tr key={i}>
                      <td><span className="ta-dot" /><strong style={{color:"white"}}>{teacher.fullName}</strong></td>
                      <td>{teacher.email}</td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan={2} className="ta-empty">All teachers are present today ✓</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeachersAbsent;