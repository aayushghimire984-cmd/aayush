import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

const categories = ['All', 'Web Design', 'Academics', 'Research'];

const projects = [
  {
    id: 1,
    title: 'Forest Ecosystem Analysis',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop',
    desc: 'Comprehensive study on local forest ecosystem dynamics and microbial presence.',
  },
  {
    id: 2,
    title: 'Student Dashboard UI',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    desc: 'Modern, glassmorphic dashboard interface for university students.',
  },
  {
    id: 3,
    title: 'Microbiology Lab Notes',
    category: 'Academics',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop',
    desc: 'Digitized, categorized notes with diagrams for lab experiments.',
  },
  {
    id: 4,
    title: 'Soil Science Presentation',
    category: 'Academics',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800&auto=format&fit=crop',
    desc: 'Slide deck focusing on soil composition and organic matter analysis.',
  },
  {
    id: 5,
    title: 'E-commerce Redesign',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    desc: 'Concept redesign for a local organic products store.',
  },
  {
    id: 6,
    title: 'Climate Impact Report',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?q=80&w=800&auto=format&fit=crop',
    desc: 'Data-driven report on climatic shifts in specific altitude zones.',
  },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 relative bg-[#0a0a1a]" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Selected <span className="text-gradient">Works</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === category 
                  ? 'bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white shadow-[0_0_15px_rgba(192,38,211,0.5)]' 
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-all block relative"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-background/50 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050f] via-[#05050f]/20 to-transparent z-10" />
                  
                  <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-heading font-medium text-white">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Hover Overlay Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary/80 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all z-30 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden border border-border shadow-2xl glass"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X size={20} />
                </button>
                
                <div className="aspect-video w-full bg-muted relative">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="p-6 md:p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-heading font-bold mb-2 text-foreground">
                    {selectedProject.title}
                  </h3>
                  <p className="text-muted-foreground lg:w-2/3 leading-relaxed mb-6">
                    {selectedProject.desc}
                    <br/><br/>
                    (This is a placeholder description. In a real environment, this modal would contain detailed project challenges, solutions, and outcomes.)
                  </p>
                  
                  <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                    View Case Study <ExternalLink size={16} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
