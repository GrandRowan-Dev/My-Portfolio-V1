/**
 * Design Philosophy: Cinematic Dark Theme
 * - Tab-based navigation
 * - Project cards with hover effects
 * - Certificate gallery
 * - Tech stack icons
 */

import { useState, useEffect } from 'react';
import { Code, Award, Boxes, ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function PortfolioSection() {
  const { projects, certificates, techStacks } = usePortfolio();
  const [activeTab, setActiveTab] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  const tabs = [
    { icon: Code, label: 'Projects' },
    { icon: Award, label: 'Certificates' },
    { icon: Boxes, label: 'Tech Stack' },
  ];

  return (
    <div id="portfolio" className="min-h-screen px-6 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mb-4">
            Portfolio Showcase
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my journey through projects, certifications, and technical expertise.
          </p>
        </div>

        {/* Tabs */}
        <div className="relative mb-8" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
            <div className="grid grid-cols-3 gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`relative py-4 px-6 rounded-xl transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <tab.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </div>
                  {activeTab === index && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {/* Projects Tab */}
          {activeTab === 0 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="relative group"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {projects.length > initialItems && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    {showAllProjects ? (
                      <>
                        See Less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        See More <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCertificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="relative group"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                        <p className="text-sm text-gray-400 mb-1">{cert.issuer}</p>
                        <p className="text-xs text-gray-500 mb-3">{cert.date}</p>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                        >
                          View Credential <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {certificates.length > initialItems && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllCertificates(!showAllCertificates)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    {showAllCertificates ? (
                      <>
                        See Less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        See More <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack Tab */}
          {activeTab === 2 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {techStacks.map((tech, index) => (
                <div
                  key={index}
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                  <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-3 h-32">
                    <img src={tech.icon} alt={tech.language} className="w-12 h-12 object-contain" />
                    <span className="text-sm text-gray-300 text-center">{tech.language}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
