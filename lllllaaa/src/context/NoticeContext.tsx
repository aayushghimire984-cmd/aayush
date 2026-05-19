import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  isActive: boolean;
}

interface NoticeContextType {
  notices: Notice[];
  setNotices: (notices: Notice[]) => void;
  activeNotice: Notice | null;
}

const initialNotices: Notice[] = [
  {
    id: 1,
    title: 'Welcome to Aayushub Portal',
    content: 'We have updated our terms of service and added new exciting features. Explore the dashboard to learn more.',
    date: new Date().toLocaleDateString(),
    isActive: true,
  }
];

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notices, setNoticesState] = useState<Notice[]>(initialNotices);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.notices) {
          setNoticesState(data.notices);
        } else {
          fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notices: initialNotices })
          });
        }
      })
      .catch(err => console.error('Failed to fetch notices:', err));
  }, []);

  const setNotices = (newNotices: Notice[]) => {
    setNoticesState(newNotices);
    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notices: newNotices })
    }).catch(err => console.error('Failed to save notices:', err));
  };

  const activeNotice = notices.find(n => n.isActive) || null;

  return (
    <NoticeContext.Provider value={{ notices, setNotices, activeNotice }}>
      {children}
    </NoticeContext.Provider>
  );
}

export function useNotices() {
  const context = useContext(NoticeContext);
  if (context === undefined) {
    throw new Error('useNotices must be used within a NoticeProvider');
  }
  return context;
}
