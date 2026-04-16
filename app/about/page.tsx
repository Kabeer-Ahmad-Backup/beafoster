'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Award, Heart, Lightbulb, BookOpen, Sparkles } from 'lucide-react';

export default function About() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const mediaLogos = [
    { name: 'VOGUE' },
    { name: 'ELLE' },
    { name: 'HARPER\'S BAZAAR' },
    { name: 'AD' },
  ];

  return (
    <div>
      {/* Hero Section - About Dr. Bea */}
      <section className="min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center bg-cream relative overflow-hidden py-12 sm:py-16 md:py-24">
        <div className="container-luxury w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            {/* Left: Image */}
            <motion.div
              style={{ y }}
              className="relative w-full order-2 lg:order-1"
            >
              <div className="relative w-full">
                <Image
                  src="/Pictures 4/AboutBea.jpg"
                  alt="Dr. Bea Foster"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -inset-2 md:-inset-4 border-2 border-gold/30 opacity-50 pointer-events-none" />
            </motion.div>

            {/* Right: Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4 md:mb-6 leading-tight !text-black transition-none">
                  About Dr. Bea Foster, Ph.D.
                </h1>
                <div className="w-20 h-px bg-gold mb-6 md:mb-8" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 md:space-y-6 text-base md:text-lg text-charcoal leading-relaxed"
              >
                <p>
                  Bea Foster, Ph.D., is a widely respected designer whose name has become synonymous with fashion, beauty, and interior design. For more than 50 years, her dedication, hard work, and distinctive vision have made her one of the most sought-after designers in Columbus, Ohio and beyond.
                </p>
                <p>
                  In 2000, Bea opened her first design studio in Columbus. Alongside her talented design team, she specialized in custom window treatments, accessories, and original art—featuring exclusive pieces by one of her favorite American artists, Mrs. Mary Ann Anderson. Her exquisite drapery work earned her the affectionate title “The Queen of Swags.”
                </p>
                <p>
                  Never one to limit her creativity, Bea expanded into fashion with a specialty line of men’s and women’s wear, all personally designed by her. She also shares her expertise by teaching sewing, design, and modeling to both adults and young students. After her dynamic involvement with the legendary Ebony Fashion Shows, Bea was appointed by Mayor Michael B. Coleman to the board of the Columbus Historical Society, where she served from 2008 to 2011.
                </p>
                <p>
                  Her work and influence have been featured in numerous media outlets, including The Columbus Dispatch, Columbus Monthly, and Buckeye Lifestyle Magazine. In 2019, she graced the cover of The Columbus Dispatch—a moment of recognition that moved her to tears. In 2025, she was honored as Model of the Year by the Columbus Fashion Council and her loving fans.
                </p>
                <p>
                  Bea also ventured into the beauty and lifestyle world with the launch of <strong>Honey Bea</strong>, a luxurious body-care and pampering line for both men and women. Honey Bea has since expanded to include travel bags and personalized athletic wear in her signature black-and-white palette. Inspired by the brand’s success, her son introduced the complementary line <strong>B. Sporty</strong>, which will be formally launched for the New Year 2026.
                </p>
                <p>
                  A prolific author, her memoir <em>Designing In The Dark</em> was published in 2019, followed by <em>Bea And Beauty</em> in 2020. She is currently writing her third book, <em>Thriving Beyond The Darkness</em>—a second look at life, strength, and never giving up.
                </p>
                <p>
                  Deeply committed to her community, Bea is active in civic and professional organizations and chairs several women’s civic groups. Bilingual in English and Greek (mastered during her travels to Athens and Mykonos in 1960), she blends global perspective with local impact.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* From the Heart Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-serif text-black mb-6 !text-black transition-none">From the Heart of Dr. Bea</h2>
            <div className="w-24 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="space-y-6 text-lg text-charcoal leading-relaxed text-center">
            <p>
              I truly love what I do. Giving back warms my heart and brings me great joy. My deepest desire is to strengthen the weak, to help them stand taller, walk in confidence, and become stronger.
            </p>
            <p>
              The Black Tie Chandelier is more than an elegant event—it is a building platform I will use to help others grow. Through my online courses and programs, I want to change lives for the better, both inside and out.
            </p>
            <p>
              After losing two precious granddaughters to cancer, I knew I had to find a way to keep their memory alive and to be part of the change that leads to healing and, one day, a cure. On the wings of those two little butterflies we lost, I continue to move forward—creating spaces, experiences, and opportunities that help others feel good about themselves, rediscover their beauty, and believe in their future.
            </p>

            <blockquote className="border-t border-b border-gold/20 py-8 my-8 font-serif italic text-2xl text-black">
              “The sky is the limit—all you have to do is reach for it.<br />
              Your path has been cleared, the mountains have been moved,<br />
              the door has been opened.<br />
              All you have to do is walk through with a smile, grace, elegance, and determination.”
            </blockquote>

            <p>
              If you are ready to grow, we are here for you—to direct you, guide you, inspire you, and encourage you in every way to become the person you truly want to BEA.
            </p>

            <div className="bg-cream p-8 mt-8 border border-gold/30">
              <h3 className="font-serif text-2xl mb-6">We want you to BEA:</h3>
              <ul className="space-y-3 font-medium uppercase tracking-wider text-sm sm:text-base">
                <li>BEA beautiful</li>
                <li>BEA adventurous</li>
                <li>BEA abundant and blessed</li>
                <li>BEA brave enough to never give up or give in</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meet My Right Hand Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-beige relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container-luxury max-w-5xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black mb-6">Meet My Right Hand</h2>
              <div className="w-20 h-px bg-gold mb-6" />
              <h3 className="text-2xl font-serif text-black mb-4 !text-black transition-none">Dr. Mellinda DePriest</h3>
              <div className="space-y-4 text-base md:text-lg lg:text-xl text-charcoal leading-relaxed">
                <p>
                  Dr. Mellinda DePriest is my trusted assistant and right hand. With a joyful spirit and a heart for people, she helps keep every detail moving in the right direction—from projects and planning to communication and follow-through.
                </p>
                <p>
                  Working alongside me between Arizona and Ohio, Dr. Mellinda supports the vision behind The Black Tie Chandelier, our online courses, and our community outreach. She is often the friendly voice and smiling face that greets our guests, answers questions, and makes sure everyone feels welcomed, seen, and supported.
                </p>
                <p>
                  Her calm strength, warm laughter, and genuine care for others make her an essential part of everything we do.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              <div className="absolute -inset-2 md:-inset-4 border-2 border-gold/30 opacity-50 pointer-events-none z-0" />
              <div className="relative w-full z-10">
                <Image
                  src="/melinda_priest.jpeg"
                  alt="Dr. Mellinda DePriest"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* As Seen In Section */}
      <section className="pt-16 md:pt-24 lg:pt-32 pb-0 bg-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-4">
              Legacy & Recognition
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-4 md:mb-6" />
            <p className="text-base md:text-lg text-charcoal max-w-2xl mx-auto px-4">
              Celebrating over 50 years of excellence in fashion, design, and service
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            {mediaLogos.map((media, index) => (
              <motion.div
                key={media.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center justify-center p-4 sm:p-6 md:p-8 bg-cream/50 rounded-lg border border-beige/50 hover:border-gold/30 hover:bg-cream transition-all duration-300 group cursor-pointer min-h-[80px] sm:min-h-[100px]"
              >
                <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-charcoal group-hover:text-gold transition-colors duration-300 text-center leading-tight">
                  {media.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
