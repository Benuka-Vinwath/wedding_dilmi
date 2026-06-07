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
      className={`cover-screen fixed inset-0 z-50 flex items-center justify-center w-full min-h-[100dvh] px-4 overflow-hidden ${
        isDismissed ? 'cover-screen--exit' : ''
      }`}
      aria-hidden={isDismissed}
    >
      <div className="cover-bg absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#FDFBF4]" />
        <picture className="absolute inset-0">
          <source media="(min-width: 768px)" srcSet="/anushka/bg-d.jpg" />
          <img
            src="/anushka/bg.jpg"
            alt=""
            className="h-full w-full object-cover object-center scale-105"
          />
        </picture>
        <div className="absolute inset-0 bg-[#FDFBF4]/82" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF4]/40 via-transparent to-[#F5F0E8]/50" />
      </div>

      <article className="cover-card relative z-10 flex w-[min(88vw,368px)] max-h-[min(90dvh,700px)] min-h-[min(80dvh,600px)] flex-col items-center bg-white text-center shadow-[0_16px_56px_rgba(74,58,40,0.12)] rounded-[min(44vw,188px)] overflow-hidden shrink-0">
        <img
          src="/anushka/flower-top.png"
          alt=""
          aria-hidden="true"
          className="cover-flower-in cover-flower-in-top w-[min(74%,248px)] max-h-[17vh] object-contain object-bottom mt-3 sm:mt-5 pointer-events-none select-none"
        />

        <div className="flex flex-1 flex-col items-center justify-center w-full px-6 sm:px-9 py-3 sm:py-5">
          <p className="cover-line-1 font-cover-intro text-[clamp(1.2rem,5vw,1.5rem)] leading-snug max-w-[260px] mb-4 sm:mb-6">
            You are invited to the Wedding of
          </p>
      
          <h1 className="cover-line-2 font-cover-names flex flex-col items-center leading-[1.02] text-[#4A3A28]">
            <span className="text-[clamp(2.85rem,12vw,4rem)]">Dilmi</span>
            <span className="font-cover-names text-[clamp(1.25rem,4.5vw,1.65rem)] my-0.5 sm:my-1 text-[#5C4832]">
              &amp;
            </span>
            <span className="text-[clamp(2.85rem,12vw,4rem)]">Sadeepa</span>
          </h1>

          <div className="cover-line-3 mt-7 sm:mt-9">
            <button
              type="button"
              onClick={handleDismiss}
              className="cover-cta font-cover-button inline-flex items-center justify-center min-w-[200px] px-10 sm:px-12 py-3.5 sm:py-4 rounded-full uppercase text-[10px] sm:text-[11px] font-medium"
            >
              View Invitation
            </button>
          </div>
        </div>

        <img
          src="/anushka/flower-bottom.png"
          alt=""
          aria-hidden="true"
          className="cover-flower-in cover-flower-in-bottom w-[min(80%,268px)] max-h-[19vh] object-contain object-top mb-2 sm:mb-4 pointer-events-none select-none"
        />
      </article>
    </div>
  );
}
