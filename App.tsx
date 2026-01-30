
import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ComparisonSlider from './components/ComparisonSlider';

const BeforeAfterCard = ({ beforeText, afterText, cost, title, isDarkMode }: { beforeText: string, afterText: string, cost: string, title: string, isDarkMode: boolean }) => (
  <div className={`group p-8 rounded-[2.5rem] border transition-all duration-500 hover:scale-[1.02] ${isDarkMode ? 'bg-[#111] border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#fb923c] to-[#c2410c]"></div>
      <h4 className="text-2xl serif font-medium">{title}</h4>
    </div>
    <div className="space-y-6 text-[15px] font-light">
      <div className="relative pl-6 border-l border-white/5 dark:border-white/10">
        <span className="absolute -left-[1px] top-0 w-[2px] h-4 bg-gray-400 opacity-20"></span>
        <span className="block opacity-40 uppercase tracking-[0.2em] text-[10px] font-bold mb-2">The Problem</span>
        <p className="opacity-70 leading-relaxed italic">"{beforeText}"</p>
      </div>
      <div className="relative pl-6 border-l border-orange-500/30">
        <span className="absolute -left-[1px] top-0 w-[2px] h-4 bg-orange-500"></span>
        <span className="block text-gradient-orange uppercase tracking-[0.2em] text-[10px] font-bold mb-2">The Hack</span>
        <p className="opacity-90 leading-relaxed font-normal">{afterText}</p>
      </div>
    </div>
    <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-50'} flex justify-between items-end`}>
      <div className="flex flex-col">
        <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Estimated Cost</span>
        <span className="text-2xl font-bold text-gradient-orange tracking-tight">{cost}</span>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const scrollToChat = () => {
    document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col relative overflow-hidden ${isDarkMode ? 'bg-[#0a0a0a] text-[#e0e0e0]' : 'bg-[#f8fafc] text-[#1f2937]'}`}>
      
      {/* Visual Background Decoration */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1200px] pointer-events-none opacity-20 blur-[150px] rounded-full transition-all duration-700 ${isDarkMode ? 'bg-gradient-to-br from-orange-900/40 via-orange-950/10 to-transparent' : 'bg-gradient-to-br from-orange-200 to-transparent'}`}></div>
      
      {/* Header */}
      <header className={`relative z-40 py-6 px-6 md:px-12 flex justify-between items-center border-b ${isDarkMode ? 'border-white/5 bg-[#0a0a0a]/70 backdrop-blur-xl' : 'border-gray-100 bg-white/70 backdrop-blur-xl'}`}>
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative flex items-center">
            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#fb923c] to-[#c2410c] rounded-2xl rotate-3 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-orange-600/20"></div>
               <div className={`absolute inset-[1.5px] ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} rounded-[14px]`}></div>
               <div className="relative flex flex-col items-center -space-y-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gradient-orange" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 3L4 9V21H20V9L12 3ZM12 7.7C12.8 7.7 13.5 8.4 13.5 9.2C13.5 10 12.8 10.7 12 10.7C11.2 10.7 10.5 10 10.5 9.2C10.5 8.4 11.2 7.7 12 7.7Z" />
                 </svg>
                 <span className="text-gradient-orange font-bold text-sm tracking-tighter">₹</span>
               </div>
            </div>
            <div className="ml-3 flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight leading-none">
                InteriorCost<span className="text-gradient-orange">.in</span>
              </h1>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30 mt-1">
                A product of <a href="https://beyondbranding.media" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors pointer-events-auto">beyondbranding.media</a>
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={scrollToChat}
            className="hidden md:block px-6 py-2.5 bg-gradient-to-br from-[#fb923c] to-[#c2410c] text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-600/20 hover:-translate-y-0.5 transition-all"
          >
            Analyze My Room
          </button>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`group p-3 rounded-2xl transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-black/5 hover:bg-black/10 text-gray-500 shadow-sm'}`}
          >
            {isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-30 flex-1 flex flex-col">
        
        {/* Centered Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-32 text-center animate-fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-gradient-orange">Unaesthetic to Breathable</span>
          </div>
          <h2 className={`text-5xl md:text-8xl serif tracking-tight leading-[1.0] mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Breathe life into your <br />
            <span className="italic opacity-90 text-gradient-orange font-medium">Indian home.</span>
          </h2>
          <p className={`text-xl md:text-2xl max-w-2xl font-light leading-relaxed mb-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Stop hiring expensive designers for simple spaces. Fix the tubelights, paint the walls white, and add life with greenery. Instantly estimate and visualize the change.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20">
             <button onClick={scrollToChat} className="px-12 py-5 bg-gradient-to-br from-[#fb923c] to-[#c2410c] text-white rounded-2xl font-bold shadow-2xl shadow-orange-600/40 transform hover:-translate-y-1 transition-all">Start Assessment</button>
             <button className="px-10 py-5 border border-white/10 rounded-2xl font-bold backdrop-blur-sm hover:bg-white/5 transition-all">Why this exists</button>
          </div>

          <div className="relative w-full max-w-5xl animate-fade-in [animation-delay:200ms] group">
            <ComparisonSlider 
              beforeImage="https://images.unsplash.com/photo-1594391307908-410a703d987e?auto=format&fit=crop&q=80&w=1200" 
              afterImage="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200" 
            />
            
            {/* One static element that shows costing examples */}
            <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:min-w-[400px] p-6 rounded-[2rem] border transition-all ${isDarkMode ? 'bg-[#111] border-white/5 shadow-3xl' : 'bg-white border-gray-100 shadow-2xl'} z-50 flex items-center justify-between gap-8 group-hover:-translate-y-2`}>
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-widest font-black text-orange-400">Warm Layered Lighting</span>
                <span className="text-xl font-bold">₹1,200</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10"></div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-widest font-black text-orange-400">Crisp Off-White Refresh</span>
                <span className="text-xl font-bold">₹4,500</span>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Interface Section */}
        <section id="chat-section" className="flex-1 min-h-[900px] flex flex-col pb-32 mt-20">
          <ChatInterface isDarkMode={isDarkMode} />
        </section>

        {/* Visual Philosophy */}
        <section className={`py-40 px-6 md:px-12 border-t ${isDarkMode ? 'border-white/5 bg-[#080808]' : 'border-gray-100 bg-white'}`}>
          <div className="max-w-6xl mx-auto space-y-32">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-8">
                <h3 className="text-4xl md:text-5xl serif leading-tight">The "Unaesthetic" <br/> Indian Living Room</h3>
                <p className="text-lg opacity-60 font-light leading-relaxed">Most urban apartments are cluttered with mismatched furniture and harsh tubelights. We call it "The Tube-Light Trap." Here's the logic of fixing it for under ₹10k.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 space-y-3">
                   <p className="text-4xl font-bold text-gradient-orange">85%</p>
                   <p className="text-xs opacity-50 uppercase tracking-widest font-black">Efficiency</p>
                   <p className="text-sm opacity-60">of rooms transform just with warm light layers.</p>
                </div>
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 space-y-3">
                   <p className="text-4xl font-bold text-gradient-orange">₹5k</p>
                   <p className="text-xs opacity-50 uppercase tracking-widest font-black">Median Spend</p>
                   <p className="text-sm opacity-60">to reset the energy of a typical hall.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <BeforeAfterCard 
                title="The Lighting Reset"
                beforeText="Generic top-down white tubelights and dark, depressing corners."
                afterText="Warm lamps at eye level, yellow bulbs, and intentional shadows."
                cost="₹1,200 – ₹2,500"
                isDarkMode={isDarkMode}
              />
              <BeforeAfterCard 
                title="The Flat-White Hack"
                beforeText="Dirty 'off-white' walls with dated accent colors that shrink the space."
                afterText="Crisp, flat off-white paint to bounce light and clean the visual slate."
                cost="₹5,000 – ₹9,000"
                isDarkMode={isDarkMode}
              />
              <BeforeAfterCard 
                title="Greenery Logic"
                beforeText="Dead corners filled with junk and heavy, dust-trapping curtains."
                afterText="Snake plants, sheers, and clear walking paths for flow."
                cost="₹1,500 – ₹4,000"
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-20 px-6 text-center text-sm font-light opacity-30 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#fb923c] to-[#c2410c] flex items-center justify-center font-bold text-white text-xs serif">I</div>
            <h1 className="text-xl font-bold tracking-tight">InteriorCost.in</h1>
          </div>
          <p className="max-w-md">Helping Indian urban dwellers rethink their homes without the pressure of luxury brands or contractors.</p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mt-4">&copy; {new Date().getFullYear()} • Truth in Design.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
