import React from 'react';

export default function Timeline() {
  const events = [
    {
      time: "9.54 AM",
      title: "Poruwa Ceremony",
      desc: "Traditional rituals and custom vows.",
      icon: (
        <img
          src="/Dummy_image/temple.png"
          className="w-7 h-7 filter brightness-0 invert"
          alt="Temple"
        />
      ),
      alignLeft: true
    },
    {
      time: "10.00 AM",
      title: "Reception",
      desc: "Celebrations begin in the Grand Ballroom.",
      icon: (
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
          className="lucide lucide-sparkles h-6 w-6 text-white"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </svg>
      ),
      alignLeft: false
    },
    {
      time: "11.30 AM",
      title: "Bar Opens",
      desc: "Drinks, cocktails, and music.",
      icon: (
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
          className="lucide lucide-wine h-6 w-6 text-white"
        >
          <path d="M8 22h8" />
          <path d="M7 10h10" />
          <path d="M12 15v7" />
          <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
        </svg>
      ),
      alignLeft: true
    },
    {
      time: "12.30 PM",
      title: "Buffet Opens",
      desc: "Enjoy the gourmet wedding feast.",
      icon: (
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
          className="lucide lucide-utensils h-6 w-6 text-white"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      ),
      alignLeft: false
    },
    {
      time: "4.00 PM",
      title: "End of Ceremony",
      desc: "Sending off the happy couple.",
      icon: (
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
          className="lucide lucide-car h-6 w-6 text-white"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
      alignLeft: true
    }
  ];

  return (
    <div className="mt-24 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h3 className="text-4xl font-serif text-gray-800 mb-4 tracking-wide">
          Wedding Day Timeline
        </h3>
        <div className="w-24 h-[2px] bg-[#B5A36A] rounded-full mx-auto"></div>
      </div>

      {/* Timeline Line */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-[#B5A36A]"></div>

        <div className="space-y-16">
          {events.map((evt, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center justify-between ${
                evt.alignLeft ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Icon Circle */}
              <div className="z-10 w-14 h-14 rounded-full bg-[#7B5B29] border-4 border-white flex items-center justify-center text-white shadow-lg md:absolute md:left-1/2 md:transform md:-translate-x-1/2 transition-transform duration-300 hover:scale-110">
                {evt.icon}
              </div>

              {/* Event Content Box */}
              <div
                className={`w-full md:w-[45%] mt-6 md:mt-0 px-4 ${
                  evt.alignLeft ? 'md:text-right' : 'md:text-left'
                } text-center`}
              >
                <div className="bg-[#F9F6F0]/60 p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg hover:bg-white transition-all duration-300">
                  <div className="text-2xl font-bold text-[#7B5B29] mb-1 font-serif">
                    {evt.time}
                  </div>
                  <h4 className="text-xl font-serif text-gray-800 mb-2 font-medium">
                    {evt.title}
                  </h4>
                  <p className="text-gray-600 font-serif text-sm">
                    {evt.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
