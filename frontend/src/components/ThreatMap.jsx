import React, { useEffect, useState } from 'react';

export default function ThreatMap() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Generate some random dots for the map
    const initialDots = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5% to 95%
      y: Math.random() * 80 + 10,
      severity: Math.random() > 0.7 ? 'high' : 'medium'
    }));
    setDots(initialDots);

    // Occasionally add a new threat
    const interval = setInterval(() => {
      setDots(prev => {
        const newDots = [...prev];
        if (newDots.length > 25) newDots.shift();
        newDots.push({
          id: Date.now(),
          x: Math.random() * 90 + 5,
          y: Math.random() * 80 + 10,
          severity: Math.random() > 0.8 ? 'high' : 'medium'
        });
        return newDots;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ color: 'var(--accent-color)' }}>Geospatial Crime Intel</h4>
        <span className="text-secondary" style={{ fontSize: '0.8rem' }}>Live Feed Active</span>
      </div>
      
      <div style={{ 
        flex: 1, 
        background: 'linear-gradient(145deg, rgba(10, 15, 30, 0.8), rgba(20, 30, 50, 0.9))', 
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Mock Map Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Threat Dots */}
        {dots.map(dot => (
          <div key={dot.id} style={{
            position: 'absolute',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.severity === 'high' ? '12px' : '8px',
            height: dot.severity === 'high' ? '12px' : '8px',
            backgroundColor: dot.severity === 'high' ? 'var(--danger-color)' : 'var(--warning-color)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 15px ${dot.severity === 'high' ? 'var(--danger-color)' : 'var(--warning-color)'}`,
            animation: 'pulse 2s infinite'
          }}>
            <div style={{
              position: 'absolute',
              inset: '-100%',
              borderRadius: '50%',
              border: `1px solid ${dot.severity === 'high' ? 'var(--danger-color)' : 'var(--warning-color)'}`,
              animation: 'ripple 2s infinite'
            }} />
          </div>
        ))}
        
        <style>{`
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.8; }
            50% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.8; }
          }
          @keyframes ripple {
            0% { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}</style>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: '4px', display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: '8px', height: '8px', background: 'var(--danger-color)', borderRadius: '50%' }}></span> High Priority</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: '8px', height: '8px', background: 'var(--warning-color)', borderRadius: '50%' }}></span> Suspicious</div>
        </div>
      </div>
    </div>
  );
}
