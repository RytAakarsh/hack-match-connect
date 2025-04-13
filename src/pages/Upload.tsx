
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Send, Upload, User } from 'lucide-react';
import { mockDb, TechStack } from '@/services/mockDatabase';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type FormStep = 
  | 'greeting'
  | 'name'
  | 'email'
  | 'picture'
  | 'college'
  | 'course'
  | 'year'
  | 'branch'
  | 'techstack'
  | 'experience'
  | 'hackathon'
  | 'review'
  | 'complete';

interface FormData {
  fullName: string;
  email: string;
  profilePicture: string;
  collegeName: string;
  course: string;
  collegeYear: string;
  branch: string;
  techStack: TechStack[];
  yearsOfExperience: string;
  hackathonExperience: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  profilePicture: '/placeholder.svg',
  collegeName: '',
  course: '',
  collegeYear: '',
  branch: '',
  techStack: [],
  yearsOfExperience: '',
  hackathonExperience: '',
};

const techOptions: TechStack[] = [
  'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 
  'Flask', 'Java', 'Spring', 'Python', 'JavaScript', 'TypeScript',
  'HTML/CSS', 'SQL', 'MongoDB', 'Firebase', 'AWS', 'Azure',
  'Docker', 'Kubernetes', 'Figma', 'Adobe XD', 'UI/UX', 'Swift',
  'Kotlin', 'Flutter', 'React Native', 'TensorFlow', 'PyTorch'
];

const UploadPage = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('greeting');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user' }[]>([
    { text: 'Hi there! I\'m the HackMatch Assistant. I\'ll help you create your profile so others can find you for hackathon collaborations.', sender: 'bot' },
    { text: 'Ready to get started?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [imagePreview, setImagePreview] = useState('/placeholder.svg');
  const [selectedTech, setSelectedTech] = useState<TechStack[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't proceed if input is empty (except for greeting step)
    if (!inputValue.trim() && currentStep !== 'greeting') return;
    
    // Add user message to chat (except for greeting which doesn't need user input)
    if (currentStep !== 'greeting') {
      addMessage(inputValue, 'user');
    }
    
    // Process the input based on current step
    processInput();
    
    // Clear input field
    setInputValue('');
  };

  const processInput = () => {
    switch (currentStep) {
      case 'greeting':
        addMessage("Great! Let's start with your name.", 'bot');
        setCurrentStep('name');
        break;
        
      case 'name':
        setFormData(prev => ({ ...prev, fullName: inputValue }));
        addMessage(`Nice to meet you, ${inputValue}! Now, what's your email address?`, 'bot');
        setCurrentStep('email');
        break;
        
      case 'email':
        if (!inputValue.includes('@') || !inputValue.includes('.')) {
          addMessage("That doesn't look like a valid email. Please enter a valid email address.", 'bot');
          return;
        }
        setFormData(prev => ({ ...prev, email: inputValue }));
        addMessage("Thanks! We'll use a placeholder image for now. In a real app, you'd upload your photo here.", 'bot');
        setCurrentStep('college');
        break;
        
      case 'college':
        setFormData(prev => ({ ...prev, collegeName: inputValue }));
        addMessage(`${inputValue} is a great school! What course are you studying?`, 'bot');
        setCurrentStep('course');
        break;
        
      case 'course':
        setFormData(prev => ({ ...prev, course: inputValue }));
        addMessage(`${inputValue} sounds interesting! Which year are you in?`, 'bot');
        setCurrentStep('year');
        break;
        
      case 'year':
        setFormData(prev => ({ ...prev, collegeYear: inputValue }));
        addMessage("And what's your branch or specialization?", 'bot');
        setCurrentStep('branch');
        break;
        
      case 'branch':
        setFormData(prev => ({ ...prev, branch: inputValue }));
        addMessage("Now, let's talk about your skills. Select the technologies you're familiar with:", 'bot');
        setCurrentStep('techstack');
        break;
        
      case 'techstack':
        setFormData(prev => ({ ...prev, techStack: selectedTech }));
        addMessage(`Great selection! How many years of coding/design experience do you have?`, 'bot');
        setCurrentStep('experience');
        break;
        
      case 'experience':
        setFormData(prev => ({ ...prev, yearsOfExperience: inputValue }));
        addMessage("Tell me about your hackathon experience. Have you participated in any before?", 'bot');
        setCurrentStep('hackathon');
        break;
        
      case 'hackathon':
        setFormData(prev => ({ ...prev, hackathonExperience: inputValue }));
        addMessage("Awesome! Here's a summary of your profile. Is everything correct?", 'bot');
        setCurrentStep('review');
        break;
        
      case 'review':
        if (inputValue.toLowerCase().includes('yes') || inputValue.toLowerCase().includes('correct') || inputValue.toLowerCase().includes('sure')) {
          // Save the profile
          mockDb.addProfile(formData);
          addMessage("Profile created successfully! You can now be discovered by other hackathon participants. You'll be redirected to the partners page shortly.", 'bot');
          setCurrentStep('complete');
          
          // Show success toast
          toast({
            title: "Profile Created!",
            description: "Your profile is now visible to potential hack partners.",
          });
          
          // Redirect after a delay
          setTimeout(() => {
            navigate('/partners');
          }, 3000);
        } else {
          addMessage("No problem, let's start over. What's your name?", 'bot');
          setFormData(initialFormData);
          setSelectedTech([]);
          setCurrentStep('name');
        }
        break;
        
      default:
        break;
    }
  };

  const renderInputSection = () => {
    if (currentStep === 'complete') {
      return (
        <div className="text-center p-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Profile Created Successfully!</h3>
          <p className="text-muted-foreground">Redirecting you to the partners page...</p>
        </div>
      );
    }
    
    if (currentStep === 'techstack') {
      return (
        <div className="border-t border-gray-200 p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedTech.map(tech => (
              <div 
                key={tech} 
                className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tech}
                <button 
                  onClick={() => setSelectedTech(prev => prev.filter(t => t !== tech))}
                  className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white text-xs hover:bg-white/40"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2">
            {techOptions
              .filter(tech => !selectedTech.includes(tech))
              .map(tech => (
                <button
                  key={tech}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                  onClick={() => setSelectedTech(prev => [...prev, tech])}
                >
                  {tech}
                </button>
              ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => {
                if (selectedTech.length === 0) {
                  toast({
                    title: "Selection Required",
                    description: "Please select at least one technology",
                    variant: "destructive"
                  });
                  return;
                }
                processInput();
              }}
              className="bg-brand-purple hover:bg-brand-purple/90"
            >
              Continue
            </Button>
          </div>
        </div>
      );
    }
    
    if (currentStep === 'review') {
      return (
        <div className="border-t border-gray-200 p-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={formData.profilePicture} 
                alt={formData.fullName} 
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h3 className="font-bold text-lg">{formData.fullName}</h3>
                <p className="text-muted-foreground text-sm">{formData.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">College:</span> {formData.collegeName}</p>
              <p><span className="font-medium">Course:</span> {formData.course}</p>
              <p><span className="font-medium">Year:</span> {formData.collegeYear}</p>
              <p><span className="font-medium">Branch:</span> {formData.branch}</p>
              <p><span className="font-medium">Years of Experience:</span> {formData.yearsOfExperience}</p>
              <div>
                <p className="font-medium mb-1">Tech Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.map(tech => (
                    <span key={tech} className="bg-accent px-2 py-1 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium mb-1">Hackathon Experience:</p>
                <p>{formData.hackathonExperience}</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Is this information correct? (Yes/No)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
            />
            <Button type="submit" className="bg-brand-purple hover:bg-brand-purple/90">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      );
    }
    
    if (currentStep === 'greeting') {
      return (
        <div className="border-t border-gray-200 p-4">
          <Button 
            onClick={() => processInput()} 
            className="w-full bg-brand-purple hover:bg-brand-purple/90"
          >
            Let's Get Started
          </Button>
        </div>
      );
    }
    
    return (
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your response..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
        />
        <Button type="submit" className="bg-brand-purple hover:bg-brand-purple/90">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    );
  };
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-6 md:px-10">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Upload Your <span className="text-gradient">Profile</span>
          </h1>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            {/* Chat header */}
            <div className="bg-brand-purple text-white p-4 flex items-center gap-3">
              <User className="h-6 w-6" />
              <h3 className="font-medium">HackMatch Profile Assistant</h3>
            </div>
            
            {/* Chat messages */}
            <div className="p-4 max-h-96 overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-brand-purple text-white self-end rounded-br-none' 
                      : 'bg-gray-100 text-foreground self-start rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            
            {/* Input section */}
            {renderInputSection()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadPage;
