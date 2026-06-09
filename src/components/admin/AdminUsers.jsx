/**
 * Admin Users tab — list, add, and delete admin accounts.
 * The current user's own row has the Delete button disabled.
 * @license CC BY-NC-SA 4.0
 */
import { useState, useEffect } from 'react';
import client from '../../api/client';

const EMPTY_FORM = {
  username:         '',
  email:            '',
  password:         '',
  confirm:          '',
  github_url_stub:  '',
  buymeacoffee_url: '',
  college_email:    '',
};

/**
 * @param {{ currentUser: Object }} props
 */
export default function AdminUsers({ currentUser }) {
  const [users,         setUsers]         = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [adding,        setAdding]        = useState(false);
  const [form,          setForm]          = useState(EMPTY_FORM);
  const [saving,        setSaving]        = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [status,        setStatus]        = useState(null);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data } = await client.get('/admin_users.php');
      setUsers(data);
    } catch {
      setStatus({ type: 'error', msg: 'Failed to load users' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (form.password !== form.confirm) {
      setStatus({ type: 'error', msg: 'Passwords do not match' });
      return;
    }
    setSaving(true);
    try {
      const { data } = await client.post('/admin_users.php', {
        username:         form.username,
        email:            form.email,
        password:         form.password,
        github_url_stub:  form.github_url_stub,
        buymeacoffee_url: form.buymeacoffee_url,
        college_email:    form.college_email,
      });
      setUsers(prev => [...prev, data]);
      setForm(EMPTY_FORM);
      setAdding(false);
      setStatus({ type: 'success', msg: `User "${data.username}" created.` });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error ?? 'Failed to create user' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await client.delete(`/admin_users.php?id=${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error ?? 'Delete failed' });
    }
  };

  const field = (key, e) => setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div>
      {adding ? (
        <>
          <div className="admin-section-header">
            <h2>Add New Admin User</h2>
          </div>

          <form onSubmit={handleAdd} style={{ maxWidth: 520 }}>
            <div className="form-group">
              <label>Username <span style={{ color: 'var(--red)' }}>*</span></label>
              <input required value={form.username} onChange={e => field('username', e)} autoFocus />
            </div>
            <div className="form-group">
              <label>Email <span style={{ color: 'var(--red)' }}>*</span></label>
              <input type="email" required value={form.email} onChange={e => field('email', e)} />
            </div>
            <div className="form-group">
              <label>Password <span style={{ color: 'var(--red)' }}>*</span></label>
              <input type="password" required minLength={8} value={form.password}
                onChange={e => field('password', e)} />
              <p className="form-hint">Minimum 8 characters</p>
            </div>
            <div className="form-group">
              <label>Confirm Password <span style={{ color: 'var(--red)' }}>*</span></label>
              <input type="password" required value={form.confirm} onChange={e => field('confirm', e)} />
            </div>

            <hr style={{ margin: '20px 0', border: 'none', borderTop: 'var(--border)' }} />
            <p className="form-hint" style={{ marginBottom: 16 }}>
              Optional — the new user can fill these in from their Settings tab.
            </p>

            <div className="form-group">
              <label>GitHub URL Stub</label>
              <input value={form.github_url_stub} onChange={e => field('github_url_stub', e)}
                placeholder="e.g. SimonRundell" />
            </div>
            <div className="form-group">
              <label>Buy Me A Coffee URL</label>
              <input value={form.buymeacoffee_url} onChange={e => field('buymeacoffee_url', e)}
                placeholder="https://buymeacoffee.com/username" />
            </div>
            <div className="form-group">
              <label>College / Institutional Email</label>
              <input type="email" value={form.college_email} onChange={e => field('college_email', e)}
                placeholder="you@institution.ac.uk" />
            </div>

            {status && <div className={`form-status ${status.type}`}>{status.msg}</div>}

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Creating…' : 'Create User'}
              </button>
              <button type="button" className="btn btn-secondary"
                onClick={() => { setAdding(false); setForm(EMPTY_FORM); setStatus(null); }}>
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="admin-section-header">
            <h2>Admin Users ({users.length})</h2>
            <button className="btn btn-primary btn-sm" onClick={() => { setAdding(true); setStatus(null); }}>
              + Add User
            </button>
          </div>

          {status && <div className={`form-status ${status.type}`} style={{ marginBottom: 16 }}>{status.msg}</div>}

          {loading ? (
            <p className="loading-state">Loading…</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>GitHub Stub</th>
                    <th>Created</th>
                    <th style={{ width: 140 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>
                        <strong>{u.username}</strong>
                        {u.id === currentUser.id && (
                          <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--text-muted)' }}>(you)</span>
                        )}
                      </td>
                      <td>{u.email}</td>
                      <td>{u.github_url_stub || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                      <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                        {u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB') : '—'}
                      </td>
                      <td>
                        {u.id === currentUser.id ? (
                          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Cannot delete self</span>
                        ) : deleteConfirm === u.id ? (
                          <div className="admin-table-actions">
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
                              Confirm
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setDeleteConfirm(null)}>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button className="btn btn-danger btn-sm"
                            onClick={() => setDeleteConfirm(u.id)}>
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
