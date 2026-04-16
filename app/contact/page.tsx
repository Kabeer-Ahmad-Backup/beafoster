'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@theblacktiechandeliergala.com',
      link: 'mailto:info@theblacktiechandeliergala.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (614) 204-5024',
      link: 'tel:+16142045024',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'PO Box 24026, Columbus, OH 43224–2531',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#',
    },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/theblacktiechandeliergala/?hl=en', icon: Instagram },
    { name: 'Beau Couture Fashion', href: 'https://www.instagram.com/beaucouturefashion/', icon: Instagram },
    { name: 'Facebook', href: 'https://www.facebook.com/p/The-Black-Tie-Chandelier-Gala-100084365270413/', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ];

  const offices = [
    {
      city: 'Columbus',
      address: 'PO Box 24026\nColumbus, OH 43224–2531',
      phone: '+1 (614) 204-5024',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] overflow-hidden bg-cream">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-beige to-cream" />
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative h-full flex items-center py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="container-luxury w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto px-4 sm:px-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-4 sm:mb-6"
              >
                <span className="text-xs sm:text-sm uppercase tracking-wider text-gold font-medium">
                  Get in Touch
                </span>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-black mb-4 sm:mb-6 leading-tight">
                Contact
              </h1>
              <div className="w-20 sm:w-24 h-px bg-gold mx-auto mb-4 sm:mb-6" />
              <p className="text-base sm:text-lg md:text-xl text-charcoal leading-relaxed px-2">
                Let's start a conversation about your vision. We're here to bring your dreams to life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black mb-4 sm:mb-6">
                Send Us a Message
              </h2>
              <p className="text-sm sm:text-base text-charcoal mb-6 sm:mb-8 leading-relaxed">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm uppercase tracking-wider text-charcoal mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream border border-beige focus:border-gold focus:outline-none transition-colors text-black text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm uppercase tracking-wider text-charcoal mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream border border-beige focus:border-gold focus:outline-none transition-colors text-black text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm uppercase tracking-wider text-charcoal mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream border border-beige focus:border-gold focus:outline-none transition-colors text-black text-sm sm:text-base"
                      placeholder="+1 (614) 204-5024"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs sm:text-sm uppercase tracking-wider text-charcoal mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream border border-beige focus:border-gold focus:outline-none transition-colors text-black text-sm sm:text-base"
                    >
                      <option value="">Select a subject</option>
                      <option value="fashion">Fashion Services</option>
                      <option value="interiors">Interior Design</option>
                      <option value="events">Events</option>
                      <option value="masterclass">Masterclass</option>
                      <option value="magazine">Magazine</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm uppercase tracking-wider text-charcoal mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-cream border border-beige focus:border-gold focus:outline-none transition-colors text-black resize-none text-sm sm:text-base"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm"
                  >
                    Thank you! Your message has been sent. We'll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm"
                  >
                    Something went wrong. Please try again.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white hover:bg-charcoal transition-colors text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 lg:mt-0"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black mb-4 sm:mb-6">
                Get in Touch
              </h2>
              <p className="text-sm sm:text-base text-charcoal mb-6 sm:mb-8 leading-relaxed">
                We're here to help bring your vision to life. Reach out through any of the channels below.
              </p>

              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-cream border border-beige hover:border-gold transition-colors group"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm uppercase tracking-wider text-charcoal mb-1">
                          {info.title}
                        </h3>
                        <p className="text-sm sm:text-base text-black whitespace-pre-line break-words">
                          {info.content}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xs sm:text-sm uppercase tracking-wider text-charcoal mb-3 sm:mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-cream border border-beige rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-colors group"
                        aria-label={social.name}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal group-hover:text-white transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-cream">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-3 sm:mb-4">
              Our Offices
            </h2>
            <div className="w-20 sm:w-24 h-px bg-gold mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-charcoal max-w-2xl mx-auto px-4">
              Visit us at any of our global locations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-5 sm:p-6 md:p-8 border border-beige hover:border-gold transition-colors"
              >
                <h3 className="text-lg sm:text-xl font-serif text-black mb-3 sm:mb-4">
                  {office.city}
                </h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-charcoal">
                  <p className="whitespace-pre-line leading-relaxed">
                    {office.address}
                  </p>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                    className="block text-black hover:text-gold transition-colors break-all"
                  >
                    {office.phone}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

