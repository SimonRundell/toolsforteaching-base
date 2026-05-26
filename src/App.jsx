/**
 * Root application component.
 * Public route: / — hero + articles + tools
 * Admin route:  /admin — login or admin panel
 * @license CC BY-NC-SA 4.0
 */
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header        from './components/layout/Header';
import Hero          from './components/layout/Hero';
import Footer        from './components/layout/Footer';
import ArticlesGrid  from './components/public/ArticlesGrid';
import ToolsGrid     from './components/public/ToolsGrid';
import ContactModal  from './components/public/ContactModal';
import AdminLogin    from './components/admin/AdminLogin';
import AdminPanel    from './components/admin/AdminPanel';
import CMFloatAd       from './cmFloatAd';
import { useAuth }   from './hooks/useAuth';

/** Public home page */
function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <div id="page">
      <Header />
      <main>
        <Hero onContactClick={() => setContactOpen(true)} />
        <ArticlesGrid />
        <ToolsGrid />
      </main>
      <Footer />
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}

/** Admin route — login wall then panel */
function AdminRoute() {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return (
      <div className="login-page">
        <p style={{ color: 'var(--chalk)' }}>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <AdminPanel
      user={user}
      onLogout={logout}
      onUpdateUser={() => {}}
    />
  );
}

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/"      element={<HomePage />} />
      <Route path="/admin" element={<AdminRoute />} />
    </Routes>
    <CMFloatAd color="#797777" bgColor="transparent" />
    </>
  );
}
