// src/App.js
import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Wand2, 
  Download, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X, 
  Zap,
  Mail,
  MessageCircle,
} from 'lucide-react';

// === HELPER FUNCTION: Images load karne ke liye ===
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => { 
    // Filename clean karte hain (e.g. "./shoe.jpg" -> "shoe.jpg")
    images[item.replace('./', '')] = r(item); 
  });
  return images;
}

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);

  // === DYNAMIC IMAGE LOADING LOGIC ===
  useEffect(() => {
    try {
      const beforeImages = importAll(require.context('./assets/dataset/before', false, /\.(png|jpe?g|svg|webp)$/));
      const afterImages = importAll(require.context('./assets/dataset/after', false, /\.(png|jpe?g|svg|webp)$/));

      const items = Object.keys(beforeImages).map((filename) => {
        if (afterImages[filename]) {
          return {
            name: filename.split('.')[0], 
            before: beforeImages[filename],
            after: afterImages[filename]
          };
        }
        return null;
      }).filter(item => item !== null); 

      setGalleryItems(items);
    } catch (error) {
      console.error("Images load nahi ho payin.", error);
    }
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Animation Styles Injection */}
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slowZoom 20s linear infinite alternate;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LifeStyle AI
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('work')} className="text-gray-600 hover:text-indigo-600 transition-colors">Our Work</button>
              <button onClick={() => scrollToSection('process')} className="text-gray-600 hover:text-indigo-600 transition-colors">How it Works</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors font-medium shadow-lg shadow-indigo-200">
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
              <button onClick={() => scrollToSection('work')} className="block w-full text-left px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">Our Work</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">How it Works</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-center mt-4 bg-indigo-600 text-white px-5 py-3 rounded-lg font-medium">
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070"
            alt="Fashion Background" 
            className="w-full h-full object-cover animate-slow-zoom"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-indigo-900/80 to-slate-900/90 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-indigo-200 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
            <Zap size={16} className="mr-2 text-yellow-400 fill-yellow-400" />
            AI-Powered Fashion Photography
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-2xl">
            Turn your product images into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
              lifestyle masterpieces
            </span>
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Stop spending thousands on photoshoots. Sell more with stunning, AI-generated lifestyle photography that converts instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={() => scrollToSection('pricing')} className="bg-white text-indigo-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                View Pricing Plans
            </button>
             <button onClick={() => scrollToSection('work')} className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                See Examples
            </button>
          </div>
          <p className="mt-6 text-sm text-indigo-200/80">
            <span className="font-semibold text-green-400">40% Off</span> Max Discount Available • 200+ Happy Clients
          </p>
        </div>

        {/* Visual Transformation Demo (Hero Image) */}
        <div className="relative z-10 max-w-5xl mx-auto mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform -skew-y-2 rounded-3xl opacity-20 blur-xl"></div>
          <div className="relative bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
            <div className="grid md:grid-cols-11 gap-4 items-center">
              {/* Before */}
              <div className="md:col-span-5">
                <div className="bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 relative group">
                  <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">Raw Product</div>
                  <img 
                    src="https://i5.walmartimages.com/asr/f0ec0621-e9f1-432c-9138-af1363c1e8ac.241a1c0f08f15369941321c5ac854ab9.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF" 
                    alt="Plain leather shoe product shot" 
                    className="w-3/4 h-3/4 object-contain mix-blend-multiply"
                  />
                </div>
                <p className="text-center mt-3 text-gray-500 font-medium">You upload this</p>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex justify-center py-4 md:py-0">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shadow-sm">
                  <ArrowRight size={24} />
                </div>
              </div>

              {/* After */}
              <div className="md:col-span-5">
                <div className="rounded-xl overflow-hidden aspect-square relative shadow-lg group">
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-lg">AI Lifestyle</div>
                  <img 
                    src="https://i5.walmartimages.com/asr/7ff80c61-bd2c-4939-9904-bebdb01ff49e.611fe41349fdbed7588392cf4136c958.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF" 
                    alt="Leather shoe on street lifestyle shot" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="text-center mt-3 text-indigo-600 font-bold">We generate this</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Section (UPDATED: MATCHING HERO SIZE & RATIO) */}
      <section id="work" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Work</h2>
            <p className="mt-4 text-gray-600">See the transformation power of our AI technology</p>
          </div>

          {/* Dynamic Gallery Logic */}
          {galleryItems.length === 0 ? (
            <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-xl">
               <p className="text-gray-500">No images found. Please add images to <br/> <code>src/assets/dataset/before</code> and <code>src/assets/dataset/after</code></p>
            </div>
          ) : (
            <div className="space-y-12">
               {galleryItems.map((item, index) => (
                 <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                      <h3 className="font-bold text-xl text-gray-800 capitalize tracking-wide">{item.name}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                      {/* Left: Original Product */}
                      <div className="p-6 relative">
                        <span className="absolute top-6 left-6 z-10 bg-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider">Before</span>
                        {/* UPDATED: aspect-square to match hero section */}
                        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                          <img 
                            src={item.before} 
                            alt={`${item.name} Before`} 
                            className="w-3/4 h-3/4 object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      </div>

                      {/* Right: Influencer Ad */}
                      <div className="p-6 relative">
                        <span className="absolute top-6 left-6 z-10 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg">After</span>
                        {/* UPDATED: aspect-square to match hero section */}
                        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                          <img 
                            src={item.after} 
                            alt={`${item.name} After`} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600">Simple 3-step process to transform your brand</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-200 w-2/3 mx-auto z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                <Upload size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Upload & Describe</h3>
              <p className="text-gray-600 px-4">
                Upload your raw product images and tell us your vision. Describe the setting, mood, or context you want.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                <Wand2 size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. AI Generation</h3>
              <p className="text-gray-600 px-4">
                Our advanced AI models place your product into hyper-realistic lifestyle scenes that match your brand.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                <Download size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Review & Download</h3>
              <p className="text-gray-600 px-4">
                Receive your high-res lifestyle shots. Use them immediately for ads, social media, and your store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-gray-600">Choose the package that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow relative">
               <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                 STARTER
               </div>
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-gray-900">$10</span>
                <span className="text-gray-500 ml-2">/pack</span>
              </div>
              <p className="text-gray-600 mb-6 text-sm">Perfect for trying out our service.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>5 Lifestyle Images</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>Standard Resolution</span>
                </li>
                 <li className="flex items-center text-gray-600">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>24h Delivery</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors">
                Choose Basic
              </button>
            </div>

            {/* Standard Plan (Highlighted) */}
            <div className="bg-white rounded-2xl p-8 border-2 border-indigo-600 shadow-xl relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Standard</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-extrabold text-gray-900">$18</span>
                <span className="text-gray-500 ml-2">/pack</span>
              </div>
              <p className="text-gray-600 mb-6 text-sm">Ideal for small catalogs.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700 font-medium">
                  <CheckCircle size={18} className="text-indigo-600 mr-2" />
                  <span>10 Lifestyle Images</span>
                </li>
                <li className="flex items-center text-gray-700 font-medium">
                  <CheckCircle size={18} className="text-indigo-600 mr-2" />
                  <span>High Resolution</span>
                </li>
                <li className="flex items-center text-gray-700 font-medium">
                  <CheckCircle size={18} className="text-indigo-600 mr-2" />
                  <span>Priority Support</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                Choose Standard
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow">
               <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                 BEST VALUE
               </div>
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-gray-900">$45</span>
                <span className="text-gray-500 ml-2">/pack</span>
              </div>
              <p className="text-gray-600 mb-6 text-sm">For scaling businesses.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>30 Lifestyle Images</span>
                </li>
                 <li className="flex items-center text-gray-600">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>4K Resolution</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>Custom Prompts</span>
                </li>
              </ul>
              
              <button className="w-full py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors">
                Choose Premium
              </button>
            </div>
          </div>
          
           <div className="text-center mt-12">
            <p className="text-gray-500">Need more than 100 images? <a href="#contact" className="text-indigo-600 font-semibold underline">Contact us</a> for a custom bulk discount.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your images?</h2>
            <p className="text-indigo-200">Get in touch with us instantly.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* WhatsApp Card */}
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex-1 max-w-sm bg-indigo-800 p-8 rounded-2xl hover:bg-indigo-700 transition-colors flex flex-col items-center text-center shadow-xl border border-indigo-700/50">
              <div className="bg-green-500 p-4 rounded-full text-white mb-4 shadow-lg">
                <MessageCircle size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">WhatsApp</h3>
              <p className="text-indigo-200">Chat with us instantly for a quick quote.</p>
            </a>

            {/* Email Card */}
            <a href="mailto:hello@lifestyleai.com" className="flex-1 max-w-sm bg-indigo-800 p-8 rounded-2xl hover:bg-indigo-700 transition-colors flex flex-col items-center text-center shadow-xl border border-indigo-700/50">
              <div className="bg-blue-500 p-4 rounded-full text-white mb-4 shadow-lg">
                <Mail size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Email Us</h3>
              <p className="text-indigo-200">Send us your requirements via email.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 mt-1">© 2025 LifestyleAI Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;