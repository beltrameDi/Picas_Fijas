
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = "w-full text-center font-bold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 font-display tracking-wider uppercase text-sm";
  
  const variantClasses = {
    primary: 'bg-cyan-500 text-gray-900 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 focus:ring-cyan-300',
    secondary: 'bg-gray-700 text-cyan-300 hover:bg-gray-600 focus:ring-gray-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
