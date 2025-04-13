
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hey there! Need help finding a hackathon partner?', sender: 'bot' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, { text: message, sender: 'user' }]);
    setMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          text: 'I can help you with that! Try clicking on "Find Partners" or "Upload Profile" in the main menu.', 
          sender: 'bot' 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble */}
      {!isOpen && (
        <button 
          className="bg-brand-purple text-white rounded-full p-4 shadow-lg hover:bg-brand-purple/90 transition-colors animate-pulse-slow"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-brand-purple text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">HackMatch Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80 flex flex-col gap-3">
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
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
            />
            <Button type="submit" className="bg-brand-purple text-white hover:bg-brand-purple/90 px-4">
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
