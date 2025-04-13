
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-3">HackMatch</h3>
            <p className="text-muted-foreground">
              Find your perfect hackathon partner and build something amazing together.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-3">Navigation</h3>
            <Link to="/" className="text-muted-foreground hover:text-foreground my-1 transition-colors">
              Home
            </Link>
            <Link to="/partners" className="text-muted-foreground hover:text-foreground my-1 transition-colors">
              Hack Partners
            </Link>
            <Link to="/upload" className="text-muted-foreground hover:text-foreground my-1 transition-colors">
              Upload Yourself
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground my-1 transition-colors">
              About
            </Link>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-3">Legal</h3>
            <Link to="#" className="text-muted-foreground hover:text-foreground my-1 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground my-1 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground my-1 transition-colors">
              Cookie Policy
            </Link>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <p className="text-muted-foreground">
              Questions or feedback?
            </p>
            <a href="mailto:info@hackmatch.com" className="text-brand-purple hover:underline">
              info@hackmatch.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} HackMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
