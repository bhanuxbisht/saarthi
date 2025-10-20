import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import VoiceAssistant from './components/VoiceAssistant';
import AccessibilityPanel from './components/AccessibilityPanel';
import JobMatching from './components/JobMatching';
import Integration from './components/Integration';
import Footer from './components/Footer';

function App() {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 16,
    highContrast: false,
    screenReader: false,
    voiceSpeed: 1.0,
    language: 'en',
    colorBlindMode: 'none',
    reducedMotion: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <Hero />
      <Features />
      <VoiceAssistant accessibilitySettings={accessibilitySettings} />
      <AccessibilityPanel 
        settings={accessibilitySettings} 
        setSettings={setAccessibilitySettings} 
      />
      <JobMatching />
      <Integration />
      <Footer />
    </div>
  );
}

export default App;
