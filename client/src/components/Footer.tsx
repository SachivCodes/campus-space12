import { Link } from "react-router-dom";

function Footer() {
  const name = import.meta.env.VITE_COLLEGE_NAME;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        .footer-root { background:#0a0a0f; border-top:1px solid rgba(255,255,255,0.06); padding:32px 24px; font-family:'DM Sans',sans-serif; }
        .footer-inner { max-width:780px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
        .footer-brand { font-size:13px; font-weight:500; color:rgba(255,255,255,0.3); }
        .footer-links { display:flex; gap:20px; }
        .footer-link { font-size:13px; color:rgba(255,255,255,0.25); text-decoration:none; transition:color 0.15s; }
        .footer-link:hover { color:rgba(255,255,255,0.55); }
        .footer-copy { font-size:12px; color:rgba(255,255,255,0.15); }
      `}</style>
      <footer className="footer-root">
        <div className="footer-inner">
          <span className="footer-brand">{name || "Campus Space"}</span>
          <div className="footer-links">
            <Link to="/" className="footer-link">Vacant Rooms</Link>
            <Link to="/timetable" className="footer-link">Timetable</Link>
            <Link to="/teachersabsent" className="footer-link">Teachers Absent</Link>
            <Link to="/login" className="footer-link">Login</Link>
          </div>
          <span className="footer-copy">© {new Date().getFullYear()} All rights reserved</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;