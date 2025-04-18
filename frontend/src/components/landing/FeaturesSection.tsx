import { Code, Grid, Layout, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-blue-600" />,
    title: 'AI-Powered Creation',
    description: 'Describe what you want, and our AI will create a beautiful, functional website just for you.'
  },
  {
    icon: <Layout className="h-6 w-6 text-blue-600" />,
    title: 'Professional Designs',
    description: 'Get stunning, responsive websites that look great on any device and follow modern design principles.'
  },
  {
    icon: <Code className="h-6 w-6 text-blue-600" />,
    title: 'Customizable Code',
    description: 'Access and modify the generated code to make your website truly unique and personalized.'
  },
  {
    icon: <Grid className="h-6 w-6 text-blue-600" />,
    title: 'Interactive Editor',
    description: 'Edit your website with our intuitive interface showing real-time changes and file structure.'
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful websites in minutes using our AI-powered platform
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;