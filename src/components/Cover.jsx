import React, { useState } from 'react';

export default function Cover({ onViewInvitation }) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const handleDismiss = () => {
    setIsDismissed(true);
    onViewInvitation();
    setTimeout(() => {
      setShouldRender(false);
    }, 1000);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center w-full min-h-[100dvh] overflow-hidden transition-all duration-1000 ease-in-out ${
        isDismissed ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-hidden={isDismissed}
    >
      <picture className="absolute inset-0 w-full h-full">
        <source media="(min-width: 768px)" srcSet="/anushka/bg-d.jpg" />
        <img
          src="/anushka/bg.jpg"
          alt="Wedding background"
          className="w-full h-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-[#F8F4EA]/45" />

      <img
        src="/anushka/flower-top.png"
        alt=""
        aria-hidden="true"
        className="cover-flower-top absolute top-0 sm:top-2 md:-top-6 lg:-top-10 z-20 w-[min(52vw,220px)] sm:w-[200px] md:w-[240px] lg:w-[220px] max-h-[22vh] sm:max-h-none object-contain pointer-events-none drop-shadow-xl"
      />

      <div className="cover-card relative z-10 mx-auto w-[min(88vw,340px)] max-h-[min(72dvh,620px)] aspect-[2/3.1] rounded-[999px] flex flex-col items-center justify-center backdrop-blur-md bg-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/35 text-center px-5 sm:px-8 shrink-0">
        <div className="flex flex-col items-center justify-center w-full py-8 sm:py-10 md:py-12 gap-1">
          <p className="cover-line-1 text-lg sm:text-xl md:text-2xl text-[#7B5B29] text-center font-serif leading-snug opacity-90 px-2">
            You are invited to the Wedding of
          </p>

          <h1 className="cover-line-2 text-4xl sm:text-5xl md:text-6xl text-[#5F451E] leading-[1.1] my-4 sm:my-6 font-serif">
            Dilmi <br />
            <span className="text-2xl sm:text-3xl md:text-4xl">&amp;</span> <br />
            Sadeepa
          </h1>

          <div className="cover-line-3">
            <button
              type="button"
              onClick={handleDismiss}
              className="font-sans px-8 sm:px-10 py-3 sm:py-3.5 border border-[#7B5B29] text-[#7B5B29] rounded-full hover:bg-[#7B5B29] hover:text-white transition-colors duration-500 uppercase tracking-[0.25em] text-[10px] relative z-30 font-medium active:scale-95 shadow-sm"
            >
              View Invitation
            </button>
          </div>
        </div>
      </div>

      <img
        src="/anushka/flower-bottom.png"
        alt=""
        aria-hidden="true"
        className="cover-flower-bottom absolute bottom-0 sm:bottom-1 md:-bottom-8 lg:-bottom-12 z-20 w-[min(58vw,260px)] sm:w-[240px] md:w-[280px] lg:w-[240px] max-h-[24vh] sm:max-h-none object-contain pointer-events-none drop-shadow-xl"
      />
    </div>
  );
}
