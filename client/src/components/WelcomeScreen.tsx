/**
 * Design Philosophy: Cinematic Dark Theme with Modern Loading Animation
 * - Deep space background (#030014)
 * - Blue neon gradients
 * - Smooth fade transitions with pulsing effects
 * - Rotating tech icons
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Code2, Sparkles, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onLoadingComplete: () => void;
}

export default function WelcomeScreen({ onLoadingComplete }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014]"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030014] via-[#0a0a2e] to-[#030014]" />
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3b82f6]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2563eb]/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 text-center space-y-12">
        {/* Rotating tech icons */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Code2 className="w-8 h-8 text-[#3b82f6]" />
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-10 h-10 text-[#60a5fa]" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-8 h-8 text-[#2563eb]" />
          </motion.div>
        </div>

        {/* Logo/Name with pulsing effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-bold"
            animate={{
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(37, 99, 235, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#2563eb] bg-clip-text text-transparent">
              Rowan
            </span>
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-xl mt-6 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Frontend Developer
          </motion.p>
        </motion.div>

        {/* Modern Loading Bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#2563eb]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ width: '50%' }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <motion.p 
              className="text-[#3b82f6] font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading Experience
            </motion.p>
            <p className="text-gray-400 font-mono">{progress}%</p>
          </div>
        </div>

        {/* Tagline with fade-in */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-gray-400 text-base max-w-md mx-auto leading-relaxed"
        >
          Merging the logic of code with the soul of poetry
        </motion.p>
      </div>

      {/* Animated particles with varied sizes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`,
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Grid overlay for tech aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </motion.div>
  );
}
