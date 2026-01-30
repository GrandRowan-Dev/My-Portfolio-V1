import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  profileData as initialProfileData,
  socialLinks as initialSocialLinks,
  projects as initialProjects,
  certificates as initialCertificates,
  techStacks as initialTechStacks,
} from '../data/portfolioData';
import type { ProfileData, SocialLinks, Project, Certificate, TechStack } from '../data/portfolioData';

interface PortfolioContextType {
  profile: ProfileData;
  socialLinks: SocialLinks;
  projects: Project[];
  certificates: Certificate[];
  techStacks: TechStack[];
  updateProfile: (data: Partial<ProfileData>) => void;
  updateSocialLinks: (data: Partial<SocialLinks>) => void;
  addProject: (project: Project) => void;
  updateProject: (id: number, data: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (id: number, data: Partial<Certificate>) => void;
  deleteCertificate: (id: number) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  // Initialize state from localStorage or fallback to initial data
  const [profile, setProfile] = useState<ProfileData>(() => {
    const stored = localStorage.getItem('portfolio_profile');
    return stored ? JSON.parse(stored) : initialProfileData;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const stored = localStorage.getItem('portfolio_socialLinks');
    return stored ? JSON.parse(stored) : initialSocialLinks;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem('portfolio_projects');
    return stored ? JSON.parse(stored) : initialProjects;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const stored = localStorage.getItem('portfolio_certificates');
    return stored ? JSON.parse(stored) : initialCertificates;
  });

  const [techStacks] = useState<TechStack[]>(initialTechStacks);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('portfolio_socialLinks', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_certificates', JSON.stringify(certificates));
  }, [certificates]);

  // Update functions
  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const updateSocialLinks = (data: Partial<SocialLinks>) => {
    setSocialLinks((prev) => ({ ...prev, ...data }));
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (id: number, data: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, ...data } : project))
    );
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const addCertificate = (certificate: Certificate) => {
    setCertificates((prev) => [...prev, certificate]);
  };

  const updateCertificate = (id: number, data: Partial<Certificate>) => {
    setCertificates((prev) =>
      prev.map((cert) => (cert.id === id ? { ...cert, ...data } : cert))
    );
  };

  const deleteCertificate = (id: number) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  };

  const value: PortfolioContextType = {
    profile,
    socialLinks,
    projects,
    certificates,
    techStacks,
    updateProfile,
    updateSocialLinks,
    addProject,
    updateProject,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
