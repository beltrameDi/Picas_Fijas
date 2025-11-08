import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, isError, ...props }, ref) => {
  const baseClasses = "w-full bg-gray-900/50 text-white text-2xl font-mono tracking-[0.5em] text-center p-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none";
  
  const stateClasses = isError 
    ? 'border-red-500 focus:ring-2 focus:ring-red-500/50' 
    : 'border-orange-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/50';

  return (
    <input
      ref={ref}
      className={`${baseClasses} ${stateClasses} ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;