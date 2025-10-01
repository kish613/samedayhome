import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minus, Send, Bot, Shield } from 'lucide-react';

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help with any questions about selling your property. Ask me about our process, timelines, fees, or anything else!",
      author: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [inputValue]);

  const sendMessage = async () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: trimmedValue,
      author: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call chatbot API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedValue,
          conversationHistory: messages.slice(-10) // Last 10 messages for context
        }),
      });

      const data = await response.json();
      
      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || "I'm having trouble responding. Please call us at 0330 043 7570 for immediate help.",
        author: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting. Please call our team at 0330 043 7570 for immediate assistance.",
        author: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const openChat = () => {
    setIsOpen(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 300);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className="fixed z-50 transition-all duration-500 ease-in-out"
      style={{
        bottom: isMobile ? '80px' : '24px', // Above mobile nav
        left: '24px',
        width: isOpen ? (isMobile ? 'calc(100vw - 48px)' : '420px') : '56px',
        maxWidth: isOpen ? '420px' : '56px',
        height: isOpen ? (isMobile ? '70vh' : '560px') : '56px',
      }}
    >
      {/* Morphing Container */}
      <div 
        className={`
          relative w-full h-full overflow-hidden shadow-lg ring-1 ring-white/10 
          transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          ${isOpen 
            ? 'rounded-2xl bg-neutral-900 shadow-2xl shadow-black/50' 
            : 'rounded-full bg-orange-500 shadow-orange-900/30 cursor-pointer hover:bg-orange-600 active:bg-orange-700'
          }
        `}
        onClick={!isOpen ? openChat : undefined}
      >
        {/* Collapsed Button */}
        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="relative w-14 h-14 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full"
              title="Chat with support"
              aria-label="Chat with support"
            >
              {/* Glossy effect */}
              <div className="absolute inset-0 rounded-full pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-[58%] rounded-t-full bg-gradient-to-b from-white/50 via-white/20 to-transparent opacity-80"></div>
                <div className="absolute top-1 left-2 w-6 h-6 rounded-full bg-white/35 blur-[6px] opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[42%] rounded-b-full bg-black/20 opacity-60"></div>
              </div>
              <MessageCircle 
                className="relative z-10 w-6 h-6 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]" 
                strokeWidth={1.5}
              />
            </button>
          </div>
        )}

        {/* Expanded Chat Panel */}
        {isOpen && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg grid place-items-center bg-orange-500 text-white ring-1 ring-white/10">
                    <Bot className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="absolute -right-1 -bottom-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-900"></span>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[20px] tracking-tight font-semibold text-white">Support</h2>
                  <span className="text-xs text-neutral-400">Online • AI-powered assistance</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={closeChat}
                  className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-white/5 active:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  title="Minimize"
                  aria-label="Minimize chat"
                >
                  <Minus className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={closeChat}
                  className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-white/5 active:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  title="Close"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${msg.author === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.author === 'bot' && (
                    <div className="w-8 h-8 rounded-md bg-orange-500/20 ring-1 ring-orange-500/30 grid place-items-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-orange-400" strokeWidth={1.5} />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${msg.author === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
                        msg.author === 'user'
                          ? 'bg-orange-500/15 text-orange-100 ring-1 ring-orange-500/30'
                          : 'bg-neutral-800/70 ring-1 ring-white/10 text-neutral-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="mt-1 text-[11px] text-neutral-400">
                      {msg.author === 'user' ? 'You' : 'Support'} • {new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {msg.author === 'user' && (
                    <div className="w-8 h-8 rounded-md bg-blue-500/20 ring-1 ring-blue-500/30 grid place-items-center flex-shrink-0">
                      <span className="text-xs font-semibold text-blue-400">You</span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-orange-500/20 ring-1 ring-orange-500/30 grid place-items-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-orange-400" strokeWidth={1.5} />
                  </div>
                  <div className="max-w-[85%]">
                    <div className="rounded-lg bg-neutral-800/70 ring-1 ring-white/10 px-3 py-2 text-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-3">
              <div className="flex items-end gap-2">
                <div className="flex-1 rounded-lg bg-neutral-800/60 ring-1 ring-white/10 focus-within:ring-white/20 transition-colors">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full resize-none bg-transparent outline-none px-3 py-2 text-sm placeholder:text-neutral-500 text-white"
                    rows="1"
                    placeholder="Type your message... (Shift+Enter for new line)"
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="h-10 px-3 rounded-lg bg-orange-500 text-white ring-1 ring-white/10 hover:bg-orange-600 active:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  title="Send"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="mt-2 text-[11px] text-neutral-500 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" strokeWidth={1.5} />
                Secure & private • We'll never share your info
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportChatbot;

