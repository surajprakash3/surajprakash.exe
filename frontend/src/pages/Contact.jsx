import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import * as contactService from '../services/contactService';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await contactService.sendMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      value: 'surajprak101@gmail.com',
      link: 'mailto:surajprak101@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Phone',
      value: '+91 9708519254',
      link: 'tel:+919708519254',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Location',
      value: 'India',
      link: null,
    },
  ];

  return (
    <>
      <SEO title="Contact" description="Get in touch with Suraj Prakash" url="/contact" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mb-3">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <div className="w-16 h-1.5 bg-accent-500 rounded-full mx-auto mb-3"></div>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass p-4 rounded-xl border border-theme-border/50 shadow-sm flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-500 flex items-center justify-center shrink-0 group-hover:bg-accent-500 group-hover:text-white">
                  {info.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-theme-muted uppercase tracking-wider mb-0.5">{info.title}</p>
                  {info.link ? (
                    <a href={info.link} className="text-sm font-semibold text-theme-text hover:text-accent-500">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-theme-text">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <div className="glass p-6 sm:p-8 rounded-2xl border border-theme-border/50 shadow-md">
              {submitStatus === 'success' && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm">
                  <CheckCircle2 size={16} />
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                  <AlertCircle size={16} />
                  Failed to send message. Please try again or email directly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-theme-muted uppercase tracking-wider mb-1.5">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text placeholder-theme-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500"
                      id="contact-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-theme-muted uppercase tracking-wider mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text placeholder-theme-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500"
                      id="contact-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-muted uppercase tracking-wider mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text placeholder-theme-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500"
                    id="contact-subject"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-muted uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-theme-text placeholder-theme-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500 resize-none"
                    id="contact-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm shadow-lg shadow-accent-500/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  id="contact-submit"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
