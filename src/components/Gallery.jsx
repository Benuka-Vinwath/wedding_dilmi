import React from 'react';

export default function Gallery() {
  const images = [
    { src: '/iwoshani/1.jpg', alt: 'Couple Moment 1', height: 'h-96' },
    { src: '/iwoshani/2.jpg', alt: 'Couple Moment 2', height: 'h-64' },
    { src: '/iwoshani/3.jpg', alt: 'Couple Moment 3', height: 'h-80' },
    { src: '/iwoshani/4.jpg', alt: 'Couple Moment 4', height: 'h-72' },
    { src: '/iwoshani/5.jpg', alt: 'Couple Moment 5', height: 'h-56' },
    { src: '/iwoshani/6.jpg', alt: 'Couple Moment 6', height: 'h-96' },
  ];

  return (
    <section id="gallery" className="w-full py-24 bg-white reveal">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Title */}
        <div className="flex flex-col items-center space-y-4 text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-800 tracking-wide">Moments Before Forever</h2>
          <div className="w-32 h-[2px] bg-[#7B5B29] rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl font-serif italic">
            Captured memories of the smiles, dreams, and magic leading up to our big day.
          </p>
        </div>

        {/* Masonry Columns Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 max-w-7xl mx-auto space-y-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 break-inside-avoid group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${img.height}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs font-serif tracking-widest uppercase">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
