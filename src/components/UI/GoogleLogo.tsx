import React, { useId } from 'react';

interface GoogleLogoProps {
  className?: string;
  size?: number;
}

export const GoogleLogo: React.FC<GoogleLogoProps> = ({ 
  className = "w-8 h-8", 
  size 
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg 
      className={`shrink-0 select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Google Logo"
    >
      <defs>
        {/* Top Segment: Red to Vibrant Orange */}
        <linearGradient id={`g-top-${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EA4335" />
          <stop offset="50%" stopColor="#FF5722" />
          <stop offset="100%" stopColor="#FB8C00" />
        </linearGradient>

        {/* Left Segment: Golden Orange -> Sunny Yellow -> Lime -> Green */}
        <linearGradient id={`g-left-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FB8C00" />
          <stop offset="30%" stopColor="#FFB300" />
          <stop offset="55%" stopColor="#FFEB3B" />
          <stop offset="80%" stopColor="#8BC34A" />
          <stop offset="100%" stopColor="#34A853" />
        </linearGradient>

        {/* Bottom Segment: Green -> Emerald -> Cyan -> Blue */}
        <linearGradient id={`g-bottom-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34A853" />
          <stop offset="35%" stopColor="#00C853" />
          <stop offset="70%" stopColor="#00BCD4" />
          <stop offset="100%" stopColor="#2979FF" />
        </linearGradient>

        {/* Right & Crossbar Segment: Rich Electric Blue */}
        <linearGradient id={`g-right-${id}`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#2979FF" />
          <stop offset="60%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#4285F4" />
        </linearGradient>
      </defs>

      {/* Top Arc (Red to Orange) */}
      <path 
        fill={`url(#g-top-${id})`}
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />

      {/* Left Arc (Orange to Yellow to Green) */}
      <path 
        fill={`url(#g-left-${id})`}
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />

      {/* Bottom Arc (Green to Cyan to Blue) */}
      <path 
        fill={`url(#g-bottom-${id})`}
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />

      {/* Right Arc & Horizontal Bar (Electric Royal Blue) */}
      <path 
        fill={`url(#g-right-${id})`}
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
    </svg>
  );
};
