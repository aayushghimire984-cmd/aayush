import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SiteContent {
  home: {
    heroTitle: string;
    heroSubtitle: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
  };
  services: {
    title: string;
    description: string;
    items: { icon: string; title: string; desc: string; image?: string }[];
  };
  skills: {
    title: string;
    items: { name: string; percent: number; color: string }[];
  };
  team: {
    title: string;
    description: string;
    categories: string[];
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
  };
}

const defaultContent: SiteContent = {
  home: {
    heroTitle: "Hi, I'm Aayush Ghimire",
    heroSubtitle: "Forestry Student | Microbiology Enthusiast | Web Developer",
  },
  about: {
    title: "Passionate about bridging Nature and Technology",
    description1: "I am a dedicated Forestry Student from Syangja, Nepal, with a deep interest in microbiology and scientific research. Alongside my academic pursuits, I have developed a strong passion for web development and technology.",
    description2: "My goal is to combine my analytical research skills from science to build intuitive, problem-solving digital platforms. Currently aiming to pursue higher studies abroad to further expand my expertise in microbiology while continuing to grow my tech portfolio.",
  },
  services: {
    title: "Services & Expertise",
    description: "Combining scientific methodology with digital innovation to deliver comprehensive solutions.",
    items: [
      {
        icon: "leaf",
        title: "Forestry Consultations",
        desc: "Expert advice on forest management, conservation strategies, and ecological assessments."
      },
      {
        icon: "microscope",
        title: "Research Support",
        desc: "Assistance with microbiological research, data collection, and statistical analysis."
      },
      {
        icon: "code",
        title: "Web Development",
        desc: "Building custom web applications and scientific tools with modern frameworks."
      }
    ]
  },
  skills: {
    title: "Core Skills",
    items: [
      { name: 'Forestry Knowledge', percent: 92, color: '#22d3ee' },
      { name: 'Microbiology Research', percent: 85, color: '#c026d3' },
      { name: 'Frontend (React/Tailwind)', percent: 78, color: '#a855f7' },
      { name: 'Data Analysis', percent: 85, color: '#22d3ee' },
      { name: 'Communication', percent: 80, color: '#c026d3' },
      { name: 'English', percent: 85, color: '#a855f7' },
    ]
  },
  team: {
    title: "Meet Our Team",
    description: "Our experts bring years of experience in forestry, GIS mapping, ecological research, and sustainable development.",
    categories: ["Admin", "Vice-Admin", "Guest"]
  },
  contact: {
    email: "admin@aayush.com",
    phone: "+977-9801234567",
    whatsapp: "9779801234567",
    location: "Syangja, Nepal"
  }
};

interface SiteContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.siteContent) {
          setContent(data.siteContent);
        } else {
          // If no content in server, initialize it
          fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ siteContent: defaultContent })
          });
        }
      })
      .catch(err => console.error('Failed to fetch site content:', err));
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteContent: newContent })
    }).catch(err => console.error('Failed to save site content:', err));
  };

  return (
    <SiteContentContext.Provider value={{ content, updateContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
