'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    { id: 21, src: '/Pictures 4/1 (1).JPG', alt: 'Gallery' },
    { id: 22, src: '/Pictures 4/446A6890.jpeg', alt: 'Gallery' },
    { id: 23, src: '/Pictures 4/446A6891.jpeg', alt: 'Gallery' },
    { id: 24, src: '/Pictures 4/AboutBea.jpg', alt: 'Gallery' },
    { id: 25, src: '/Pictures 4/DSC03011.JPG', alt: 'Gallery' },
    { id: 26, src: '/Pictures 4/DSC03109.jpeg', alt: 'Gallery' },
    { id: 27, src: '/Pictures 4/DSCN4236 2.JPG', alt: 'Gallery' },
    { id: 28, src: '/Pictures 4/IMG_0278.jpg', alt: 'Gallery' },
    { id: 29, src: '/Pictures 4/IMG_9074.jpeg', alt: 'Gallery' },
    { id: 30, src: '/Pictures 4/unnamed (1).jpg', alt: 'Gallery' },
    { id: 31, src: '/Pictures 4/unnamed (2).jpg', alt: 'Gallery' },
    { id: 32, src: '/Pictures 4/unnamed (3).jpg', alt: 'Gallery' },
    { id: 33, src: '/Pictures 4/unnamed.jpg', alt: 'Gallery' },
    { id: 34, src: '/Pictures 4/1c9efc6f-2736-4eba-b321-fdbcf3672060.png', alt: 'Gallery' },
    { id: 35, src: '/Pictures 4/2f525a5e-e604-4dee-ab04-f3c4f293b6c3.png', alt: 'Gallery' },
    { id: 36, src: '/Pictures 4/3f0a888e-6b2b-448e-9b97-5080da9009c1-md.jpeg', alt: 'Gallery' },
    { id: 37, src: '/Pictures 4/3fbc8361-ed77-423b-905d-4a2f2d6cfc9a-md.jpeg', alt: 'Gallery' },
    { id: 38, src: '/Pictures 4/6e254cd3-6a21-40d4-82ec-e82977c29576-md.jpeg', alt: 'Gallery' },
    { id: 39, src: '/Pictures 4/9a8fdfa2-5039-4376-95e0-226c83d76363-2.png', alt: 'Gallery' },
    { id: 40, src: '/Pictures 4/73df44dc-2ea3-4c2d-b08d-438f0197aee2 (1)large.png', alt: 'Gallery' },
    { id: 41, src: '/Pictures 4/73df44dc-2ea3-4c2d-b08d-438f0197aee2 (2.png', alt: 'Gallery' },
    { id: 42, src: '/Pictures 4/745ad40d-218f-4f18-822b-540c2403c82a.png', alt: 'Gallery' },
    { id: 43, src: '/Pictures 4/65740269-c72d-4c12-90ff-0e16ca2e7cca (1).png', alt: 'Gallery' },
    { id: 44, src: '/Pictures 4/a645e6a3-cb6b-4241-af1e-1ce45020b32a-md.jpeg', alt: 'Gallery' },
    { id: 45, src: '/Pictures 4/a34456ca-2a56-4d47-b690-361e3c8edd62-md.jpeg', alt: 'Gallery' },
    { id: 46, src: '/Pictures 4/abcda976-5ffc-4d9d-af7b-ac5413bb9fd4-md.jpeg', alt: 'Gallery' },
    { id: 47, src: '/Pictures 4/abe6f215-2c9a-43d0-b9eb-bd1ed027b034-md.jpeg', alt: 'Gallery' },
    { id: 48, src: '/Pictures 4/all-over-print-unisex-wide-leg-pants-white-back-697a7227bb3cb.png', alt: 'Gallery' },
    { id: 49, src: '/Pictures 4/BFStudio-32.jpg', alt: 'Gallery' },
    { id: 50, src: '/Pictures 4/c07bc67d-3020-40d7-a99e-20f585fd310c.png', alt: 'Gallery' },
    { id: 51, src: '/Pictures 4/c36a9712-3992-4c58-9f9b-7113f72790ec-md.jpeg', alt: 'Gallery' },
    { id: 52, src: '/Pictures 4/c2666639-23cd-4deb-a96f-21e37120811c-3.png', alt: 'Gallery' },
    { id: 53, src: '/Pictures 4/cc87a60b-1e1b-482b-9e14-63f6a4fdc6a7-md.jpeg', alt: 'Gallery' },
    { id: 54, src: '/Pictures 4/ChatGPT Image Feb 19, 2026, 08_56_52 PM.png', alt: 'Gallery' },
  ];

  const filteredImages = galleryImages;

  const openLightbox = (id: number) => {
    setSelectedImage(id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const currentImage = selectedImage !== null
    ? galleryImages.find(img => img.id === selectedImage)
    : null;

  const currentIndex = selectedImage !== null
    ? filteredImages.findIndex(img => img.id === selectedImage)
    : -1;

  const nextImage = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1].id);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1].id);
    }
  };

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
                  Visual Portfolio
                </span>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-black mb-4 sm:mb-6 leading-tight">
                Gallery
              </h1>
              <div className="w-20 sm:w-24 h-px bg-gold mx-auto mb-4 sm:mb-6" />
              <p className="text-base sm:text-lg md:text-xl text-charcoal leading-relaxed px-2">
                A curated collection of our finest work across fashion, interiors, events, and editorial
              </p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Gallery Grid */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-white">
        <div className="container-luxury px-4 sm:px-0">
          <motion.div
            layout
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group relative break-inside-avoid overflow-hidden bg-charcoal cursor-pointer w-full inline-block mb-4"
                onClick={() => openLightbox(image.id)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-7xl w-full h-full max-h-[95vh] sm:max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>

            {/* Navigation Buttons */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <span className="text-white text-lg sm:text-xl">‹</span>
              </button>
            )}

            {currentIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <span className="text-white text-lg sm:text-xl">›</span>
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-full max-h-[75vh] sm:max-h-[80vh] max-w-6xl">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6 md:p-8 text-center">
                <p className="text-white/60 text-xs sm:text-sm">
                  {currentIndex + 1} of {filteredImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

