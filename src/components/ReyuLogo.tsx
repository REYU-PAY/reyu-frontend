import React from 'react';

interface ReyuLogoProps {
  className?: string;
}

const ReyuLogo: React.FC<ReyuLogoProps> = ({ className = "h-8 w-8" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="url(#reyu-gradient)" />
      <path 
        d="M7 8.5h4c1.1 0 2 .9 2 2s-.9 2-2 2H9v3.5H7V8.5zm2 2.5h2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H9v1z" 
        fill="white" 
      />
      <path 
        d="M14 8.5h3l2 7.5h-2l-.4-1.5h-2.2l-.4 1.5h-2l2-7.5zm2.3 4.5l-.8-3-.8 3h1.6z" 
        fill="white" 
      />
      <defs>
        <linearGradient id="reyu-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6E8EFB" />
          <stop offset="1" stopColor="#9578FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ReyuLogo;
