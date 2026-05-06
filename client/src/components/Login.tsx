import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserProvider";

function Login() {
  const { loginUser, loading, user } = useUser();
  const navigate = useNavigate();
  const [creds, setCreds] = React.useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = React.useState(false);
  const [focused, setFocused] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user._id) {
      if (user.isAdmin) navigate("/admin/teachersabsent");
      else navigate("/bookroom");
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginUser(creds.email, creds.password);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,70,255,0.12) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          pointer-events: none;
        }

        .login-root::after {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,100,150,0.08) 0%, transparent 70%);
          bottom: -50px;
          left: -50px;
          pointer-events: none;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          margin: 0 20px;
          animation: cardIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes cardIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .card-inner {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 44px;
          backdrop-filter: blur(20px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
        }

        .brand-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-tag::before {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,0.2);
        }

        .login-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 300;
          line-height: 1;
          color: #ffffff;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .login-heading em {
          font-style: italic;
          color: rgba(255,255,255,0.45);
        }

        .login-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          font-weight: 300;
          margin-bottom: 40px;
          letter-spacing: 0.01em;
        }

        .field-wrap {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .field-wrap.is-focused .field-label {
          color: rgba(180,150,255,0.8);
        }

        .field-input-wrap {
          position: relative;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          outline: none;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.18);
        }

        .field-input:focus {
          background: rgba(255,255,255,0.06);
          border-color: rgba(150,120,255,0.5);
          box-shadow: 0 0 0 3px rgba(120,90,255,0.1);
        }

        .show-pwd-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.25);
          cursor: pointer;
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px;
          transition: color 0.2s;
        }

        .show-pwd-btn:hover {
          color: rgba(255,255,255,0.55);
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 32px 0;
        }

        .btn-row {
          display: flex;
          gap: 12px;
        }

        .btn-login {
          flex: 1;
          padding: 15px 24px;
          background: linear-gradient(135deg, #7c5cfc, #5c3ef5);
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 8px 24px rgba(100,70,255,0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-login:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(100,70,255,0.4);
        }

        .btn-login:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-login:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .btn-cancel {
          padding: 15px 20px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5);
        }

        .loading-dots {
          display: inline-flex;
          gap: 4px;
          align-items: center;
        }

        .loading-dots span {
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: dot 1.2s infinite;
        }

        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }

        .corner-deco {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-right: 1px solid rgba(255,255,255,0.1);
          border-radius: 0 8px 0 0;
        }

        .corner-deco-bl {
          position: absolute;
          bottom: 20px;
          left: 20px;
          width: 40px;
          height: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          border-left: 1px solid rgba(255,255,255,0.1);
          border-radius: 0 0 0 8px;
        }
      `}</style>

      <div className="login-root">
        <div className="grid-bg" />

        <div className="login-card">
          <div className="card-inner">
            <div className="corner-deco" />
            <div className="corner-deco-bl" />

            <div className="brand-tag">Campus Space</div>

            <h1 className="login-heading">
              Welcome<br /><em>back.</em>
            </h1>
            <p className="login-sub">Sign in to access your dashboard</p>

            <form onSubmit={handleSubmit}>
              <div className={`field-wrap ${focused === 'email' ? 'is-focused' : ''}`}>
                <label className="field-label">Email address</label>
                <div className="field-input-wrap">
                  <input
                    className="field-input"
                    type="email"
                    placeholder="you@university.edu"
                    value={creds.email}
                    autoComplete="email"
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setCreds({ ...creds, email: e.target.value })}
                  />
                </div>
              </div>

              <div className={`field-wrap ${focused === 'password' ? 'is-focused' : ''}`}>
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <input
                    className="field-input"
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    value={creds.password}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                    style={{ paddingRight: '60px' }}
                  />
                  <button
                    type="button"
                    className="show-pwd-btn"
                    onClick={() => setShowPwd(!showPwd)}
                  >
                    {showPwd ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="divider" />

              <div className="btn-row">
                <button
                  type="submit"
                  className="btn-login"
                  disabled={loading || creds.email.length < 5 || creds.password.length < 6}
                >
                  {loading ? (
                    <span className="loading-dots">
                      <span /><span /><span />
                    </span>
                  ) : 'Sign In'}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;