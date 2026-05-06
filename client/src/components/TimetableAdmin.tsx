import { useNavigate } from "react-router-dom";
import React, { FormEvent } from "react";
import { useUser } from "@/context/UserProvider";
import { useRoom } from "@/context/RoomProvider";
import { Trash2 } from "lucide-react";
import { useTimetable } from "@/context/TimetableProvider";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "./ui/alert-dialog";

interface BodyInterface {
  course: string; semester: string; stream: string; classes: ClassInterface[];
}
export interface ClassInterface {
  teacher: string; paperId: string; subject: string;
  allotedRoom: string; allotedTime: string; day: string;
}

function TimetableAdmin() {
  const navigate = useNavigate();
  const { timeslots, teachers, days, user, getAllTeachers } = useUser();
  const { rooms, fetchRooms } = useRoom();
  const { timetables, getAllTimetables, deleteTimetable, addTimetable } = useTimetable();
  const [btnDisabled, setBtnDisabled] = React.useState(true);

  React.useEffect(() => {
    if (!user._id) navigate("/login");
    else if (!user.isAdmin) navigate("/bookroom");
  }, [user]);

  React.useEffect(() => { getAllTimetables(); fetchRooms(); getAllTeachers(); }, []);

  const [body, setBody] = React.useState<BodyInterface>({
    course: "", semester: "", stream: "",
    classes: [{ allotedRoom: "", allotedTime: "", teacher: "", paperId: "", subject: "", day: "" }],
  });

  React.useEffect(() => {
    if (body.semester.length <= 0 || body.stream.length <= 0 || body.course.length <= 3) return setBtnDisabled(true);
    body.classes.map(({ allotedTime, allotedRoom, paperId, teacher, subject, day }) => {
      if (allotedRoom.length <= 0 || allotedTime.length <= 0 || paperId.length <= 4 || subject.length <= 2 || day.length <= 4 || teacher.length <= 6) return setBtnDisabled(true);
      setBtnDisabled(false);
    });
  }, [body]);

  function IncreaseClasses() {
    setBody({ ...body, classes: [...body.classes, { allotedRoom: "", allotedTime: "", teacher: "", paperId: "", subject: "", day: "Monday" }] });
  }
  function DecreaseClasses() {
    if (body.classes.length === 1) return;
    setBody({ ...body, classes: body.classes.slice(0, -1) });
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await addTimetable(body);
    setBody({ course: "", semester: "", stream: "", classes: [{ allotedRoom: "", allotedTime: "", teacher: "", paperId: "", subject: "", day: "" }] });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .tta-root { min-height:100vh; background:#0a0a0f; padding:48px 24px; font-family:'DM Sans',sans-serif; }
        .tta-inner { max-width:960px; margin:0 auto; }
        .tta-eyebrow { font-size:11px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:12px; }
        .tta-title { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:300; color:white; line-height:1; margin-bottom:32px; }
        .tta-title em { font-style:italic; color:rgba(255,255,255,0.35); }
        .tta-card { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:28px; margin-bottom:32px; }
        .tta-card-title { font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:20px; }
        .tta-top-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:24px; }
        @media(max-width:600px) { .tta-top-grid { grid-template-columns:1fr; } }
        .tta-label { display:block; font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:7px; }
        .tta-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:11px 14px; font-family:'DM Sans',sans-serif; font-size:14px; color:white; outline:none; transition:all 0.2s; box-sizing:border-box; }
        .tta-input::placeholder { color:rgba(255,255,255,0.18); }
        .tta-input:focus { background:rgba(255,255,255,0.06); border-color:rgba(150,120,255,0.5); box-shadow:0 0 0 3px rgba(120,90,255,0.1); }
        .tta-select { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:11px 14px; font-family:'DM Sans',sans-serif; font-size:14px; color:white; outline:none; cursor:pointer; transition:all 0.2s; box-sizing:border-box; }
        .tta-select option { background:#13131f; }
        .tta-select:focus { border-color:rgba(150,120,255,0.5); background:rgba(255,255,255,0.06); }
        .tta-divider { height:1px; background:rgba(255,255,255,0.05); margin:20px 0; }
        .tta-class-row { display:grid; grid-template-columns:repeat(6,1fr); gap:8px; margin-bottom:10px; padding:12px; background:rgba(255,255,255,0.02); border-radius:10px; border:1px solid rgba(255,255,255,0.04); }
        @media(max-width:768px) { .tta-class-row { grid-template-columns:repeat(2,1fr); } }
        .tta-btn-row { display:flex; gap:8px; margin-top:16px; flex-wrap:wrap; }
        .tta-btn-add { padding:9px 18px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:9px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500; color:rgba(255,255,255,0.5); cursor:pointer; transition:all 0.15s; }
        .tta-btn-add:hover { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.75); }
        .tta-btn-remove { padding:9px 18px; background:rgba(255,60,60,0.08); border:1px solid rgba(255,60,60,0.12); border-radius:9px; font-family:'DM Sans',sans-serif; font-size:12px; color:rgba(255,100,100,0.7); cursor:pointer; transition:all 0.15s; }
        .tta-btn-remove:disabled { opacity:0.3; cursor:not-allowed; }
        .tta-footer { display:flex; justify-content:space-between; margin-top:24px; }
        .tta-submit { padding:12px 28px; background:linear-gradient(135deg,#7c5cfc,#5c3ef5); border:none; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; letter-spacing:0.06em; text-transform:uppercase; color:white; cursor:pointer; transition:all 0.2s; box-shadow:0 6px 20px rgba(100,70,255,0.25); }
        .tta-submit:hover:not(:disabled) { transform:translateY(-1px); }
        .tta-submit:disabled { opacity:0.35; cursor:not-allowed; }
        .tta-cancel { padding:12px 20px; background:transparent; border:1px solid rgba(255,255,255,0.08); border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; color:rgba(255,255,255,0.3); cursor:pointer; transition:all 0.2s; }
        .tta-cancel:hover { border-color:rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); }
        .tta-section-label { font-size:11px; font-weight:500; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; }
        .tta-table-wrap { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; overflow:hidden; }
        .tta-table { width:100%; border-collapse:collapse; }
        .tta-thead th { padding:14px 20px; text-align:left; font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.25); border-bottom:1px solid rgba(255,255,255,0.06); }
        .tta-tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
        .tta-tbody tr:last-child { border-bottom:none; }
        .tta-tbody tr:hover { background:rgba(255,255,255,0.03); }
        .tta-tbody td { padding:14px 20px; font-size:14px; color:rgba(255,255,255,0.65); }
        .tta-badge { display:inline-block; padding:2px 10px; border-radius:20px; font-size:11px; background:rgba(100,70,255,0.12); color:rgba(150,120,255,0.8); border:1px solid rgba(100,70,255,0.18); }
        .tta-del-btn { width:32px; height:32px; display:inline-flex; align-items:center; justify-content:center; border-radius:8px; background:rgba(255,60,60,0.1); color:rgba(255,100,100,0.8); border:none; cursor:pointer; transition:all 0.15s; }
        .tta-del-btn:hover { background:rgba(255,60,60,0.2); }
      `}</style>

      <div className="tta-root">
        <div className="tta-inner">
          <p className="tta-eyebrow">Admin · Schedule</p>
          <h1 className="tta-title">Manage <em>Timetable</em></h1>

          <form onSubmit={handleSubmit}>
            <div className="tta-card">
              <p className="tta-card-title">Course details</p>
              <div className="tta-top-grid">
                <div>
                  <label className="tta-label">Course name</label>
                  <input className="tta-input" placeholder="e.g. B.Sc Computer Science" name="course" value={body.course}
                    onChange={e => setBody({ ...body, course: e.target.value })} />
                </div>
                <div>
                  <label className="tta-label">Stream</label>
                  <select className="tta-select" value={body.stream} onChange={e => setBody({ ...body, stream: e.target.value })}>
                    <option value="" disabled>Select stream</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="tta-label">Semester</label>
                  <select className="tta-select" value={body.semester} onChange={e => setBody({ ...body, semester: e.target.value })}>
                    <option value="" disabled>Select semester</option>
                    {["1","2","3","4","5","6","7","8"].map((s,i) => <option key={i} value={s}>{["I","II","III","IV","V","VI","VII","VIII"][i]}</option>)}
                  </select>
                </div>
              </div>

              <div className="tta-divider" />
              <p className="tta-card-title">Classes</p>

              {body.classes.map((cls, index) => (
                <div className="tta-class-row" key={index}>
                  <div>
                    <label className="tta-label">Teacher</label>
                    <select className="tta-select" value={cls.teacher} onChange={e => setBody({ ...body, classes: body.classes.map((c,i) => i===index ? {...c, teacher: e.target.value} : c) })}>
                      <option value="" disabled>Teacher</option>
                      {teachers.filter(t => !t.isAdmin).map((t,i) => <option key={i} value={t._id}>{t.fullName}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="tta-label">Paper ID</label>
                    <input className="tta-input" placeholder="Paper ID" type="number" value={cls.paperId}
                      onChange={e => setBody({ ...body, classes: body.classes.map((c,i) => i===index ? {...c, paperId: e.target.value} : c) })} />
                  </div>
                  <div>
                    <label className="tta-label">Subject</label>
                    <input className="tta-input" placeholder="Subject" value={cls.subject}
                      onChange={e => setBody({ ...body, classes: body.classes.map((c,i) => i===index ? {...c, subject: e.target.value} : c) })} />
                  </div>
                  <div>
                    <label className="tta-label">Room</label>
                    <select className="tta-select" value={cls.allotedRoom} onChange={e => setBody({ ...body, classes: body.classes.map((c,i) => i===index ? {...c, allotedRoom: e.target.value} : c) })}>
                      <option value="" disabled>Room</option>
                      {rooms.map((r,i) => <option key={i} value={r._id}>{r.roomNumber}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="tta-label">Time</label>
                    <select className="tta-select" value={cls.allotedTime} onChange={e => setBody({ ...body, classes: body.classes.map((c,i) => i===index ? {...c, allotedTime: e.target.value} : c) })}>
                      <option value="" disabled>Time</option>
                      {timeslots.map((t,i) => <option key={i} value={t}>{t.split("-").join(" to ")}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="tta-label">Day</label>
                    <select className="tta-select" value={cls.day} onChange={e => setBody({ ...body, classes: body.classes.map((c,i) => i===index ? {...c, day: e.target.value} : c) })}>
                      <option value="" disabled>Day</option>
                      {days.map((d,i) => <option key={i} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              ))}

              <div className="tta-btn-row">
                <button type="button" className="tta-btn-add" onClick={IncreaseClasses}>+ Add class</button>
                <button type="button" className="tta-btn-remove" disabled={body.classes.length === 1} onClick={DecreaseClasses}>Remove last</button>
              </div>

              <div className="tta-footer">
                <button type="button" className="tta-cancel" onClick={() => navigate("/admin/teachersabsent")}>Cancel</button>
                <button type="submit" className="tta-submit" disabled={btnDisabled}>Create Timetable</button>
              </div>
            </div>
          </form>

          <p className="tta-section-label">Existing timetables</p>
          <div className="tta-table-wrap">
            <table className="tta-table">
              <thead className="tta-thead">
                <tr><th>Stream</th><th>Course</th><th>Semester</th><th>Actions</th></tr>
              </thead>
              <tbody className="tta-tbody">
                {timetables.length ? timetables.map((timetable, i) => (
                  <tr key={i}>
                    <td><span className="tta-badge">{timetable.stream}</span></td>
                    <td><strong style={{color:"white"}}>{timetable.course}</strong></td>
                    <td>{timetable.semester}</td>
                    <td>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="tta-del-btn"><Trash2 size={14} /></button>
                        </AlertDialogTrigger>
                        <AlertDialogContent style={{background:"#13131f", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"16px"}}>
                          <AlertDialogHeader>
                            <AlertDialogTitle style={{color:"white"}}>Delete this timetable?</AlertDialogTitle>
                            <AlertDialogDescription style={{color:"rgba(255,255,255,0.4)"}}>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel style={{background:"transparent", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)"}}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteTimetable(timetable._id)} style={{background:"rgba(255,60,60,0.8)", border:"none"}}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} style={{padding:"32px 20px", textAlign:"center", color:"rgba(255,255,255,0.2)", fontSize:"14px"}}>No timetables created yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimetableAdmin;