/**
 * Add / Edit app form used inside the admin panel.
 * Handles image upload via /api/upload.php.
 * @license CC BY-NC-SA 4.0
 */
import { useState, useRef } from 'react';
import client from '../../api/client';
import RichTextEditor from './RichTextEditor';

const BADGE_PRESETS = [
  { label: 'Python',      bg: '#4B8BBE', fg: '#FFFF00' },
  { label: 'Agile',       bg: '#FFFF80', fg: '#1a1a2e' },
  { label: 'Terminal',    bg: '#1a1a2e', fg: '#74c69d' },
  { label: 'SQL',         bg: '#a8dadc', fg: '#1a1a2e' },
  { label: 'Cyber',       bg: '#e63946', fg: '#ffffff' },
  { label: 'Networking',  bg: '#c77dff', fg: '#1a1a2e' },
  { label: 'Revision',    bg: '#fb923c', fg: '#1a1a2e' },
  { label: 'Testing',     bg: '#ffc5d3', fg: '#1a1a2e' },
  { label: 'Hardware',    bg: '#a8dadc', fg: '#1a1a2e' },
  { label: 'Web Dev',     bg: '#74c69d', fg: '#1a1a2e' },
  { label: 'Crypto',      bg: '#1a1a2e', fg: '#a9dd15' },
];

const EMPTY = {
  app_key: '', title: '', description: '', image_path: '', image_alt: '',
  badge: '', badge_class: '', badge_bg: '', badge_fg: '',
  launch_url: '', github_url: '',
  more_info_title: '', more_info_body: '', sort_order: 0, active: 1,
};

/**
 * @param {{ app: Object|null, onSave: Function, onCancel: Function, user: Object }} props
 */
export default function AppForm({ app, onSave, onCancel, user }) {
  const [form,     setForm]     = useState(app ? { ...EMPTY, ...app } : { ...EMPTY });
  const [error,    setError]    = useState('');
  const [saving,   setSaving]   = useState(false);
  const [uploading,setUploading]= useState(false);
  const fileRef                 = useRef();

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const { data } = await client.post('/upload.php', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      set('image_path', data.path.replace(/^\//, ''));
    } catch (err) {
      setError(err.response?.data?.error ?? 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      let saved;
      if (app?.id) {
        const { data } = await client.put(`/apps.php?id=${app.id}`, form);
        saved = data;
      } else {
        const { data } = await client.post('/apps.php', form);
        saved = data;
      }
      onSave(saved);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  /* Pre-fill github URL prefix from user stub when key is entered */
  const handleKeyBlur = () => {
    if (!form.github_url && user?.github_url_stub) {
      set('github_url', `https://github.com/${user.github_url_stub}/`);
    }
    if (!form.more_info_title && form.title) {
      set('more_info_title', `${form.title} - More info`);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>App Key *</label>
          <input required value={form.app_key}
            onChange={e => set('app_key', e.target.value)}
            onBlur={handleKeyBlur}
            placeholder="e.g. think2code"
          />
          <p className="form-hint">Unique slug — lowercase, no spaces</p>
        </div>
        <div className="form-group">
          <label>Sort Order</label>
          <input type="number" value={form.sort_order}
            onChange={e => set('sort_order', parseInt(e.target.value) || 0)} />
        </div>
      </div>

      <div className="form-group">
        <label>Title *</label>
        <input required value={form.title} onChange={e => set('title', e.target.value)} />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea required rows={3} value={form.description}
          onChange={e => set('description', e.target.value)} />
      </div>

      <div className="form-group">
        <label>Badge Text</label>
        <input value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="e.g. Python" />
      </div>

      {form.badge && (
        <div className="badge-preview-row">
          <span className="badge-preview-label">Preview:</span>
          <span
            className={`tool-badge ${form.badge_bg ? '' : (form.badge_class || '')}`}
            style={form.badge_bg ? { background: form.badge_bg, color: form.badge_fg || '#ffffff' } : {}}
          >
            {form.badge}
          </span>
        </div>
      )}

      <div className="form-group">
        <label>Badge Colour</label>
        <div className="badge-presets">
          {BADGE_PRESETS.map(p => (
            <button
              key={p.label}
              type="button"
              title={p.label}
              className={`badge-preset${form.badge_bg === p.bg && form.badge_fg === p.fg ? ' selected' : ''}`}
              style={{ background: p.bg, color: p.fg }}
              onClick={() => setForm(f => ({ ...f, badge_bg: p.bg, badge_fg: p.fg }))}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="badge-color-row">
          <div className="badge-color-picker">
            <label>BG</label>
            <input
              type="color"
              value={form.badge_bg || '#4B8BBE'}
              onChange={e => setForm(f => ({ ...f, badge_bg: e.target.value }))}
            />
          </div>
          <div className="badge-color-picker">
            <label>Text</label>
            <input
              type="color"
              value={form.badge_fg || '#ffffff'}
              onChange={e => setForm(f => ({ ...f, badge_fg: e.target.value }))}
            />
          </div>
          {form.badge_bg && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setForm(f => ({ ...f, badge_bg: '', badge_fg: '' }))}
            >
              Clear colour
            </button>
          )}
        </div>
        <p className="form-hint">Pick a preset or use the colour pickers. Clear to revert to CSS class.</p>
      </div>

      <div className="form-group">
        <label>Screenshot Image</label>
        <div className="upload-area" onClick={() => fileRef.current?.click()}>
          {uploading ? 'Uploading…' : 'Click to upload image (JPG, PNG, WebP, GIF, SVG — max 5 MB)'}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
        </div>
        {form.image_path && (
          <img src={`/${form.image_path}`} alt="Preview" className="upload-preview" />
        )}
        <input style={{ marginTop: '8px' }} value={form.image_path}
          onChange={e => set('image_path', e.target.value)}
          placeholder="images/filename.jpg (or paste path)" />
      </div>

      <div className="form-group">
        <label>Image Alt Text</label>
        <input value={form.image_alt} onChange={e => set('image_alt', e.target.value)} />
      </div>

      <div className="form-group">
        <label>Launch URL</label>
        <input type="url" value={form.launch_url} onChange={e => set('launch_url', e.target.value)}
          placeholder="https://…" />
      </div>

      <div className="form-group">
        <label>GitHub URL</label>
        <input type="url" value={form.github_url} onChange={e => set('github_url', e.target.value)}
          placeholder={`https://github.com/${user?.github_url_stub || 'username'}/repo`} />
        <p className="form-hint">Leave blank if not on GitHub</p>
      </div>

      <div className="form-group">
        <label>More Info Title</label>
        <input value={form.more_info_title} onChange={e => set('more_info_title', e.target.value)} />
      </div>

      <div className="form-group">
        <label>More Info Body</label>
        <RichTextEditor
          value={form.more_info_body}
          onChange={val => set('more_info_body', val)}
        />
      </div>

      {app?.id && (
        <div className="form-group">
          <label className="toggle-label">
            <span className="toggle-text">Active (visible on public site)</span>
            <span className={`toggle-switch${form.active ? ' on' : ''}`}>
              <input type="checkbox" checked={!!form.active}
                onChange={e => set('active', e.target.checked ? 1 : 0)} />
              <span className="toggle-track"><span className="toggle-thumb" /></span>
            </span>
          </label>
        </div>
      )}

      {error && <div className="form-status error">{error}</div>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
          {saving ? 'Saving…' : (app?.id ? 'Save Changes' : 'Add Tool')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
