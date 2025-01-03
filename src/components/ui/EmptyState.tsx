import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  message, 
  icon = <AlertCircle className="w-12 h-12" />,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-gray-500 ${className}`}>
      {icon}
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}