import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUsers, UserProfile } from '../../context/UserContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { Mail, MapPin, Phone, Linkedin, GraduationCap, X, Facebook, MessageCircle, Instagram } from 'lucide-react';

const renderSocialIcons = (user: UserProfile) => {
  if (!user.contacts) return null;
  const { facebook, instagram, linkedin, whatsapp } = user.contacts;
  if (!facebook && !instagram && !linkedin && !whatsapp) return null;
  
  return (
    <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
      {linkedin && (
        <a href={linkedin.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors" title="LinkedIn">
          <Linkedin size={18} />
        </a>
      )}
      {facebook && (
        <a href={facebook.startsWith('http') ? facebook : `https://facebook.com/${facebook}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1877f2] transition-colors" title="Facebook">
          <Facebook size={18} />
        </a>
      )}
      {instagram && (
        <a href={instagram.startsWith('http') ? instagram : `https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#e1306c] transition-colors" title="Instagram">
          <Instagram size={18} />
        </a>
      )}
      {whatsapp && (
        <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#25d366] transition-colors" title="WhatsApp">
          <MessageCircle size={18} />
        </a>
      )}
    </div>
  );
};

export function Team() {
  const { users } = useUsers();
  const { content } = useSiteContent();
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  // Group active users by role, only keeping those whose role is in content.team.categories
  const categorizedUsers = content.team.categories.map(category => {
    return {
      category,
      members: users.filter(u => u.status === 'Active' && u.role === category)
    };
  }).filter(group => group.members.length > 0);

  // Users who don't fit into any category but are still active
  const otherMembers = users.filter(u => u.status === 'Active' && !content.team.categories.includes(u.role));

  return (
    <section id="team" className="py-24 relative">
      <div className="absolute inset-0 bg-[#020617]/50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.team.title.split(' ').map((word, index, arr) => 
              index === arr.length - 1 ? <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{word}</span> : word + " "
            )}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {content.team.description}
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-16">
          {categorizedUsers.map((group, groupIndex) => (
            <div key={group.category} className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-cyan-500/30 pb-2">{group.category}</h3>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 w-full">
                {group.members.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className={`rounded-full overflow-hidden mb-4 group-hover:scale-105 transition-transform ${groupIndex === 0 ? 'w-48 h-48 border-4 border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.3)]' : groupIndex === 1 ? 'w-40 h-40 border-4 border-[#a855f7] shadow-[0_0_25px_rgba(168,85,247,0.3)]' : 'w-28 h-28 border-2 border-white/20 group-hover:border-cyan-500'}`}>
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className={`${groupIndex === 0 ? 'text-3xl' : groupIndex === 1 ? 'text-2xl' : 'text-xl'} font-bold text-white mb-2`}>{user.name}</h3>
                    <p className={`${groupIndex === 0 ? 'text-cyan-400 text-sm' : groupIndex === 1 ? 'text-[#a855f7] text-sm' : 'text-cyan-400 text-xs'} font-bold uppercase tracking-wider`}>{user.role}</p>
                    {renderSocialIcons(user)}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* Other Members Grid */}
          {otherMembers.length > 0 && (
            <div className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-cyan-500/30 pb-2">Other Members</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 w-full mt-8">
                {otherMembers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center cursor-pointer group"
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 mb-4 group-hover:border-cyan-500 group-hover:scale-105 transition-all">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
                    <p className="text-cyan-400 font-bold uppercase tracking-wider text-xs">{user.role}</p>
                    {renderSocialIcons(user)}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-[32px] w-full max-w-4xl p-0 overflow-hidden relative shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedUser(null)} 
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/3 bg-gradient-to-b from-slate-800 to-slate-900 p-8 border-r border-white/10">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500 mx-auto mb-6">
                  <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-1">{selectedUser.name}</h3>
                <p className="text-cyan-400 font-bold uppercase tracking-wider text-xs text-center mb-6">{selectedUser.role}</p>
                
                <div className="space-y-4">
                  {selectedUser.email && (
                    <a href={`mailto:${selectedUser.email}`} className="flex items-center gap-3 text-slate-300 text-sm hover:text-cyan-400 transition-colors">
                      <Mail size={16} className="text-cyan-500 shrink-0" />
                      <span className="truncate">{selectedUser.email}</span>
                    </a>
                  )}
                  {selectedUser.contacts?.phone && (
                    <a href={`tel:${selectedUser.contacts.phone}`} className="flex items-center gap-3 text-slate-300 text-sm hover:text-cyan-400 transition-colors">
                      <Phone size={16} className="text-cyan-500 shrink-0" />
                      <span>{selectedUser.contacts.phone}</span>
                    </a>
                  )}
                  {selectedUser.contacts?.location && (
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <MapPin size={16} className="text-cyan-500 shrink-0" />
                      <span>{selectedUser.contacts.location}</span>
                    </div>
                  )}
                  {selectedUser.contacts?.linkedin && (
                    <a href={selectedUser.contacts.linkedin.startsWith('http') ? selectedUser.contacts.linkedin : `https://linkedin.com/in/${selectedUser.contacts.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 text-sm hover:text-cyan-400 transition-colors">
                      <Linkedin size={16} className="text-cyan-500 shrink-0" />
                      <span>{selectedUser.contacts.linkedin}</span>
                    </a>
                  )}
                  {selectedUser.contacts?.facebook && (
                    <a href={selectedUser.contacts.facebook.startsWith('http') ? selectedUser.contacts.facebook : `https://facebook.com/${selectedUser.contacts.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 text-sm hover:text-cyan-400 transition-colors">
                      <Facebook size={16} className="text-cyan-500 shrink-0" />
                      <span>{selectedUser.contacts.facebook}</span>
                    </a>
                  )}
                  {selectedUser.contacts?.whatsapp && (
                    <a href={`https://wa.me/${selectedUser.contacts.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 text-sm hover:text-cyan-400 transition-colors">
                      <MessageCircle size={16} className="text-cyan-500 shrink-0" />
                      <span>{selectedUser.contacts.whatsapp}</span>
                    </a>
                  )}
                  {selectedUser.contacts?.instagram && (
                    <a href={selectedUser.contacts.instagram.startsWith('http') ? selectedUser.contacts.instagram : `https://instagram.com/${selectedUser.contacts.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 text-sm hover:text-cyan-400 transition-colors">
                      <Instagram size={16} className="text-cyan-500 shrink-0" />
                      <span>{selectedUser.contacts.instagram}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="w-full md:w-2/3 p-8 overflow-y-auto custom-scrollbar">
                {selectedUser.bio && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      About
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{selectedUser.bio}</p>
                  </div>
                )}

                {selectedUser.qualifications && selectedUser.qualifications.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <GraduationCap className="text-cyan-500" />
                      Qualifications
                    </h4>
                    <div className="space-y-4">
                      {selectedUser.qualifications.map((q, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                          <h5 className="font-bold text-white text-lg">{q.title}</h5>
                          <div className="flex justify-between items-center text-sm text-slate-400 mt-1">
                            <span>{q.institution}</span>
                            <span className="bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-bold">{q.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUser.skills && selectedUser.skills.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Professional Skills</h4>
                    <div className="space-y-5">
                      {selectedUser.skills.map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm font-bold mb-2">
                            <span className="text-slate-200">{skill.name}</span>
                            <span className="text-cyan-400">{skill.percent}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.percent}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
