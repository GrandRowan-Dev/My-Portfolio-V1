// Initial Portfolio Data for Rowanfolio V5
// This serves as the source of truth for all portfolio content

export interface ProfileData {
  name: string;
  nickname: string;
  role: string;
  company: string;
  tagline: string;
  bio: string;
  profileImage: string;
  status: string;
  typingWords: string[];
  techStack: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  telegram: string;
  twitter: string;
  email: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
}

export interface TechStack {
  icon: string;
  language: string;
}

export const profileData = {
  name: "Naing Nyi Nyi Aung",
  nickname: "Rowan",
  role: "Frontend Developer",
  company: "Capital Diamond Star Group (CDSG)",
  tagline: "Merging the logic of code with the soul of poetry.",
  bio: "Passionate about 1990s classic music and traditional Burmese poetry. I transform complex problems into user-friendly digital solutions.",
  profileImage: "/photo.jpg",
  status: "Ready to Innovate",
  typingWords: ["AI & Coding Enthusiast", "Tech Visionary", "Digital Craftsman"],
  techStack: ["React", "JavaScript", "Node.js", "Tailwind"],
};

export const socialLinks = {
  github: "https://github.com/GrandRowan-Dev",
  linkedin: "https://www.linkedin.com/in/naingnyinyiaung.dev",
  facebook: "https://www.facebook.com/naingnyinyiaung.dev",
  instagram: "https://www.instagram.com/naingnyinyiaung.dev",
  tiktok: "https://www.tiktok.com/@thegrandrowan",
  telegram: "https://t.me/thegrandrowan",
  twitter: "https://twitter.com/thegrandrowan",
  email: "mailto:rowan@example.com",
};

export const projects = [
  {
    id: 1,
    title: "AI Portfolio Generator",
    description: "An intelligent portfolio generator powered by machine learning algorithms",
    image: "/Meta.png",
    technologies: ["React", "Node.js", "TensorFlow"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/GrandRowan-Dev",
    category: "AI",
    featured: true,
  },
  {
    id: 2,
    title: "Code Poetry Platform",
    description: "A platform where code meets poetry - expressing algorithms through verse",
    image: "/Meta.png",
    technologies: ["React", "Firebase", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/GrandRowan-Dev",
    category: "Web",
    featured: true,
  },
  {
    id: 3,
    title: "90s Music Archive",
    description: "Digital archive celebrating the golden era of 1990s music",
    image: "/Meta.png",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/GrandRowan-Dev",
    category: "Web",
    featured: false,
  },
  {
    id: 4,
    title: "Burmese Poetry Collection",
    description: "Interactive collection of traditional Burmese poetry with modern UI",
    image: "/Meta.png",
    technologies: ["React", "Tailwind", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/GrandRowan-Dev",
    category: "Web",
    featured: false,
  },
];

export const certificates = [
  {
    id: 1,
    title: "React Advanced Certification",
    issuer: "Meta",
    date: "2024",
    image: "/Meta.png",
    credentialUrl: "https://example.com",
  },
  {
    id: 2,
    title: "Full Stack Development",
    issuer: "Coursera",
    date: "2023",
    image: "/Meta.png",
    credentialUrl: "https://example.com",
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    issuer: "Stanford Online",
    date: "2023",
    image: "/Meta.png",
    credentialUrl: "https://example.com",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    issuer: "Google",
    date: "2022",
    image: "/Meta.png",
    credentialUrl: "https://example.com",
  },
];

export const techStacks = [
  { icon: "/html.svg", language: "HTML" },
  { icon: "/css.svg", language: "CSS" },
  { icon: "/javascript.svg", language: "JavaScript" },
  { icon: "/tailwind.svg", language: "Tailwind CSS" },
  { icon: "/reactjs.svg", language: "ReactJS" },
  { icon: "/vite.svg", language: "Vite" },
  { icon: "/nodejs.svg", language: "Node JS" },
  { icon: "/bootstrap.svg", language: "Bootstrap" },
  { icon: "/firebase.svg", language: "Firebase" },
  { icon: "/MUI.svg", language: "Material UI" },
  { icon: "/vercel.svg", language: "Vercel" },
  { icon: "/SweetAlert.svg", language: "SweetAlert2" },
];
