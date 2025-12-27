import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  X, 
  Wrench, 
  Search 
} from 'lucide-react';
import { Message } from '../types';
import { cn } from '../utils/cn';
import { useChat } from '../hooks/useChat';

export const ChatOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput('');
  };

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-[100] transition-all duration-500",
      isMaximized ? "inset-6 bottom-6 right-6" : "w-[450px]"
    )}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            layoutId="chat-window"
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-2xl bg-brand-gold flex items-center justify-center glow-gold text-slate-950 shadow-2xl hover:scale-110 transition-transform ml-auto"
          >
            <Bot size={32} />
          </motion.button>
        ) : (
          <motion.div
            layoutId="chat-window"
            className={cn(
              "glass-darker rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden",
              isMaximized ? "h-full" : "h-[600px]"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AeroCorp Intelligence</h3>
                  <div className="flex items-center gap-1.5 ">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Active Terminal</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMaximized(!isMaximized)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.map((msg: Message) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center",
                    msg.role === 'user' ? "bg-brand-blue text-white" : "bg-brand-gold/10 text-brand-gold"
                  )}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className="space-y-2">
                    <div className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-brand-blue text-white rounded-tr-none shadow-brand-blue/10 shadow-lg" 
                        : "glass border-white/5 rounded-tl-none"
                    )}>
                      {msg.content}
                    </div>
                    
                    {msg.tools && (
                      <div className="flex flex-wrap gap-2">
                        {msg.tools.map((tool: string) => (
                          <span key={tool} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-400">
                            <Wrench size={10} />
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}

                    {msg.parameters && (
                      <div className="p-2 rounded-xl bg-brand-gold/5 border border-brand-gold/10 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-brand-gold uppercase tracking-widest font-bold">
                          <Search size={10} />
                          Extracted Data
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1 text-[10px]">
                          {Object.entries(msg.parameters).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <span className="text-slate-500 capitalize">{key}</span>
                              <span className="text-white font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-4 items-center text-slate-500 ml-2">
                  <Bot size={16} className="animate-bounce" />
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse delay-75" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse delay-150" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative group">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask AeroCorp Intelligence..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-4 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all placeholder:text-slate-600"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-brand-gold text-slate-950 rounded-xl hover:scale-105 transition-transform flex items-center justify-center glow-gold"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-3 text-center">
                 AeroCorp AI may provide high-level insights. Verify critical parameters.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
