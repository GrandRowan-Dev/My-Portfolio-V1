/**
 * Design Philosophy: Hidden Admin Panel
 * - Stealth access via secret trigger
 * - Password protection: "Rowan@27April"
 * - Full CRUD for profile, projects, certificates, and social links
 * - Glassmorphism design matching the main site
 */

import { useState } from 'react';
import { X, Save, Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PASSWORD = 'Rowan@27April';

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const {
    profile,
    socialLinks,
    projects,
    certificates,
    updateProfile,
    updateSocialLinks,
    addProject,
    updateProject,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
  } = usePortfolio();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'certificates' | 'social'>('profile');
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<number | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState(profile);
  const [socialForm, setSocialForm] = useState(socialLinks);
  const [projectForm, setProjectForm] = useState({
    id: 0,
    title: '',
    description: '',
    image: '',
    technologies: [] as string[],
    liveUrl: '',
    githubUrl: '',
    category: 'Web',
    featured: false,
  });
  const [certificateForm, setCertificateForm] = useState({
    id: 0,
    title: '',
    issuer: '',
    date: '',
    image: '',
    credentialUrl: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const handleSaveProfile = () => {
    updateProfile(profileForm);
    alert('Profile updated successfully!');
  };

  const handleSaveSocial = () => {
    updateSocialLinks(socialForm);
    alert('Social links updated successfully!');
  };

  const handleAddProject = () => {
    const newProject = {
      ...projectForm,
      id: Date.now(),
    };
    addProject(newProject);
    setProjectForm({
      id: 0,
      title: '',
      description: '',
      image: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
      category: 'Web',
      featured: false,
    });
    alert('Project added successfully!');
  };

  const handleUpdateProject = (id: number) => {
    updateProject(id, projectForm);
    setEditingProject(null);
    alert('Project updated successfully!');
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      alert('Project deleted successfully!');
    }
  };

  const handleAddCertificate = () => {
    const newCert = {
      ...certificateForm,
      id: Date.now(),
    };
    addCertificate(newCert);
    setCertificateForm({
      id: 0,
      title: '',
      issuer: '',
      date: '',
      image: '',
      credentialUrl: '',
    });
    alert('Certificate added successfully!');
  };

  const handleUpdateCertificate = (id: number) => {
    updateCertificate(id, certificateForm);
    setEditingCertificate(null);
    alert('Certificate updated successfully!');
  };

  const handleDeleteCertificate = (id: number) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      deleteCertificate(id);
      alert('Certificate deleted successfully!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-50" />
        <div className="relative bg-[#030014] border border-white/20 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
            {!isAuthenticated ? (
              // Login Form
              <div className="p-8 flex items-center justify-center min-h-[400px]">
                <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Admin Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Login
                  </button>
                </form>
              </div>
            ) : (
              // Admin Dashboard
              <div className="p-6">
                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  {['profile', 'projects', 'certificates', 'social'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nickname</label>
                        <input
                          type="text"
                          value={profileForm.nickname}
                          onChange={(e) => setProfileForm({ ...profileForm, nickname: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                        <input
                          type="text"
                          value={profileForm.role}
                          onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                        <input
                          type="text"
                          value={profileForm.company}
                          onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                        <input
                          type="text"
                          value={profileForm.tagline}
                          onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                        <textarea
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          rows={3}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image URL</label>
                        <input
                          type="text"
                          value={profileForm.profileImage}
                          onChange={(e) => setProfileForm({ ...profileForm, profileImage: e.target.value })}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      <Save className="w-4 h-4" />
                      Save Profile
                    </button>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    {/* Add New Project Form */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Add New Project</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Title"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <textarea
                          placeholder="Description"
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="md:col-span-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          rows={2}
                        />
                        <input
                          type="text"
                          placeholder="Technologies (comma-separated)"
                          value={projectForm.technologies.join(', ')}
                          onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value.split(',').map(t => t.trim()) })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          placeholder="Live URL"
                          value={projectForm.liveUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          placeholder="GitHub URL"
                          value={projectForm.githubUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          placeholder="Category"
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <button
                        onClick={handleAddProject}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Project
                      </button>
                    </div>

                    {/* Projects List */}
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingProject(project.id);
                                  setProjectForm(project);
                                }}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificates Tab */}
                {activeTab === 'certificates' && (
                  <div className="space-y-6">
                    {/* Add New Certificate Form */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Add New Certificate</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Title"
                          value={certificateForm.title}
                          onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          placeholder="Issuer"
                          value={certificateForm.issuer}
                          onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          placeholder="Date"
                          value={certificateForm.date}
                          onChange={(e) => setCertificateForm({ ...certificateForm, date: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={certificateForm.image}
                          onChange={(e) => setCertificateForm({ ...certificateForm, image: e.target.value })}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          placeholder="Credential URL"
                          value={certificateForm.credentialUrl}
                          onChange={(e) => setCertificateForm({ ...certificateForm, credentialUrl: e.target.value })}
                          className="md:col-span-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                        />
                      </div>
                      <button
                        onClick={handleAddCertificate}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Certificate
                      </button>
                    </div>

                    {/* Certificates List */}
                    <div className="space-y-4">
                      {certificates.map((cert) => (
                        <div key={cert.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
                              <p className="text-sm text-gray-400">{cert.issuer} - {cert.date}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingCertificate(cert.id);
                                  setCertificateForm(cert);
                                }}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCertificate(cert.id)}
                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links Tab */}
                {activeTab === 'social' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(socialForm).map(([platform, url]) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                            {platform}
                          </label>
                          <input
                            type="text"
                            value={url}
                            onChange={(e) => setSocialForm({ ...socialForm, [platform]: e.target.value })}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleSaveSocial}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      <Save className="w-4 h-4" />
                      Save Social Links
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
