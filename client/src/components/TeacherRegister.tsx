import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserProvider";
import { Trash2, User, UserCog } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function TeacherRegister() {
  const navigate = useNavigate();
  const { user, teachers, deleteUser, changeAdmin, loading, registerTeacher, getAllTeachers } = useUser();
  const [creds, setCreds] = React.useState({ fullName: "", email: "", password: "" });
  const [showPwd, setShowPwd] = React.useState(false);
  const [focused, setFocused] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!user._id) navigate("/login");
    else if (!user.isAdmin) navigate("/bookroom");
  }, [user]);

  React.useEffect(() => { getAllTeachers(); }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    registerTeacher(creds.fullName, creds.email, creds.password);
    setCreds({ fullName: "", email: "", password: "" });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .tr-root { min-height:100vh; background:#0a0a0f; padding:48px 24px; font-family:'DM Sans',sans-serif; }
        .tr-inner { max-width:780px; margin:0 auto; }
        .tr-eyebrow { font-size:11px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:12px; }
        .tr-title { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:300; color:white; line-height:1; margin-bottom:32px; }
        .tr-title em { font-style:italic; color:rgba(255,255,255,0.35); }
        .tr-card { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:28px; margin-bottom:32px; }
        .tr-field { margin-bottom:18px; }
        .tr-label { display:block; font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-bottom:8px; transition:color 0.2s; }
        .tr-field.focused .tr-label { color:rgba(180,150,255,0.8); }
        .tr-input-wrap { position:relative; }
        .tr-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:12px 14px; font-family:'DM Sans',sans-serif; font-size:14px; color:white; outline:none; transition:all 0.2s; box-sizing:border-box; }
        .tr-input::placeholder { color:rgba(255,255,255,0.18); }
        .tr-input:focus { background:rgba(255,255,255,0.06); border-color:rgba(150,120,255,0.5); box-shadow:0 0 0 3px rgba(120,90,255,0.1); }
        .tr-show-btn { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:rgba(255,255,255,0.25); cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; font-weight:500; letter-spacing:0.08em; text-transform:uppercase; transition:color 0.2s; }
        .tr-show-btn:hover { color:rgba(255,255,255,0.55); }
        .tr-btn-row { display:flex; gap:10px; margin-top:24px; }
        .tr-submit { padding:12px 24px; background:linear-gradient(135deg,#7c5cfc,#5c3ef5); border:none; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; letter-spacing:0.06em; text-transform:uppercase; color:white; cursor:pointer; transition:all 0.2s; box-shadow:0 6px 20px rgba(100,70,255,0.25); }
        .tr-submit:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 10px 28px rgba(100,70,255,0.35); }
        .tr-submit:disabled { opacity:0.35; cursor:not-allowed; }
        .tr-cancel { padding:12px 20px; background:transparent; border:1px solid rgba(255,255,255,0.08); border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; color:rgba(255,255,255,0.3); cursor:pointer; transition:all 0.2s; }
        .tr-cancel:hover { border-color:rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); }
        .tr-section-label { font-size:11px; font-weight:500; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; }
        .tr-table-wrap { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; overflow:hidden; }
        .tr-table { width:100%; border-collapse:collapse; }
        .tr-thead th { padding:14px 20px; text-align:left; font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.25); border-bottom:1px solid rgba(255,255,255,0.06); }
        .tr-tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
        .tr-tbody tr:last-child { border-bottom:none; }
        .tr-tbody tr:hover { background:rgba(255,255,255,0.03); }
        .tr-tbody td { padding:14px 20px; font-size:14px; color:rgba(255,255,255,0.65); }
        .tr-role-badge { display:inline-block; padding:2px 10px; border-radius:20px; font-size:11px; }
        .tr-role-admin { background:rgba(100,70,255,0.15); color:rgba(150,120,255,0.9); border:1px solid rgba(100,70,255,0.2); }
        .tr-role-teacher { background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.4); border:1px solid rgba(255,255,255,0.08); }
        .tr-action-btn { width:32px; height:32px; display:inline-flex; align-items:center; justify-content:center; border-radius:8px; border:none; cursor:pointer; transition:all 0.15s; margin-right:6px; }
        .tr-action-default { background:rgba(100,70,255,0.1); color:rgba(140,110,255,0.8); }
        .tr-action-default:hover { background:rgba(100,70,255,0.2); }
        .tr-action-danger { background:rgba(255,60,60,0.1); color:rgba(255,100,100,0.8); }
        .tr-action-danger:hover { background:rgba(255,60,60,0.2); }
      `}</style>
      <div className="tr-root">
        <div className="tr-inner">
          <p className="tr-eyebrow">Admin · Teachers</p>
          <h1 className="tr-title">Register <em>Teacher</em></h1>

          <form onSubmit={handleSubmit}>
            <div className="tr-card">
              <div className={`tr-field ${focused === "fullName" ? "focused" : ""}`}>
                <label className="tr-label">Full Name</label>
                <input className="tr-input" type="text" placeholder="Dr. Jane Smith" value={creds.fullName}
                  onFocus={() => setFocused("fullName")} onBlur={() => setFocused(null)}
                  onChange={e => setCreds({ ...creds, fullName: e.target.value })} />
              </div>
              <div className={`tr-field ${focused === "email" ? "focused" : ""}`}>
                <label className="tr-label">Email Address</label>
                <input className="tr-input" type="email" placeholder="teacher@university.edu" value={creds.email}
                  autoComplete="email" onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  onChange={e => setCreds({ ...creds, email: e.target.value })} />
              </div>
              <div className={`tr-field ${focused === "password" ? "focused" : ""}`}>
                <label className="tr-label">Password</label>
                <div className="tr-input-wrap">
                  <input className="tr-input" type={showPwd ? "text" : "password"} placeholder="••••••••"
                    value={creds.password} style={{ paddingRight: "60px" }}
                    onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                    onChange={e => setCreds({ ...creds, password: e.target.value })} />
                  <button type="button" className="tr-show-btn" onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="tr-btn-row">
                <button type="submit" className="tr-submit"
                  disabled={creds.email.length < 4 || creds.fullName.length < 4 || creds.password.length < 6 || loading}>
                  Register
                </button>
                <button type="button" className="tr-cancel" onClick={() => navigate("/admin/teachersabsent")}>Cancel</button>
              </div>
            </div>
          </form>

          <p className="tr-section-label">All teachers</p>
          <div className="tr-table-wrap">
            <table className="tr-table">
              <thead className="tr-thead">
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
              </thead>
              <tbody className="tr-tbody">
                {teachers.length ? teachers.map((teacher, i) => (
                  <tr key={i}>
                    <td><strong style={{ color: "white" }}>{teacher.fullName}</strong></td>
                    <td>{teacher.email}</td>
                    <td><span className={`tr-role-badge ${teacher.isAdmin ? "tr-role-admin" : "tr-role-teacher"}`}>{teacher.isAdmin ? "Admin" : "Teacher"}</span></td>
                    <td>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="tr-action-btn tr-action-default" title={teacher.isAdmin ? "Make teacher" : "Make admin"}>
                            {teacher.isAdmin ? <UserCog size={14} /> : <User size={14} />}
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
                          <AlertDialogHeader>
                            <AlertDialogTitle style={{ color: "white" }}>Change user privileges?</AlertDialogTitle>
                            <AlertDialogDescription style={{ color: "rgba(255,255,255,0.4)" }}>
                              This will make {teacher.fullName} {teacher.isAdmin ? "a teacher" : "an admin"}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => changeAdmin(teacher._id)} style={{ background: "linear-gradient(135deg,#7c5cfc,#5c3ef5)", border: "none" }}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="tr-action-btn tr-action-danger" title="Delete user"><Trash2 size={14} /></button>
                        </AlertDialogTrigger>
                        <AlertDialogContent style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
                          <AlertDialogHeader>
                            <AlertDialogTitle style={{ color: "white" }}>Delete this user?</AlertDialogTitle>
                            <AlertDialogDescription style={{ color: "rgba(255,255,255,0.4)" }}>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteUser(teacher._id)} style={{ background: "rgba(255,60,60,0.8)", border: "none" }}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} style={{ padding: "32px 20px", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "14px" }}>No teachers registered</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherRegister;