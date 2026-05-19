import { motion } from 'motion/react';
import { useSiteContent } from '../../context/SiteContentContext';

export function Skills() {
  const { content } = useSiteContent();

  return (
    <section className="py-24 relative bg-slate-950" id="skills">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-lg font-bold mb-4 uppercase text-[12px] tracking-[3px] text-slate-500">Expertise Matrix</h3>
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-4">{content.skills.title.split(' ')[0]} <span className="text-gradient">{content.skills.title.split(' ').slice(1).join(' ')}</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.skills.items.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-[32px] hover:bg-white/[0.08] transition-all group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 text-sm font-medium">{skill.name}</span>
                <span className="text-sm font-bold" style={{ color: skill.color }}>{skill.percent}%</span>
              </div>
              
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 + 0.2 }}
                  className="h-full rounded-full relative"
                  style={{ backgroundColor: skill.color }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
