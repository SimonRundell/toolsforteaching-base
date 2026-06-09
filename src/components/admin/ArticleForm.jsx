/**
 * Add / Edit article form used inside the admin panel.
 * @license CC BY-NC-SA 4.0
 */
import { useState } from 'react';
import client from '../../api/client';

const EMPTY = {
  medium_url: '', title: '', author_name: '',
  description: '', thumbnail_url: '', sort_order: 0, active: 1,
};

/**
 * @param {{ article: Object|null, onSave: Function, onCancel: Function }} props
 */
export default function ArticleForm({ article, onSave, onCancel }) {
  const [form,   setForm]   = useState(article ? { ...article } : { ...EMPTY });
  const [error,  setError]  = useState('');
  const [saving, setSaving] = useState(false);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      let saved;
      if (article?.id) {
        const { data } = await client.put(`/articles.php?id=${article.id}`, form);
        saved = data;
      } else {
        const { data } = await client.post('/articles.php', form);
        saved = data;
      }
      onSave(saved);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Medium URL</label>
        <input type="url" value={form.medium_url} onChange={e => set('medium_url', e.target.value)}
          placeholder="https://medium.com/@author/article-slug" />
      </div>

      <div className="form-group">
        <label>Title *</label>
        <input required value={form.title} onChange={e => set('title', e.target.value)} />
      </div>

      <div className="form-group">
        <label>Author Name</label>
        <input value={form.author_name} onChange={e => set('author_name', e.target.value)}
          placeholder="e.g. Adam Clement" />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea rows={4} value={form.description} onChange={e => set('description', e.target.value)}
          placeholder="A short summary shown on the card" />
      </div>

      <div className="form-group">
        <label>Thumbnail URL</label>
        <input value={form.thumbnail_url} onChange={e => set('thumbnail_url', e.target.value)}
          placeholder="https://… or leave blank" />
        <p className="form-hint">Paste the Medium article thumbnail URL, or leave blank</p>
        {form.thumbnail_url && (
          <img src={form.thumbnail_url} alt="Thumbnail preview" className="upload-preview" />
        )}
      </div>

      <div className="form-group">
        <label>Sort Order</label>
        <input type="number" value={form.sort_order}
          onChange={e => set('sort_order', parseInt(e.target.value) || 0)} />
      </div>

      {article?.id && (
        <div className="form-group">
          <label>
            <input type="checkbox" checked={!!form.active}
              onChange={e => set('active', e.target.checked ? 1 : 0)} />
            {' '}Active (visible on public site)
          </label>
        </div>
      )}

      {error && <div className="form-status error">{error}</div>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : (article?.id ? 'Save Changes' : 'Add Article')}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
