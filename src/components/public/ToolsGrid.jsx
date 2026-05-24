/**
 * Grid of tool cards with loading/error states.
 * @license CC BY-NC-SA 4.0
 */
import { useState } from 'react';
import ToolCard from './ToolCard';
import MoreInfoModal from './MoreInfoModal';
import { useApps } from '../../hooks/useApps';

export default function ToolsGrid() {
  const { apps, loading, error } = useApps();
  const [selected, setSelected] = useState(null);

  return (
    <section id="tools" className="tools-section">
      <div className="container">
        <div className="section-header">
          <h2>Tools</h2>
          <p>Each tool is built to be simple to launch and easy to use during lessons, workshops, or independent study.</p>
        </div>

        <div className="tools-grid">
          {loading && <p className="loading-state">Loading tools…</p>}
          {error   && <p className="loading-state">Error: {error}</p>}
          {!loading && !error && apps.length === 0 && (
            <p className="empty-state">No tools added yet.</p>
          )}
          {apps.map(app => (
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
