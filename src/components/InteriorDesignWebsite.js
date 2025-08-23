import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Users, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react';

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
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Your Vision",
      subtitle: "Transformed into Reality"
    },
    {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
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
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Contemporary design with clean lines and neutral tones"
    },
    {
      id: 2,
      title: "Luxury Kitchen",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Modern kitchen with premium finishes and smart storage"
    },
    {
      id: 3,
      title: "Executive Office",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Professional workspace designed for productivity"
    },
    {
      id: 4,
      title: "Master Bedroom",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Serene bedroom sanctuary with elegant touches"
    },
    {
      id: 5,
      title: "Restaurant Interior",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: "Award-Winning Design",
      description: "Recognized excellence in interior design with multiple industry awards and certifications."
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "Expert Team",
      description: "Skilled designers and architects with years of experience in creating stunning interiors."
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      title: "Timely Delivery",
      description: "We respect your schedule and ensure projects are completed on time without compromising quality."
    },
    {
      icon: <Star className="w-8 h-8 text-amber-600" />,
      title: "Premium Quality",
      description: "Only the finest materials and craftsmanship to ensure lasting beauty and durability."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-amber-600" />,
      title: "Complete Service",
      description: "From concept to completion, we handle every aspect of your interior design project."
    },
    {
      icon: <ArrowRight className="w-8 h-8 text-amber-600" />,
      title: "Future-Ready",
      description: "Designs that adapt to changing needs while maintaining timeless appeal and functionality."
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

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
      alert("Thank you! Your enquiry has been submitted successfully. We will contact you soon.");
      handleCloseForm();
    } else {
      alert("There was an error submitting your enquiry. Please try again.");
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
      <nav className="absolute top-0 left-0 right-0 z-40 bg-black/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logo3.png" 
                alt="SS Interiors Logo" 
                className="h-10 w-10 object-contain"
              />
              <div className="text-2xl font-bold text-white">
                SS INTERIORS
              </div>
            </div>
            <div className="hidden md:flex space-x-8 text-white">
              <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
              <a href="#projects" className="hover:text-amber-400 transition-colors">Projects</a>
              <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Sliding Images */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-2xl md:text-3xl mb-8 font-light">
              {heroSlides[currentSlide].subtitle}
            </p>
            <button
              onClick={handleEnquireNow}
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Previous Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Previous Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our portfolio of stunning interior designs that showcase our expertise 
              in creating beautiful, functional spaces.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
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
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine creativity, expertise, and dedication to deliver exceptional 
              interior design solutions that exceed expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Let's bring your vision to life with our expert interior design services. 
            Contact us today for a consultation.
          </p>
          <button
            onClick={handleEnquireNow}
            className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Get A Quote</h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors resize-none"
                    placeholder="Tell us about your project requirements, style preferences, or any specific needs..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
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
                <li>Instagram</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>Pinterest</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SS INTERIORS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InteriorDesignWebsite;