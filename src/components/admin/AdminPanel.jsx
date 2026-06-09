/**
 * Main admin panel with tabs: Tools | Articles | Users | Settings.
 * Tools and Articles rows support native HTML5 drag-and-drop reordering.
 * @license CC BY-NC-SA 4.0
 */
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import client from '../../api/client';
import AppForm from './AppForm';
import ArticleForm from './ArticleForm';
import UserSettings from './UserSettings';
import AdminUsers from './AdminUsers';
import { useDragSort } from '../../hooks/useDragSort';

const TABS = ['Tools', 'Articles', 'Users', 'Settings'];

/**
 * @param {{ user: Object, onLogout: Function, onUpdateUser: Function }} props
 */
export default function AdminPanel({ user, onLogout, onUpdateUser }) {
  const [tab,         setTab]         = useState('Tools');
  const [apps,        setApps]        = useState([]);
  const [articles,    setArticles]    = useState([]);
  const [editingApp,  setEditingApp]  = useState(null); // null | false | Object
  const [editingArt,  setEditingArt]  = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type, id }

  const reorderApps = useCallback(async (reordered) => {
    const ordered = reordered.map((a, i) => ({ ...a, sort_order: i + 1 }));
    setApps(ordered);
    try { await client.patch('/apps.php', ordered.map(({ id, sort_order }) => ({ id, sort_order }))); } catch {}
  }, []);

  const reorderArticles = useCallback(async (reordered) => {
    const ordered = reordered.map((a, i) => ({ ...a, sort_order: i + 1 }));
    setArticles(ordered);
    try { await client.patch('/articles.php', ordered.map(({ id, sort_order }) => ({ id, sort_order }))); } catch {}
  }, []);

  const appDrag = useDragSort(apps, reorderApps);
  const artDrag = useDragSort(articles, reorderArticles);

  // Load apps and articles when tab changes
  useEffect(() => {
    if (tab === 'Tools')    loadApps();
    if (tab === 'Articles') loadArticles();
  }, [tab]);

  const loadApps = async () => {
    setLoading(true);
    try {
      const { data } = await client.get('/apps.php');
      setApps(data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data } = await client.get('/articles.php');
      setArticles(data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  const handleDeleteApp = async (id) => {
    await client.delete(`/apps.php?id=${id}`);
    setApps(prev => prev.filter(a => a.id !== id));
    setDeleteConfirm(null);
  };

  const handleDeleteArticle = async (id) => {
    await client.delete(`/articles.php?id=${id}`);
    setArticles(prev => prev.filter(a => a.id !== id));
    setDeleteConfirm(null);
  };

  const handleToggleApp = async (app) => {
    const { data } = await client.put(`/apps.php?id=${app.id}`, { ...app, active: app.active ? 0 : 1 });
    setApps(prev => prev.map(a => a.id === data.id ? data : a));
  };

  const handleToggleArticle = async (art) => {
    const { data } = await client.put(`/articles.php?id=${art.id}`, { ...art, active: art.active ? 0 : 1 });
    setArticles(prev => prev.map(a => a.id === data.id ? data : a));
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <h1>Tools for Teaching — Admin</h1>
        <div className="admin-header-actions">
          <span className="admin-username">{user.username}</span>
          <Link to="/" className="btn btn-secondary btn-sm">← Site</Link>
          <button className="btn btn-secondary btn-sm" onClick={onLogout}>Sign Out</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`admin-tab ${tab === t ? 'active' : ''}`}
            onClick={() => { setTab(t); setEditingApp(null); setEditingArt(null); }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="admin-content">

        {/* ── TOOLS TAB ──────────────────────────────────────────── */}
        {tab === 'Tools' && (
          <>
            {editingApp !== null ? (
              <>
                <div className="admin-section-header">
                  <h2>{editingApp ? `Edit: ${editingApp.title}` : 'Add New Tool'}</h2>
                </div>
                <AppForm
                  app={editingApp || null}
                  user={user}
                  onSave={(saved) => {
                    setApps(prev => {
                      const exists = prev.find(a => a.id === saved.id);
                      return exists ? prev.map(a => a.id === saved.id ? saved : a) : [...prev, saved];
                    });
                    setEditingApp(null);
                  }}
                  onCancel={() => setEditingApp(null)}
                />
              </>
            ) : (
              <>
                <div className="admin-section-header">
                  <h2>Tools ({apps.length})</h2>
                  <button className="btn btn-primary btn-sm" onClick={() => setEditingApp(false)}>
                    + Add Tool
                  </button>
                </div>
                {loading ? (
                  <p className="loading-state">Loading…</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: 28 }}></th>
                          <th style={{ width: 70 }}>Image</th>
                          <th>Title</th>
                          <th>Badge</th>
                          <th style={{ width: 60 }}>Order</th>
                          <th style={{ width: 70 }}>Active</th>
                          <th style={{ width: 160 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apps.map((app, i) => (
                          <tr
                            key={app.id}
                            className={[!app.active && 'row-inactive', appDrag.overIdx === i && 'drag-over'].filter(Boolean).join(' ')}
                            {...appDrag.dragProps(i)}
                          >
                            <td className="drag-handle">⠿</td>
                            <td>
                              {app.image_path && (
                                <img src={`/${app.image_path}`} alt="" className="admin-table-thumb" />
                              )}
                            </td>
                            <td>
                              <strong>{app.title}</strong>
                              {app.launch_url && (
                                <span style={{ marginLeft: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                                  <a href={app.launch_url} target="_blank" rel="noopener noreferrer">↗</a>
                                </span>
                              )}
                            </td>
                            <td>
                              {app.badge && (
                                <span className={`tool-badge ${app.badge_class || ''}`} style={{ fontSize: 10 }}>
                                  {app.badge}
                                </span>
                              )}
                            </td>
                            <td>{app.sort_order}</td>
                            <td>
                              <button
                                className={`btn btn-sm ${app.active ? 'btn-secondary' : 'btn-danger'}`}
                                onClick={() => handleToggleApp(app)}
                                title={app.active ? 'Click to hide' : 'Click to show'}
                              >
                                {app.active ? '✓' : '✗'}
                              </button>
                            </td>
                            <td>
                              <div className="admin-table-actions">
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditingApp(app)}>
                                  Edit
                                </button>
                                {deleteConfirm?.type === 'app' && deleteConfirm.id === app.id ? (
                                  <>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteApp(app.id)}>
                                      Confirm
                                    </button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setDeleteConfirm(null)}>
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button className="btn btn-danger btn-sm"
                                    onClick={() => setDeleteConfirm({ type: 'app', id: app.id })}>
                                    Delete
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                        {apps.length === 0 && (
                          <tr><td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                            No tools yet — click Add Tool to get started.
                          </td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ── ARTICLES TAB ─────────────────────────────────────────── */}
        {tab === 'Articles' && (
          <>
            {editingArt !== null ? (
              <>
                <div className="admin-section-header">
                  <h2>{editingArt ? `Edit: ${editingArt.title}` : 'Add New Article'}</h2>
                </div>
                <ArticleForm
                  article={editingArt || null}
                  onSave={(saved) => {
                    setArticles(prev => {
                      const exists = prev.find(a => a.id === saved.id);
                      return exists ? prev.map(a => a.id === saved.id ? saved : a) : [...prev, saved];
                    });
                    setEditingArt(null);
                  }}
                  onCancel={() => setEditingArt(null)}
                />
              </>
            ) : (
              <>
                <div className="admin-section-header">
                  <h2>Articles ({articles.length})</h2>
                  <button className="btn btn-primary btn-sm" onClick={() => setEditingArt(false)}>
                    + Add Article
                  </button>
                </div>
                {loading ? (
                  <p className="loading-state">Loading…</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: 28 }}></th>
                          <th style={{ width: 70 }}>Thumb</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th style={{ width: 60 }}>Order</th>
                          <th style={{ width: 70 }}>Active</th>
                          <th style={{ width: 160 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.map((art, i) => (
                          <tr
                            key={art.id}
                            className={[!art.active && 'row-inactive', artDrag.overIdx === i && 'drag-over'].filter(Boolean).join(' ')}
                            {...artDrag.dragProps(i)}
                          >
                            <td className="drag-handle">⠿</td>
                            <td>
                              {art.thumbnail_url && (
                                <img src={art.thumbnail_url} alt="" className="admin-table-thumb" />
                              )}
                            </td>
                            <td>
                              <strong>{art.title}</strong>
                              {art.medium_url && (
                                <span style={{ marginLeft: 6, fontSize: 11 }}>
                                  <a href={art.medium_url} target="_blank" rel="noopener noreferrer">↗</a>
                                </span>
                              )}
                            </td>
                            <td>{art.author_name}</td>
                            <td>{art.sort_order}</td>
                            <td>
                              <button
                                className={`btn btn-sm ${art.active ? 'btn-secondary' : 'btn-danger'}`}
                                onClick={() => handleToggleArticle(art)}
                              >
                                {art.active ? '✓' : '✗'}
                              </button>
                            </td>
                            <td>
                              <div className="admin-table-actions">
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditingArt(art)}>
                                  Edit
                                </button>
                                {deleteConfirm?.type === 'art' && deleteConfirm.id === art.id ? (
                                  <>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteArticle(art.id)}>
                                      Confirm
                                    </button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setDeleteConfirm(null)}>
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button className="btn btn-danger btn-sm"
                                    onClick={() => setDeleteConfirm({ type: 'art', id: art.id })}>
                                    Delete
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                        {articles.length === 0 && (
                          <tr><td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                            No articles yet — click Add Article to get started.
                          </td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ── USERS TAB ────────────────────────────────────────────── */}
        {tab === 'Users' && (
          <AdminUsers currentUser={user} />
        )}

        {/* ── SETTINGS TAB ─────────────────────────────────────────── */}
        {tab === 'Settings' && (
          <>
            <div className="admin-section-header">
              <h2>Your Profile</h2>
            </div>
            <UserSettings user={user} onUpdate={onUpdateUser} />
          </>
        )}

      </div>
    </div>
  );
}
