import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { AuthModal } from './AuthModal';

// Self-contained BookView component (no separate file import needed)
function BookView({ user }: { user: any }) {
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    }
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        zIndex: 9999
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255,255,255,0.1)',
          borderTop: '4px solid #ec4899',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }} />
        <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px 0', letterSpacing: '1px' }}>Loading Moments...</h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Made by - Seebul rao</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1e293b', color: '#fff' }}>
      {!user ? (
        <div style={{ padding: '20px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1>Lovers Moments</h1>
            <button 
              onClick={() => setIsAuthOpen(true)}
              style={{ padding: '8px 16px', background: '#ec4899', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign In
            </button>
          </header>
          <main>
            <p>Please sign in to access your digital diary.</p>
          </main>
        </div>
      ) : (
        <BookView user={user} />
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={async () => {
          setIsAuthOpen(false);
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
          }
        }}
      />
    </div>
  );
}
