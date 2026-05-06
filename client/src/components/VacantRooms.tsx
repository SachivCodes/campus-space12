import { useRoom } from "@/context/RoomProvider";
import React from "react";
import { useUser } from "@/context/UserProvider";

export interface RoomInterface {
  id: string;
  roomNumber: string;
  capacity: number;
  location: string;
}

export function VacantRooms() {
  const { rooms, fetchVacantRooms, time: currentTime } = useRoom();
  const { timeslots } = useUser();
  const [time, setTime] = React.useState("");

  React.useEffect(() => { setTime(currentTime); }, []);
  React.useEffect(() => { fetchVacantRooms(time); }, [time]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        .vr-root { min-height: 100vh; background: #0a0a0f; padding: 48px 24px; font-family: 'DM Sans', sans-serif; }
        .vr-header { max-width: 780px; margin: 0 auto 40px; }
        .vr-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 12px; }
        .vr-title { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 300; color: white; line-height: 1; margin-bottom: 24px; }
        .vr-title em { font-style: italic; color: rgba(255,255,255,0.35); }
        .vr-filter { display: flex; align-items: center; gap: 12px; }
        .vr-filter-label { font-size: 13px; color: rgba(255,255,255,0.35); }
        .vr-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 8px 14px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          outline: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .vr-select:focus { border-color: rgba(120,90,255,0.4); background: rgba(255,255,255,0.06); }
        .vr-select option { background: #1a1a2e; }
        .vr-table-wrap { max-width: 780px; margin: 0 auto; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden; }
        .vr-table { width: 100%; border-collapse: collapse; }
        .vr-thead th { padding: 14px 20px; text-align: left; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.25); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .vr-tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .vr-tbody tr:last-child { border-bottom: none; }
        .vr-tbody tr:hover { background: rgba(255,255,255,0.03); }
        .vr-tbody td { padding: 14px 20px; font-size: 14px; color: rgba(255,255,255,0.7); }
        .vr-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; background: rgba(100,70,255,0.15); color: rgba(150,120,255,0.9); border: 1px solid rgba(100,70,255,0.2); }
        .vr-empty { padding: 48px 20px; text-align: center; color: rgba(255,255,255,0.2); font-size: 14px; }
        .vr-closed { max-width: 780px; margin: 24px auto 0; text-align: center; color: rgba(255,80,80,0.7); font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase; }
      `}</style>
      <div className="vr-root">
        <div className="vr-header">
          <p className="vr-eyebrow">Live · {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
          <h1 className="vr-title">Vacant <em>Rooms</em></h1>
          <div className="vr-filter">
            <span className="vr-filter-label">Classes available at</span>
            <select className="vr-select" value={time} onChange={e => setTime(e.target.value)} disabled={time === "closed"}>
              {timeslots.map((t, i) => <option key={i} value={t}>{t.split("-").join(" to ")}</option>)}
            </select>
          </div>
        </div>

        <div className="vr-table-wrap">
          <table className="vr-table">
            <thead className="vr-thead">
              <tr><th>Room Number</th><th>Capacity</th><th>Location</th></tr>
            </thead>
            <tbody className="vr-tbody">
              {rooms.length ? rooms.map((room, i) => (
                <tr key={i}>
                  <td><strong style={{color:"white"}}>{room.roomNumber}</strong></td>
                  <td>{room.capacity} seats</td>
                  <td><span className="vr-badge">{room.location}</span></td>
                </tr>
              )) : (
                <tr><td colSpan={3} className="vr-empty">No vacant rooms at this time</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {time === "closed" && <p className="vr-closed">⚠ College is closed today</p>}
      </div>
    </>
  );
}