import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Users, Clock, Star, ArrowRight, X } from 'lucide-react';

const InteriorDesignWebsite = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
  });

  const slides = [
    {
      image: "https://source.unsplash.com/1600x900/?luxury-interior",
      title: "Transform Your Living Space",
      description: "Elegant designs tailored for modern lifestyles",
    },
    {
      image: "https://source.unsplash.com/1600x900/?modern-home",
      title: "Luxury Meets Comfort",
      description: "Premium interiors that redefine sophistication",
    },
    {
      image: "https://source.unsplash.com/1600x900/?office-interior",
      title: "Workspaces That Inspire",
      description: "Functional and aesthetic office interiors",
    },
  ];

  const features = [
    { icon: Award, title: "10+ Years Experience" },
    { icon: Users, title: "500+ Happy Clients" },
    { icon: Clock, title: "On-Time Delivery" },
    { icon: Star, title: "Premium Quality" },
  ];

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const API_URL = process.env.REACT_APP_API_URL || "https://your-backend.onrender.com";
      const response = await fetch(`${API_URL}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Enquiry sent successfully!");
        setFormData({ name: "", email: "", phone: "", project: "" });
        setShowForm(false);
      } else {
        alert("Failed to send enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-orange-600">SS Interiors</h1>
        <div className="hidden md:flex space-x-8 text-gray-700">
          <a href="#home" className="hover:text-orange-500 transition">Home</a>
          <a href="#projects" className="hover:text-orange-500 transition">Projects</a>
          <a href="#features" className="hover:text-orange-500 transition">Why Us</a>
          <a href="#contact" className="hover:text-orange-500 transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section with Fantastic Animation */}
      <section id="home" className="relative w-full h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out 
              ${index === currentSlide ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-105 z-10'}
            `}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Orange Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 via-orange-400/30 to-transparent"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mt-4 max-w-3xl drop-shadow-md">
                {slide.description}
              </p>
              <button 
                className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 transition rounded-lg shadow-lg text-lg font-semibold"
                onClick={() => setShowForm(true)}
              >
                Get Free Consultation
              </button>
            </div>
          </div>
        ))}

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-orange-600 p-3 rounded-full shadow-lg hover:bg-orange-700 transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-orange-600 p-3 rounded-full shadow-lg hover:bg-orange-700 transition"
          aria-label="Next Slide"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <feature.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800">Our Projects</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="relative group">
            <img src="https://source.unsplash.com/400x300/?interior" alt="Project" className="rounded-lg shadow-lg group-hover:opacity-80 transition" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2">
                View <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative group">
            <img src="https://source.unsplash.com/400x300/?kitchen" alt="Project" className="rounded-lg shadow-lg group-hover:opacity-80 transition" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2">
                View <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative group">
            <img src="https://source.unsplash.com/400x300/?bedroom" alt="Project" className="rounded-lg shadow-lg group-hover:opacity-80 transition" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2">
                View <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 shadow-xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowForm(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Get Free Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" className="w-full p-3 border rounded-lg" value={formData.name} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" value={formData.email} onChange={handleInputChange} required />
              <input type="tel" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-lg" value={formData.phone} onChange={handleInputChange} required />
              <textarea name="project" placeholder="Tell us about your project" className="w-full p-3 border rounded-lg" value={formData.project} onChange={handleInputChange}></textarea>
              <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918639382487"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.26 2 11.68c0 2.08.63 3.99 1.71 5.59L2 22l5.01-1.64c1.52.83 3.28 1.29 5.15 1.29 5.52 0 10-4.26 10-9.68S17.52 2 12 2zm.01 17.29c-1.62 0-3.19-.43-4.57-1.24l-.33-.19-2.97.97.98-2.89-.21-.34c-1.02-1.52-1.56-3.29-1.56-5.12 0-5.03 4.14-9.12 9.24-9.12 2.47 0 4.79.95 6.54 2.67 1.75 1.72 2.71 4 2.71 6.45 0 5.02-4.14 9.11-9.26 9.11zm4.79-6.85c-.26-.13-1.56-.77-1.8-.86-.24-.09-.41-.13-.58.13s-.66.86-.81 1.04c-.15.18-.3.2-.56.07-.26-.13-1.1-.4-2.09-1.25-.77-.68-1.29-1.51-1.44-1.77-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.18.04-.33-.02-.46-.07-.13-.58-1.38-.8-1.89-.21-.5-.42-.43-.58-.44-.15-.01-.33-.01-.51-.01s-.46.07-.7.33c-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.18 1.82 2.9 4.41 4.06.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.5-.07 1.56-.64 1.78-1.25.22-.62.22-1.15.15-1.25-.06-.1-.24-.16-.5-.29z"/>
        </svg>
      </a>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-10 text-center">
        <p className="text-lg">© 2025 SS Interiors. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default InteriorDesignWebsite;
