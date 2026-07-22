import React, { useState } from 'react';

export default function CitizenShield() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello. I am the Rakshak Citizen Shield. Please describe the suspicious call, message, or link you received.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let reply = "This looks like a standard inquiry. Stay cautious.";
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('cbi') || lowerInput.includes('customs') || lowerInput.includes('arrest')) {
        reply = "⚠️ HIGH RISK: This matches the pattern of a 'Digital Arrest' scam. Government officials (CBI, Customs, ED) will NEVER ask you to stay on a video call or transfer money to a 'safe account'. Disconnect immediately and report to 1930.";
      } else if (lowerInput.includes('link') || lowerInput.includes('kyc') || lowerInput.includes('bank')) {
        reply = "⚠️ MODERATE RISK: Phishing attempt detected. Do not click the link or share OTPs. Banks never ask for KYC updates via SMS links.";
      }
      
      setMessages([...newMessages, { role: 'system', content: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '400px', padding: '1.5rem' }}>
      <h4 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Citizen Fraud Shield</h4>
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
            padding: '0.8rem 1rem',
            borderRadius: '12px',
            maxWidth: '80%',
            lineHeight: '1.4',
            border: msg.role === 'system' && msg.content.includes('HIGH RISK') ? '1px solid var(--danger-color)' : 'none'
          }}>
            {msg.content}
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <span className="text-secondary">Analyzing risk...</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Describe the suspicious activity..."
          style={{ 
            flex: 1, 
            padding: '0.8rem', 
            borderRadius: '8px', 
            border: '1px solid var(--panel-border)', 
            background: 'rgba(0,0,0,0.3)',
            color: 'white',
            outline: 'none'
          }}
        />
        <button className="btn btn-primary" onClick={handleSend}>Analyze</button>
      </div>
    </div>
  );
}
