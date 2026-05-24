/**
 * Sticky dark header — matches original design.
 * Contains a subtle admin link in the top-right corner.
 * @license CC BY-NC-SA 4.0
 */
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <Link to="/admin" className="header-admin-link">Admin</Link>
      </div>
    </header>
  );
}
