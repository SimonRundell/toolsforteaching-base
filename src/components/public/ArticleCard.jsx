/**
 * Article card for Medium articles stored in the database.
 * @license CC BY-NC-SA 4.0
 */

/**
 * @param {{ article: Object }} props
 */
export default function ArticleCard({ article }) {
  return (
    <article className="tool-card article-card">
      {article.thumbnail_url && (
        <img
          src={article.thumbnail_url}
          alt={article.title}
          className="tool-card-image"
          loading="lazy"
        />
      )}
      <div className="tool-card-content">
        <div className="tool-card-header">
          <h3 className="tool-card-title">{article.title}</h3>
          <span className="tool-badge medium">Medium</span>
        </div>
        {article.author_name && (
          <p className="article-meta">By {article.author_name} on Medium</p>
        )}
        {article.description && (
          <p className="tool-card-description">{article.description}</p>
        )}
        <div className="tool-card-actions">
          {article.medium_url && (
            <a
              href={article.medium_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Read ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
