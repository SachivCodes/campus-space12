import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "@/context/RoomProvider";
import { useUser } from "@/context/UserProvider";
import { Trash2 } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "./ui/alert-dialog";

function AddRoom() {
  const { rooms, addRooms, fetchRooms, deleteRoom } = useRoom();
  const { user } = useUser();
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [body, setBody] = React.useState([{ roomNumber: "", capacity: "", location: "" }]);

  React.useEffect(() => {
    if (!user._id) navigate("/login");
    else if (!user.isAdmin) navigate("/bookroom");
  }, [user]);

  React.useEffect(() => { fetchRooms(); }, []);

  React.useEffect(() => {
    const allFilled = body.every(r => r.roomNumber && r.capacity && r.location);
    setBtnDisabled(!allFilled);
  }, [body]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    setBody(body.map((room, idx) => idx === index ? { ...room, [e.target.name]: e.target.value } : room));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addRooms(body);
    setBody([{ roomNumber: "", capacity: "", location: "" }]);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .ar-root { min-height:100vh; background:#0a0a0f; padding:48px 24px; font-family:'DM Sans',sans-serif; }
        .ar-inner { max-width:780px; margin:0 auto; }
        .ar-eyebrow { font-size:11px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:12px; }
        .ar-title { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:300; color:white; line-height:1; margin-bottom:32px; }
        .ar-title em { font-style:italic; color:rgba(255,255,255,0.35); }
        .ar-card { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:28px; margin-bottom:32px; }
        .ar-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:10px; }
        @media(max-width:600px) { .ar-row { grid-template-columns:1fr; } }
        .ar-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:11px 14px; font-family:'DM Sans',sans-serif; font-size:14px; color:white; outline:none; transition:all 0.2s; box-sizing:border-box; }
        .ar-input::placeholder { color:rgba(255,255,255,0.18); }
        .ar-input:focus { background:rgba(255,255,255,0.06); border-color:rgba(150,120,255,0.5); box-shadow:0 0 0 3px rgba(120,90,255,0.1); }
        .ar-select { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:11px 14px; font-family:'DM Sans',sans-serif; font-size:14px; color:white; outline:none; cursor:pointer; transition:all 0.2s; }
        .ar-select option { background:#13131f; }
        .ar-select:focus { border-color:rgba(150,120,255,0.5); }
        .ar-actions { display:flex; gap:8px; margin-top:16px; flex-wrap:wrap; }
        .ar-btn-add { padding:9px 18px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:9px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500; color:rgba(255,255,255,0.5); cursor:pointer; transition:all 0.15s; }
        .ar-btn-add:hover { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.75); }
        .ar-btn-remove { padding:9px 18px; background:rgba(255,60,60,0.08); border:1px solid rgba(255,60,60,0.12); border-radius:9px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500; color:rgba(255,100,100,0.7); cursor:pointer; transition:all 0.15s; }
        .ar-btn-remove:hover:not(:disabled) { background:rgba(255,60,60,0.15); }
        .ar-btn-remove:disabled { opacity:0.3; cursor:not-allowed; }
        .ar-submit { padding:12px 24px; background:linear-gradient(135deg,#7c5cfc,#5c3ef5); border:none; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; letter-spacing:0.06em; text-transform:uppercase; color:white; cursor:pointer; transition:all 0.2s; box-shadow:0 6px 20px rgba(100,70,255,0.25); }
        .ar-submit:hover:not(:disabled) { transform:translateY(-1px); }
        .ar-submit:disabled { opacity:0.35; cursor:not-allowed; }
        .ar-cancel { padding:12px 20px; background:transparent; border:1px solid rgba(255,255,255,0.08); border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; color:rgba(255,255,255,0.3); cursor:pointer; transition:all 0.2s; }
        .ar-cancel:hover { border-color:rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); }
        .ar-section-label { font-size:11px; font-weight:500; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; }
        .ar-table-wrap { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; overflow:hidden; }
        .ar-table { width:100%; border-collapse:collapse; }
        .ar-thead th { padding:14px 20px; text-align:left; font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.25); border-bottom:1px solid rgba(255,255,255,0.06); }
        .ar-tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
        .ar-tbody tr:last-child { border-bottom:none; }
        .ar-tbody tr:hover { background:rgba(255,255,255,0.03); }
        .ar-tbody td { padding:14px 20px; font-size:14px; color:rgba(255,255,255,0.65); }
        .ar-badge { display:inline-block; padding:2px 10px; border-radius:20px; font-size:11px; background:rgba(100,70,255,0.12); color:rgba(150,120,255,0.8); border:1px solid rgba(100,70,255,0.18); }
        .ar-del-btn { width:32px; height:32px; display:inline-flex; align-items:center; justify-content:center; border-radius:8px; background:rgba(255,60,60,0.1); color:rgba(255,100,100,0.8); border:none; cursor:pointer; transition:all 0.15s; }
        .ar-del-btn:hover { background:rgba(255,60,60,0.2); }
      `}</style>
      <div className="ar-root">
        <div className="ar-inner">
          <p className="ar-eyebrow">Admin · Rooms</p>
          <h1 className="ar-title">Manage <em>Rooms</em></h1>

          <form onSubmit={handleSubmit}>
            <div className="ar-card">
              {body.map((room, index) => (
                <div className="ar-row" key={index}>
                  <input className="ar-input" placeholder="Room number" name="roomNumber" value={room.roomNumber} onChange={e => handleChange(e, index)} />
                  <input className="ar-input" placeholder="Capacity" name="capacity" type="number" value={room.capacity} onChange={e => handleChange(e, index)} />
                  <select className="ar-select" value={room.location} onChange={e => setBody(body.map((r, i) => i === index ? { ...r, location: e.target.value } : r))}>
                    <option value="">Location</option>
                    <option value="Ground floor">Ground floor</option>
                    <option value="First floor">First floor</option>
                    <option value="Second floor">Second floor</option>
                  </select>
                </div>
              ))}
              <div className="ar-actions">
                <button type="button" className="ar-btn-add" onClick={() => setBody([...body, { roomNumber: "", capacity: "", location: "" }])}>+ Add more</button>
                <button type="button" className="ar-btn-remove" disabled={body.length === 1} onClick={() => setBody(body.slice(0, -1))}>Remove last</button>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                <button type="submit" className="ar-submit" disabled={btnDisabled}>Add Rooms</button>
                <button type="button" className="ar-cancel" onClick={() => navigate("/admin/teachersabsent")}>Cancel</button>
              </div>
            </div>
          </form>

          <p className="ar-section-label">Available rooms</p>
          <div className="ar-table-wrap">
            <table className="ar-table">
              <thead className="ar-thead">
                <tr><th>Room Number</th><th>Capacity</th><th>Location</th><th>Actions</th></tr>
              </thead>
              <tbody className="ar-tbody">
                {rooms.length ? rooms.map((room, i) => (
                  <tr key={i}>
                    <td><strong style={{ color: "white" }}>{room.roomNumber}</strong></td>
                    <td>{room.capacity} seats</td>
                    <td><span className="ar-badge">{room.location}</span></td>
                    <td>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="ar-del-btn"><Trash2 size={14} /></button>
                        </AlertDialogTrigger>
                        <AlertDialogContent style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }}>
                          <AlertDialogHeader>
                            <AlertDialogTitle style={{ color: "white" }}>Delete this room?</AlertDialogTitle>
                            <AlertDialogDescription style={{ color: "rgba(255,255,255,0.4)" }}>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteRoom(room._id)} style={{ background: "rgba(255,60,60,0.8)", border: "none" }}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} style={{ padding: "32px 20px", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "14px" }}>No rooms added yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRoom;