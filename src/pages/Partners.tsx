
import React, { useState } from 'react';
import { mockDb, UserProfile } from '@/services/mockDatabase';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PartnerCard = ({ profile }: { profile: UserProfile }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img 
            src={profile.profilePicture} 
            alt={profile.fullName} 
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">{profile.fullName}</h3>
            <p className="text-muted-foreground">{profile.course}, {profile.collegeName}</p>
          </div>
        </div>
        
        <div className="my-4 flex flex-wrap gap-2">
          {profile.techStack.map(tech => (
            <span key={tech} className="bg-accent px-3 py-1 rounded-full text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
        
        {expanded && (
          <div className="mt-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-muted-foreground">College Details</h4>
                <p><span className="font-medium">Year:</span> {profile.collegeYear}</p>
                <p><span className="font-medium">Branch:</span> {profile.branch}</p>
              </div>
              <div>
                <h4 className="font-semibold text-muted-foreground">Experience</h4>
                <p><span className="font-medium">Years of Experience:</span> {profile.yearsOfExperience}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-muted-foreground">Hackathon Experience</h4>
              <p>{profile.hackathonExperience}</p>
            </div>
          </div>
        )}
        
        <button 
          className="mt-4 flex items-center gap-2 text-brand-purple hover:text-brand-pink transition-colors mx-auto"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              View Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              View More <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const Partners = () => {
  const profiles = mockDb.getAllProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTech, setFilterTech] = useState<string>('');
  
  // Get all unique tech stack items from all profiles
  const allTechOptions = Array.from(
    new Set(profiles.flatMap(profile => profile.techStack))
  ).sort();
  
  // Filter profiles based on search term and tech filter
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = !filterTech || profile.techStack.includes(filterTech);
    
    return matchesSearch && matchesTech;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-6 md:px-10">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Find Your <span className="text-gradient">Hack Partners</span>
          </h1>
          
          {/* Search and filters */}
          <div className="mb-8 bg-white rounded-lg shadow-md p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, college, or course..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                  value={filterTech}
                  onChange={(e) => setFilterTech(e.target.value)}
                >
                  <option value="">All Technologies</option>
                  {allTechOptions.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Partners grid */}
          {filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map(profile => (
                <PartnerCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-xl">No matching profiles found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Partners;
