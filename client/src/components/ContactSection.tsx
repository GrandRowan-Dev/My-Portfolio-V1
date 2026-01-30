/**
 * ContactSection Component
 * Design Philosophy: Cinematic Dark Theme with Blue Accents
 * - Contact form with glassmorphism
 * - Social media links with icons
 * - Blue gradient accents
 */

import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Facebook, Instagram, Twitter, MessageCircle, Send as TelegramIcon, Loader2 } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePortfolio } from '../contexts/PortfolioContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import Comments from './Comments';

export default function ContactSection() {
  const { socialLinks } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Using FormSubmit.co with proper configuration
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('message', formData.message);
      form.append('_subject', `Portfolio Contact: ${formData.name}`);
      form.append('_captcha', 'false'); // Disable captcha for better UX
      form.append('_template', 'table'); // Use table format for better email readability

      const response = await fetch('https://formsubmit.co/thegrandrowan@gmail.com', {
        method: 'POST',
        body: form,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('FormSubmit error:', errorData);
        toast.error('Failed to send message. Please try again or email directly.');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Failed to send message. Please email me directly at thegrandrowan@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Map platform names to icons
  const getSocialIcon = (platform: string) => {
    const iconClass = "w-5 h-5";
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className={iconClass} />;
      case 'linkedin':
        return <Linkedin className={iconClass} />;
      case 'facebook':
        return <Facebook className={iconClass} />;
      case 'instagram':
        return <Instagram className={iconClass} />;
      case 'twitter':
        return <Twitter className={iconClass} />;
      case 'tiktok':
        return <FaTiktok className={iconClass} />;
      case 'telegram':
        return <TelegramIcon className={iconClass} />;
      case 'email':
        return <Mail className={iconClass} />;
      default:
        return <MessageCircle className={iconClass} />;
    }
  };

  // Get platform display name
  const getPlatformName = (platform: string) => {
    const names: Record<string, string> = {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      tiktok: 'TikTok',
      telegram: 'Telegram',
      email: 'Email',
    };
    return names[platform.toLowerCase()] || platform;
  };

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center px-6 lg:px-12 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative group" data-aos="fade-right" data-aos-delay="200">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8" data-aos="fade-left" data-aos-delay="400">
            {/* Contact Info */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3b82f6]/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">thegrandrowan@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3b82f6]/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white">+959266779551</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3b82f6]/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-white">Myanmar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(socialLinks).map(([platform, url], index) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 hover:scale-105 border border-white/10 rounded-lg transition-all duration-300 group/link"
                    >
                      <div className="w-10 h-10 bg-[#3b82f6]/20 rounded-lg flex items-center justify-center group-hover/link:bg-[#3b82f6]/30 transition">
                        {getSocialIcon(platform)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-400">{getPlatformName(platform)}</p>
                        <p className="text-white text-sm truncate">{url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/^mailto:/, '')}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="600">
          <Comments />
        </div>
      </div>
    </div>
  );
}
