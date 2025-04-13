
import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const techImages = ['React', 'Vue', 'Angular', 'Node', 'Python'];
  
  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % techImages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-24 pb-12 px-6 md:px-10 min-h-[90vh] flex flex-col justify-center">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Tagline */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find your one 
              <span className="text-gradient block mt-2">
                {'<'} For Hacking {'/>'} 
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Connect with talented developers, designers, and innovators to create amazing projects at hackathons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity text-white px-8 py-6 text-lg"
                asChild
              >
                <a href="/partners">
                  Find Partners <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                className="bg-white text-brand-purple border border-brand-purple/30 hover:bg-accent px-8 py-6 text-lg"
                variant="outline"
                asChild
              >
                <a href="/upload">
                  Upload Profile <Code className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Right side - Phones and match animation */}
          <div className={`relative h-[500px] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            {/* Phone 1 */}
            <div className="absolute left-10 top-20 w-[200px] h-[400px] bg-gray-800 rounded-3xl p-3 shadow-xl rotate-[-10deg] z-10">
              <div className="bg-white h-full w-full rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-brand-purple text-white p-3 text-center font-semibold">
                  HackMatch
                </div>
                <div className="flex-1 p-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-3"></div>
                  <div className="text-center font-medium mb-2">Alex, 23</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['React', 'Node', 'TypeScript'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-center text-gray-500">
                    "Looking for a designer to build a fintech app!"
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phone 2 */}
            <div className="absolute right-10 top-20 w-[200px] h-[400px] bg-gray-800 rounded-3xl p-3 shadow-xl rotate-[10deg] z-10">
              <div className="bg-white h-full w-full rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-brand-pink text-white p-3 text-center font-semibold">
                  HackMatch
                </div>
                <div className="flex-1 p-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-3"></div>
                  <div className="text-center font-medium mb-2">Taylor, 25</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['UI/UX', 'Figma', 'Vue'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-center text-gray-500">
                    "Designer with frontend skills ready to collaborate!"
                  </div>
                </div>
              </div>
            </div>
            
            {/* Match bubble */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-float">
              <div className="match-bubble flex items-center gap-2">
                <Heart className="text-pink-500 fill-pink-500" size={20} />
                <span>It's a Match!</span>
                <Heart className="text-pink-500 fill-pink-500" size={20} />
              </div>
            </div>
            
            {/* Tech stack logos floating */}
            <div className="absolute inset-0 flex items-center justify-center">
              {techImages.map((tech, index) => (
                <div 
                  key={tech}
                  className={`absolute transition-all duration-500 ${
                    index === currentImage ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                  }`}
                >
                  <div className="tech-card">
                    <div className="text-center font-bold">{tech}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
