import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../hooks/useApp';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useApp();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.trim()) {
      register(name, email);
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#11110f]">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <motion.div 
          className="mx-auto w-full max-w-sm lg:w-96"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-9 text-white">
              Request Access
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Join The Date Crew as a verified Matchmaker.
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-0 border-b border-white/20 bg-transparent py-2.5 text-white placeholder:text-white/20 focus:border-gold-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Priya Sharma"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-0 border-b border-white/20 bg-transparent py-2.5 text-white placeholder:text-white/20 focus:border-gold-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="priya@thedatecrew.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-0 border-b border-white/20 bg-transparent py-2.5 text-white focus:border-gold-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-gold flex w-full justify-center"
                >
                  Register Profile
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-xs text-white/40">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-gold-400 hover:text-gold-300">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-t from-[#11110f] via-transparent to-transparent z-10" />
        <img
          className="absolute inset-0 h-full w-full object-cover portrait-treatment opacity-40"
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80"
          alt="Matchmaker office"
        />
        <div className="absolute bottom-20 left-20 z-20 max-w-lg">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
            Private Office Suite
          </p>
          <p className="mt-4 font-display text-4xl text-white leading-tight">
            Curating India's most exclusive introductions.
          </p>
        </div>
      </div>
    </div>
  );
}
