import { motion } from 'motion/react';
import { Mail, MapPin, MessageSquare, Send, Phone } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';

export function Contact() {
  const { content } = useSiteContent();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 relative" id="contact">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Get In <span className="text-gradient">Touch</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg">Email</h4>
                <a href={`mailto:${content.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors text-sm mt-1 block">
                  {content.contact.email}
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <MessageSquare className="text-[#25D366]" size={24} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg">WhatsApp</h4>
                <p className="text-muted-foreground text-sm mt-1">Direct message our admin team</p>
                <a href={`https://wa.me/${content.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <button className="mt-3 px-4 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366] hover:text-white transition-colors">
                    Chat Now
                  </button>
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <MapPin className="text-secondary" size={24} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg">Location</h4>
                <p className="text-muted-foreground text-sm mt-1">{content.contact.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white/5 border border-white/10 p-8 rounded-[32px]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Subject</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="How can I help you?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button 
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 glow"
              >
                {formState === 'idle' && (
                  <>Send Message <Send size={18} /></>
                )}
                {formState === 'submitting' && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {formState === 'success' && (
                  <span>Message Sent Successfully!</span>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
