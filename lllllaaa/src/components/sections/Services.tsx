import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

export function Services() {
  const { content } = useSiteContent();

  return (
    <section className="py-24 relative" id="services">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">{content.services.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {content.services.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.services.items.map((service, index) => {
            // @ts-ignore
            const Icon = LucideIcons[service.icon] || LucideIcons.Code;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all group flex flex-col relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                
                {service.image ? (
                  <div className="w-full h-32 mb-6 rounded-xl overflow-hidden relative z-10 bg-black/20">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400 group-hover:text-cyan-300 transition-all relative z-10">
                    <Icon size={24} />
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-white mb-2 relative z-10 transition-all">
                  {service.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed relative z-10 flex-grow">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
