
import React from 'react';
import { ChatMessage as ChatMessageType, Verdict } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  isDarkMode: boolean;
}

const VerdictCard: React.FC<{ data: Verdict; isDarkMode: boolean }> = ({ data, isDarkMode }) => (
  <div className={`mt-6 rounded-[2rem] overflow-hidden border transition-all duration-700 animate-fade-in-up ${isDarkMode ? 'bg-[#111] border-white/5' : 'bg-white border-gray-100 shadow-xl'}`}>
    {/* Clean List Header */}
    <div className={`px-8 pt-10 pb-6 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
      <span className="text-[10px] uppercase tracking-[0.4em] font-black text-orange-500 block mb-4">Space Assessment Report</span>
      <p className="text-lg font-light serif italic opacity-80 leading-snug">"{data.verdict}"</p>
    </div>

    {/* The Breakup List - Matching Screenshot Style */}
    <div className="px-8 py-6">
      <div className="space-y-4">
        {data.breakup.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-[15px]">
            <span className="opacity-70 font-medium">{item.item}</span>
            <span className="font-bold tabular-nums opacity-90">{item.cost}</span>
          </div>
        ))}
        
        {/* Total Row */}
        <div className={`flex justify-between items-center pt-6 border-t mt-6 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <span className="text-sm font-black uppercase tracking-widest">TOTAL</span>
          <span className="text-2xl font-black tabular-nums text-gradient-orange">{data.estimated_cost}</span>
        </div>
      </div>
    </div>

    {/* Ultra-Budget Section */}
    <div className={`px-8 py-10 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50/50'} border-t border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🔥</span>
        <h4 className="text-lg font-bold tracking-tight">Ultra-budget version (if you push hard)</h4>
      </div>
      <p className="text-sm opacity-60 mb-6 font-light">If you negotiate labour + reuse some items:</p>
      <div className="flex items-center gap-4">
         <span className="text-xl">👉</span>
         <span className="text-2xl font-black text-orange-500">{data.ultra_budget_cost} doable</span>
      </div>
    </div>

    {/* My Honest Take (Designer POV) */}
    <div className="px-8 py-10">
      <h4 className="text-lg font-bold tracking-tight mb-4">My honest take (designer POV)</h4>
      <div className="flex items-start gap-3">
        <span className="text-orange-500 font-black">•</span>
        <p className="text-base font-medium opacity-80">{data.transformation_logic}</p>
      </div>
      
      {/* Reasoning Footer */}
      <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
         <p className="text-sm italic opacity-50 serif leading-relaxed">
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
      <div className={`max-w-[95%] md:max-w-[85%] ${isAssistant ? '' : 'text-right'}`}>
        {message.image && (
          <div className="mb-4 inline-block rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl">
            <img src={message.image} alt="User upload" className="max-h-[450px] w-auto object-cover" />
          </div>
        )}
        
        {message.text && (
          <div
            className={`inline-block px-8 py-5 rounded-[2rem] leading-relaxed text-[15px] md:text-lg transition-all duration-500 ${
              isAssistant
                ? (isDarkMode ? 'bg-[#181818] text-white/90 border border-white/5 shadow-xl' : 'bg-white text-gray-800 border border-gray-100 shadow-md')
                : 'bg-gradient-to-br from-[#fb923c] to-[#c2410c] text-white shadow-2xl font-semibold'
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
          <div className="mt-8 animate-fade-in-up">
            <div className="relative inline-block rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl group">
              <img src={message.visualizationImage} alt="Visual Concept" className="max-h-[650px] w-auto object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <span className="text-white text-xs font-black uppercase tracking-widest">Logic-based simulation</span>
              </div>
            </div>
            <p className="text-[10px] mt-4 opacity-30 italic tracking-[0.2em] font-bold uppercase">Conceptual Visualization</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
