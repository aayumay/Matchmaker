import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#11110f] px-5 text-white">
      <div className="absolute inset-5 border border-white/[0.07]" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold-400/25 to-transparent" />
      <motion.div
        className="relative z-10 max-w-xl text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="eyebrow">Private route unavailable</span>
        <p className="mt-5 font-display text-[9rem] font-semibold leading-[0.7] text-gold-200/90 sm:text-[12rem]">
          404
        </p>
        <h1 className="mt-10 font-display text-4xl font-semibold sm:text-5xl">
          This page is not
          <em className="text-gold-200"> in the dossier.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/45">
          The address may have changed, or the page may belong to a different private workspace.
        </p>
        <Link to="/" className="btn-gold mt-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to overview
        </Link>
      </motion.div>
    </main>
  );
}
