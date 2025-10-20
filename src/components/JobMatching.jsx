import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  TrendingUp,
  Heart,
  Filter,
  Search,
  Star,
} from 'lucide-react';

const JobMatching = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const jobCategories = [
    { id: 'all', label: 'All Jobs', count: 1250 },
    { id: 'remote', label: 'Remote', count: 850 },
    { id: 'flexible', label: 'Flexible Hours', count: 620 },
    { id: 'accessible', label: 'Fully Accessible', count: 450 },
  ];

  const featuredJobs = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovators Inc.',
      location: 'Remote / Bangalore',
      salary: '₹15-25 LPA',
      type: 'Full-time',
      accessibility: ['Screen Reader Compatible', 'Flexible Hours', 'Remote'],
      matchScore: 95,
      tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'UX/UI Designer',
      company: 'Creative Solutions',
      location: 'Hybrid / Mumbai',
      salary: '₹10-18 LPA',
      type: 'Full-time',
      accessibility: ['Ergonomic Workspace', 'Voice Control Tools', 'Flexible'],
      matchScore: 92,
      tags: ['Figma', 'Adobe XD', 'Design Systems'],
    },
    {
      title: 'Data Analyst',
      company: 'Analytics Pro',
      location: 'Remote',
      salary: '₹8-15 LPA',
      type: 'Full-time',
      accessibility: ['Screen Reader Compatible', 'Flexible Hours', 'Remote'],
      matchScore: 88,
      tags: ['Python', 'SQL', 'Tableau'],
    },
    {
      title: 'Content Writer',
      company: 'Digital Media Group',
      location: 'Remote / Delhi',
      salary: '₹6-12 LPA',
      type: 'Full-time',
      accessibility: ['Voice Recognition', 'Flexible Schedule', 'Remote Work'],
      matchScore: 85,
      tags: ['Content Strategy', 'SEO', 'Copywriting'],
    },
  ];

  return (
    <section id="jobs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full mb-6 shadow-md">
            <Briefcase className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              AI-Powered Job Matching
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Find Your Perfect Job
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Smart recommendations based on your skills, preferences, and
            accessibility requirements.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, skills, or companies..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Advanced Filters</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mt-6">
            {jobCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedFilter === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {featuredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              {/* Match Score Badge */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    <span className="text-white font-semibold">
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Job Title & Company */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {job.title}
                </h3>
                <p className="text-purple-600 font-medium mb-4">{job.company}</p>

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Growing Fast</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Accessibility Features */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Accessibility Features:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.accessibility.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <button className="w-full button-primary">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <button className="button-secondary">
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobMatching;
