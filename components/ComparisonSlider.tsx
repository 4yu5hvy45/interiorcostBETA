
import React, { useState, useRef } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPos((x / rect.width) * 100);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) handleMove(e.clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-2xl ring-1 ring-white/10 group select-none"
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => handleMove(e.clientX)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full Background) */}
      <img src={afterImage} alt="Improved Space" className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Before Image (Clipped Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75 ease-out"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Unaesthetic Space" 
          className="absolute inset-0 w-full h-full object-cover max-w-none" 
          style={{ width: '100vw', maxWidth: '1200px' }} 
        />
      </div>

      {/* Slider Divider Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-orange-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-3 3m0 0l3 3m-3-3h14m-4-6l3 3m0 0l-3 3" />
          </svg>
        </div>
      </div>

      {/* Aesthetic Labels */}
      <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        Before
      </div>
      <div className="absolute top-6 right-6 bg-orange-600/40 backdrop-blur-md border border-orange-400/20 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        After
      </div>
    </div>
  );
};

export default ComparisonSlider;
