import { motion } from 'motion/react';
import { ArrowRight, Download, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [null, Math.random() * -500],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export function Hero() {
  const { content } = useSiteContent();
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < content.home.heroSubtitle.length) {
        setText(content.home.heroSubtitle.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, [content.home.heroSubtitle]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-12 overflow-hidden" id="home">
      <ParticleBackground />
      
      {/* Decorative gradients */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[128px] mix-blend-screen" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6 relative bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 overflow-hidden group"
        >
          {/* Card background glowing elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <div className="bg-primary/20 text-[#f0abfc] text-[10px] font-bold px-3 py-1 rounded-full border border-primary/30 uppercase tracking-widest mb-2 w-fit">
              Student & Web Enthusiast
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold leading-[1.1] tracking-tight mb-4">
                 {content.home.heroTitle.split('Aayush Ghimire')[0]}<br className="md:hidden" /><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c026d3] via-[#a855f7] to-[#22d3ee]">Aayush Ghimire</span>{content.home.heroTitle.split('Aayush Ghimire')[1]}
              </h1>
            </div>

            <div className="h-8 md:h-10 flex items-center gap-2 text-lg md:text-xl text-muted-foreground font-mono -mt-4 mb-4">
              <Terminal size={20} className="text-secondary hidden sm:block" />
              <span>{text}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 bg-secondary h-5 md:h-6"
              />
            </div>

            <p className="max-w-xl text-slate-400 text-lg leading-relaxed mt-2 mb-6">
              Trinity International Alumnus specializing in <span className="text-white font-medium">Forestry</span> and <span className="text-white font-medium">Microbiology</span>. Bridging the gap between ecological research and digital innovation through clean code and modern design.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a href="#portfolio" className="px-8 py-3 bg-white text-[#020617] font-bold rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-gray-100 transition-colors flex items-center gap-2">
                Explore Portfolio
              </a>
              <a href="#contact" className="px-8 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-2xl hover:bg-slate-700 transition-colors">
                Contact Me
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative lg:ml-auto w-full max-w-md aspect-square"
        >
          {/* Neon Ring */}
          <div className="absolute inset-4 rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border border-secondary/30 animate-[spin_15s_linear_infinite_reverse]" />
          
          <div className="relative w-full h-full rounded-full glass p-4 flex items-center justify-center glow overflow-hidden group">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
               {/* Abstract Image Placeholder for the profile since no actual image is given */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-700 mix-blend-luminosity"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-background object-cover" />
               <span className="font-heading font-black text-8xl text-white/5 z-10 select-none">AG</span>
            </div>
          </div>

          {/* Floating cards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-4 top-1/4 glass p-3 rounded-xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Terminal size={16} />
            </div>
            <div className="text-sm font-medium">Web Dev</div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -left-8 bottom-1/4 glass p-3 rounded-xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div className="text-sm font-medium">Research</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
