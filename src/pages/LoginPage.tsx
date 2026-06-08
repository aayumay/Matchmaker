import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { useApp } from '../hooks/useApp';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    login(email, password);
    navigate('/');
  };

  return (
    <main className="grid min-h-screen bg-[#11110f] lg:grid-cols-[1.08fr_0.92fr]">
      <motion.section
        className="relative hidden min-h-screen overflow-hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.pexels.com/photos/3760274/pexels-photo-3760274.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Private matchmaking consultation"
          className="portrait-treatment absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
        <div className="absolute inset-6 border border-white/20" />

        <div className="absolute left-12 top-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border border-gold-300 font-display text-2xl text-gold-200">
            DC
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-white">The Date Crew</p>
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gold-300">Private matchmaking</p>
          </div>
        </div>

        <div className="absolute bottom-14 left-12 right-12 max-w-2xl">
          <p className="eyebrow mb-4">Intelligence meets intuition</p>
          <blockquote className="font-display text-5xl font-medium leading-[0.98] text-white xl:text-6xl">
            “The rarest luxury is being
            <em className="font-medium text-gold-200"> truly understood.</em>”
          </blockquote>
          <div className="mt-8 flex gap-8 border-t border-white/20 pt-6">
            {['Discreet by design', 'Human-led introductions', 'Private intelligence'].map((item) => (
              <span key={item} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/65">
                <Check className="h-3 w-3 text-gold-300" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="relative flex min-h-screen items-center justify-center px-5 py-12 sm:px-10"
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65 }}
      >
        <div className="absolute inset-5 border border-white/[0.06] lg:hidden" />
        <div className="relative w-full max-w-md">
          <div className="mb-12 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center border border-gold-300 font-display text-2xl text-gold-200">DC</div>
            <div>
              <p className="font-display text-xl text-white">The Date Crew</p>
              <p className="text-[8px] uppercase tracking-[0.26em] text-gold-300">Private office</p>
            </div>
          </div>

          <span className="eyebrow">Members’ private office</span>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-none text-white sm:text-6xl">
            Welcome
            <br />
            <em className="text-gold-200">back.</em>
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/45">
            Enter your credentials to access your confidential matchmaking portfolio.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold-300"
                placeholder="name@thedatecrew.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-3.5 pr-10 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/35 transition-colors hover:text-gold-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="border-l border-red-400 bg-red-400/10 px-4 py-3 text-xs text-red-200">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-white/45">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-3.5 w-3.5 rounded-none"
                />
                Remember this device
              </label>
              <button type="button" className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-300">
                Reset access
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-between border border-gold-300 bg-gold-300 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-charcoal transition-colors hover:bg-transparent hover:text-gold-200 disabled:opacity-50"
            >
              <span>{loading ? 'Opening private office...' : 'Enter private office'}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-white/40">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-gold-400 hover:text-gold-300">
              Request Access
            </Link>
          </p>

          <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.15em] text-white/25">
            <LockKeyhole className="h-3.5 w-3.5 text-gold-400" />
            End-to-end encrypted member access
          </div>
        </div>
      </motion.section>
    </main>
  );
}
