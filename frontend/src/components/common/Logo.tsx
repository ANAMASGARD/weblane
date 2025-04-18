import { Layers } from 'lucide-react';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Layers className="text-blue-600 mr-2" size={size === 'sm' ? 20 : size === 'md' ? 24 : 32} />
      <span className={`font-bold ${sizeClasses[size]}`}>
        Web<span className="text-blue-600">Lane</span>
      </span>
    </div>
  );
};

export default Logo;