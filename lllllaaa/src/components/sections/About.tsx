import { motion } from 'motion/react';
import { Download, GraduationCap, MapPin, Target, FlaskConical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';

const stats = [
  { label: 'Projects', value: 25, suffix: '+' },
  { label: 'Certificates', value: 10, suffix: '+' },
  { label: 'Clients', value: 15, suffix: '+' },
];

function Counter({ end, suffix }: { end: number, suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span className="font-heading font-bold text-3xl text-gradient">{count}{suffix}</span>;
}

export function About() {
  const { content } = useSiteContent();
  return (
    <section className="py-24 relative" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">About <span className="text-gradient">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-heading font-semibold text-foreground/90">
              {content.about.title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              {content.about.description1}
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              {content.about.description2}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-6 py-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 font-medium">
                <Download size={18} />
                Download CV
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <Counter end={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            <div className="glass p-6 rounded-2xl glow-hover relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <MapPin size={64} />
              </div>
              <MapPin className="text-primary mb-4" size={24} />
              <h4 className="font-heading font-semibold text-lg mb-2">Location</h4>
              <p className="text-muted-foreground">From Syangja, Nepal. Currently based in Kathmandu.</p>
            </div>

            <div className="glass p-6 rounded-2xl glow-hover relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap size={64} />
              </div>
              <GraduationCap className="text-secondary mb-4" size={24} />
              <h4 className="font-heading font-semibold text-lg mb-2">Education</h4>
              <p className="text-muted-foreground">Trinity International College graduate. Currently pursuing Forestry.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
               <div className="glass p-6 rounded-2xl glow-hover">
                  <FlaskConical className="text-[#3b82f6] mb-4" size={24} />
                  <h4 className="font-heading font-semibold text-lg mb-2">Science</h4>
                  <p className="text-muted-foreground text-sm">Microbiology & Forestry Research</p>
               </div>
               <div className="glass p-6 rounded-2xl glow-hover">
                  <Target className="text-primary mb-4" size={24} />
                  <h4 className="font-heading font-semibold text-lg mb-2">Ambition</h4>
                  <p className="text-muted-foreground text-sm">Study abroad in specialized fields</p>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
