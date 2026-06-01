import React, { useState } from 'react';

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    guests: '1',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending RSVP
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      attending: '',
      guests: '1',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp" className="w-full py-20 bg-white reveal">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Title */}
        <div className="flex flex-col items-center space-y-4 text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-800 tracking-wide">RSVP</h2>
          <div className="w-32 h-[2px] bg-[#B5A36A] rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl font-serif italic">
            We can't wait to celebrate with you! Please let us know if you'll be joining us on our special day.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Card Side */}
          <div className="relative group">
            <div className="relative h-[480px] overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl">
              <img
                src="/iwoshani/6.jpg"
                alt="Wedding RSVP"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            
            {/* Overlay card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-xl max-w-xs border border-[#f5f5dc] transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center space-x-3 text-gray-900 mb-3">
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
                  className="lucide lucide-heart h-6 w-6 text-rose-500 fill-rose-500/20"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="font-serif font-semibold text-lg text-gray-800">
                  Save the Date!
                </span>
              </div>
              <p className="text-gray-600 font-serif leading-relaxed text-sm">
                Your presence is the most beautiful gift we could ask for. As we step into a new chapter of our lives, we would be truly honored to celebrate this special day with you.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-[#B5A36A]/5 p-8 md:p-10 rounded-3xl shadow-lg border border-[#ecebe7]/60 min-h-[460px] flex flex-col justify-center relative overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="inline-flex items-center justify-center p-4 bg-[#B5A36A]/10 rounded-full text-[#B5A36A] animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-[#7B5B29] font-medium">
                    RSVP Sent With Love!
                  </h3>
                  <p className="text-gray-600 font-serif max-w-sm mx-auto">
                    Thank you, <strong className="text-[#7B5B29]">{formData.name}</strong>. Your response has been recorded successfully.
                  </p>
                </div>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-white border border-[#B5A36A] text-[#B5A36A] rounded-xl hover:bg-[#B5A36A]/10 transition-all font-serif text-sm font-medium"
                  >
                    Edit Response
                  </button>
                  <a
                    href="https://www.google.com/calendar/render?action=TEMPLATE&text=Iwoshani%20%26%20Chanaka%20Wedding&dates=20260518T040000Z/20260518T103000Z&details=We%20are%20excited%20to%20celebrate%20with%20you!&location=Hotel%20Aarya%20Grand%20Ganemulla%20%E2%80%93%20Grand%20Ballroom&sf=true&output=xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#B5A36A] text-white rounded-xl hover:bg-[#B5A36A]/90 transition-all font-serif text-sm font-medium shadow-md"
                  >
                    Add to Calendar
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-serif font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Eg: Namal Perera"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 font-serif focus:ring-2 focus:ring-[#B5A36A] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-serif font-medium mb-2">
                      Will you attend?
                    </label>
                    <div className="relative">
                      <select
                        name="attending"
                        required
                        value={formData.attending}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 font-serif focus:ring-2 focus:ring-[#B5A36A]/50 focus:border-transparent outline-none appearance-none transition-all pr-10"
                      >
                        <option value="">Select Option</option>
                        <option value="yes">Yes, I’ll be there</option>
                        <option value="no">Sorry, I can’t make it</option>
                      </select>
                      <svg
                        className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-serif font-medium mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      disabled={formData.attending === 'no'}
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 font-serif focus:ring-2 focus:ring-[#B5A36A]/50 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-serif font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    maxLength={250}
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Leave the couple a beautiful note!"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 font-serif focus:ring-2 focus:ring-[#B5A36A]/50 focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#B5A36A] hover:bg-[#a3925c] disabled:bg-[#c9bfa0] text-white rounded-xl py-3.5 text-lg font-serif font-medium shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Send RSVP with Love"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
