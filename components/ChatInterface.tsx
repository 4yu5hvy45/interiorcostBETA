
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType, ChatStep, BudgetLevel, Mood, Verdict } from '../types';
import ChatMessage from './ChatMessage';
import { BUDGET_OPTIONS, MOOD_OPTIONS } from '../constants';
import { analyzeRoom, visualizeImprovements } from '../services/geminiService';
import Button from './Button';

interface ChatInterfaceProps {
  isDarkMode: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isDarkMode }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'assistant',
      text: "Is your room feeling 'unaesthetic'? Most Indian homes just need better logic, not more money. Upload a photo and let's rethink your space with honest, high-impact fixes.",
    }
  ]);
  const [step, setStep] = useState<ChatStep | 'VISUALIZING'>('UPLOAD_PHOTO');
  const [userContext, setUserContext] = useState<{
    image?: string;
    budget?: BudgetLevel;
    mood?: Mood;
    verdict?: Verdict;
  }>({});
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const addMessage = (msg: Omit<ChatMessageType, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setMessages(prev => [...prev, { ...msg, id }]);
    return id;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setUserContext(prev => ({ ...prev, image: base64 }));
      addMessage({ role: 'user', image: base64 });
      setStep('SELECT_BUDGET');
      
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          text: "Understood. What's a realistic budget you're aiming for? We'll prioritize the most impactful changes first.",
        });
      }, 600);
    };
    reader.readAsDataURL(file);
  };

  const handleBudgetSelect = (budget: BudgetLevel) => {
    setUserContext(prev => ({ ...prev, budget }));
    addMessage({ role: 'user', text: budget });
    setStep('SELECT_MOOD');

    setTimeout(() => {
      addMessage({
        role: 'assistant',
        text: "Perfect. And what kind of atmosphere or energy would you like this space to have?",
      });
    }, 600);
  };

  const handleMoodSelect = (mood: Mood) => {
    setUserContext(prev => ({ ...prev, mood }));
    addMessage({ role: 'user', text: mood });
    setStep('ANALYZING');
    
    performAnalysis(userContext.image!, userContext.budget!, mood);
  };

  const performAnalysis = async (image: string, budget: BudgetLevel, mood: Mood) => {
    const loadingId = addMessage({
      role: 'assistant',
      text: "Scanning for lighting flaws, wall opportunities, and layout hacks...",
      isLoading: true
    });

    try {
      const result = await analyzeRoom(image, budget, mood);
      setUserContext(prev => ({ ...prev, verdict: result }));
      
      setMessages(prev => prev.filter(m => m.id !== loadingId));
      
      addMessage({
        role: 'assistant',
        text: "I've reviewed your room. Here's my honest take on how to transform it with high-impact, low-cost logic.",
      });

      addMessage({
        role: 'assistant',
        isVerdict: true,
        verdictData: result
      });

      setStep('COMPLETED');
    } catch (err) {
      setMessages(prev => prev.filter(m => m.id !== loadingId));
      addMessage({
        role: 'assistant',
        text: "I had a bit of trouble reading the space. Could you try a clearer photo from another angle?",
      });
      setStep('UPLOAD_PHOTO');
    }
  };

  const handleVisualize = async () => {
    if (!userContext.image || !userContext.verdict || !userContext.mood) return;
    
    setStep('VISUALIZING');
    addMessage({ role: 'user', text: "Show me a visual simulation." });
    
    const loadingId = addMessage({
      role: 'assistant',
      text: "Simulating white walls, warm lighting, and greenery...",
      isLoading: true
    });

    try {
      const visualUrl = await visualizeImprovements(userContext.image, userContext.verdict, userContext.mood);
      
      setMessages(prev => prev.filter(m => m.id !== loadingId));
      
      addMessage({
        role: 'assistant',
        text: "Here's the conceptual look. Notice how the space breathes when you swap tubelights for warm layers and refresh the walls.",
      });

      addMessage({
        role: 'assistant',
        isVisualization: true,
        visualizationImage: visualUrl
      });
      
      setStep('COMPLETED');
    } catch (err) {
      setMessages(prev => prev.filter(m => m.id !== loadingId));
      addMessage({
        role: 'assistant',
        text: "Visualization snagged, but the recommendations above are your real roadmap.",
      });
      setStep('COMPLETED');
    }
  };

  return (
    <div className={`flex flex-col h-full max-w-5xl mx-auto w-full relative z-20`}>
      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar px-6 py-16 space-y-4"
      >
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>

      {/* Interaction Area */}
      <div className={`p-8 md:p-14 border-t ${isDarkMode ? 'border-white/5 bg-[#0a0a0a]/90 backdrop-blur-2xl' : 'border-gray-100 bg-white/90 backdrop-blur-2xl'} transition-all sticky bottom-0 z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]`}>
        <div className="max-w-3xl mx-auto">
          {step === 'UPLOAD_PHOTO' && (
            <div className="flex flex-col items-center gap-8 animate-fade-in">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageUpload}
              />
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#fb923c] to-[#c2410c] opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity"></div>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full md:w-auto text-xl px-16 py-5 relative"
                >
                  Analyze My Room
                </Button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm opacity-50 text-center font-medium tracking-wide">Honest advice • Instant results • 100% Free</p>
                <div className="flex gap-2">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-orange-500 opacity-20"></div>)}
                </div>
              </div>
            </div>
          )}

          {step === 'SELECT_BUDGET' && (
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleBudgetSelect(opt.id as BudgetLevel)}
                  className={`group px-8 py-6 rounded-[2rem] text-[15px] transition-all border flex flex-col items-center gap-3 min-w-[160px] shadow-sm ${
                    isDarkMode 
                      ? 'border-white/5 hover:border-orange-500/40 hover:bg-orange-500/5 bg-[#141414]' 
                      : 'border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 bg-white'
                  }`}
                >
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{opt.icon}</span>
                  <div className="text-center">
                    <span className="block font-black tracking-tight">{opt.id}</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">{opt.label.split('(')[1]?.replace(')', '') || 'Budget'}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 'SELECT_MOOD' && (
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              {MOOD_OPTIONS.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(mood as Mood)}
                  className={`px-10 py-5 rounded-[2rem] text-base font-bold tracking-tight transition-all border shadow-sm ${
                    isDarkMode 
                      ? 'border-white/5 hover:border-orange-500/40 hover:bg-orange-500/5 bg-[#141414]' 
                      : 'border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 bg-white'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          )}

          {(step === 'ANALYZING' || step === 'VISUALIZING') && (
            <div className="flex flex-col items-center gap-6 py-4 animate-fade-in">
              <div className="w-24 h-1 bg-gray-500/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#fb923c] to-[#c2410c] animate-progress"></div>
              </div>
              <p className="text-xs font-black tracking-[0.3em] uppercase opacity-40">
                {step === 'ANALYZING' ? 'Consulting the logic engine...' : 'Crafting the simulation...'}
              </p>
            </div>
          )}

          {step === 'COMPLETED' && (
            <div className="flex flex-col md:flex-row justify-center gap-6 animate-fade-in">
              {!messages.some(m => m.isVisualization) && (
                <Button 
                  onClick={handleVisualize}
                  className="w-full md:w-auto px-12"
                >
                  Visualise Hacks
                </Button>
              )}
              <Button 
                variant="outline"
                className="w-full md:w-auto px-10 border-orange-500/20 text-gradient-orange hover:bg-orange-500/5"
                onClick={() => {
                  setMessages([{
                    id: '1',
                    role: 'assistant',
                    text: "Truth starts with a fresh frame. Upload a new photo and let's optimize your next space.",
                  }]);
                  setStep('UPLOAD_PHOTO');
                  setUserContext({});
                }}
              >
                Assess Another Room
              </Button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
