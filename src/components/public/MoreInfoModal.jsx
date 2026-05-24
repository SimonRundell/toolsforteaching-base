/**
 * More Info modal — shown when user clicks the info button on a tool card.
 * Uses dangerouslySetInnerHTML for the stored HTML body (admin-controlled content).
 * @license CC BY-NC-SA 4.0
 */
import { useEffect } from 'react';

/**
 * @param {{ app: Object, onClose: Function }} props
 */
export default function MoreInfoModal({ app, onClose }) {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="moreinfo-title">
        <div className="modal-header">
          <h3 className="modal-title" id="moreinfo-title">
            {app.more_info_title || app.title}
          </h3>
          <div className="modal-header-actions">
            {app.launch_url && (
              <a
                href={app.launch_url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '8px 14px', fontSize: '13px' }}
              >
                Launch ↗
              </a>
            )}
            <button
              className="modal-close"
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              autoFocus
            >
              ✕
            </button>
          </div>
        </div>
        <div
          className="modal-body"
          dangerouslySetInnerHTML={{ __html: app.more_info_body }}
        />
      </div>
    </div>
  );
}
