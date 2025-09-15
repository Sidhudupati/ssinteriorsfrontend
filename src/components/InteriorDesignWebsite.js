import React, { useState, useEffect } from 'react';
import { Award, Users, Clock, Star, ArrowRight } from 'lucide-react';

const InteriorDesignWebsite = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    houseType: '',
    budget: '',
    location: '',
    timeline: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hero slider images with overlaid text
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1667646639495-8865f3ea638b?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80",
      title: "Your Vision",
      subtitle: "Transformed into Reality"
    },
    {
      image: "https://images.unsplash.com/photo-1682662045846-77f6e1ce55b4?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80",
      title: "Our Expertise",
      subtitle: "Crafting Beautiful Spaces"
    },
    {
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Premium Interiors",
      subtitle: "Designed for You"
    }
  ];

  // Project portfolio
  const projects = [
    {
      id: 1,
      title: "Modern Living Room",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1638284457192-27d3d0ec51aa?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80",
      description: "Contemporary design with clean lines and neutral tones"
    },
    {
      id: 2,
      title: "Luxury Kitchen",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1643034738686-d69e7bc047e1?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80",
      description: "Modern kitchen with premium finishes and smart storage"
    },
    {
      id: 3,
      title: "Executive Office",
      category: "Commercial",
      image: "https://images.pexels.com/photos/33827326/pexels-photo-33827326.jpeg?_gl=1*q5lr9z*_ga*MTk5NTA4MzIzMi4xNzUwOTQ5Mzcz*_ga_8JE65Q40S6*czE3NTc3ODM0MzkkbzYkZzEkdDE3NTc3ODM3ODUkajE0JGwwJGgw",
      description: "Professional workspace designed for productivity"
    },
    {
      id: 4,
      title: "Master Bedroom",
      category: "Residential",
      image: "https://images.pexels.com/photos/6970005/pexels-photo-6970005.jpeg?_gl=1*zj4ip2*_ga*MTk5NTA4MzIzMi4xNzUwOTQ5Mzcz*_ga_8JE65Q40S6*czE3NTc3ODM0MzkkbzYkZzEkdDE3NTc3ODQxODUkajU5JGwwJGgw",
      description: "Serene bedroom sanctuary with elegant touches"
    },
    {
      id: 5,
      title: "Restaurant Interior",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1684675144506-b181f5209c5a?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80",
      description: "Warm and inviting dining atmosphere"
    },
    {
      id: 6,
      title: "Boutique Hotel Lobby",
      category: "Hospitality",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Luxurious welcome space with artistic elements"
    }
  ];

  // Why choose us features
  const features = [
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: "Creative Designs",
      description: "Unique concepts tailored to your lifestyle."
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Budget-Friendly Solutions",
      description: "Stylish interiors that fit your budget."
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: "Quality Materials",
      description: "We choose only the best for lasting elegance."
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Expert Team",
      description: "Skilled professionals with years of experience."
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "On-Time Delivery",
      description: "Projects completed within promised timelines."
    },
    {
      icon: <ArrowRight className="w-8 h-8 text-white" />,
      title: "After-Sales Support",
      description: "We care even after project completion."
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);



  const handleEnquireNow = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      houseType: '',
      budget: '',
      location: '',
      timeline: '',
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
    if (name === "projectType") {
      return {
        ...prev,
        projectType: value,
        houseType: "", // reset
      };
    }
    return { ...prev, [name]: value };
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/enquiry`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      alert(data.message || "Enquiry submitted successfully!"); 
      handleCloseForm();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "There was an error submitting your enquiry. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error submitting your enquiry. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo7.png" 
                alt="SS Interiors Logo" 
                className="h-12 w-12 object-contain"
              />
              <div className="text-4xl font-black tracking-wider text-white drop-shadow-lg" style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                SS INTERIORS
              </div>
            </div>
            <div className="hidden md:flex space-x-8 font-bold text-white">
              <a href="#home" className="hover:text-gray-300 transition-colors text-lg">Home</a>
              <a href="#projects" className="hover:text-gray-300 transition-colors text-lg">Projects</a>
              <a href="#about" className="hover:text-gray-300 transition-colors text-lg">About</a>
              <a href="#contact" className="hover:text-gray-300 transition-colors text-lg">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Sliding Images */}
      <section id="home" className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPrev = index === (currentSlide - 1 + heroSlides.length) % heroSlides.length;
          const isNext = index === (currentSlide + 1) % heroSlides.length;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out transform
                ${isActive 
                  ? 'opacity-100 scale-100 translate-x-0 z-30 rotate-0' 
                  : isPrev 
                    ? 'opacity-30 scale-110 -translate-x-full z-10 rotate-1' 
                    : isNext 
                      ? 'opacity-30 scale-90 translate-x-full z-10 -rotate-1'
                      : 'opacity-0 scale-125 translate-x-0 z-5 rotate-2'}
              `}
              style={{
                backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: isActive ? 'none' : 'blur(2px)',
              }}
            >
              {/* Animated particles overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className={`absolute w-2 h-2 bg-gray-300 rounded-full animate-pulse ${isActive ? 'animate-bounce' : ''}`} style={{top: '20%', left: '10%', animationDelay: '0s'}}></div>
                <div className={`absolute w-1 h-1 bg-gray-400 rounded-full animate-pulse ${isActive ? 'animate-bounce' : ''}`} style={{top: '60%', left: '80%', animationDelay: '1s'}}></div>
                <div className={`absolute w-3 h-3 bg-gray-200 rounded-full animate-pulse ${isActive ? 'animate-bounce' : ''}`} style={{top: '30%', right: '15%', animationDelay: '2s'}}></div>
                <div className={`absolute w-2 h-2 bg-gray-500 rounded-full animate-pulse ${isActive ? 'animate-bounce' : ''}`} style={{bottom: '20%', left: '20%', animationDelay: '0.5s'}}></div>
              </div>

              {/* Text Content with enhanced animation */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                
                  <h1 className={`text-4xl sm:text-6xl md:text-7xl font-extrabold drop-shadow-lg text-gray-100 mb-2 transition-all duration-1200 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                    {slide.title}
                  </h1>
                  <div className={`h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-4 transition-all duration-1000 ${isActive ? 'scale-100' : 'scale-0'}`}></div>
                  <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl font-bold drop-shadow-md text-gray-200 transition-all duration-1400 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    {slide.subtitle}
                  </p>
                {/* <button 
                  className={`mt-8 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 transition-all duration-300 rounded-full shadow-2xl text-lg font-semibold transform hover:scale-105 hover:shadow-gray-500/50 border border-gray-400/30 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  onClick={() => setShowForm(true)}
                  style={{transitionDelay: '0.5s'}}
                >
                  Get Free Quote
                </button> */}
              </div>
            </div>
          );
        })}



        {/* Fixed Get Free Quote Button */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-40">
          <button 
            className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 transition-all duration-300 rounded-full shadow-2xl text-lg font-semibold transform hover:scale-105 hover:shadow-gray-500/50 border border-gray-400/30 text-white"
            onClick={() => setShowForm(true)}
          >
            Get Free Quote
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`relative transition-all duration-500 rounded-full ${
                i === currentSlide 
                  ? 'w-12 h-4 bg-gradient-to-r from-gray-400 to-gray-600 scale-110 shadow-lg' 
                  : 'w-4 h-4 bg-gray-400/60 hover:bg-gray-400/80'
              }`}
            >
              {i === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-gray-300/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-gray-400/10 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/3 w-24 h-24 border-4 border-gray-500/15 rounded-full animate-bounce-slow"></div>
        </div>
      </section>

      {/* Previous Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Previous Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our portfolio of stunning interior designs that showcase our expertise 
              in creating beautiful, functional spaces.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                    <span className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine creativity, expertise, and dedication to deliver exceptional 
              interior design solutions that exceed expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-500"
              >
                <div className="flex justify-center mb-6 bg-gradient-to-r from-gray-700 to-gray-800 w-16 h-16 rounded-full mx-auto items-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-200 leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Let's bring your vision to life with our expert interior design services. 
            Contact us today for a consultation.
          </p>
          <button
            onClick={handleEnquireNow}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl border border-gray-500/30"
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Get A Quote</h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                    >
                      <option value="">Select project type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="office">Office Space</option>
                    </select>
                  </div>
                  {formData.projectType === "residential" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      House Type *
                    </label>
                    <select
                      name="houseType"
                      value={formData.houseType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                    >
                      <option value="">Select house type</option>
                      <option value="1bhk">1BHK</option>
                      <option value="2bhk">2BHK</option>
                      <option value="3bhk">3BHK</option>
                      <option value="4bhk">4BHK</option>
                      <option value="villa">Villa</option>
                    </select>
                  </div>
                )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5-lakh">Under ₹5 Lakh</option>
                      <option value="5-10-lakh">₹5 - ₹10 Lakh</option>
                      <option value="10-25-lakh">₹10 - ₹25 Lakh</option>
                      <option value="25-50-lakh">₹25 - ₹50 Lakh</option>
                      <option value="above-50-lakh">Above ₹50 Lakh</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                      placeholder="Project location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (1-2 months)</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors resize-none"
                    placeholder="Tell us about your project requirements, style preferences, or any specific needs..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919912300749"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.91 11.91 0 0012.07 0C5.54 0 .07 5.37.07 11.97c0 2.11.56 4.17 1.63 5.97L0 24l6.27-1.63a11.86 11.86 0 005.8 1.49h.01c6.63 0 12.01-5.37 12.01-11.97 0-3.2-1.25-6.2-3.57-8.41zM12.07 21.5a9.63 9.63 0 01-4.9-1.35l-.35-.21-3.72.96.99-3.62-.24-.37a9.47 9.47 0 01-1.49-5.08c0-5.27 4.33-9.55 9.65-9.55a9.6 9.6 0 016.83 2.69 9.47 9.47 0 012.82 6.86c0 5.27-4.33 9.55-9.66 9.55zm5.32-7.16c-.29-.14-1.72-.85-1.99-.95-.27-.1-.46-.14-.66.14s-.76.95-.93 1.14c-.17.19-.34.21-.63.07-.29-.14-1.22-.44-2.33-1.41-.86-.76-1.45-1.69-1.62-1.98-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.66-1.59-.91-2.18-.24-.58-.48-.5-.66-.51h-.57c-.19 0-.5.07-.76.36s-1 1-1 2.43 1.02 2.82 1.16 3.01c.14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.72-.7 1.96-1.37.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">SS INTERIORS</h3>
              <p className="text-gray-400">
                Creating beautiful, functional spaces that reflect your unique style and needs.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Residential Design</li>
                <li>Commercial Spaces</li>
                <li>Project Management</li>
                <li>Consultation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: +91 9912300749</li>
                <li>Email:  ssinteriorsliving@gmail.com</li>
                <li>Location: Secunderbad, 500080.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://www.instagram.com/ssinteriorshyd/" target="_blank">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SS INTERIORS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InteriorDesignWebsite;