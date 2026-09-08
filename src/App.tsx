import React from 'react';

export function BookView({ user }: { user: any }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1e293b', color: '#fff', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: '#0f172a', padding: '30px', borderRadius: '12px' }}>
        <h1>Lovers Moments Diary</h1>
        <p>Welcome, {user?.email || 'My Love'}!</p>
      </div>
    </div>
  );
}
