import React, { useState, useEffect } from 'react';

// Configure the target wedding date here
const TARGET_DATE = "2026-05-18T09:30:00";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(TARGET_DATE).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown(); // Run immediately on mount
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-20 bg-[#F5F0E6] reveal">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif text-gray-900 tracking-wide">
              Counting Down to Forever
            </h2>
            <div className="flex items-center justify-center space-x-2 text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart h-5 w-5 text-rose-500 fill-rose-500/20"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="text-lg font-serif text-gray-600 italic">
                Our special day is almost here
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart h-5 w-5 text-rose-500 fill-rose-500/20"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-4xl w-full">
            {/* Days Card */}
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-[#f5f5dc] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-5xl md:text-6xl font-bold font-serif text-gray-900">
                {timeLeft.days}
              </div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-[0.2em] mt-3">
                Days
              </div>
            </div>

            {/* Hours Card */}
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-[#f5f5dc] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-5xl md:text-6xl font-bold font-serif text-gray-900">
                {timeLeft.hours}
              </div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-[0.2em] mt-3">
                Hours
              </div>
            </div>

            {/* Minutes Card */}
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-[#f5f5dc] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-5xl md:text-6xl font-bold font-serif text-gray-900">
                {timeLeft.minutes}
              </div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-[0.2em] mt-3">
                Minutes
              </div>
            </div>

            {/* Seconds Card */}
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-[#f5f5dc] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-5xl md:text-6xl font-bold font-serif text-gray-900">
                {timeLeft.seconds}
              </div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-[0.2em] mt-3">
                Seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
