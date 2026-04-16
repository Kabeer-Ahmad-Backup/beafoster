'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { getPostById } from '@/lib/blogData';

export default function BlogPost() {
  const params = useParams();
  const post = getPostById(params.id as string);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
        <h1 className="text-2xl font-serif text-black mb-4">Post not found</h1>
        <Link href="/blogs" className="text-gold hover:underline">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden bg-charcoal">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 text-white">
          <div className="container-luxury">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 sm:mb-6 text-sm uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 text-xs sm:text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="uppercase">{post.category}</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container-luxury max-w-3xl mx-auto px-4 sm:px-0">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-lg sm:text-xl text-charcoal leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>

            <div className="space-y-6 text-base sm:text-lg text-charcoal leading-relaxed">
              {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-beige">
              <p className="text-sm uppercase tracking-wider text-charcoal/70">
                By {post.author}
              </p>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium hover:bg-charcoal transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Blogs
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
