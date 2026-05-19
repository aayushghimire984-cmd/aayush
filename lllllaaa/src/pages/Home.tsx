import { Hero, About, Skills, Services, Portfolio, Team, Contact } from '../components/sections';
import { useNotices } from '../context/NoticeContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function Home() {
  const { activeNotice } = useNotices();
  // Using session storage so the notice banner isn't annoying every time during navigation, but shows up initially
  const [showNotice, setShowNotice] = useState(() => {
    return activeNotice && sessionStorage.getItem('noticeDismissed') !== activeNotice.id.toString();
  });

  const dismissNotice = () => {
    if (activeNotice) {
      sessionStorage.setItem('noticeDismissed', activeNotice.id.toString());
    }
    setShowNotice(false);
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {activeNotice && showNotice && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-[72px] md:top-[88px] left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-teal-500/30 shadow-[0_4px_30px_rgba(20,184,166,0.15)] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-teal-400 font-bold mb-1 flex items-center gap-2 text-sm md:text-base">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  {activeNotice.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300">{activeNotice.content}</p>
                <div className="text-[10px] text-slate-500 mt-1">{activeNotice.date}</div>
              </div>
              <button 
                onClick={dismissNotice}
                className="text-slate-400 hover:text-white p-2 transition-colors self-start md:self-center shrink-0 bg-white/5 rounded-full"
                title="Dismiss Notice"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Portfolio />
      <Team />
      <Contact />
    </div>
  );
}

