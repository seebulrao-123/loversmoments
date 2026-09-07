import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Signup successful! Check your email if verification is required.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLoginSuccess();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
    }}>
      <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '10px', width: '350px', color: '#fff' }}>
        <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
        {errorMsg && <p style={{ color: '#ef4444', fontSize: '14px' }}>{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Email</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: '#ec4899', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Sign In')}
          </button>
        </form>
        <p style={{ marginTop: '15px', fontSize: '14px', textAlign: 'center', cursor: 'pointer', color: '#38bdf8' }} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </p>
        <button onClick={onClose} style={{ width: '100%', marginTop: '10px', padding: '8px', background: 'transparent', color: '#94a3b8', border: '1px solid #475569', borderRadius: '4px', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </div>
  );
};
