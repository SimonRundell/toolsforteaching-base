/**
 * Contact form modal — submits via the /api/contact.php backend.
 * @license CC BY-NC-SA 4.0
 */
import { useState, useEffect } from 'react';
import client from '../../api/client';

/**
 * @param {{ onClose: Function }} props
 */
export default function ContactModal({ onClose }) {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [status,  setStatus]  = useState(null); // null | { type: 'success'|'error', msg }
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await client.post('/contact.php', form);
      setStatus({ type: 'success', msg: '✓ Message sent successfully.' });
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(onClose, 3000);
    } catch (err) {
      setStatus({ type: 'error', msg: '✗ ' + (err.response?.data?.error ?? 'Something went wrong.') });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <div className="modal-header">
          <h3 className="modal-title" id="contact-title">Contact Us</h3>
          <div className="modal-header-actions">
            <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" required value={form.name} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" required value={form.email} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" name="subject" type="text" required value={form.subject} onChange={handleChange} />
            </div>
            <div className="contact-form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" required rows={6} value={form.message} onChange={handleChange} />
            </div>
            {status && (
              <div className={`form-status ${status.type}`}>{status.msg}</div>
            )}
            <button type="submit" className="btn btn-primary" disabled={sending} style={{ width: '100%' }}>
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
