/**
 * Design Philosophy: Cinematic Dark Theme with Blue Accents
 * - Floating, rotating tech icons on the sides
 * - Subtle opacity (10-20%) for non-intrusive decoration
 * - Parallax scrolling effect
 * - Hidden on mobile, visible on tablets and desktops
 */

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cog, Settings, Cpu, Code, Terminal, Database, Layers, GitBranch } from 'lucide-react';

export default function Decorations() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax transforms for different icons
  const leftY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const leftY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const leftY3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const leftY4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  
  const rightY1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rightY2 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const rightY3 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rightY4 = useTransform(scrollYProgress, [0, 1], [0, -160]);

  if (!mounted) return null;

  const iconClass = "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20";

  return (
    <>
      {/* Left Side Icons */}
      <div className="hidden md:block fixed left-4 lg:left-8 top-0 h-screen pointer-events-none z-[5]">
        {/* Cog Icon - Top */}
        <motion.div
          style={{ y: leftY1 }}
          className="absolute top-[15%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-blue-400"
          >
            <Cog className={iconClass} />
          </motion.div>
        </motion.div>

        {/* CPU Icon - Mid-Top */}
        <motion.div
          style={{ y: leftY2 }}
          className="absolute top-[35%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="text-blue-500"
          >
            <Cpu className={iconClass} />
          </motion.div>
        </motion.div>

        {/* Database Icon - Mid */}
        <motion.div
          style={{ y: leftY3 }}
          className="absolute top-[55%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="text-blue-400"
          >
            <Database className={iconClass} />
          </motion.div>
        </motion.div>

        {/* Terminal Icon - Bottom */}
        <motion.div
          style={{ y: leftY4 }}
          className="absolute top-[75%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="text-blue-500"
          >
            <Terminal className={iconClass} />
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side Icons */}
      <div className="hidden md:block fixed right-4 lg:right-8 top-0 h-screen pointer-events-none z-[5]">
        {/* Settings Icon - Top */}
        <motion.div
          style={{ y: rightY1 }}
          className="absolute top-[20%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="text-blue-400"
          >
            <Settings className={iconClass} />
          </motion.div>
        </motion.div>

        {/* Code Icon - Mid-Top */}
        <motion.div
          style={{ y: rightY2 }}
          className="absolute top-[40%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="text-blue-500"
          >
            <Code className={iconClass} />
          </motion.div>
        </motion.div>

        {/* Layers Icon - Mid */}
        <motion.div
          style={{ y: rightY3 }}
          className="absolute top-[60%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="text-blue-400"
          >
            <Layers className={iconClass} />
          </motion.div>
        </motion.div>

        {/* GitBranch Icon - Bottom */}
        <motion.div
          style={{ y: rightY4 }}
          className="absolute top-[80%]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="text-blue-500"
          >
            <GitBranch className={iconClass} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
