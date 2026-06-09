/**
 * Grid of tool cards with loading/error states and client-side filtering.
 * @license CC BY-NC-SA 4.0
 */
import { useState, useMemo } from 'react';
import ToolCard from './ToolCard';
import MoreInfoModal from './MoreInfoModal';
import { useApps } from '../../hooks/useApps';

const stripHtml = (html) => html ? html.replace(/<[^>]+>/g, ' ') : '';

export default function ToolsGrid() {
  const { apps, loading, error } = useApps();
  const [selected,     setSelected]     = useState(null);
  const [search,       setSearch]       = useState('');
  const [badgeFilter,  setBadgeFilter]  = useState('All');

  const badges = useMemo(
    () => ['All', ...Array.from(new Set(apps.filter(a => a.badge).map(a => a.badge.toUpperCase())))],
    [apps]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return apps.filter(app => {
      if (badgeFilter !== 'All' && app.badge.toUpperCase() !== badgeFilter) return false;
      if (!q) return true;
      return (
        app.title.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        stripHtml(app.more_info_body).toLowerCase().includes(q)
      );
    });
  }, [apps, search, badgeFilter]);

  const isFiltered = search.trim() !== '' || badgeFilter !== 'All';

  return (
    <section id="tools" className="tools-section">
      <div className="container">
        <div className="section-header">
          <h2>Tools</h2>
          <p>Each tool is built to be simple to launch and easy to use during lessons, workshops, or independent study.</p>
        </div>

        {!loading && !error && apps.length > 0 && (
          <div className="tools-filter-bar">
            <input
              type="search"
              placeholder="Search tools…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search tools"
            />
            <select
              value={badgeFilter}
              onChange={e => setBadgeFilter(e.target.value)}
              aria-label="Filter by category"
            >
              {badges.map(b => (
                <option key={b} value={b}>{b === 'All' ? 'All categories' : b}</option>
              ))}
            </select>
          </div>
        )}

        <div className="tools-grid">
          {loading && <p className="loading-state">Loading tools…</p>}
          {error   && <p className="loading-state">Error: {error}</p>}
          {!loading && !error && apps.length === 0 && (
            <p className="empty-state">No tools added yet.</p>
          )}
          {!loading && !error && isFiltered && filtered.length === 0 && (
            <p className="empty-state">No tools match your search.</p>
          )}
          {filtered.map(app => (
            <ToolCard key={app.id} app={app} onMoreInfo={setSelected} />
          ))}
        </div>
      </div>

      {selected && (
        <MoreInfoModal app={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
