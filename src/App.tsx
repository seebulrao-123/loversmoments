import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { AuthModal } from './AuthModal';
import { BookView } from './components/BookView';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check initial session on load
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
      setIsLoading(false);
    }
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
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
