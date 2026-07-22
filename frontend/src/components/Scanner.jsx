import React, { useState } from 'react';

export default function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScanning(true);
      setResult(null);
      // Simulate scan delay
      setTimeout(() => {
        setScanning(false);
        // Randomly return authentic or counterfeit for demo
        setResult({
          isAuthentic: Math.random() > 0.5,
          confidence: (Math.random() * 15 + 85).toFixed(2), // 85-100%
          issues: ['Microprint mismatch on Gandhi portrait', 'Security thread UV reflection failed']
        });
      }, 2500);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '400px' }}>
      <h4 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Counterfeit Currency Scanner</h4>
      
      {!scanning && !result && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--panel-border)', borderRadius: '12px' }}>
          <p className="text-secondary" style={{ marginBottom: '1rem' }}>Upload currency image for AI verification</p>
          <label className="btn btn-primary">
            Upload Image
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
          </label>
        </div>
      )}

      {scanning && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden', borderRadius: '4px', position: 'relative', marginBottom: '1rem' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '30%', background: 'var(--accent-color)', animation: 'scan 1.5s infinite linear' }} />
          </div>
          <style>{`
            @keyframes scan {
              0% { left: -30%; }
              100% { left: 100%; }
            }
          `}</style>
          <p className="text-secondary">Analyzing microprints and security threads...</p>
        </div>
      )}

      {result && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '8px', background: result.isAuthentic ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${result.isAuthentic ? 'var(--success-color)' : 'var(--danger-color)'}` }}>
            <div>
              <h3 style={{ color: result.isAuthentic ? 'var(--success-color)' : 'var(--danger-color)' }}>
                {result.isAuthentic ? 'AUTHENTIC' : 'COUNTERFEIT DETECTED'}
              </h3>
              <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Confidence: {result.confidence}%</p>
            </div>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => setResult(null)}>Scan Another</button>
          </div>
          
          {!result.isAuthentic && (
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Detected Anomalies:</h5>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                {result.issues.map((issue, idx) => (
                  <li key={idx} style={{ marginBottom: '0.3rem' }}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
