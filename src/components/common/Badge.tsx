import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 
    | 'critical' 
    | 'high' 
    | 'medium' 
    | 'low' 
    | 'submitted' 
    | 'underReview' 
    | 'investigation' 
    | 'actionPending' 
    | 'closed'
    | 'verified'
    | 'outline'
    | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  let colorClasses = 'bg-gray-100 text-gray-800 border-gray-200';

  switch (variant) {
    case 'critical':
      colorClasses = 'bg-red-50 text-red-700 border-red-200';
      break;
    case 'high':
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'medium':
      colorClasses = 'bg-yellow-50 text-yellow-800 border-yellow-200';
      break;
    case 'low':
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      break;
    case 'submitted':
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
      break;
    case 'underReview':
      colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
      break;
    case 'investigation':
      colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
      break;
    case 'actionPending':
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-300';
      break;
    case 'closed':
    case 'verified':
      colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300';
      break;
    case 'outline':
      colorClasses = 'bg-transparent text-gray-700 border-gray-300';
      break;
    case 'neutral':
    default:
      colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
      break;
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
};
