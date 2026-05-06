import logo from "../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Equal, X, LogOut, Moon, Sun } from "lucide-react";
import React from "react";
import { useUser } from "../context/UserProvider";
import { useTheme } from "@/context/ThemeProvider";

function Navbar() {
  const { tokenKey, setUser, user } = useUser();
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const title = import.meta.env.VITE_COLLEGE_NAME;
  const logoLink = import.meta.env.VITE_LOGO;
  const { theme, setTheme } = useTheme();

  const isAdmin = location.pathname.includes("/admin");
  const isBookroom = location.pathname.includes("/bookroom");

  function handleLogout() {
    navigate("/");
    localStorage.removeItem(tokenKey);
    setUser({ ...user, _id: "" });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        .nav-root {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          background: rgba(10,10,15,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'DM Sans', sans-serif;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: white;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        .nav-brand img { width: 28px; height: 28px; object-fit: contain; opacity: 0.9; }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link {
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.01em;
        }
        .nav-link:hover { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.05); }
        .nav-link.active { color: white; background: rgba(255,255,255,0.08); }
        .nav-btn-logout {
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,100,100,0.8);
          background: rgba(255,60,60,0.08);
          border: 1px solid rgba(255,60,60,0.15);
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; gap: 6px;
        }
        .nav-btn-logout:hover { background: rgba(255,60,60,0.15); color: rgba(255,120,120,1); }
        .nav-theme-btn {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.15s;
          margin-left: 4px;
        }
        .nav-theme-btn:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
        .nav-hamburger {
          width: 34px; height: 34px;
          display: none; align-items: center; justify-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-hamburger { display: flex; }
          .nav-links.mobile-open {
            display: flex; flex-direction: column;
            position: absolute; top: 60px; left: 0; right: 0;
            background: rgba(10,10,15,0.97);
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding: 12px 16px;
            gap: 4px;
          }
          .nav-links.mobile-open .nav-link { width: 100%; text-align: left; }
        }
      `}</style>
      <nav className="nav-root">
        <Link to="/" className="nav-brand">
          <img src={logoLink || logo} alt="" />
          {title || "Campus Space"}
        </Link>

        <div className={`nav-links ${openNav ? "mobile-open" : ""}`}>
          {!isAdmin && !isBookroom && (
            <>
              <button className={`nav-link ${location.pathname === "/" ? "active" : ""}`} onClick={() => { navigate("/"); setOpenNav(false); }}>Vacant Rooms</button>
              <button className={`nav-link ${location.pathname === "/timetable" ? "active" : ""}`} onClick={() => { navigate("/timetable"); setOpenNav(false); }}>Timetable</button>
              <button className={`nav-link ${location.pathname === "/teachersabsent" ? "active" : ""}`} onClick={() => { navigate("/teachersabsent"); setOpenNav(false); }}>Teachers Absent</button>
              <button className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} onClick={() => { navigate("/login"); setOpenNav(false); }}>Login</button>
            </>
          )}
          {isAdmin && (
            <>
              <button className={`nav-link ${location.pathname.includes("teachersabsent") ? "active" : ""}`} onClick={() => { navigate("/admin/teachersabsent"); setOpenNav(false); }}>Teachers Absent</button>
              <button className={`nav-link ${location.pathname.includes("timetable") ? "active" : ""}`} onClick={() => { navigate("/admin/timetable"); setOpenNav(false); }}>Timetable</button>
              <button className={`nav-link ${location.pathname.includes("register") ? "active" : ""}`} onClick={() => { navigate("/admin/register"); setOpenNav(false); }}>Register Teacher</button>
              <button className={`nav-link ${location.pathname.includes("addroom") ? "active" : ""}`} onClick={() => { navigate("/admin/addroom"); setOpenNav(false); }}>Rooms</button>
              <button className="nav-btn-logout" onClick={handleLogout}><LogOut size={14} />Logout</button>
            </>
          )}
          {isBookroom && (
            <button className="nav-btn-logout" onClick={handleLogout}><LogOut size={14} />Logout</button>
          )}
          <button className="nav-theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="nav-hamburger" onClick={() => setOpenNav(!openNav)}>
            {openNav ? <X size={16} /> : <Equal size={16} />}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;