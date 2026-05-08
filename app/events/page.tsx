'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Star, Heart, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { upcomingEvent } from '@/lib/eventData';
import TicketBookButton from '@/components/events/TicketBookButton';

export default function Events() {

  const highlights = [
    "Three exclusive designers featured on the runway",
    "Dr. Bea Foster walking for each designer in a specially designed outfit",
    "Premiere of the Bea Sporty Line",
    "First-ever debut of Sporty Eveningwear",
    "Spectacular table décor and ambiance",
    "Door prizes, giveaways, and an exciting auction",
    "Two professional photographers + media coverage",
    "Special guest arrival via luxury limo partner",
    "Model of the Year 2026 crowning"
  ];

  const educationPrograms = [
    {
      title: "Model Development & Safety",
      description: "Teaching models how to safely navigate the industry while building confidence, professionalism, and next-step readiness."
    },
    {
      title: "Interior Design & Decorating Classes",
      description: "Learning to enter and work professionally in clients' homes, selecting fabrics and finishes, and respect for property values."
    },
    {
      title: "Life Skills & Daily Living",
      description: "Focusing on decision-making skills, safeguarding children and families, and promoting community stability."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={upcomingEvent.image}
            alt={upcomingEvent.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4 max-w-5xl mx-auto"
          >
            <div className="text-gold text-lg md:text-xl font-medium tracking-[0.3em] uppercase mb-4">
              {upcomingEvent.annualLabel}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white mb-6 leading-tight">
              The Black Tie<br />Chandelier Gala
            </h1>
            <div className="w-32 h-px bg-gold mx-auto mb-8" />
            <p className="text-xl md:text-3xl text-white/90 font-light tracking-wide mb-8">
              {upcomingEvent.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm md:text-base tracking-wider uppercase">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold" />
                {upcomingEvent.date}
              </div>
              <div className="hidden sm:block text-gold">•</div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                {upcomingEvent.time}
              </div>
              <div className="hidden sm:block text-gold">•</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" />
                {upcomingEvent.location}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-luxury max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-black mb-8"
          >
            The Night You&apos;ll Never Forget
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal leading-relaxed space-y-6"
          >
            <p>
              The Black Tie Chandelier Gala returns for its 11th year with an evening designed to celebrate elegance, creativity, and community impact.
              This year’s gala brings a breathtaking runway experience featuring three exclusive designers, with Dr. Bea Foster gracing the runway for each designer in a custom, show-stopping outfit.
            </p>
            <p>
              Guests can expect an atmosphere that is elegant, colorful, and fit for a queen—from the spectacular table décor to the unforgettable moments captured by two professional photographers.
              The celebration will include door prizes, giveaways, and an exciting auction, with proceeds supporting The James Cancer Hospital in Columbus, Ohio, and Sickle Cell initiatives.
            </p>
            <div className="bg-cream p-6 border border-gold/30 rounded-lg inline-block my-6">
              <p className="font-serif italic text-xl text-black">
                "It will be a powerful reminder that fashion can be more than beauty—it can be purpose."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container-luxury px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">What To Expect</h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 border border-white/10 hover:border-gold/50 transition-colors rounded-lg bg-white/5"
              >
                <Star className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <span className="text-lg font-light leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="scroll-mt-24 py-16 md:py-24 bg-beige relative">
        <div className="container-luxury px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">Tickets & Tables</h2>
            <p className="text-charcoal">Join us for a night of glitz and glamour</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* General Admission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 border border-black/10 text-center hover:shadow-2xl transition-all duration-300 relative group"
            >
              <h3 className="text-2xl font-serif text-black mb-2">General Admission</h3>
              <div className="text-5xl font-serif text-charcoal mb-8">$130<span className="text-base text-gray-500 font-sans">.00</span></div>
              <ul className="text-left space-y-4 mb-8 text-charcoal">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Formal Dinner</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Red carpet photo experience</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Fashion show & awards</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Door prizes & giveaways</li>
              </ul>
              <TicketBookButton
                tier="general"
                className="w-full py-4 bg-black text-white uppercase tracking-widest transition-colors font-medium hover:bg-gold hover:text-black disabled:opacity-60"
              />
            </motion.div>

            {/* VIP Admission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black p-8 md:p-12 border border-gold text-center shadow-2xl relative transform md:-translate-y-6"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-black px-4 py-1 uppercase text-xs font-bold tracking-widest">
                Recommended
              </div>
              <h3 className="text-2xl font-serif text-gold mb-2">VIP Experience</h3>
              <div className="text-5xl font-serif text-white mb-8">$180<span className="text-base text-gray-400 font-sans">.00</span></div>
              <ul className="text-left space-y-4 mb-8 text-white/90">
                <li className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-gold" /> <strong>Preferred VIP Seating</strong></li>
                <li className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-gold" /> <strong>Wine Service</strong></li>
                <li className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-gold" /> <strong>Exclusive VIP Gift</strong></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> All General Admission benefits</li>
              </ul>
              <TicketBookButton
                tier="vip"
                className="w-full py-4 bg-gold text-black uppercase tracking-widest transition-colors font-medium hover:bg-white disabled:opacity-60"
              />
            </motion.div>
          </div>

          <div className="text-center mt-12 text-charcoal">
            <p className="font-medium">Tables of 8 available for businesses and group celebrations.</p>
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="py-16 md:py-24 bg-charcoal text-white">
        <div className="container-luxury px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Become a Sponsor</h2>
            <div className="w-24 h-px bg-gold mx-auto mb-6" />
            <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Partner with us to uplift lives and honor the memory of our lost loved ones. Your support fuels our mission to bring hope, healing, and confidence to our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Chandelier Sponsor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-6 border border-gold rounded-lg hover:bg-white/10 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
              <h3 className="text-xl font-serif text-gold mb-2">Chandelier</h3>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Presenting Sponsor</p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2"><Star className="w-4 h-4 text-gold shrink-0 mt-0.5" /> Premier Brand Recognition</li>
                <li className="flex items-start gap-2"><Star className="w-4 h-4 text-gold shrink-0 mt-0.5" /> VIP Table for 8 Guests</li>
                <li className="flex items-start gap-2"><Star className="w-4 h-4 text-gold shrink-0 mt-0.5" /> Stage Recognition</li>
                <li className="flex items-start gap-2"><Star className="w-4 h-4 text-gold shrink-0 mt-0.5" /> VIP Gift Bag Opportunity</li>
              </ul>
            </motion.div>

            {/* Radiance Sponsor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 p-6 border border-white/20 rounded-lg hover:border-gold/50 transition-colors"
            >
              <h3 className="text-xl font-serif text-white mb-2">Radiance</h3>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Sponsor</p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> VIP Seating for 4 Guests</li>
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Logo on Website</li>
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Program Recognition</li>
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Evening Acknowledgment</li>
              </ul>
            </motion.div>

            {/* Glow Sponsor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 p-6 border border-white/20 rounded-lg hover:border-gold/50 transition-colors"
            >
              <h3 className="text-xl font-serif text-white mb-2">Glow</h3>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Sponsor</p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Reserved Seating for 2</li>
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Name on Website</li>
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Printed Program Listing</li>
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Evening Acknowledgment</li>
              </ul>
            </motion.div>

            {/* Friend of the Gala */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 p-6 border border-white/20 rounded-lg hover:border-gold/50 transition-colors"
            >
              <h3 className="text-xl font-serif text-white mb-2">Friend</h3>
              <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Supporter</p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Name Listed as Supporter</li>
                <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Program Recognition</li>
                <li className="flex items-start gap-2"><Heart className="w-4 h-4 text-white/40 shrink-0 mt-0.5" /> Option to Sponsor a Ticket</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-luxury max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif text-black mb-6">Impact & Mission</h2>
              <p className="text-lg text-charcoal mb-6 leading-relaxed">
                The Black Tie Chandelier Gala proudly supports and uplifts the community through growing educational and outreach programs led by
                The Financial Act and Creative Urban Living Inc.
              </p>

              <div className="space-y-6">
                <div className="bg-cream p-6 rounded-lg border-l-4 border-gold">
                  <h3 className="text-xl font-serif mb-2">Benefiting Causes</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-red-500 fill-red-500" /> The James Cancer Hospital (Columbus, Ohio)</div>
                    <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-red-500 fill-red-500" /> Sickle Cell Awareness & Support</div>
                  </div>
                </div>

                <div className="bg-charcoal text-white p-6 rounded-lg">
                  <h3 className="text-xl font-serif mb-4 text-gold">Honoring our Loved Ones</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    A heartfelt tribute will honor a model we lost to sickle cell and recognize Dr. Bea’s granddaughter, who continues to courageously battle sickle cell.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] bg-beige rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80"
                alt="Community Impact"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-3xl font-serif mb-2">Our Mission</div>
                <p className="text-sm opacity-90">Improving quality of life, empowering families, and creating safe spaces for growth.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Educational Programs */}
      <section className="py-16 bg-cream">
        <div className="container-luxury px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-black mb-4">Educational Programs</h2>
            <div className="w-20 h-px bg-gold mx-auto mb-4" />
            <p className="text-charcoal max-w-2xl mx-auto">
              We want you to grow. The night closes with the launch of our Honey B Classes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationPrograms.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-serif text-black mb-3">{program.title}</h3>
                <p className="text-sm text-charcoal leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container-luxury text-center px-4">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-8">Our Corporate Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-bold">Huntington Bank</span>
            <span className="text-xl font-bold">Chase Bank</span>
            <span className="text-xl font-bold">5th Third Bank</span>
            <span className="text-xl font-bold">Costco</span>
            <span className="text-xl font-bold">First Watch</span>
          </div>
        </div>
      </section>

      {/* CTA Footer for Gala */}
      <section className="py-16 md:py-24 bg-black text-white text-center">
        <div className="container-luxury px-4">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">Want to Walk the Walk With Us?</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Model casting, sponsorships, vendors, and media inquiries are now open.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:info@theblacktiechandeliergala.com" className="px-8 py-4 bg-gold text-black font-medium uppercase tracking-wider hover:bg-white transition-colors">
              Contact Us
            </a>
            <Link
              href="/events#tickets"
              className="px-8 py-4 border border-white/60 text-white uppercase tracking-wider transition-colors hover:border-gold hover:text-gold"
            >
              Book tickets
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/40">Inquiries: info@theblacktiechandeliergala.com</p>
        </div>
      </section>
    </div>
  );
}
