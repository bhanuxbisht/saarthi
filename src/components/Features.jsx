import React from 'react';
import {
  Mic,
  Globe,
  Zap,
  Shield,
  Brain,
  Users,
  Cloud,
  Leaf,
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: 'Multilingual Voice Recognition',
      description: 'Auto-detect and support 50+ Indian and global languages with 99.9% accuracy using advanced AI models.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Real-Time Translation',
      description: 'Instant translation across languages with context-aware processing for seamless workplace communication.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Speech-to-Text & Text-to-Speech',
      description: 'High-quality voice synthesis and transcription optimized for visual and hearing impairments.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Personalization',
      description: 'Adaptive learning algorithms customize accessibility settings for motor and cognitive disabilities.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Job Matching & Integration',
      description: 'Smart job recommendations and seamless onboarding tailored to individual abilities and preferences.',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Privacy & Security',
      description: 'End-to-end encryption and GDPR-compliant data protection ensuring user privacy at all times.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud-Based Deployment',
      description: 'Scalable, affordable infrastructure with offline capabilities for uninterrupted access.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Eco-Friendly Design',
      description: 'Carbon-neutral operations with energy-efficient algorithms supporting sustainable development.',
      gradient: 'from-lime-500 to-green-500',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cutting-edge technology designed to break barriers and create an
            inclusive workplace for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Ready to transform your workplace?
          </p>
          <button className="button-primary">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
