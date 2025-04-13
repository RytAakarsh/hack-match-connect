
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Cpu, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="py-4 px-6 md:px-10 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gradient">
          <Code className="h-6 w-6" />
          <span>HackMatch</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
          <Link to="/partners" className="text-foreground/80 hover:text-foreground transition-colors">Hack Partners</Link>
          <Link to="/upload" className="text-foreground/80 hover:text-foreground transition-colors">Upload Yourself</Link>
          <Link to="#" className="text-foreground/80 hover:text-foreground transition-colors">About</Link>
        </div>
        
        <div className="hidden md:block">
          <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity">
            Get Started
          </Button>
        </div>
        
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg p-4 border-t">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="p-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/partners" 
              className="p-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hack Partners
            </Link>
            <Link 
              to="/upload" 
              className="p-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload Yourself
            </Link>
            <Link 
              to="#" 
              className="p-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
