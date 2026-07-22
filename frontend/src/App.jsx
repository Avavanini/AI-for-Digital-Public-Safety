import React from 'react';
import './index.css';

import CitizenShield from './components/CitizenShield';
import Scanner from './components/Scanner';

function App() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar glass-panel">
        <div>
          <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>Rakshak AI</h2>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Digital Public Safety</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a href="#" className="text-primary" style={{ textDecoration: 'none', fontWeight: 500 }}>Dashboard</a>
          <a href="#" className="text-secondary" style={{ textDecoration: 'none' }}>Citizen Shield</a>
          <a href="#" className="text-secondary" style={{ textDecoration: 'none' }}>Scanner</a>
          <a href="#" className="text-secondary" style={{ textDecoration: 'none' }}>Alerts</a>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>System Status</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-color)' }}></div>
              <span style={{ fontSize: '0.9rem' }}>All systems nominal</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header glass-panel" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0 }}>
          <h3 style={{ fontWeight: 500 }}>Command Center</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Officer ID: 9482A</span>
            <button className="btn btn-primary">New Alert</button>
          </div>
        </header>
        
        <div className="content-area animate-fade-in">
          <div className="dashboard-grid">
            <CitizenShield />
            <Scanner />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
