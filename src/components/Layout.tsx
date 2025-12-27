import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isUser = location.pathname.startsWith('/user');

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          <span className="logo-emoji">💬</span>
          <span className="logo-text">AAC App</span>
        </Link>
        <nav className="nav">
          {!isAdmin && !isUser && (
            <>
              <Link to="/user/icons" className="nav-link">
                User Mode
              </Link>
              <Link to="/admin" className="nav-link">
                Admin Mode
              </Link>
            </>
          )}
          {(isAdmin || isUser) && (
            <Link to="/" className="nav-link">
              Home
            </Link>
          )}
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
