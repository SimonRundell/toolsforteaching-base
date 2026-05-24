/**
 * Grid of article cards with loading/error states.
 * @license CC BY-NC-SA 4.0
 */
import ArticleCard from './ArticleCard';
import { useArticles } from '../../hooks/useArticles';

export default function ArticlesGrid() {
  const { articles, loading, error } = useArticles();

  return (
    <section id="articles" className="articles-section">
      <div className="container">
        <div className="section-header">
          <h2>Articles</h2>
          <p>Research-backed ideas published on Medium.</p>
        </div>

        <div className="articles-grid">
          {loading && <p className="loading-state">Loading articles…</p>}
          {error   && <p className="loading-state">Error: {error}</p>}
          {!loading && !error && articles.length === 0 && (
            <p className="empty-state">No articles added yet.</p>
          )}
          {articles.map(a => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
