import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserSkill {
  name: string;
  percent: number;
}

export interface UserContact {
  phone?: string;
  location?: string;
  linkedin?: string;
  facebook?: string;
  whatsapp?: string;
  instagram?: string;
  email?: string;
}

export interface UserQualification {
  title: string;
  institution: string;
  year: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  bio?: string;
  contacts?: UserContact;
  skills?: UserSkill[];
  qualifications?: UserQualification[];
}

interface UserContextType {
  users: UserProfile[];
  setUsers: (users: UserProfile[]) => void;
}

const initialUsers: UserProfile[] = [
  { 
    id: 1, 
    name: 'Sita Sharma', 
    email: 'sita@student.edu.np', 
    role: 'Vice-Admin', 
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Sita+Sharma&background=22d3ee&color=020617&size=200',
    bio: 'Forestry major exploring GIS and remote sensing.',
    contacts: { phone: '+977-9841234567', location: 'Pokhara, Nepal', email: 'sita@student.edu.np' },
    skills: [{ name: 'GIS Mapping', percent: 85 }, { name: 'Data Analysis', percent: 70 }],
    qualifications: [{ title: 'BSc. Forestry', institution: 'Tribhuvan University', year: '2025' }]
  },
  { 
    id: 2, 
    name: 'Aayush Ghimire', 
    email: 'admin@aayush.com', 
    role: 'Admin', 
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Aayush+Ghimire&background=c026d3&color=fff&size=200',
    bio: 'Super Admin of Aayushub. Forestry & GIS Specialist with extensive experience in resource mapping.',
    contacts: { phone: '+977-9801234567', location: 'Baglung, Nepal', linkedin: 'aayush-ghimire' },
    skills: [{ name: 'GIS & Remote Sensing', percent: 95 }, { name: 'Forest Survey & Mapping', percent: 90 }, { name: 'Inventory Data Analysis', percent: 85 }, { name: 'Web Development', percent: 80 }],
    qualifications: [{ title: 'Forestry Ranger', institution: 'IOF', year: '2021' }]
  },
  { 
    id: 3, 
    name: 'Prof. Adhikari', 
    email: 'prof.a@university.edu', 
    role: 'Guest', 
    status: 'Active',
    avatar: 'https://ui-avatars.com/api/?name=Prof+Adhikari&background=3b82f6&color=fff&size=200',
    bio: 'Senior researcher specializing in ecological modelling.',
    contacts: { phone: '+977-9851234567', location: 'Kathmandu, Nepal' },
    skills: [{ name: 'Ecology', percent: 95 }, { name: 'Research Methods', percent: 90 }],
    qualifications: [{ title: 'Ph.D. Environmental Science', institution: 'Kathmandu University', year: '2010' }]
  },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsersState] = useState<UserProfile[]>(initialUsers);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.users) {
          setUsersState(data.users);
        } else {
          fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ users: initialUsers })
          });
        }
      })
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  const setUsers = (newUsers: UserProfile[]) => {
    setUsersState(newUsers);
    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users: newUsers })
    }).catch(err => console.error('Failed to save users:', err));
  };

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}
