
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Upload, Users, Zap } from 'lucide-react';

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-6 md:px-10 bg-accent/50">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How HackMatch Works</h2>
          <p className="text-muted-foreground text-lg">
            Find the perfect hackathon partner or make yourself available for collaboration in just a few simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Find Hack Partner */}
          <div 
            className="feature-card from-brand-purple/10 to-brand-blue/10"
            onClick={() => navigate('/partners')}
          >
            <div className="rounded-full p-6 bg-brand-purple/10 mb-6">
              <Search className="h-10 w-10 text-brand-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Search for Hack Partners</h3>
            <p className="text-center text-muted-foreground mb-6 max-w-md">
              Browse through profiles of talented developers, designers, and innovators looking for hackathon collaborations.
            </p>
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm mt-4">
              <div className="aspect-square bg-white rounded-lg shadow-md flex items-center justify-center p-3">
                <Users className="h-8 w-8 text-brand-purple" />
              </div>
              <div className="aspect-square bg-white rounded-lg shadow-md flex items-center justify-center p-3">
                <Zap className="h-8 w-8 text-brand-blue" />
              </div>
              <div className="aspect-square bg-white rounded-lg shadow-md flex items-center justify-center p-3">
                <Search className="h-8 w-8 text-brand-teal" />
              </div>
            </div>
          </div>
          
          {/* Upload Yourself */}
          <div 
            className="feature-card from-brand-pink/10 to-brand-orange/10"
            onClick={() => navigate('/upload')}
          >
            <div className="rounded-full p-6 bg-brand-pink/10 mb-6">
              <Upload className="h-10 w-10 text-brand-pink" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Upload Your Profile</h3>
            <p className="text-center text-muted-foreground mb-6 max-w-md">
              Create your profile and showcase your skills, experience, and what you're looking for in a hackathon partner.
            </p>
            <div className="w-full max-w-sm mt-4 bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="text-left">
                  <div className="font-medium">Your Profile</div>
                  <div className="text-xs text-muted-foreground">Developer</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {['React', 'Node.js', 'UI/UX'].map(tech => (
                  <span key={tech} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="h-2 bg-gray-100 rounded-full"></div>
              <div className="h-2 bg-gray-100 rounded-full mt-2 w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
