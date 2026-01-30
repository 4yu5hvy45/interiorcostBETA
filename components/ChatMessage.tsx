
import React from 'react';
import { ChatMessage as ChatMessageType, Verdict } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  isDarkMode: boolean;
}

const VerdictCard: React.FC<{ data: Verdict; isDarkMode: boolean }> = ({ data, isDarkMode }) => (
  <div className={`mt-6 p-8 md:p-10 rounded-[2.5rem] overflow-hidden relative ${isDarkMode ? 'bg-[#141414] border border-white/5 shadow-3xl shadow-black/50' : 'bg-white border border-gray-100 shadow-2xl shadow-orange-900/5'}`}>
    {/* Decorative corner glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] pointer-events-none"></div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fb923c] to-[#c2410c] flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className={`text-sm uppercase tracking-[0.25em] font-black ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Advisor Verdict</h3>
      </div>

      <div className="mb-10">
        <p className={`text-3xl md:text-4xl serif italic leading-tight mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          "{data.verdict}"
        </p>
      </div>

      <div className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/10">
        <h3 className={`text-[10px] uppercase tracking-[0.3em] font-black mb-2 ${isDarkMode ? 'text-orange-500/60' : 'text-orange-600/60'}`}>Recommended Budget</h3>
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-black text-gradient-orange tracking-tighter">{data.estimated_cost}</p>
          <span className="text-xs opacity-40 font-bold uppercase tracking-widest">Full Setup</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className={`p-6 rounded-[2rem] transition-all ${isDarkMode ? 'bg-white/[0.03] hover:bg-white/[0.05]' : 'bg-green-50/30'}`}>
          <h4 className="text-xs uppercase tracking-[0.2em] font-black mb-4 text-green-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
            Impactful Fixes
          </h4>
          <ul className="space-y-3">
            {data.worth_fixing.map((item, i) => (
              <li key={i} className="text-[15px] opacity-90 leading-snug flex items-start gap-3">
                <span className="text-green-500 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`p-6 rounded-[2rem] transition-all ${isDarkMode ? 'bg-white/[0.03] hover:bg-white/[0.05]' : 'bg-red-50/30'}`}>
          <h4 className="text-xs uppercase tracking-[0.2em] font-black mb-4 text-red-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></span>
            Save Your Money
          </h4>
          <ul className="space-y-3">
            {data.avoid_spending_on.map((item, i) => (
              <li key={i} className="text-[15px] opacity-90 leading-snug flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
        <h4 className={`text-[10px] uppercase tracking-[0.3em] font-black ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Deep Reasoning</h4>
        <p className={`text-lg leading-relaxed opacity-80 font-light italic serif ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {data.reasoning}
        </p>
      </div>
    </div>
  </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDarkMode }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex w-full mb-10 ${isAssistant ? 'justify-start' : 'justify-end animate-fade-in'}`}>
      <div className={`max-w-[85%] md:max-w-[80%] ${isAssistant ? '' : 'text-right'}`}>
        {message.image && (
          <div className="mb-4 inline-block rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl ring-8 ring-black/5">
            <img src={message.image} alt="User upload" className="max-h-[450px] w-auto object-cover transition-transform duration-700 hover:scale-110" />
          </div>
        )}
        
        {message.text && (
          <div
            className={`inline-block px-7 py-5 rounded-[2rem] leading-relaxed text-[15px] md:text-lg transition-all duration-500 ${
              isAssistant
                ? (isDarkMode ? 'bg-[#181818] text-white/90 border border-white/5 shadow-xl' : 'bg-white text-gray-800 border border-gray-100 shadow-md')
                : 'bg-gradient-to-br from-[#fb923c] to-[#c2410c] text-white shadow-2xl shadow-orange-900/30 font-semibold'
            }`}
          >
            {message.isLoading ? (
              <div className="flex gap-2 py-2">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            ) : (
              message.text
            )}
          </div>
        )}

        {message.isVerdict && message.verdictData && (
          <VerdictCard data={message.verdictData} isDarkMode={isDarkMode} />
        )}

        {message.isVisualization && message.visualizationImage && (
          <div className="mt-8">
            <div className="relative inline-block rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl ring-[12px] ring-black/10 group">
              <img src={message.visualizationImage} alt="Visual Concept" className="max-h-[600px] w-auto object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <p className="text-white text-xs font-bold uppercase tracking-widest">Conceptual Transformation</p>
              </div>
            </div>
            <p className="text-[10px] mt-4 opacity-30 italic tracking-[0.2em] font-bold uppercase">AI Simulation • Implement the hacks to achieve this look</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
