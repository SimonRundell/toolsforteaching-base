/**
 * Individual tool card — matches original card design exactly.
 * @license CC BY-NC-SA 4.0
 */

/**
 * @param {{ app: Object, onMoreInfo: Function }} props
 */
export default function ToolCard({ app, onMoreInfo }) {
  return (
    <article className="tool-card">
      {app.image_path && (
        <img
          src={`/${app.image_path}`}
          alt={app.image_alt || app.title}
          className="tool-card-image"
          loading="lazy"
        />
      )}
      <div className="tool-card-content">
        <div className="tool-card-header">
          <h3 className="tool-card-title">{app.title}</h3>
          {app.badge && (
            <span
              className={`tool-badge ${app.badge_bg ? '' : (app.badge_class || '')}`}
              style={app.badge_bg ? { background: app.badge_bg, color: app.badge_fg || '#ffffff' } : {}}
            >
              {app.badge}
            </span>
          )}
        </div>
        <p className="tool-card-description">{app.description}</p>
        <div className="tool-card-actions">
          {app.more_info_body && (
            <button
              className="more-info-btn"
              type="button"
              aria-label={`More info about ${app.title}`}
              onClick={() => onMoreInfo(app)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Zm0 15a1 1 0 0 1-1-1v-4a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1Zm0-9a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 12 8Z"/>
              </svg>
              More info
            </button>
          )}
          {app.launch_url && (
            <a
              href={app.launch_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Launch ↗
            </a>
          )}
          {app.github_url && (
            <a
              href={app.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
