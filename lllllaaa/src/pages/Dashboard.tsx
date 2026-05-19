import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers, UserProfile } from '../context/UserContext';
import { useNotices, Notice } from '../context/NoticeContext';
import { useSiteContent } from '../context/SiteContentContext';
import { 
  LayoutDashboard, 
  Users, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Upload,
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  FileText,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Camera,
  Mail, MapPin, Phone, Linkedin, GraduationCap, X, Facebook, MessageCircle, Instagram, ListChecks,
  Activity, Wifi, Download, UploadCloud
} from 'lucide-react';

// Initial Data
const initialMessages = [
  { id: 1, from: 'Sita Sharma', subject: 'Project Collaboration', date: '2 hours ago', read: false },
  { id: 2, from: 'Ram Thapa', subject: 'Notes Request - Biology', date: '1 day ago', read: true },
];

const initialGallery = [
  { id: 1, title: 'Forest Field Trip', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop', category: 'Field Work' },
  { id: 2, title: 'Lab Experiment', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop', category: 'Microbiology' },
];

const initialDocuments = [
  { id: 1, title: 'Microbiology_Thesis_draft.pdf', size: '2.4 MB', date: 'Oct 24, 2023' },
  { id: 2, title: 'Forest_Ecological_Survey_2023.docx', size: '1.1 MB', date: 'Nov 02, 2023' },
];

export function Dashboard() {
  const { users, setUsers } = useUsers();
  const { notices, setNotices } = useNotices();
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState(initialMessages);
  const [gallery, setGallery] = useState(initialGallery);
  const [documents, setDocuments] = useState(initialDocuments);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [viewingUser, setViewingUser] = useState<UserProfile | null>(null);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { content, updateContent } = useSiteContent();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/login');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bandwidth', label: 'Bandwidth', icon: Activity },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'gallery', label: 'Gallery Submissions', icon: ImageIcon },
    { id: 'messages', label: 'User Requests', icon: MessageSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'site_content', label: 'Site Content', icon: LayoutDashboard },
    { id: 'team_section', label: 'Team Section', icon: Users },
    { id: 'team_categories', label: 'Team Categories', icon: ListChecks },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#05050f] flex overflow-hidden">
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 glass border-r border-border/50 flex flex-col h-screen fixed left-0 top-0 z-40"
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
              <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center">
                <span className="font-heading font-bold text-xs">A</span>
              </div>
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">
              AAYUS<span className="text-gradient">HUB</span>
            </span>
          </Link>
          <div className="text-xs text-muted-foreground mt-1 ml-11">Admin Panel</div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent' 
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col h-screen relative">
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header */}
        <header className="h-20 glass border-b border-border/50 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search dashboard..." 
              className="w-full bg-background/50 border border-border rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-[10px] font-bold flex items-center justify-center rounded-full">3</span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-border/50">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium">{users.find(u => u.role === 'Admin')?.name || 'Admin User'}</div>
                <div className="text-xs text-primary">Super Admin</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                <div className="w-full h-full rounded-full bg-background overflow-hidden">
                  <img src={users.find(u => u.role === 'Admin')?.avatar || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format&fit=crop"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          <AnimatePresence mode="wait">
            
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <h1 className="text-2xl font-bold font-sans">Dashboard Overview</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stats Cards / Snapshot */}
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl">Admin Overview</h3>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors text-white">
                        <CheckCircle size={16} />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 text-[#c026d3] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Users</p>
                            <p className="text-[10px] text-slate-400">{users.length} Registered</p>
                          </div>
                        </div>
                        <span className="text-[#c026d3] font-bold">+1</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[#22d3ee] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MessageSquare size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Requests</p>
                            <p className="text-[10px] text-slate-400">{messages.length} Pending</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-[#a855f7] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Documents</p>
                            <p className="text-[10px] text-slate-400">{documents.length} Uploaded</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Edit Quick Action */}
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 overflow-hidden relative group hover:bg-white/[0.07] transition-all cursor-pointer"
                       onClick={() => {
                         const adminUser = users.find(u => u.role === 'Admin');
                         if (adminUser) {
                           setEditingUser(adminUser);
                           setIsUserModalOpen(true);
                         }
                       }}
                       title="Edit Admin Profile">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl">Updates</h3>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                        <Settings size={16} />
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-6 font-medium">Update your public portfolio avatar, contact links, or resume.</p>
                    
                    <div className="space-y-4 pointer-events-none">
                      <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] transition-colors group-hover:bg-white/[0.06]">
                        <div className="flex items-center gap-3">
                          <Pencil size={18} className="text-[#a855f7]" />
                          <span className="text-sm font-bold">Edit Full Profile Information</span>
                        </div>
                        <Plus size={16} className="text-[#22d3ee] transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-1 gap-8">
                  {/* Recent Activity */}
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-bold text-xl">Recent Activity</h2>
                      <button className="text-sm text-[#22d3ee] font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                          <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-[#c026d3]' : 'bg-[#22d3ee]'} group-hover:scale-150 transition-transform`} />
                          <div className="flex-1">
                            <p className="text-sm font-bold">New user registered</p>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">{i * 2} hours ago</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bandwidth' && (
              <motion.div
                key="bandwidth"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Bandwidth Management</h1>
                  <button 
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
                  >
                    <Download size={16} /> Export Report
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Current Usage */}
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Total Monthly Usage</h3>
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-[#22d3ee] flex items-center justify-center">
                        <Activity size={20} />
                      </div>
                    </div>
                    <div className="text-4xl font-bold font-heading mb-2">342.5 <span className="text-lg text-slate-400 font-normal">GB</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">68% of 500 GB Limit</p>
                  </div>

                  {/* Upload */}
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Upload Activity</h3>
                      <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 text-[#c026d3] flex items-center justify-center">
                        <UploadCloud size={20} />
                      </div>
                    </div>
                    <div className="text-4xl font-bold font-heading mb-2">124.2 <span className="text-lg text-slate-400 font-normal">GB</span></div>
                    <p className="text-sm text-emerald-400 mt-4 flex items-center gap-1">+12% <span className="text-slate-400">vs last month</span></p>
                  </div>

                  {/* Download */}
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Download Activity</h3>
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Download size={20} />
                      </div>
                    </div>
                    <div className="text-4xl font-bold font-heading mb-2">218.3 <span className="text-lg text-slate-400 font-normal">GB</span></div>
                    <p className="text-sm text-emerald-400 mt-4 flex items-center gap-1">+4% <span className="text-slate-400">vs last month</span></p>
                  </div>
                </div>

                {/* Additional controls */}
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 mt-6">
                  <h3 className="font-bold text-xl mb-6">Bandwidth Allocation</h3>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <div>
                        <h4 className="font-bold text-white mb-1">User Max Download Speed</h4>
                        <p className="text-sm text-slate-400">Throttle download speed for regular users.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <select className="bg-background/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none">
                          <option>Unlimited</option>
                          <option>100 Mbps</option>
                          <option>50 Mbps</option>
                          <option>10 Mbps</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <div>
                        <h4 className="font-bold text-white mb-1">Video Streaming Quality</h4>
                        <p className="text-sm text-slate-400">Default bandwidth allocation for multimedia.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <select className="bg-background/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none">
                          <option>Auto</option>
                          <option>1080p High</option>
                          <option>720p Standard</option>
                          <option>Data Saver</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-heading font-bold">User Management</h1>
                  <button 
                    onClick={() => {
                      setEditingUser(null);
                      setIsUserModalOpen(true);
                    }}
                    className="px-4 py-2 mb-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-[0_0_15px_rgba(192,38,211,0.3)] transition-all"
                  >
                    <Plus size={16} /> Add User
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search users by name or email..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:border-[#22d3ee] transition-colors text-white"
                    />
                  </div>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#22d3ee] transition-colors text-white appearance-none"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.02] border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Name</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Email</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Role</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Status</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-slate-400">No users found matching your search.</td>
                        </tr>
                      )}
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 text-sm font-bold">{user.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] uppercase tracking-wider font-bold">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {user.status === 'Active' ? (
                                <CheckCircle size={14} className="text-[#22d3ee]" />
                              ) : (
                                <XCircle size={14} className="text-yellow-500" />
                              )}
                              <span className={`text-xs font-bold uppercase tracking-wider ${user.status === 'Active' ? 'text-[#22d3ee]' : 'text-yellow-500'}`}>
                                {user.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                              <button 
                                onClick={() => setViewingUser(user)}
                                className="hover:text-[#a855f7] transition-colors p-1"
                                title="View Profile"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => {
                                  setEditingUser(user);
                                  setIsUserModalOpen(true);
                                }}
                                className="hover:text-[#22d3ee] transition-colors p-1"
                                title="Edit Profile"
                              >
                                <Pencil size={16} />
                              </button>
                              <button 
                                onClick={() => setUsers(users.filter(u => u.id !== user.id))}
                                className="hover:text-red-400 transition-colors p-1"
                                title="Delete User"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">User Requests & Messages</h1>
                </div>
                <div className="space-y-4">
                  {messages.length === 0 && <p className="text-slate-400">No messages found.</p>}
                  {messages.map((msg) => (
                    <div key={msg.id} className={`bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start justify-between transition-all group ${msg.read ? 'opacity-70' : 'border-[#22d3ee]/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}>
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.read ? 'bg-white/5' : 'bg-cyan-500/20 text-[#22d3ee]'}`}>
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg text-white">{msg.from}</h3>
                            {!msg.read && <span className="w-2 h-2 rounded-full bg-[#22d3ee]" />}
                          </div>
                          <p className="font-bold text-slate-300 text-sm mb-1">{msg.subject}</p>
                          <p className="text-sm text-slate-400">Click to read full request details and reply parameters...</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 whitespace-nowrap">{msg.date}</span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setMessages(messages.map(m => m.id === msg.id ? { ...m, read: !m.read } : m))}
                            className="bg-white/10 hover:bg-white/20 text-white rounded px-2 py-1 text-xs transition-colors"
                          >
                            {msg.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button 
                            onClick={() => setMessages(messages.filter(m => m.id !== msg.id))}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded px-2 py-1 text-xs transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Gallery Submissions</h1>
                  <button 
                    onClick={() => setIsGalleryModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
                  >
                    <Upload size={16} /> Upload Image
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.length === 0 && <p className="text-slate-400">No images in gallery.</p>}
                  {gallery.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/10 rounded-[24px] overflow-hidden group">
                      <div className="h-48 overflow-hidden relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            onClick={() => setGallery(gallery.filter(g => g.id !== item.id))}
                            className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                        <span className="text-[10px] text-[#22d3ee] uppercase tracking-widest font-bold bg-cyan-500/10 px-2 py-1 rounded-full">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div
                key="documents"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Documents & Research</h1>
                  <button 
                    onClick={() => setIsDocModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
                  >
                    <Plus size={16} /> Add Document
                  </button>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.02] border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Title</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Size</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Upload Date</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No documents found.</td>
                        </tr>
                      )}
                      {documents.map((doc) => (
                        <tr key={doc.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#a855f7]">
                                <FileText size={16} />
                              </div>
                              <span className="text-sm font-bold">{doc.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-400">{doc.size}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{doc.date}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                              <button className="hover:text-[#a855f7] transition-colors p-1" title="View">
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => setDocuments(documents.filter(d => d.id !== doc.id))}
                                className="hover:text-red-400 transition-colors p-1" title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'notices' && (
              <motion.div
                key="notices"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Manage Notices</h1>
                  <button 
                    onClick={() => {
                      setEditingNotice(null);
                      setIsNoticeModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all"
                  >
                    <Plus size={16} /> Create Notice
                  </button>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.02] border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Title</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">DatePublished</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Status</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No notices found.</td>
                        </tr>
                      )}
                      {notices.map((notice) => (
                        <tr key={notice.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-teal-400">
                                <Bell size={16} />
                              </div>
                              <div>
                                <span className="text-sm font-bold block">{notice.title}</span>
                                <span className="text-xs text-slate-400 block max-w-xs truncate">{notice.content}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-400">{notice.date}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-wider font-bold ${notice.isActive ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                              {notice.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                              <button 
                                onClick={() => {
                                  setEditingNotice(notice);
                                  setIsNoticeModalOpen(true);
                                }}
                                className="hover:text-teal-400 transition-colors p-1" title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                              <button 
                                onClick={() => setNotices(notices.filter(n => n.id !== notice.id))}
                                className="hover:text-red-400 transition-colors p-1" title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'team_section' && (
              <motion.div
                key="team_section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Users className="text-[#a855f7]" /> Team Section</h1>
                  <button 
                    onClick={() => {
                      setEditingUser(null);
                      setIsUserModalOpen(true);
                    }}
                    className="px-4 py-2 mb-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold flex items-center gap-2 text-sm hover:opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
                  >
                    <Plus size={16} /> Add Team Member
                  </button>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6 mb-6">
                  <p className="text-slate-300">This section is dedicated to managing your team. You have full access to add, edit, or remove team members and manage their profile details.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.02] border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Name</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Email</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Role</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300">Status</th>
                        <th className="px-6 py-4 text-sm font-bold text-slate-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-slate-400">No team members found.</td>
                        </tr>
                      )}
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 text-sm font-bold flex items-center gap-3">
                             <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                             {user.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-400">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] uppercase tracking-wider font-bold text-[#a855f7]">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {user.status === 'Active' ? (
                                <CheckCircle size={14} className="text-[#22d3ee]" />
                              ) : (
                                <XCircle size={14} className="text-yellow-500" />
                              )}
                              <span className={`text-xs font-bold uppercase tracking-wider ${user.status === 'Active' ? 'text-[#22d3ee]' : 'text-yellow-500'}`}>
                                {user.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                              <button 
                                onClick={() => setViewingUser(user)}
                                className="hover:text-[#a855f7] transition-colors p-1"
                                title="View Profile"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => {
                                  setEditingUser(user);
                                  setIsUserModalOpen(true);
                                }}
                                className="hover:text-[#22d3ee] transition-colors p-1"
                                title="Edit Profile"
                              >
                                <Pencil size={16} />
                              </button>
                              <button 
                                onClick={() => setUsers(users.filter(u => u.id !== user.id))}
                                className="hover:text-red-400 transition-colors p-1"
                                title="Delete User"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'team_categories' && (
              <motion.div
                key="team_categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><ListChecks className="text-[#a855f7]" /> Team Categories</h1>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                  <h2 className="text-xl font-bold mb-6">Manage Categories</h2>
                  <form className="mb-6 flex gap-4" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newCategory = formData.get('new_category') as string;
                    if (newCategory && !content.team.categories.includes(newCategory)) {
                      updateContent({
                        ...content,
                        team: {
                          ...content.team,
                          categories: [...content.team.categories, newCategory]
                        }
                      });
                      e.currentTarget.reset();
                    }
                  }}>
                    <input name="new_category" required className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="Add new category (e.g. Developer)" />
                    <button type="submit" className="px-6 py-3 bg-[#c026d3] text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
                      <Plus size={16} /> Add
                    </button>
                  </form>

                  <div className="space-y-2">
                    {content.team.categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                        <span className="font-bold text-slate-300">{category}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const newName = prompt('Edit category name:', category);
                              if (newName && newName !== category && !content.team.categories.includes(newName)) {
                                const newCategories = [...content.team.categories];
                                newCategories[index] = newName;
                                updateContent({
                                  ...content,
                                  team: { ...content.team, categories: newCategories }
                                });
                                // Optionally update users who had old category role
                                setUsers(users.map(u => u.role === category ? { ...u, role: newName } : u));
                              }
                            }}
                            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-[#22d3ee] transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove "${category}"?`)) {
                                updateContent({
                                  ...content,
                                  team: {
                                    ...content.team,
                                    categories: content.team.categories.filter(c => c !== category)
                                  }
                                });
                              }
                            }}
                            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {content.team.categories.length === 0 && (
                      <div className="p-8 text-center text-slate-400">No categories found.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'site_content' && (
              <motion.div
                key="site_content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Site Content Settings</h1>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden p-6 mb-6">
                  <p className="text-slate-300">Edit the text and information shown on the main website pages.</p>
                </div>

                <div className="grid gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <h2 className="text-xl font-bold mb-6">Home Page Hero Section</h2>
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      updateContent({
                        ...content,
                        home: {
                          heroTitle: formData.get('heroTitle') as string,
                          heroSubtitle: formData.get('heroSubtitle') as string,
                        }
                      });
                      alert('Hero content updated!');
                    }}>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Hero Title</label>
                        <input name="heroTitle" defaultValue={content.home.heroTitle} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Hero Subtitle</label>
                        <input name="heroSubtitle" defaultValue={content.home.heroSubtitle} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <button type="submit" className="px-6 py-3 bg-[#c026d3] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Save Hero Content
                      </button>
                    </form>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <h2 className="text-xl font-bold mb-6">About Section</h2>
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      updateContent({
                        ...content,
                        about: {
                          title: formData.get('title') as string,
                          description1: formData.get('description1') as string,
                          description2: formData.get('description2') as string,
                        }
                      });
                      alert('About content updated!');
                    }}>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Title</label>
                        <input name="title" defaultValue={content.about.title} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Description Paragraph 1</label>
                        <textarea name="description1" defaultValue={content.about.description1} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white h-24" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Description Paragraph 2</label>
                        <textarea name="description2" defaultValue={content.about.description2} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white h-24" />
                      </div>
                      <button type="submit" className="px-6 py-3 bg-[#c026d3] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Save About Content
                      </button>
                    </form>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <h2 className="text-xl font-bold mb-6">Services Section</h2>
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const title = formData.get('services_title') as string;
                      const description = formData.get('services_desc') as string;
                      
                      const items = content.services.items.map((item, index) => {
                        const itemTitle = formData.get(`service_${index}_title`) as string;
                        const itemDesc = formData.get(`service_${index}_desc`) as string;
                        const itemIcon = formData.get(`service_${index}_icon`) as string;
                        const file = formData.get(`service_${index}_file`) as File;
                        
                        let itemImage = item.image;
                        if (file && file.size > 0) {
                          itemImage = URL.createObjectURL(file);
                        } else if (formData.get(`service_${index}_image_url`)) {
                          itemImage = formData.get(`service_${index}_image_url`) as string;
                        }
                        
                        return { title: itemTitle, desc: itemDesc, icon: itemIcon, image: itemImage };
                      });
                      
                      updateContent({
                        ...content,
                        services: {
                          title,
                          description,
                          items
                        }
                      });
                      alert('Services content updated!');
                    }}>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Title</label>
                        <input name="services_title" defaultValue={content.services.title} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Description</label>
                        <textarea name="services_desc" defaultValue={content.services.description} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white h-24" />
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-bold mb-4">Service Items</h3>
                        {content.services.items.map((item, index) => (
                          <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-xl mb-4 space-y-4">
                            <h4 className="font-bold text-[#c026d3]">Item {index + 1}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-bold mb-2 text-slate-300">Title</label>
                                <input name={`service_${index}_title`} defaultValue={item.title} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold mb-2 text-slate-300">Icon Name (lucide-react)</label>
                                <input name={`service_${index}_icon`} defaultValue={item.icon} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-bold mb-2 text-slate-300">Description</label>
                              <textarea name={`service_${index}_desc`} defaultValue={item.desc} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white h-20" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-bold mb-2 text-slate-300">Upload Image</label>
                                <input type="file" name={`service_${index}_file`} accept="image/*" className="w-full bg-white/5 border border-white/10 rounded-2xl px-2 py-2 mb-2 focus:outline-none focus:border-[#22d3ee] transition-colors text-white text-sm" />
                                {item.image && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-md" />
                                    <span className="text-xs text-slate-400">Current Image</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-bold mb-2 text-slate-300">Or Image URL</label>
                                <input name={`service_${index}_image_url`} defaultValue={item.image || ''} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button type="submit" className="px-6 py-3 bg-[#c026d3] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Save Services Content
                      </button>
                    </form>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <h2 className="text-xl font-bold mb-6">Contact Section</h2>
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      updateContent({
                        ...content,
                        contact: {
                          email: formData.get('email') as string,
                          phone: formData.get('phone') as string,
                          whatsapp: formData.get('whatsapp') as string,
                          location: formData.get('location') as string,
                        }
                      });
                      alert('Contact content updated!');
                    }}>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Email Address</label>
                        <input name="email" defaultValue={content.contact.email} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Phone</label>
                        <input name="phone" defaultValue={content.contact.phone} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">WhatsApp Number</label>
                        <input name="whatsapp" defaultValue={content.contact.whatsapp} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Location</label>
                        <input name="location" defaultValue={content.contact.location} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <button type="submit" className="px-6 py-3 bg-[#c026d3] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Save Contact Content
                      </button>
                    </form>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <h2 className="text-xl font-bold mb-6">Skills Section</h2>
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const title = formData.get('skills_title') as string;
                      
                      const items = content.skills.items.map((item, index) => {
                        const name = formData.get(`skill_${index}_name`) as string;
                        const percent = parseInt(formData.get(`skill_${index}_percent`) as string) || 0;
                        const color = formData.get(`skill_${index}_color`) as string;
                        
                        return { name, percent, color };
                      });
                      
                      updateContent({
                        ...content,
                        skills: {
                          title,
                          items
                        }
                      });
                      alert('Skills content updated!');
                    }}>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Title</label>
                        <input name="skills_title" defaultValue={content.skills.title} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-bold mb-4">Skill Items</h3>
                        {content.skills.items.map((item, index) => (
                          <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-xl mb-4 space-y-4">
                            <h4 className="font-bold text-[#c026d3]">Item {index + 1}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-bold mb-2 text-slate-300">Name</label>
                                <input name={`skill_${index}_name`} defaultValue={item.name} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold mb-2 text-slate-300">Percent (0-100)</label>
                                <input type="number" min="0" max="100" name={`skill_${index}_percent`} defaultValue={item.percent} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold mb-2 text-slate-300">Color/HEX code</label>
                                <input type="text" name={`skill_${index}_color`} defaultValue={item.color} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button type="submit" className="px-6 py-3 bg-[#c026d3] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Save Skills Content
                      </button>
                    </form>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <h2 className="text-xl font-bold mb-6">Team Section</h2>
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      updateContent({
                        ...content,
                        team: {
                          ...content.team,
                          title: formData.get('team_title') as string,
                          description: formData.get('team_description') as string,
                        }
                      });
                      alert('Team section content updated!');
                    }}>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Title</label>
                        <input name="team_title" defaultValue={content.team.title} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Description</label>
                        <textarea name="team_description" defaultValue={content.team.description} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white h-24" />
                      </div>
                      <button type="submit" className="px-6 py-3 bg-[#c026d3] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Save Team Content
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Admin Settings</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                    <p className="text-sm text-slate-300 mb-6 font-medium">Click below to comprehensively edit your admin profile attributes such as display name, bio, social links, role, avatar, and background data.</p>
                    <button 
                      onClick={() => {
                        const adminUser = users.find(u => u.role === 'Admin');
                        if (adminUser) {
                          setEditingUser(adminUser);
                          setIsUserModalOpen(true);
                        }
                      }}
                      className="px-6 py-3 border border-[#22d3ee] text-[#22d3ee] hover:bg-[#22d3ee]/10 font-bold rounded-xl transition-colors"
                    >
                      Edit Administrator Profile
                    </button>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8">
                    <h2 className="text-xl font-bold mb-6">Site Preferences</h2>
                    <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('Site preferences saved successfully.'); }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white">Public Registration</h4>
                          <p className="text-xs text-slate-400">Allow users to sign up from the main site.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c026d3]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white">Email Notifications</h4>
                          <p className="text-xs text-slate-400">Receive alerts for new messages or signups.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c026d3]"></div>
                        </label>
                      </div>
                      
                      <div className="pt-4 border-t border-white/10">
                        <button type="submit" className="w-full py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 font-bold rounded-xl hover:opacity-90 transition-opacity text-white">
                          Save Preferences
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:col-span-2">
                    <h2 className="text-xl font-bold mb-6">Change Dashboard Password</h2>
                    {passwordMessage && (
                      <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 text-green-200 rounded-xl">
                        {passwordMessage}
                      </div>
                    )}
                    {passwordError && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl">
                        {passwordError}
                      </div>
                    )}
                    <form className="space-y-4 max-w-md" onSubmit={async e => {
                      e.preventDefault();
                      setPasswordMessage('');
                      setPasswordError('');
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const currentPassword = formData.get('currentPassword') as string;
                      const newPassword = formData.get('newPassword') as string;
                      const confirmPassword = formData.get('confirmPassword') as string;
                      
                      if (newPassword !== confirmPassword) {
                        setPasswordError('New passwords do not match.');
                        return;
                      }
                      if (newPassword.length < 6) {
                        setPasswordError('Password must be at least 6 characters long.');
                        return;
                      }

                      const res = await fetch('/api/change-password', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ currentPassword, newPassword })
                      });
                      
                      const data = await res.json();
                      if (res.ok && data.success) {
                        setPasswordMessage('Dashboard password updated successfully.');
                        form.reset();
                      } else {
                        setPasswordError(data.error || 'Failed to update password.');
                      }
                    }}>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Current Password</label>
                        <div className="relative">
                          <input type={showCurrentPassword ? "text" : "password"} name="currentPassword" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white pr-11" />
                          <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">New Password</label>
                        <div className="relative">
                          <input type={showNewPassword ? "text" : "password"} name="newPassword" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white pr-11" />
                          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-slate-300">Confirm New Password</label>
                        <div className="relative">
                          <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white pr-11" />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <button type="submit" className="px-6 py-3 bg-[#c026d3] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* User Modal */}
        {isUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-2xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button onClick={() => setIsUserModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                <XCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6">{editingUser ? 'Edit User Profile' : 'Add New User'}</h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                
                // Parse Skills (Format: Skill Name, 90)
                const skillsStr = formData.get('skills') as string;
                const parsedSkills = skillsStr.split('\n').filter(s => s.trim()).map(s => {
                  const [name, percent] = s.split(',');
                  return { name: name.trim(), percent: parseInt(percent?.trim() || '50', 10) };
                });

                // Parse Qualifications (Format: Title | Institution | Year)
                const qualStr = formData.get('qualifications') as string;
                const parsedQuals = qualStr.split('\n').filter(s => s.trim()).map(s => {
                  const [title, institution, year] = s.split('|');
                  return { title: title?.trim() || '', institution: institution?.trim() || '', year: year?.trim() || '' };
                });

                const file = formData.get('avatarFile') as File;
                let finalAvatarUrl = editingUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.get('name') as string)}&background=random`;
                if (file && file.size > 0) {
                  finalAvatarUrl = URL.createObjectURL(file);
                } else if (formData.get('avatarUrl')) {
                  finalAvatarUrl = formData.get('avatarUrl') as string;
                }

                const roleValue = formData.get('role') as string;

                if (roleValue && !content.team.categories.includes(roleValue) && !['Student', 'User', 'Guest', 'Admin', 'Vice-Admin'].includes(roleValue)) {
                  updateContent({
                    ...content,
                    team: {
                      ...content.team,
                      categories: [...content.team.categories, roleValue]
                    }
                  });
                }

                const newUser: UserProfile = {
                  id: editingUser ? editingUser.id : Date.now(),
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  role: roleValue,
                  status: formData.get('status') as string,
                  bio: formData.get('bio') as string,
                  avatar: finalAvatarUrl,
                  contacts: {
                    phone: formData.get('phone') as string,
                    location: formData.get('location') as string,
                    linkedin: formData.get('linkedin') as string,
                    facebook: formData.get('facebook') as string,
                    whatsapp: formData.get('whatsapp') as string,
                    instagram: formData.get('instagram') as string,
                  },
                  skills: parsedSkills,
                  qualifications: parsedQuals,
                };
                if (editingUser) {
                  setUsers(users.map(u => u.id === editingUser.id ? newUser : u));
                } else {
                  setUsers([...users, newUser]);
                }
                setIsUserModalOpen(false);
              }} className="space-y-6">

                <div className="flex justify-center mb-6">
                  <div className="relative group cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-500">
                    <img 
                      src={editingUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(editingUser?.name || 'New User')}&background=random`} 
                      id="avatar-preview"
                      className="w-full h-full object-cover" 
                      alt="Avatar Preview" 
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} className="text-white mb-1" />
                      <span className="text-[10px] text-white font-bold uppercase tracking-wider">Change</span>
                    </div>
                    <input 
                      type="file" 
                      name="avatarFile" 
                      accept="image/*" 
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          const img = document.getElementById('avatar-preview') as HTMLImageElement;
                          if (img) img.src = url;
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">Full Name</label>
                    <input name="name" defaultValue={editingUser?.name} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">Email Address</label>
                    <input type="email" name="email" defaultValue={editingUser?.email} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">Category</label>
                    <input 
                      list="role-options"
                      name="role" 
                      defaultValue={editingUser?.role || 'User'} 
                      className="w-full bg-slate-800 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white"
                      placeholder="Admin, Manager..."
                    />
                    <datalist id="role-options">
                      {Array.from(new Set(['Student', 'User', 'Guest', 'Admin', 'Vice-Admin', ...content.team.categories])).map(roleOption => (
                        <option key={roleOption} value={roleOption} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">Status</label>
                    <select name="status" defaultValue={editingUser?.status || 'Active'} className="w-full bg-slate-800 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white appearance-none">
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Bio</label>
                  <textarea name="bio" defaultValue={editingUser?.bio} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white h-20 resize-none" placeholder="Short bio..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">Phone</label>
                    <input name="phone" defaultValue={editingUser?.contacts?.phone} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="+977-..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">Location</label>
                    <input name="location" defaultValue={editingUser?.contacts?.location} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="City, Country" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">LinkedIn</label>
                    <input name="linkedin" defaultValue={editingUser?.contacts?.linkedin} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="username" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-2 text-slate-300">Avatar URL</label>
                    <input name="avatarUrl" defaultValue={editingUser?.avatar} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="Or image https://..." />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-2 text-slate-300">Facebook</label>
                    <input name="facebook" defaultValue={editingUser?.contacts?.facebook} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="username" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-2 text-slate-300">WhatsApp</label>
                    <input name="whatsapp" defaultValue={editingUser?.contacts?.whatsapp} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="number" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-2 text-slate-300">Instagram</label>
                    <input name="instagram" defaultValue={editingUser?.contacts?.instagram} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="username" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">Skills (One per line)</label>
                    <p className="text-[10px] text-slate-500 mb-1">Format: Skill Name, Percent (e.g. GIS Mapping, 85)</p>
                    <textarea 
                      name="skills" 
                      defaultValue={editingUser?.skills?.map(s => `${s.name}, ${s.percent}`).join('\n')} 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white h-32 resize-none whitespace-pre" 
                      placeholder="GIS Mapping, 85&#10;Data Analysis, 70" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-300">Qualifications (One per line)</label>
                    <p className="text-[10px] text-slate-500 mb-1">Format: Title | Institution | Year</p>
                    <textarea 
                      name="qualifications" 
                      defaultValue={editingUser?.qualifications?.map(q => `${q.title} | ${q.institution} | ${q.year}`).join('\n')} 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white h-32 resize-none whitespace-pre" 
                      placeholder="BSc. Forestry | TU | 2025&#10;Diploma | CTEVT | 2023" 
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#c026d3] to-[#a855f7] hover:from-[#a855f7] hover:to-[#c026d3] rounded-2xl font-bold text-white transition-all shadow-[0_0_20px_rgba(192,38,211,0.3)]">
                  {editingUser ? 'Save Changes' : 'Add User'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
        {/* Gallery Upload Modal */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-md p-8 relative shadow-2xl"
            >
              <button onClick={() => setIsGalleryModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                <XCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6">Upload Image</h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const file = formData.get('mediaFile') as File;
                const fileUrl = file && file.size > 0 
                  ? URL.createObjectURL(file) 
                  : (formData.get('imageUrl') as string || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop');

                const newItem = {
                  id: Date.now(),
                  title: formData.get('title') as string,
                  category: formData.get('category') as string,
                  image: fileUrl,
                };
                setGallery([...gallery, newItem]);
                setIsGalleryModalOpen(false);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Title</label>
                  <input name="title" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="Summer Field Trip" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Category</label>
                  <input name="category" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="Research" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Upload File from Device</label>
                  <input type="file" name="mediaFile" accept="image/*,video/*" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" />
                </div>
                <div className="text-center text-slate-500 font-bold text-sm">OR</div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Image URL</label>
                  <input name="imageUrl" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="https://..." />
                </div>
                <button type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 rounded-2xl font-bold text-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  Add Item
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Document Upload Modal */}
        {isDocModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-md p-8 relative shadow-2xl"
            >
              <button onClick={() => setIsDocModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                <XCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6">Add Document</h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const file = formData.get('docFile') as File;
                const newDoc = {
                  id: Date.now(),
                  title: file && file.size > 0 ? file.name : (formData.get('title') as string || 'Untitled Document'),
                  size: file && file.size > 0 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : '1.0 MB',
                  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
                };
                setDocuments([...documents, newDoc]);
                setIsDocModalOpen(false);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Document Title (Optional if uploading file)</label>
                  <input name="title" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#22d3ee] transition-colors text-white" placeholder="e.g. Q4 Synthesis Report.pdf" />
                </div>
                <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 text-center text-slate-400 hover:bg-white/[0.02] transition-colors">
                  <input type="file" name="docFile" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="mx-auto mb-2 text-white/50" size={32} />
                  <p className="text-sm">Drag & drop or click to upload from device</p>
                </div>
                <button type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 rounded-2xl font-bold text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  Save Document
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Notice Modal */}
        {isNoticeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-md p-8 relative shadow-2xl"
            >
              <button onClick={() => setIsNoticeModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                <XCircle size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6">{editingNotice ? 'Edit Notice' : 'Create Notice'}</h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newNotice: Notice = {
                  id: editingNotice ? editingNotice.id : Date.now(),
                  title: formData.get('title') as string,
                  content: formData.get('content') as string,
                  date: new Date().toLocaleDateString(),
                  isActive: formData.get('isActive') === 'true',
                };

                let updatedNotices = [...notices];

                // If making active, deactivate others
                if (newNotice.isActive) {
                  updatedNotices = updatedNotices.map(n => ({ ...n, isActive: false }));
                }

                if (editingNotice) {
                  setNotices(updatedNotices.map(n => n.id === editingNotice.id ? newNotice : n));
                } else {
                  setNotices([newNotice, ...updatedNotices]);
                }
                setIsNoticeModalOpen(false);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Title</label>
                  <input name="title" defaultValue={editingNotice?.title} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors text-white" placeholder="Notice title..." />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Content</label>
                  <textarea name="content" defaultValue={editingNotice?.content} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors text-white h-32 resize-none" placeholder="Notice body..." />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-300">Status</label>
                  <select name="isActive" defaultValue={editingNotice?.isActive ? 'true' : 'false'} className="w-full bg-slate-800 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors text-white appearance-none">
                    <option value="true">Active (Show to users)</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 rounded-2xl font-bold text-white transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                  {editingNotice ? 'Update Notice' : 'Publish Notice'}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {viewingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-4xl p-0 overflow-hidden relative shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setViewingUser(null)} 
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/3 bg-gradient-to-b from-slate-800 to-slate-900 p-8 border-r border-white/10 overflow-hidden flex flex-col shrink-0 min-w-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#22d3ee] mx-auto mb-6 shrink-0">
                  <img src={viewingUser.avatar} alt={viewingUser.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-1 truncate w-full">{viewingUser.name}</h3>
                <p className="text-[#22d3ee] font-bold uppercase tracking-wider text-xs text-center mb-6 shrink-0">{viewingUser.role}</p>
                <div className="flex items-center justify-center mb-6 shrink-0">
                   <span className={`px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-wider font-bold ${viewingUser.status === 'Active' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                     {viewingUser.status}
                   </span>
                </div>
                
                <div className="space-y-4 w-full overflow-x-hidden">
                  {viewingUser.email && (
                    <div className="flex items-center gap-3 text-slate-300 text-sm w-full min-w-0">
                      <Mail size={16} className="text-[#22d3ee] shrink-0" />
                      <span className="truncate block w-full text-left" title={viewingUser.email}>{viewingUser.email}</span>
                    </div>
                  )}
                  {viewingUser.contacts?.phone && (
                    <div className="flex items-center gap-3 text-slate-300 text-sm w-full min-w-0">
                      <Phone size={16} className="text-[#22d3ee] shrink-0" />
                      <span className="truncate block w-full text-left" title={viewingUser.contacts.phone}>{viewingUser.contacts.phone}</span>
                    </div>
                  )}
                  {viewingUser.contacts?.location && (
                    <div className="flex items-center gap-3 text-slate-300 text-sm w-full min-w-0">
                      <MapPin size={16} className="text-[#22d3ee] shrink-0" />
                      <span className="truncate block w-full text-left" title={viewingUser.contacts.location}>{viewingUser.contacts.location}</span>
                    </div>
                  )}
                  {viewingUser.contacts?.linkedin && (
                    <div className="flex items-center gap-3 text-slate-300 text-sm w-full min-w-0">
                      <Linkedin size={16} className="text-[#22d3ee] shrink-0" />
                      <span className="truncate block w-full text-left" title={viewingUser.contacts.linkedin}>{viewingUser.contacts.linkedin}</span>
                    </div>
                  )}
                  {viewingUser.contacts?.facebook && (
                    <div className="flex items-center gap-3 text-slate-300 text-sm w-full min-w-0">
                      <Facebook size={16} className="text-[#22d3ee] shrink-0" />
                      <span className="truncate block w-full text-left" title={viewingUser.contacts.facebook}>{viewingUser.contacts.facebook}</span>
                    </div>
                  )}
                  {viewingUser.contacts?.whatsapp && (
                    <div className="flex items-center gap-3 text-slate-300 text-sm w-full min-w-0">
                      <MessageCircle size={16} className="text-[#22d3ee] shrink-0" />
                      <span className="truncate block w-full text-left" title={viewingUser.contacts.whatsapp}>{viewingUser.contacts.whatsapp}</span>
                    </div>
                  )}
                  {viewingUser.contacts?.instagram && (
                    <div className="flex items-center gap-3 text-slate-300 text-sm w-full min-w-0">
                      <Instagram size={16} className="text-[#22d3ee] shrink-0" />
                      <span className="truncate block w-full text-left" title={viewingUser.contacts.instagram}>{viewingUser.contacts.instagram}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full md:w-2/3 p-8 overflow-y-auto custom-scrollbar">
                {viewingUser.bio && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      About
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{viewingUser.bio}</p>
                  </div>
                )}

                {viewingUser.qualifications && viewingUser.qualifications.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <GraduationCap className="text-[#22d3ee]" />
                      Qualifications
                    </h4>
                    <div className="space-y-4">
                      {viewingUser.qualifications.map((q, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <h5 className="font-bold text-white text-lg">{q.title}</h5>
                          <div className="flex justify-between items-center text-sm text-slate-400 mt-1">
                            <span>{q.institution}</span>
                            <span className="bg-[#22d3ee]/20 text-[#22d3ee] px-2 py-0.5 rounded font-bold">{q.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {viewingUser.skills && viewingUser.skills.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-4">Professional Skills</h4>
                    <div className="space-y-5">
                      {viewingUser.skills.map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm font-bold mb-2">
                            <span className="text-slate-200">{skill.name}</span>
                            <span className="text-[#22d3ee]">{skill.percent}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.percent}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-[#22d3ee] to-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                   <h4 className="text-xl font-bold text-white mb-4">Activity History</h4>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5">
                        <div className="w-2 h-2 rounded-full bg-[#22d3ee]" />
                        <div className="flex-1">
                          <p className="text-sm font-bold">Profile Created</p>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Join Date</span>
                        </div>
                      </div>
                   </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}

      </main>
    </div>
  );
}
