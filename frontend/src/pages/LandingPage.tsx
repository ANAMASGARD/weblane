import HeroSection from '../components/landing/HeroSection';
import PromptInput from '../components/landing/PromptInput';
import FeaturesSection from '../components/landing/FeaturesSection';
import Logo from '../components/common/Logo';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="py-4 px-6 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#examples" className="text-gray-600 hover:text-blue-600 transition-colors">Examples</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-600 font-medium">Sign In</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
            Sign Up
          </button>
        </div>
      </header>

      <main>
        <HeroSection />
        <PromptInput />
        <FeaturesSection />
      </main>

      <footer className="mt-20 py-8 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo className="text-white mb-4 md:mb-0" />
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            &copy; {new Date().getFullYear()} WebLane. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;