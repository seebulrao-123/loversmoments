import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setErrorMsg(error.message);
      else {
        alert('Account created! You can now log in.');
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
      else {
        onLoginSuccess();
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#fffdfa] border border-[#e0d6c8] w-full max-w-md rounded-2xl p-6 shadow-2xl text-[#2c1d11]">
        <h2 className="text-2xl font-serif font-bold text-center text-[#3d2314] mb-6">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5c402e] mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-[#f5efe6] border border-[#d6c5b3] rounded-lg text-[#2c1d11] placeholder-[#a08d7d] focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5c402e] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-[#f5efe6] border border-[#d6c5b3] rounded-lg text-[#2c1d11] placeholder-[#a08d7d] focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#8b5a2b] hover:bg-[#6e441f] text-white font-medium rounded-lg shadow-md transition duration-200 mt-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-[#8b5a2b] hover:underline font-medium block w-full"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[#7a6859] hover:text-[#2c1d11] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};