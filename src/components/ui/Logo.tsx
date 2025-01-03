import { Brain } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { icon: 'w-6 h-6', text: 'text-xl' },
  md: { icon: 'w-8 h-8', text: 'text-2xl' },
  lg: { icon: 'w-10 h-10', text: 'text-3xl' }
} as const;

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Brain className={`text-blue-600 ${sizeClasses.icon}`} />
      <span className={`font-bold ${sizeClasses.text} text-gray-900`}>
        Self AI
      </span>
    </div>
  );
}