/**
 * User settings panel — email, GitHub stub, Buy Me A Coffee URL, college email, password change.
 * @license CC BY-NC-SA 4.0
 */
import { useState } from 'react';
import client from '../../api/client';

/**
 * @param {{ user: Object, onUpdate: Function }} props
 */
export default function UserSettings({ user, onUpdate }) {
  const [profile, setProfile] = useState({
    email:            user.email           ?? '',
    github_url_stub:  user.github_url_stub ?? '',
    buymeacoffee_url: user.buymeacoffee_url?? '',
    college_email:    user.college_email   ?? '',
  });
  const [pw,      setPw]      = useState({ current_password: '', new_password: '', confirm: '' });
  const [status,  setStatus]  = useState(null);
  const [saving,  setSaving]  = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const { data } = await client.put('/users.php', profile);
      onUpdate(data);
      setStatus({ type: 'success', msg: 'Profile updated.' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error ?? 'Save failed' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (pw.new_password !== pw.confirm) {
      setStatus({ type: 'error', msg: 'New passwords do not match' });
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      await client.put('/users.php', {
        current_password: pw.current_password,
        new_password:     pw.new_password,
        ...profile,
      });
      setPw({ current_password: '', new_password: '', confirm: '' });
      setStatus({ type: 'success', msg: 'Password changed.' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error ?? 'Password change failed' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h3 style={{ marginBottom: 8 }}>Logged in as: {user.username}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>
        These settings affect how your apps are displayed. GitHub URL stub is used to
        pre-fill the GitHub field when adding new tools.
      </p>

      {/* Profile form */}
      <form onSubmit={handleProfileSave}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={profile.email}
            onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>GitHub URL Stub</label>
          <input value={profile.github_url_stub}
            onChange={e => setProfile(p => ({ ...p, github_url_stub: e.target.value }))}
            placeholder="e.g. SimonRundell" />
          <p className="form-hint">
            Your GitHub username or organisation name — used to pre-fill new app GitHub URLs
          </p>
        </div>
        <div className="form-group">
          <label>Buy Me A Coffee URL</label>
          <input value={profile.buymeacoffee_url}
            onChange={e => setProfile(p => ({ ...p, buymeacoffee_url: e.target.value }))}
            placeholder="https://buymeacoffee.com/yourusername" />
        </div>
        <div className="form-group">
          <label>College / Institutional Email</label>
          <input type="email" value={profile.college_email}
            onChange={e => setProfile(p => ({ ...p, college_email: e.target.value }))}
            placeholder="you@institution.ac.uk" />
        </div>

        {status && <div className={`form-status ${status.type}`}>{status.msg}</div>}

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save Profile'}
        </button>
      </form>

      {/* Password change form */}
      <hr style={{ margin: '32px 0', border: 'none', borderTop: 'var(--border)' }} />
      <h3 style={{ marginBottom: 16 }}>Change Password</h3>
      <form onSubmit={handlePasswordSave}>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" required value={pw.current_password}
            onChange={e => setPw(p => ({ ...p, current_password: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" required value={pw.new_password}
            onChange={e => setPw(p => ({ ...p, new_password: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" required value={pw.confirm}
            onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Change Password'}
        </button>
      </form>
    </div>
  );
}
