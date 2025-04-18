import { ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-16 md:mt-24 px-4">
      <Logo size="lg" className="mb-6" />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
        Create beautiful websites with a simple prompt
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
        Transform your ideas into stunning, production-ready websites using natural language or voice commands. No coding required.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          icon={<ArrowRight size={20} />}
          onClick={() => document.getElementById('prompt-input')?.focus()}
        >
          Get Started
        </Button>
        <Button 
          variant="outline" 
          size="lg"
        >
          View Examples
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;