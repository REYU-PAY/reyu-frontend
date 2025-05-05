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
      aria-label="REYU Logo"
      role="img"
    >
      {/* Elegant background with subtle gradient */}
      <rect width="24" height="24" rx="12" fill="url(#reyu-bg-gradient)" />

      {/* Decorative elements */}
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="url(#reyu-stroke-gradient)"
        strokeWidth="0.5"
        strokeOpacity="0.6"
      />

      {/* Stylized R letter */}
      <path
        d="M8 6.5h5.5c1.4 0 2.5 1.1 2.5 2.5 0 1.1-0.7 2-1.7 2.4l2.2 4.6h-2.8l-1.9-4H10v4H8V6.5z"
        fill="white"
      />
      <path
        d="M10 8.5v3h3c0.8 0 1.5-0.7 1.5-1.5S13.8 8.5 13 8.5H10z"
        fill="url(#reyu-accent-gradient)"
      />

      {/* Subtle glow effect */}
      <circle cx="12" cy="12" r="9.5" stroke="white" strokeOpacity="0.2" />

      {/* Gradients */}
      <defs>
        <linearGradient id="reyu-bg-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A6CF7" />
          <stop offset="1" stopColor="#7B5AFF" />
        </linearGradient>
        <linearGradient id="reyu-stroke-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="reyu-accent-gradient" x1="10" y1="8.5" x2="14.5" y2="11.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9FCCFA" />
          <stop offset="1" stopColor="#B5A9FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ReyuLogo;
