
import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ComparisonSlider from './components/ComparisonSlider';

const BeforeAfterCard = ({ beforeText, afterText, cost, title, isDarkMode }: { beforeText: string, afterText: string, cost: string, title: string, isDarkMode: boolean }) => (
  <div className={`group p-6 rounded-[2rem] border transition-all duration-500 hover:scale-[1.02] ${isDarkMode ? 'bg-[#111] border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#fb923c] to-[#c2410c]"></div>
      <h4 className="text-xl md:text-2xl serif font-medium">{title}</h4>
    </div>
    <div className="space-y-4 text-[14px] font-light">
      <div className="relative pl-6 border-l border-white/5 dark:border-white/10">
        <span className="block opacity-40 uppercase tracking-[0.2em] text-[9px] font-bold mb-1">The Problem</span>
        <p className="opacity-70 leading-relaxed italic">"{beforeText}"</p>
      </div>
      <div className="relative pl-6 border-l border-orange-500/30">
        <span className="block text-gradient-orange uppercase tracking-[0.2em] text-[9px] font-bold mb-1">The Hack</span>
        <p className="opacity-90 leading-relaxed font-normal">{afterText}</p>
      </div>
    </div>
    <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-50'} flex justify-between items-end`}>
      <div className="flex flex-col">
        <span className="text-[9px] opacity-40 uppercase tracking-widest font-bold">Estimated Cost</span>
        <span className="text-xl font-bold text-gradient-orange tracking-tight">{cost}</span>
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
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none opacity-10 blur-[150px] rounded-full transition-all duration-700 ${isDarkMode ? 'bg-gradient-to-br from-orange-900/40 via-orange-950/10 to-transparent' : 'bg-gradient-to-br from-orange-200 to-transparent'}`}></div>
      
      {/* Header */}
      <header className={`relative z-40 py-4 px-6 md:px-12 flex justify-between items-center border-b ${isDarkMode ? 'border-white/5 bg-[#0a0a0a]/70 backdrop-blur-xl' : 'border-gray-100 bg-white/70 backdrop-blur-xl'}`}>
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20 group-hover:scale-105 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 3L4 9V21H20V9L12 3Z" />
               </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-jakarta font-extrabold tracking-tight leading-none text-white dark:text-white">
                InteriorCost<span className="text-orange-500">.in</span>
              </h1>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 mt-0.5">
                by beyondbranding.media
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://wa.me/447441342347" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold"
          >
            Contact
          </a>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`group p-2.5 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-black/5 hover:bg-black/10 text-gray-500 shadow-sm'}`}
          >
            {isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-30 flex-1 flex flex-col">
        
        {/* Modernized Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest font-black text-orange-500">Unaesthetic to Breathable</span>
            </div>
            <h2 className={`text-5xl md:text-8xl serif tracking-tight leading-[1.0] mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Breathe life into your <br />
              <span className="italic opacity-90 text-gradient-orange font-medium">Indian home.</span>
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Stop hiring expensive designers for simple spaces. Fix lighting, refresh walls, and add greenery. Instantly estimate and visualize the change.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <button onClick={scrollToChat} className="px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold shadow-xl shadow-orange-600/30 transform hover:-translate-y-0.5 transition-all">Start Assessment</button>
               <a href="https://wa.me/447441342347" target="_blank" rel="noopener noreferrer" className="px-10 py-4 border border-white/10 rounded-2xl font-bold backdrop-blur-sm hover:bg-white/5 transition-all inline-flex items-center gap-2">Contact Us</a>
            </div>
          </div>

          {/* Image Left, Table Right Grid */}
          <div className="grid lg:grid-cols-12 gap-10 items-center animate-fade-in-up">
            {/* Left: Comparison Slider */}
            <div className="lg:col-span-7 relative group">
              <ComparisonSlider 
                beforeImage="./before.jpg" 
                afterImage="./after.jpg" 
              />
            </div>

            {/* Right: Price Breakup Table */}
            <div className="lg:col-span-5">
              <div className={`rounded-[2rem] border transition-all overflow-hidden ${isDarkMode ? 'bg-[#111] border-white/5 shadow-3xl' : 'bg-white border-gray-100 shadow-2xl'}`}>
                <div className="bg-[#1a1a1a] px-8 py-5 flex justify-between items-center text-white border-b border-white/5">
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-orange-500 mb-0.5">Project Estimate</span>
                    <span className="text-xl md:text-2xl font-black text-white">₹38,500 – ₹49,000</span>
                  </div>
                  <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">Typical Refresh</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-4">
                  {[
                    { label: "Wall + ceiling paint", val: "18,000 – 22,000" },
                    { label: "Furniture repaint", val: "6,000 – 7,500" },
                    { label: "Curtains & cushions", val: "5,000 – 6,500" },
                    { label: "TV + gramophone + decor", val: "5,500 – 7,500" },
                    { label: "Lighting", val: "2,000 – 2,500" },
                    { label: "Misc fixes", val: "2,000 – 3,000" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center group/row transition-colors">
                      <span className="text-sm opacity-50 font-medium group-hover/row:opacity-100 transition-opacity">{item.label}</span>
                      <span className="text-sm font-bold tabular-nums opacity-90">{item.val}</span>
                    </div>
                  ))}
                  <div className={`flex justify-between items-center pt-5 mt-2 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">TOTAL</span>
                    <span className="text-2xl font-black text-gradient-orange">₹38,500 – ₹49,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Interface Section */}
        <section id="chat-section" className="flex-1 flex flex-col py-12 md:py-20 border-t border-white/5">
          <ChatInterface isDarkMode={isDarkMode} />
        </section>

        {/* Visual Philosophy - Reduced Padding */}
        <section className={`py-20 px-6 md:px-12 border-t ${isDarkMode ? 'border-white/5 bg-[#080808]' : 'border-gray-100 bg-white'}`}>
          <div className="max-w-6xl mx-auto space-y-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl serif leading-tight">The "Unaesthetic" <br/> Indian Living Room</h3>
                <p className="text-lg opacity-60 font-light leading-relaxed">Most urban apartments are cluttered with mismatched furniture and harsh tubelights. We call it "The Tube-Light Trap." Here's the logic of fixing it for under ₹40k.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-3">
                   <p className="text-3xl font-bold text-gradient-orange">85%</p>
                   <p className="text-[10px] opacity-50 uppercase tracking-widest font-black">Efficiency</p>
                   <p className="text-sm opacity-60">of rooms transform just with warm light layers.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-3">
                   <p className="text-3xl font-bold text-gradient-orange">₹10k</p>
                   <p className="text-[10px] opacity-50 uppercase tracking-widest font-black">Impactful Start</p>
                   <p className="text-sm opacity-60">to reset the energy of a typical hall.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <BeforeAfterCard 
                title="Lighting Reset"
                beforeText="Generic top-down white tubelights and dark, depressing corners."
                afterText="Warm lamps at eye level, yellow bulbs, and intentional shadows."
                cost="₹1,200 – ₹2,500"
                isDarkMode={isDarkMode}
              />
              <BeforeAfterCard 
                title="Flat-White Hack"
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

      <footer className={`py-12 px-6 text-center text-sm font-light opacity-30 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-orange-600 flex items-center justify-center font-bold text-white text-[10px]">I</div>
            <h1 className="text-lg font-jakarta font-bold tracking-tight">InteriorCost<span className="text-orange-500">.in</span></h1>
          </div>
          <p className="max-w-md">Helping Indian urban dwellers rethink their homes without the pressure of luxury brands.</p>
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold">&copy; {new Date().getFullYear()} • Truth in Design.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
