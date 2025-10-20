import React from 'react';
import {
  Slack,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Video,
  Zap,
  CheckCircle,
} from 'lucide-react';

const Integration = () => {
  const integrations = [
    {
      name: 'Slack',
      icon: <Slack className="w-8 h-8" />,
      description: 'Team communication with voice commands',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Voice-to-text', 'Auto-translate', 'Screen reader'],
    },
    {
      name: 'Microsoft Teams',
      icon: <Video className="w-8 h-8" />,
      description: 'Video meetings with live captions',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Live captions', 'Sign language', 'Voice control'],
    },
    {
      name: 'Google Workspace',
      icon: <Mail className="w-8 h-8" />,
      description: 'Email and docs with accessibility',
      gradient: 'from-orange-500 to-red-500',
      features: ['Voice dictation', 'Smart compose', 'Read aloud'],
    },
    {
      name: 'Zoom',
      icon: <MessageSquare className="w-8 h-8" />,
      description: 'Accessible video conferencing',
      gradient: 'from-indigo-500 to-blue-500',
      features: ['Captions', 'Keyboard shortcuts', 'Focus mode'],
    },
    {
      name: 'Jira',
      icon: <FileText className="w-8 h-8" />,
      description: 'Project management made accessible',
      gradient: 'from-green-500 to-emerald-500',
      features: ['Voice navigation', 'Custom views', 'Shortcuts'],
    },
    {
      name: 'Calendar',
      icon: <Calendar className="w-8 h-8" />,
      description: 'Schedule with voice assistance',
      gradient: 'from-yellow-500 to-orange-500',
      features: ['Voice scheduling', 'Smart reminders', 'Time zones'],
    },
  ];

  const benefits = [
    {
      title: 'One-Click Setup',
      description: 'Connect your favorite tools in seconds with pre-built integrations',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: 'Seamless Sync',
      description: 'Real-time data synchronization across all your workplace tools',
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: 'Universal Accessibility',
      description: 'Consistent accessibility features across all integrated platforms',
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: 'Custom Workflows',
      description: 'Build personalized workflows that adapt to your needs',
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];

  return (
    <section id="integration" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              Seamless Integration
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Works With Your Tools
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with popular workplace tools and enhance them with powerful
            accessibility features.
          </p>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${integration.gradient}`}></div>
              <div className="p-6">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${integration.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  {integration.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {integration.name}
                </h3>
                <p className="text-gray-600 mb-4">{integration.description}</p>
                
                <div className="space-y-2 mb-4">
                  {integration.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Our Integrations?
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="button-primary">
              View All Integrations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integration;
