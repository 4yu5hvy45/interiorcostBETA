
import React, { useState, useRef, useEffect } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPos((x / rect.width) * 100);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] lg:aspect-square rounded-[2rem] overflow-hidden cursor-ew-resize shadow-2xl ring-1 ring-white/10 group select-none touch-none"
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
    >
      {/* After Image */}
      <img 
        src={afterImage} 
        alt="Improved Space" 
        draggable="false"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
      />
      
      {/* Before Image (Clipped Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Unaesthetic Space" 
          draggable="false"
          className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none" 
          style={{ width: '100vw', maxWidth: '2000px' }} 
        />
      </div>

      {/* Slider Divider Line */}
      <div 
        className="absolute inset-y-0 w-0.5 bg-white/50 backdrop-blur-sm pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-orange-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-3 3m0 0l3 3m-3-3h14m-4-6l3 3m0 0l-3 3" />
          </svg>
        </div>
      </div>

      {/* Aesthetic Labels */}
      <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        Before
      </div>
      <div className="absolute bottom-6 right-6 bg-orange-600/60 backdrop-blur-md border border-orange-400/20 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        After
      </div>
    </div>
  );
};

export default ComparisonSlider;
