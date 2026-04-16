'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag, Filter } from 'lucide-react';

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'interiors', name: 'Interiors' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'design', name: 'Design' },
    { id: 'gala', name: 'Gala' },
  ];

  const featuredPost = {
    id: 1,
    title: 'The Art of Minimalist Luxury: Redefining Elegance in Modern Design',
    excerpt: 'Discover how minimalist principles can elevate luxury design, creating spaces and wardrobes that speak volumes through restraint and intentionality. From curated capsule wardrobes to serene interiors that breathe, learn how less can truly mean more when every element is chosen with purpose and refined aesthetic vision.',
    author: 'The Black Tie Chandelier Gala',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
    featured: true,
  };

  const blogPosts = [
    {
      id: 2,
      title: 'Spring 2024 Fashion Trends: What to Expect',
      excerpt: 'A comprehensive guide to the upcoming spring fashion trends, from color palettes to silhouettes that will define the season. We explore flowing fabrics, soft neutrals, and statement accessories that will help you step into spring with confidence and elegance.',
      author: 'The Black Tie Chandelier Gala',
      date: 'March 10, 2024',
      readTime: '5 min read',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      featured: false,
    },
    {
      id: 3,
      title: 'Transforming Small Spaces: Interior Design Secrets',
      excerpt: 'Learn how to maximize style and functionality in compact living spaces with these expert interior design techniques. Discover clever storage solutions, strategic lighting, and multi-functional furniture that transform cramped rooms into sophisticated sanctuaries.',
      author: 'The Black Tie Chandelier Gala',
      date: 'March 5, 2024',
      readTime: '6 min read',
      category: 'interiors',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      featured: false,
    },
    {
      id: 4,
      title: 'The Psychology of Color in Luxury Design',
      excerpt: 'Explore how color choices impact mood, perception, and the overall luxury experience in both fashion and interior design. From the calming influence of soft blues to the power of deep blacks, understand the emotional language of color in high-end aesthetics.',
      author: 'The Black Tie Chandelier Gala',
      date: 'February 28, 2024',
      readTime: '7 min read',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      featured: false,
    },
    {
      id: 5,
      title: 'Sustainable Luxury: The Future of Fashion',
      excerpt: 'How the luxury fashion industry is embracing sustainability without compromising on elegance and quality. Discover ethical sourcing, timeless designs that last decades, and brands leading the way toward a more conscious approach to luxury.',
      author: 'The Black Tie Chandelier Gala',
      date: 'February 20, 2024',
      readTime: '9 min read',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      featured: false,
    },
    {
      id: 6,
      title: 'Creating Your Dream Home: A Step-by-Step Guide',
      excerpt: 'From concept to completion, discover the essential steps to creating a home that reflects your personal style and luxury aspirations. We walk through consultation, mood boards, material selection, and the finishing touches that make a space truly yours.',
      author: 'The Black Tie Chandelier Gala',
      date: 'February 15, 2024',
      readTime: '10 min read',
      category: 'interiors',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      featured: false,
    },
    {
      id: 7,
      title: 'The Art of Entertaining: Hosting with Style',
      excerpt: 'Master the art of hosting elegant gatherings with tips on table settings, ambiance, and creating memorable experiences. From intimate dinners to grand celebrations, learn how to welcome guests with grace and leave them feeling cherished.',
      author: 'The Black Tie Chandelier Gala',
      date: 'February 10, 2024',
      readTime: '6 min read',
      category: 'lifestyle',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      featured: false,
    },
    {
      id: 8,
      title: 'Couture vs. Ready-to-Wear: Understanding the Difference',
      excerpt: 'Dive deep into the world of haute couture and understand what sets it apart from ready-to-wear fashion. From hand-sewn craftsmanship to bespoke fittings, discover why couture represents the pinnacle of sartorial excellence.',
      author: 'The Black Tie Chandelier Gala',
      date: 'February 5, 2024',
      readTime: '8 min read',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
      featured: false,
    },
    {
      id: 9,
      title: 'Maximalist Interiors: When More is More',
      excerpt: 'Explore the bold world of maximalist interior design and learn how to create rich, layered spaces with confidence. Layer patterns, mix textures, and embrace bold colors to create interiors that tell your unique story.',
      author: 'The Black Tie Chandelier Gala',
      date: 'January 30, 2024',
      readTime: '7 min read',
      category: 'interiors',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      featured: false,
    },
    {
      id: 10,
      title: 'Building a Timeless Wardrobe: Investment Pieces',
      excerpt: 'Learn which pieces deserve investment and how to build a wardrobe that transcends trends and seasons. From the perfect blazer to quality leather accessories, discover the foundations of a closet that works for years.',
      author: 'The Black Tie Chandelier Gala',
      date: 'January 25, 2024',
      readTime: '5 min read',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      featured: false,
    },
    // Gala - 2 new
    {
      id: 11,
      title: 'The Black Tie Chandelier Gala: A Night of Elegance and Purpose',
      excerpt: 'Behind the scenes of our signature gala event—where fashion, philanthropy, and community come together. Learn about our mission to honor loved ones, support cancer research, and create unforgettable experiences that elevate and inspire.',
      author: 'The Black Tie Chandelier Gala',
      date: 'January 20, 2024',
      readTime: '6 min read',
      category: 'gala',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
      featured: false,
    },
    {
      id: 12,
      title: 'What to Wear: Your Black Tie Gala Style Guide',
      excerpt: 'From floor-length gowns to tailored tuxedos, master the art of black-tie dressing for our annual gala. Discover color choices, fabric considerations, and accessories that ensure you look and feel your absolute best on this special night.',
      author: 'The Black Tie Chandelier Gala',
      date: 'January 15, 2024',
      readTime: '5 min read',
      category: 'gala',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      featured: false,
    },
    // Design - 2 new
    {
      id: 13,
      title: 'Proportion and Balance: The Foundation of Great Design',
      excerpt: 'Whether designing a room or an outfit, proportion and balance are the invisible forces that make everything feel right. Explore how scale, symmetry, and rhythm create harmony in both interiors and fashion.',
      author: 'The Black Tie Chandelier Gala',
      date: 'January 10, 2024',
      readTime: '7 min read',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      featured: false,
    },
    {
      id: 14,
      title: 'Textures in Luxury: From Velvet to Silk',
      excerpt: 'Texture adds depth and tactile pleasure to any design. Discover how to layer fabrics, mix materials, and create sensory richness in your wardrobe and home. Velvet, silk, cashmere, and linen—each tells a different story.',
      author: 'The Black Tie Chandelier Gala',
      date: 'January 5, 2024',
      readTime: '6 min read',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
      featured: false,
    },
    // Fashion - 2 new
    {
      id: 15,
      title: 'Accessorizing for Impact: The Finishing Touches',
      excerpt: 'The right accessories can elevate any outfit from good to unforgettable. Explore statement jewelry, elegant scarves, and handbag choices that complement your personal style and complete your look with intention.',
      author: 'The Black Tie Chandelier Gala',
      date: 'December 28, 2023',
      readTime: '5 min read',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=800&q=80',
      featured: false,
    },
    {
      id: 16,
      title: 'Dressing for Your Body: Flattering Silhouettes',
      excerpt: 'Learn how to choose silhouettes that celebrate your unique shape. From A-line to tailored fits, discover the cuts and styles that flatter and empower, helping you feel confident in every occasion.',
      author: 'The Black Tie Chandelier Gala',
      date: 'December 22, 2023',
      readTime: '6 min read',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
      featured: false,
    },
    // Interiors - 2 new
    {
      id: 17,
      title: 'Lighting Your Space: Ambient, Task, and Accent',
      excerpt: 'Lighting transforms a room more than any other single element. Master the three layers—ambient, task, and accent—to create atmospheres that are both functional and breathtaking. From chandeliers to sconces.',
      author: 'The Black Tie Chandelier Gala',
      date: 'December 18, 2023',
      readTime: '7 min read',
      category: 'interiors',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
      featured: false,
    },
    {
      id: 18,
      title: 'Window Treatments: Drapery That Dazzles',
      excerpt: 'Often called "the Queen of Swags," Dr. Bea shares her expertise on window treatments. From custom drapery to roman shades, learn how the right window dressing can frame your views and elevate any room.',
      author: 'The Black Tie Chandelier Gala',
      date: 'December 12, 2023',
      readTime: '8 min read',
      category: 'interiors',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
      featured: false,
    },
    // Lifestyle - 2 new
    {
      id: 19,
      title: 'Morning Rituals: Starting Your Day with Intention',
      excerpt: 'How you begin your day sets the tone for everything that follows. Discover simple rituals—from skincare to a curated morning soundtrack—that help you step into each day with grace and purpose.',
      author: 'The Black Tie Chandelier Gala',
      date: 'December 8, 2023',
      readTime: '5 min read',
      category: 'lifestyle',
      image: 'https://images.unsplash.com/photo-1490814525860-594e82bfd34b?w=800&q=80',
      featured: false,
    },
    {
      id: 20,
      title: 'Gift-Giving with Heart: Thoughtful Luxury',
      excerpt: 'The art of giving goes beyond the price tag. Learn how to choose gifts that reflect thoughtfulness, align with the recipient\'s style, and create lasting memories. From hostess gifts to milestone celebrations.',
      author: 'The Black Tie Chandelier Gala',
      date: 'December 2, 2023',
      readTime: '6 min read',
      category: 'lifestyle',
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
      featured: false,
    },
  ];

  const allPosts = [featuredPost, ...blogPosts];
  const filteredPosts = selectedCategory === 'all' 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] overflow-hidden bg-cream">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-beige to-cream" />
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative h-full flex items-center py-8 sm:py-12 md:py-16 lg:py-24">
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
                  Editorial & Insights
                </span>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-black mb-4 sm:mb-6 leading-tight">
                Blogs
              </h1>
              <div className="w-20 sm:w-24 h-px bg-gold mx-auto mb-4 sm:mb-6" />
              <p className="text-base sm:text-lg md:text-xl text-charcoal leading-relaxed px-2">
                Discover insights, trends, and inspiration from the world of luxury fashion, interior design, and lifestyle
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-white border-b border-beige sticky top-20 z-40 backdrop-blur-sm bg-white/95">
        <div className="container-luxury">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-4 flex-wrap px-4">
            <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-charcoal flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm uppercase tracking-wider transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-cream text-charcoal hover:bg-beige hover:text-black'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === 'all' && (
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container-luxury px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black mb-2 sm:mb-4">
                Featured Article
              </h2>
              <div className="w-16 sm:w-20 h-px bg-gold" />
            </motion.div>

            <Link href={`/blogs/${featuredPost.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 bg-cream border border-beige hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden order-2 lg:order-1">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm uppercase tracking-wider">
                      Featured
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 md:p-12 order-1 lg:order-2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-charcoal flex-wrap">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                        <span className="uppercase">{featuredPost.category}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black mb-3 sm:mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-charcoal mb-4 sm:mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-black group-hover:text-gold transition-colors">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-cream">
        <div className="container-luxury px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black mb-2 sm:mb-4">
              {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
            </h2>
            <div className="w-16 sm:w-20 h-px bg-gold" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts
              .filter(post => !post.featured || selectedCategory !== 'all')
              .map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/blogs/${post.id}`}>
                    <div className="bg-white border border-beige hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {post.featured && (
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/80 text-white px-3 py-1 sm:px-4 sm:py-1.5 text-xs uppercase tracking-wider">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 text-xs sm:text-sm text-charcoal flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-gold" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-gold" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 bg-cream text-xs uppercase tracking-wider text-charcoal">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif text-black mb-3 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-sm sm:text-base text-charcoal mb-4 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-black group-hover:text-gold transition-colors mt-auto">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

