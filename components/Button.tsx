
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = "px-7 py-3.5 rounded-2xl font-semibold tracking-tight transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-b from-[#fb923c] to-[#c2410c] text-white hover:shadow-lg hover:shadow-orange-600/20 hover:-translate-y-0.5",
    secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/10",
    outline: "border border-gray-400/30 text-current hover:bg-black/5 dark:hover:bg-white/5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
