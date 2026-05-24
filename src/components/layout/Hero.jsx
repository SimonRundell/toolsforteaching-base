/**
 * Hero section — exact SVG logo + badges + CTA from the original site.
 * @license CC BY-NC-SA 4.0
 */

/** @param {{ onContactClick: Function }} props */
export default function Hero({ onContactClick }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">

          {/* SVG Logo – identical to original */}
          <h1>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 400" role="img"
              aria-label="Tools for Teaching – Portal Hero"
              style={{ width: '100%', height: 'auto', display: 'block' }}>
              <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#f9f9f9"/>
                  <stop offset="100%" stopColor="#ececec"/>
                </linearGradient>
                <pattern id="grid" width="65" height="65" patternUnits="userSpaceOnUse">
                  <path d="M0 0H65 M0 0V65" fill="none"
                    stroke="rgba(0,0,0,0.045)" strokeWidth="1"
                    vectorEffect="non-scaling-stroke" shapeRendering="crispEdges"/>
                </pattern>
              </defs>

              <rect width="1200" height="400" fill="url(#bgGrad)"/>
              <rect width="1200" height="400" fill="url(#grid)"/>

              {/* Animated blobs */}
              <g transform="translate(1000 50)">
                <animateTransform attributeName="transform" additive="sum" type="scale"
                  values="1;1.03;0.99;1" dur="18s" repeatCount="indefinite"/>
                <circle cx="0" cy="0" r="180" fill="#a9dd15" opacity="0.30">
                  <animate attributeName="opacity" values="0.26;0.34;0.28;0.32;0.26"
                    dur="16s" repeatCount="indefinite"/>
                </circle>
              </g>
              <g transform="translate(500 350)">
                <animateTransform attributeName="transform" additive="sum" type="scale"
                  values="1;1.04;0.99;1" dur="21s" repeatCount="indefinite"/>
                <circle cx="0" cy="0" r="150" fill="#2596be" opacity="0.30">
                  <animate attributeName="opacity" values="0.25;0.33;0.27;0.31;0.25"
                    dur="19s" repeatCount="indefinite"/>
                </circle>
              </g>

              <line x1="800" y1="0" x2="1200" y2="400"
                stroke="#2596be" strokeWidth="40" strokeLinecap="round" opacity="0.40">
                <animate attributeName="opacity" values="0.32;0.44;0.34;0.40;0.32"
                  dur="22s" repeatCount="indefinite"/>
              </line>

              <g transform="translate(1100 380)">
                <animateTransform attributeName="transform" additive="sum" type="scale"
                  values="1;1.10;0.98;1" dur="14s" repeatCount="indefinite"/>
                <circle cx="0" cy="0" r="30" fill="#a9dd15" opacity="0.30">
                  <animate attributeName="opacity" values="0.24;0.38;0.26;0.34;0.24"
                    dur="13s" repeatCount="indefinite"/>
                </circle>
              </g>
              <g transform="translate(700 200)">
                <animateTransform attributeName="transform" additive="sum" type="scale"
                  values="1;1.12;0.98;1" dur="15s" repeatCount="indefinite"/>
                <circle cx="0" cy="0" r="30" fill="#2596be" opacity="0.50">
                  <animate attributeName="opacity" values="0.42;0.58;0.46;0.54;0.42"
                    dur="12s" repeatCount="indefinite"/>
                </circle>
              </g>

              {/* Title text */}
              <text x="45" y="165" fontFamily="'Playfair Display','Arial Black',sans-serif"
                fontSize="120" fontWeight="700" fill="#2596be" stroke="#2596be"
                strokeWidth="2" opacity="0.40">Tools</text>
              <text x="65" y="240" fontFamily="'Playfair Display','Arial Black',sans-serif"
                fontSize="90" fontWeight="700" fill="#a9dd15" stroke="#a9dd15"
                strokeWidth="2" opacity="0.40">for</text>
              <text x="65" y="330" fontFamily="'Playfair Display','Arial Black',sans-serif"
                fontSize="120" fontWeight="700" fill="#2596be" stroke="#2596be"
                strokeWidth="2" opacity="0.40">Teaching</text>
              <line x1="60" y1="340" x2="495" y2="340"
                stroke="#1E1E1E" strokeWidth="6" strokeLinecap="round" opacity="0.40"/>
            </svg>
          </h1>

          {/* Badges */}
          <div className="hero-badge">No signup required</div>
          <div className="hero-badge">Always free — no fees or charges</div>
          <div className="hero-badge">Code available on GitHub!</div>

          <h2>Tools you can use immediately</h2>

          <p>
            Tools for Teaching is a growing collection of classroom-ready web apps created by
            ITDD staff at the{' '}
            <a target="_blank" href="https://exe-coll.ac.uk/endc/" rel="noopener noreferrer">
              Exeter and North Devon Colleges Group
            </a>.
          </p>

          <section>
            <h2>Why Tools for Teaching?</h2>
            <p>
              Tools for Teaching provides free, browser-based tools designed for classroom use,
              teacher training, and independent learning.
            </p>
            <p>Articles and tools provided here are created by teachers for teachers.</p>
            <p>
              Tools are all provided under{' '}
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
                Creative Commons
              </a>{' '}
              licenses — the purpose of this website is to promote and share, not to profit.
            </p>
          </section>

          <button
            className="btn btn-primary"
            type="button"
            style={{ marginTop: '12px' }}
            onClick={onContactClick}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
