import React, { useState, useEffect, useRef } from 'react';
import Cover from './components/Cover';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);

  // Auto-play audio when the welcome cover is dismissed
  const handlePlayMusic = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio play blocked by browser policy:", err));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Play failed:", err));
    }
  };

  // Scroll reveal observer (runs after cover is dismissed)
  useEffect(() => {
    if (!hasStarted) return;

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const timer = requestAnimationFrame(() => {
      revealElements.forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(timer);
      observer.disconnect();
    };
  }, [hasStarted]);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-serif select-none">
      {/* Background Audio */}
      <audio ref={audioRef} loop src="/dilmi/music.mp3" />

      {/* Elegant Invitation Cover Overlay */}
      <Cover onViewInvitation={handlePlayMusic} />

      {/* Main Content (Fades in when cover dismissed) */}
      <div
        className={`transition-opacity duration-1000 ease-out ${
          hasStarted ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none fixed inset-0 overflow-hidden'
        }`}
      >
        
        {/* Floating Ambient Items (Crowns, Hearts, Sparkles) */}
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-20 left-10 text-rose-200 opacity-30 animate-pulse-heart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div className="absolute top-40 right-20 text-rose-200 opacity-20 animate-float-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            </svg>
          </div>
          <div className="absolute bottom-40 left-20 text-rose-200 opacity-25 animate-pulse-heart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
            </svg>
          </div>
          <div className="absolute bottom-60 right-10 text-rose-200 opacity-30 animate-float-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
            </svg>
          </div>
        </div>

        {/* Floating Sound Toggle Button */}
        {hasStarted && (
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gray-900 text-white shadow-xl hover:bg-gray-700 active:scale-95 transition-all duration-300"
            aria-label="Play music"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 animate-spin" style={{ animationDuration: '4s' }}>
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 opacity-60">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
                <line x1="3" y1="21" x2="21" y2="3" strokeWidth="2" />
              </svg>
            )}
          </button>
        )}

        {/* Navigation Bar */}
        <header className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 z-20">
          <div className="relative z-20 flex items-center justify-center py-2">
            <div className="hidden md:flex justify-center space-x-8 text-sm font-sans tracking-[0.2em] text-[#7B5B29] font-medium">
              <button onClick={() => scrollToSection('details')} className="hover:text-[#B5A36A] transition-colors uppercase">Details</button>
              <button onClick={() => scrollToSection('rsvp')} className="hover:text-[#B5A36A] transition-colors uppercase">RSVP</button>
          
            </div>
            {/* Mobile menu toggle */}
            <div className="flex justify-end md:hidden w-full text-[#7B5B29] px-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-white/20 backdrop-blur-md rounded-full shadow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                  {mobileMenuOpen ? (
                    <line x1="18" y1="6" x2="6" y2="18" />
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-col space-y-3 items-center text-sm font-sans tracking-widest text-[#7B5B29] z-30 relative uppercase">
              <button onClick={() => scrollToSection('details')} className="py-2 hover:text-[#B5A36A] w-full text-center">Details</button>
              <button onClick={() => scrollToSection('rsvp')} className="py-2 hover:text-[#B5A36A] w-full text-center">RSVP</button>
      
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center">
          <div className="absolute inset-0">
            <picture>
              <source media="(min-width: 768px)" srcSet="/dilmi/2.jpg" />
              <img src="/dilmi/1.jpg" alt="Couple background" className="w-full h-full object-cover object-center" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-[#877f74]/15 via-[#877f74]/40 to-[#877f74]/55"></div>
          </div>
          
          <div className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-between items-center px-4 py-20 sm:py-24 md:py-32">
            <div className="flex flex-col items-center gap-6 text-center mt-6 sm:mt-8">
              <div
                className={`inline-flex items-center space-x-2 p-3.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm shadow-inner ${
                  hasStarted ? 'hero-intro-badge' : 'opacity-0'
                }`}
              >
                <span className="text-xs tracking-[0.3em] uppercase font-sans text-white font-medium">
                  We're Getting Married!
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 sm:gap-6 text-center px-2">
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-md leading-[1.05] font-edwardian ${
                  hasStarted ? 'hero-intro-title' : 'opacity-0'
                }`}
              >
                Dilmi <br />
                <span className="text-3xl sm:text-4xl md:text-5xl">&amp;</span> <br />
                Sadeepa
              </h1>
              <p
                className={`text-base sm:text-lg md:text-2xl font-var(--font-tenorsans) tracking-widest text-white font-light ${
                  hasStarted ? 'hero-intro-date' : 'opacity-0'
                }`}
              >
                Thursday, July 16, 2026
              </p>
            </div>

            <div
              onClick={() => scrollToSection('details')}
              className={`cursor-pointer flex flex-col items-center text-center text-white/95 group transition-transform duration-300 hover:translate-y-1 pb-2 ${
                hasStarted ? 'hero-intro-scroll' : 'opacity-0'
              }`}
            >
              <p className="text-xs font-sans tracking-[0.25em] uppercase mb-1">
                Swipe or scroll down
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 animate-bounce">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </section>

        {/* Countdown */}
        {/* <Countdown /> */}

        {/* The Happy Couple Section */}
        <section className="w-full py-24 bg-white reveal">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-20">
              <h2 className="text-4xl font-serif text-gray-800 tracking-wide">The Happy Couple</h2>
              <div className="w-32 h-[2px] bg-[#B5A36A] rounded-full"></div>
              <p className="text-lg text-gray-500 max-w-2xl font-serif italic">
                One love, two hearts.Here's the bride and groom beginning their lifelong journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center max-w-5xl mx-auto">
              <div className="text-center space-y-2 order-2 md:order-1">
                <h3 className="text-5xl font-edwardian text-[#716156] ">Dilmi Mudalige</h3>
                <p className="text-sm text-gray-500 font-sans tracking-widest uppercase">The Bride</p>
              </div>

              <div className="flex justify-center order-1 md:order-2">
                <div className="relative group">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-[6px] border-[#B5A36A] shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <img src="/dilmi/8.jpg" alt="Happy Couple photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-3 right-6 bg-[#B5A36A] p-2.5 rounded-full shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-white">
                      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                      <path d="M5 21h14" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2 order-3">
                <h3 className="text-5xl font-edwardian text-[#6b6f5e]">Sadeepa Gallage</h3>
                <p className="text-sm text-gray-500 font-sans tracking-widest uppercase">The Groom</p>
              </div>
            </div>
          </div>
        </section>

        {/* Transition Grayscale Banner Section */}
        <section className="relative w-full h-[65vh] overflow-hidden bg-black reveal">
          <div className="w-full h-full">
            <img
              src="/dilmi/2.jpg"
              alt="Couple in love banner"
              className="w-full h-full object-cover grayscale contrast-125 brightness-50 transition-all duration-[1.2s] ease-out hover:grayscale-0 hover:brightness-75 cursor-pointer"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <h2 className="text-white text-7xl md:text-7xl leading-tight font-edwardian italic tracking-wide max-w-7xl drop-shadow-lg">
              "From shared smiles to forever vows"
            </h2>
          </div>
          <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end text-white/40 font-sans text-[10px] tracking-[0.4em] uppercase">
            <div>Est. 2026</div>
            <div>Soulmates</div>
          </div>
        </section>

        {/* Love Story Section */}
        <section id="story" className="w-full py-24 bg-[#F9F9F8] reveal">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-16">
              <h2 className="text-4xl font-serif text-gray-800 tracking-wide">Our Love Story</h2>
              <div className="w-32 h-[2px] bg-[#B5A36A] rounded-full"></div>
              <p className="text-lg text-gray-500 max-w-2xl font-serif italic">
                Every romance has its magic, yet ours hlods our heart. Here's the beginning of our tale.
              </p>
            </div>

            <div className="grid gap-16 lg:grid-cols-2 items-center max-w-6xl mx-auto mt-12">
              <div className="space-y-6">
                <div className="relative pl-6 border-l-[3px] border-[#B5A36A]/30">
                  <div className="flex items-center space-x-2.5 mb-3 text-[#B5A36A]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 fill-[#B5A36A]/10">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <h3 className="text-2xl font-serif text-gray-800 font-medium">Rooted in friendship, blooming in love</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-serif text-base text-justify">
                    Before “I love you,” there was just friendship — simple, honest, full of trust and tiny moments. Then one day our smiles meant more, silence felt safe, and our hearts caught up. Love didn’t replace friendship. It grew from it. Today we’re choosing forever. Join us as we begin our next chapter together
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-[480px] overflow-hidden rounded-3xl shadow-xl border border-gray-100">
                  <img src="/dilmi/5.jpg" alt="Couple's love story photo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-rose-100 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="flex items-center space-x-2 text-[#B5A36A] mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    <span className="font-semibold font-serif text-[#B5A36A]">Our Promise</span>
                  </div>
                  <p className="text-gray-600 italic font-serif text-sm">
                    "From where we began to the vows we keep forever."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wedding Details & Reception Section */}
        <section id="details" className="w-full py-24 bg-white reveal">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center mb-16">
              <h2 className="text-4xl font-serif text-gray-800 tracking-wide">Wedding Details</h2>
              <div className="w-32 h-[2px] bg-[#7B5B29] rounded-full"></div>
              <p className="text-lg text-gray-500 max-w-2xl font-serif italic">
                All the important information you need to celebrate our special day with us.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-1 max-w-4xl mx-auto px-4">
              <div className="relative p-6 sm:p-8 md:p-12 rounded-[32px] sm:rounded-[40px] border-[6px] border-[#7B5B29]/20 shadow-xl flex flex-col items-center text-center overflow-hidden bg-[#F9F6F0] min-h-0 md:min-h-[700px]">
                {/* Vintage overlay */}
                <div className="absolute inset-0 z-0">
                  <img src="/dinendra/Mobile.jpg" alt="Background pattern" className="w-full h-full object-cover opacity-[0.08] mix-blend-multiply" />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center mt-8">
                  <h3 className="text-3xl font-serif tracking-[0.15em] uppercase text-[#7B5B29] font-medium mb-3">
                    Poruwa &amp; Reception
                  </h3>
                  <div className="w-20 h-[1px] bg-[#7B5B29]/60 mb-8"></div>
                </div>

                <div className="relative z-10 space-y-8 text-[#7B5B29] font-serif flex-grow w-full flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <div className="relative w-44 h-52 transition-transform duration-500 hover:rotate-2">
                      <div className="absolute inset-0 bg-[#7B5B29]/5 border border-[#7B5B29]/10 rounded-t-full rotate-[4deg]"></div>
                      <div className="absolute inset-0 bg-white shadow-lg border-4 border-white rounded-t-full flex flex-col overflow-hidden">
                        <div className="flex-grow bg-[#877f74]/5 flex items-center justify-center overflow-hidden">
                          <img src="/anushka/poruwa.jpg" alt="Poruwa Venue" className="w-full h-full object-cover" />
                        </div>
                        <div className="h-10 flex items-center justify-center bg-white font-medium text-xs tracking-wider uppercase">
                          The Ceremony
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 max-w-md">
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-[0.3em] uppercase opacity-75 font-sans font-semibold">Thursday</p>
                      <p className="text-2xl font-semibold tracking-wider">16th July 2026</p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2 text-sm tracking-wide">
                      <p className="border-y border-[#7B5B29]/20 py-2 inline-block px-6">10.00 AM to 3.30 PM</p>
                      <p className="opacity-80 italic">Poruwa ceremony begins at 10.04 AM</p>
                    </div>

                    <div className="flex flex-col items-center space-y-3 pt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-[#7B5B29]">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <div>
                        <p className="text-xl font-medium tracking-wide">Hotel Jetwing Blue, Negambo</p>
                        <p className="text-xs uppercase tracking-widest opacity-75 mt-1 font-sans">Ballroom</p>
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-8 pb-4 w-full flex flex-col items-center">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full text-[11px] font-sans font-semibold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow bg-[#7B5B29] text-[#F9F6F0]"
                    href="https://maps.app.goo.gl/75q5Sofze3GUJBy7A"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>View Location Map</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Event Timeline Component */}
            {/* <Timeline /> */}
          </div>
        </section>

        {/* Gallery Section */}
         {/*<Gallery />*/}

        {/* Romantic Bottom Banner Section */}
        <section className="w-full py-32 relative overflow-hidden reveal">
          <div className="absolute inset-0">
            <img src="/dilmi/1.jpg" alt="Sunset background" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B5B29] via-[#7B5B29]/75 to-[#7B5B29]"></div>
          </div>
          
          <div className="relative z-10 container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-3xl mx-auto text-white space-y-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8 text-[#faf9f6] animate-pulse">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="text-[#faf9f6] text-xl font-serif italic">See You There!</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8 text-[#faf9f6] animate-pulse">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-edwardian leading-tight tracking-wide">
                We Can't Wait to Celebrate with You!
              </h2>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed font-serif italic">
                Thank you for being part of our love story. Your presence will make our wedding day absolutely perfect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 font-sans">
                <button
                  onClick={() => scrollToSection('rsvp')}
                  className="px-10 py-4 bg-white text-[#7B5B29] hover:bg-[#faf9f6] active:scale-95 rounded-full text-sm font-semibold uppercase tracking-widest shadow-xl transition-all duration-300 flex items-center justify-center mx-auto sm:mx-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 h-4 w-4">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  RSVP with Love
                </button>
                <button
                  onClick={() => scrollToSection('details')}
                  className="px-10 py-4 border-2 border-white text-white hover:bg-white/10 active:scale-95 rounded-full text-sm font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center mx-auto sm:mx-0"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <RSVP />

        {/* Footer */}
        <footer className="w-full py-16 bg-[#7B5B29] text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 fill-[#B5A36A]/10">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span className="text-2xl font-serif tracking-widest font-semibold">D &amp; S</span>
                </div>
                <p className="text-gray-200/90 leading-relaxed font-serif text-sm text-justify">
                  Thank you for visiting our wedding website and being part of our love story. We can't wait to celebrate with you!
                </p>
              </div>

              <div className="space-y-4 font-serif">
                <h3 className="text-lg font-medium tracking-widest uppercase">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-200/80">
                  <li>
                    <button onClick={() => scrollToSection('details')} className="hover:text-white transition-colors">Details &amp; Schedule</button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('rsvp')} className="hover:text-white transition-colors">RSVP Response</button>
                  </li>
                  
                </ul>
              </div>

              <div className="space-y-4 font-serif text-sm">
                <h3 className="text-lg font-medium tracking-widest uppercase">Wedding Info</h3>
                <div className="space-y-1 text-gray-200/80">
                  <p className="font-semibold">Thursday, 16th July 2026</p>
                  <p>Hotel Jetwing Blue, Negambo</p>
                  <p className="text-xs opacity-75 font-sans pt-1">#DilmiAndSadeepa2026</p>
                </div>
              </div>

              <div className="space-y-4 font-serif text-sm">
                <h3 className="text-lg font-medium tracking-widest uppercase">Contact Us</h3>
                <div className="space-y-2 text-gray-200/80">
                  <p>Bride (Dilmi) - 077 145 4460</p>
                  <p>Groom (Sadeepa) - 070 152 6873</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center font-serif">
              <div className="flex items-center justify-center space-x-2 mb-3 text-rose-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="text-xs tracking-widest uppercase">Made with love</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <p className="text-gray-300/80 text-xs tracking-wider">
                &copy; 2026 Dilmi &amp; Sadeepa's Wedding Invitation. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
