/**
 * Design Philosophy: Cinematic Dark Theme
 * - Card-based layout with glassmorphism
 * - Gradient accents
 * - Smooth animations on scroll
 */

import { useEffect } from 'react';
import { Code2, Palette, Zap, Heart } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function AboutSection() {
  const { profile } = usePortfolio();

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const highlights = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code with best practices',
    },
    {
      icon: Palette,
      title: 'Design Focus',
      description: 'Creating beautiful interfaces that users love',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing for speed and efficiency',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Merging technical precision with creative vision',
    },
  ];

  return (
    <div id="about" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {profile.bio}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Profile Card */}
          <div
            className="relative group"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full border-2 border-white/20 object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                  <p className="text-gray-400">({profile.nickname})</p>
                  <p className="text-sm text-gray-500 mt-1">{profile.company}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed italic">
                "{profile.tagline}"
              </p>
            </div>
          </div>

          {/* Interests Card */}
          <div
            className="relative group"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
              <h3 className="text-xl font-bold text-white mb-4">Interests & Passions</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3" />
                  <span>1990s classic music enthusiast</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3" />
                  <span>Traditional Burmese poetry lover</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3" />
                  <span>AI & Coding innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3" />
                  <span>Digital craftsmanship</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="relative group"
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full">
                <item.icon className="w-10 h-10 text-purple-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
