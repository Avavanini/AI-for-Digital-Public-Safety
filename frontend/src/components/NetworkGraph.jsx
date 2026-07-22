import React, { useEffect, useState, useRef } from 'react';

export default function NetworkGraph() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Generate mock graph data
    const newNodes = [
      { id: 1, x: 50, y: 50, label: 'Target: Bank Acct', type: 'target' },
      { id: 2, x: 20, y: 30, label: 'Mule 1', type: 'mule' },
      { id: 3, x: 80, y: 30, label: 'Mule 2', type: 'mule' },
      { id: 4, x: 20, y: 70, label: 'Scammer Phone A', type: 'source' },
      { id: 5, x: 80, y: 70, label: 'Scammer Phone B', type: 'source' },
      { id: 6, x: 50, y: 90, label: 'Spoofed IP', type: 'source' }
    ];
    const newEdges = [
      { from: 2, to: 1 }, { from: 3, to: 1 },
      { from: 4, to: 2 }, { from: 5, to: 3 },
      { from: 6, to: 4 }, { from: 6, to: 5 }
    ];
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ color: 'var(--accent-color)' }}>Fraud Network Graph</h4>
        <button className="btn" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}>Export Intel</button>
      </div>

      <div style={{ 
        flex: 1, 
        background: 'rgba(0,0,0,0.2)', 
        borderRadius: '8px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Draw Edges as SVG lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            return (
              <line 
                key={i} 
                x1={`${fromNode.x}%`} y1={`${fromNode.y}%`} 
                x2={`${toNode.x}%`} y2={`${toNode.y}%`} 
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="2"
                strokeDasharray="4 4"
              >
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
              </line>
            );
          })}
        </svg>

        {/* Draw Nodes */}
        {nodes.map(node => (
          <div key={node.id} style={{
            position: 'absolute',
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: node.type === 'target' ? '30px' : '20px',
              height: node.type === 'target' ? '30px' : '20px',
              background: node.type === 'target' ? 'var(--danger-color)' : (node.type === 'mule' ? 'var(--warning-color)' : 'var(--accent-color)'),
              borderRadius: '50%',
              boxShadow: `0 0 10px ${node.type === 'target' ? 'var(--danger-color)' : 'var(--accent-color)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 'bold'
            }}>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.6)', padding: '2px 4px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
