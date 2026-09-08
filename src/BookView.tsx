import React from 'react';

export function BookView({ user }: { user: any }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1e293b', color: '#fff', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: '#0f172a', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        <h1 style={{ color: '#ec4899', marginBottom: '10px' }}>Lovers Moments Diary</h1>
        <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Welcome, {user?.email || 'My Love'}! Your digital diary is ready.</p>
        <div style={{ padding: '20px', background: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}>
          <h3>📖 Today's Memory</h3>
          <p>Start writing your beautiful moments here...</p>
        </div>
      </div>
    </div>
  );
}
