/**
 * Design Philosophy: Cinematic Dark Theme
 * - Large hero typography with gradient effects
 * - Video animation integration
 * - Typing effect for dynamic text
 * - Social links with glassmorphism
 */

import { useState, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles, Facebook } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePortfolio } from '../contexts/PortfolioContext';

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;

export default function HeroSection() {
  const { profile, socialLinks } = usePortfolio();
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < profile.typingWords[wordIndex].length) {
        setText((prev) => prev + profile.typingWords[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % profile.typingWords.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex, profile.typingWords]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  const socialIcons = [
    { icon: Github, link: socialLinks.github },
    { icon: Linkedin, link: socialLinks.linkedin },
    { icon: Instagram, link: socialLinks.instagram },
    { icon: Facebook, link: socialLinks.facebook },
  ];

  return (
    <div id="home" className="min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left" data-aos="fade-right">
            {/* Status Badge */}
            <div className="inline-block" data-aos="zoom-in" data-aos-delay="400">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                <div className="relative px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                  <span className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-transparent bg-clip-text text-sm font-medium flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                    {profile.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] blur-2xl opacity-20" />
                  <span className="relative bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                    {profile.role.split(' ')[0]}
                  </span>
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] blur-2xl opacity-20" />
                  <span className="relative bg-gradient-to-r from-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent">
                    {profile.role.split(' ')[1]}
                  </span>
                </span>
              </h1>
            </div>

            {/* Typing Effect */}
            <div className="h-8 flex items-center justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="800">
              <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                {text}
              </span>
              <span className="w-[3px] h-6 bg-gradient-to-t from-[#3b82f6] to-[#2563eb] ml-1 animate-pulse" />
            </div>

            {/* Description */}
            <p
              className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              {profile.tagline}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1200">
              {profile.techStack.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1400">
              <a href="#portfolio">
                <button className="group relative w-40">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700" />
                  <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 flex items-center justify-center gap-2">
                    <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium text-sm">
                      Projects
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-200 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </button>
              </a>
              <a href="#contact">
                <button className="group relative w-40">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700" />
                  <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 flex items-center justify-center gap-2">
                    <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium text-sm">
                      Contact
                    </span>
                    <Mail className="w-4 h-4 text-gray-200 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1600">
              {socialIcons.map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
                  <button className="group relative p-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                    <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </button>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Video Animation */}
          <div
            className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative flex items-center justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <div className="relative w-full h-full opacity-90">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 to-[#2563eb]/10 rounded-3xl blur-3xl transition-all duration-700 ${
                  isHovering ? 'opacity-50 scale-105' : 'opacity-20 scale-100'
                }`}
              />
              <div className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 ${isHovering ? 'scale-105' : 'scale-100'}`}>
                <DotLottieReact
                  src="/images/Coding.json"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
