'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sofa, Shirt, GraduationCap, Mic, ArrowRight, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';

export default function Services() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const steps = [
        {
            step: "01",
            title: "Connect",
            description: "Reach out through the contact form or email (info@theblacktiechandeliergala.com) with a brief description of what you’re looking for."
        },
        {
            step: "02",
            title: "Consultation",
            description: "Schedule an introductory call or meeting to discuss your goals, budget, and timeline."
        },
        {
            step: "03",
            title: "Custom Proposal",
            description: "Bea will outline a personalized plan of services tailored to your needs."
        },
        {
            step: "04",
            title: "Design & Experience",
            description: "Together, you’ll move forward to bring your space, style, or event to life."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-cream overflow-hidden">
                <div className="container-luxury px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-black mb-6 leading-tight">
                            Services by<br />Dr. Bea Foster, Ph.D.
                        </h1>
                        <div className="w-24 h-px bg-gold mx-auto mb-8" />
                        <p className="text-lg md:text-xl text-charcoal leading-relaxed font-light">
                            Dr. Bea Foster, Ph.D. offers a curated blend of interior design, fashion, mentoring, and educational experiences.
                            From transforming spaces to preparing clients for the runway of life, every service is delivered with Bea’s signature mix of elegance, warmth, and excellence.
                        </p>
                    </motion.div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            </section>

            {/* Section 1: Interior Design */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container-luxury px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="order-2 lg:order-1"
                        >
                            <div className="flex items-center gap-3 mb-4 text-gold">
                                <Sofa className="w-6 h-6" />
                                <span className="uppercase tracking-widest text-sm font-medium">Interiors</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif text-black mb-6">Interior Design & Styling</h2>
                            <p className="text-charcoal text-lg mb-6 leading-relaxed">
                                With more than 40 years of experience, Dr. Bea creates spaces that are beautiful, comfortable, and deeply personal.
                                From full-home makeovers to simple refreshes, Bea’s design approach blends luxury, functionality, and global inspiration.
                            </p>

                            <div className="mb-8">
                                <h3 className="font-serif text-xl mb-4 text-black">Services May Include:</h3>
                                <ul className="grid grid-cols-1 gap-3">
                                    {[
                                        "Full-room and whole-home design",
                                        "Color consultations and finish selections",
                                        "Custom window treatments and “swags”",
                                        "Furniture and accessory selection",
                                        "Space planning and layout",
                                        "Styling for photo shoots, events, or staging"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-charcoal/80">
                                            <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-cream/50 p-6 mb-8 rounded-lg border border-beige">
                                <h4 className="font-serif text-lg mb-2 text-black">Who This Is For:</h4>
                                <p className="text-charcoal/90">Homeowners, professionals, and businesses who want a polished, welcoming space that reflects who they are.</p>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-gold hover:text-black transition-colors uppercase tracking-wider text-sm font-medium"
                            >
                                Request a Design Consultation
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 relative h-[500px] lg:h-[600px] bg-beige overflow-hidden"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                                alt="Interior Design"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: Fashion Styling */}
            <section className="py-16 md:py-24 bg-cream">
                <div className="container-luxury px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[500px] lg:h-[600px] bg-charcoal overflow-hidden"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                                alt="Fashion Styling"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                        >
                            <div className="flex items-center gap-3 mb-4 text-gold">
                                <Shirt className="w-6 h-6" />
                                <span className="uppercase tracking-widest text-sm font-medium">Style</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif text-black mb-6">Fashion, Styling & Personal Image</h2>
                            <p className="text-charcoal text-lg mb-6 leading-relaxed">
                                Bea’s background in fashion and modeling allows her to help clients refine their personal style—from everyday elegance to special-event looks.
                            </p>

                            <div className="mb-8">
                                <h3 className="font-serif text-xl mb-4 text-black">Services May Include:</h3>
                                <ul className="grid grid-cols-1 gap-3">
                                    {[
                                        "Wardrobe review and refresh",
                                        "Outfit coordination for special events",
                                        "Style concepts for photoshoots and media",
                                        "Guidance on color, fit, and silhouette",
                                        "Confidence coaching for how to “wear” the look"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-charcoal/80">
                                            <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-6 mb-8 rounded-lg border border-beige">
                                <h4 className="font-serif text-lg mb-2 text-black">Who This Is For:</h4>
                                <p className="text-charcoal/90">Women and men who want to feel more confident, polished, and camera-ready, at any age.</p>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors uppercase tracking-wider text-sm font-medium"
                            >
                                Book a Style Session
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 3: Honey Bea Academy */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container-luxury px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                            className="order-2 lg:order-1"
                        >
                            <div className="flex items-center gap-3 mb-4 text-gold">
                                <GraduationCap className="w-6 h-6" />
                                <span className="uppercase tracking-widest text-sm font-medium">Education</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif text-black mb-6">Honey Bea Academy</h2>
                            <p className="text-charcoal text-lg mb-6 leading-relaxed">
                                Honey Bea Academy offers classes that build confidence from the inside out, blending etiquette, presentation, modeling, and life skills.
                            </p>

                            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-serif text-xl mb-4 text-black border-b border-gold/30 pb-2">Class Topics</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Modeling basics & runway presence",
                                            "Poise, posture & presentation",
                                            "Etiquette & social graces",
                                            "Confidence-building & self-worth",
                                            "Introduction to design & creativity"
                                        ].map((item, i) => (
                                            <li key={i} className="text-sm text-charcoal/80 flex items-start gap-2">
                                                <span className="text-gold mt-1">•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl mb-4 text-black border-b border-gold/30 pb-2">Format Options</h3>
                                    <ul className="space-y-3">
                                        <li className="text-sm text-charcoal/80">Small group workshops</li>
                                        <li className="text-sm text-charcoal/80">Special masterclasses</li>
                                        <li className="text-sm text-charcoal/80">Private or semi-private sessions available</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-cream/50 p-6 mb-8 rounded-lg border border-beige">
                                <h4 className="font-serif text-lg mb-2 text-black">Who This Is For:</h4>
                                <p className="text-charcoal/90">Young students, adults, and mature women and men who want to grow in confidence, refinement, and presence.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/events"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-black hover:bg-black hover:text-white transition-colors uppercase tracking-wider text-sm font-medium"
                                >
                                    View Upcoming Classes
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition-colors uppercase tracking-wider text-sm font-medium"
                                >
                                    Join Interest List
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 relative h-[500px] lg:h-[600px] bg-beige overflow-hidden"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                                alt="Honey Bea Academy"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 4: Speaking & Collaborations */}
            <section className="py-16 md:py-24 bg-charcoal text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1475721027767-pdpd4d5m5244?w=1600&q=80"
                        alt="Speaking Background"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container-luxury px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <Mic className="w-12 h-12 text-gold mx-auto mb-6" />
                        <h2 className="text-3xl md:text-5xl font-serif mb-6">Speaking, Events & Collaborations</h2>
                        <p className="text-xl text-white/80 leading-relaxed mb-12">
                            Drawing from her journey as a designer, widow, mother, grandmother, great-grandmother, and Ph.D.,
                            Dr. Bea is a powerful, gracious speaker who inspires audiences with real stories and valuable, practical wisdom.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
                            <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-gold/30 transition-colors">
                                <h3 className="font-serif text-2xl mb-4 text-gold">Topics May Include</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Thriving through life’s challenges",
                                        "Reinventing yourself at any age",
                                        "Beauty, style, and self-worth",
                                        "Creativity, entrepreneurship, and legacy",
                                        "Community, service, and giving back"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/80">
                                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-gold/30 transition-colors">
                                <h3 className="font-serif text-2xl mb-4 text-gold">Event Types</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Luncheons and galas",
                                        "Women’s conferences",
                                        "Community and nonprofit events",
                                        "Panels and interviews",
                                        "Private group gatherings"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/80">
                                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-10 py-5 bg-gold text-black hover:bg-white transition-colors uppercase tracking-wider font-medium"
                        >
                            Inquire About Booking Dr. Bea
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Section 5: Process / How it Works */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container-luxury px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-black mb-6">How to Get Started</h2>
                        <div className="w-24 h-px bg-gold mx-auto mb-6" />
                        <p className="text-charcoal max-w-2xl mx-auto text-lg">
                            Every client and project is unique. Bea begins with a conversation to understand your needs, your story, and your vision.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative p-6 pt-12 border-t border-gold/30 hover:border-gold transition-colors group"
                            >
                                <span className="absolute -top-5 left-0 text-4xl font-serif text-gold bg-white pr-4">
                                    {step.step}
                                </span>
                                <h3 className="text-xl font-serif text-black mb-4 group-hover:text-gold transition-colors">{step.title}</h3>
                                <p className="text-charcoal/80 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-gold hover:text-black transition-colors uppercase tracking-wider text-sm font-medium"
                        >
                            Start Your Journey
                            <MessageCircle className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
