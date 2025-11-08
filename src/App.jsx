import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import VoiceAssistant from './components/VoiceAssistant';
import AccessibilityPanel from './components/AccessibilityPanel';
import AccessibilitySettingsPanel from './components/AccessibilitySettingsPanel';
import JobMatching from './components/JobMatching';
import Integration from './components/Integration';
import Footer from './components/Footer';
import OnboardingWizard from './components/OnboardingWizard';
import KeyboardShortcutsOverlay from './components/KeyboardShortcutsOverlay';
import { useAccessibility } from './hooks/useAccessibility';
import { useVoiceControl } from './hooks/useVoiceControl';
import { Settings, Mic, MicOff } from 'lucide-react';

function App() {
  const { settings, updateSettings, completeOnboarding, isLoaded } = useAccessibility();
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const jobMatchingRef = useRef(null);

  // Initialize voice control
  const {
    isListening,
    isEnabled,
    transcript,
    isProcessing,
    toggleVoiceControl
  } = useVoiceControl({
    accessibilitySettings: settings,
    updateAccessibilitySetting: (key, value) => updateSettings({ [key]: value }),
    jobMatchingRef,
    onAccessibilityPanelToggle: (isOpen) => setShowAccessibilityPanel(isOpen)
  });

  // Handler for Get Started button - opens profile form
  const handleGetStarted = () => {
    if (jobMatchingRef.current) {
      jobMatchingRef.current.openProfileForm();
      // Scroll to jobs section
      setTimeout(() => {
        const jobsSection = document.getElementById('jobs');
        if (jobsSection) {
          jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!settings.keyboardShortcuts) return;

    const handleKeyPress = (e) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      // Show keyboard shortcuts overlay
      if (e.key === '?') {
        e.preventDefault();
        setShowKeyboardShortcuts(true);
      }

      // Toggle accessibility panel
      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setShowAccessibilityPanel((prev) => !prev);
      }

      // Close modals
      if (e.key === 'Escape') {
        setShowAccessibilityPanel(false);
        setShowKeyboardShortcuts(false);
      }

      // Text size controls
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        if (e.shiftKey) {
          // Decrease
          updateSettings({
            fontSize: Math.max(12, settings.fontSize - 2),
          });
        } else {
          // Increase
          updateSettings({
            fontSize: Math.min(32, settings.fontSize + 2),
          });
        }
      }

      // Toggle high contrast
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        updateSettings({ highContrast: !settings.highContrast });
      }

      // Toggle dark mode
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        updateSettings({ darkMode: !settings.darkMode });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [settings, updateSettings]);

  // Show onboarding if not completed
  if (isLoaded && !settings.onboardingCompleted) {
    return <OnboardingWizard onComplete={completeOnboarding} />;
  }

  // Don't render until settings are loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar onGetStartedClick={handleGetStarted} />
      <Hero />
      <Features />
  <VoiceAssistant accessibilitySettings={settings} />
      <AccessibilityPanel settings={settings} setSettings={updateSettings} />
      <JobMatching ref={jobMatchingRef} />
      <Integration />
      <Footer />

      {/* Voice Control Indicator */}
      {isEnabled && (
        <div className="fixed top-20 right-6 z-50">
          <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-gray-700 text-white'
          }`}>
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {isProcessing ? 'Thinking...' : isListening ? 'Listening...' : 'Voice Control'}
            </span>
          </div>
          {transcript && (
            <div className="mt-2 px-3 py-1 bg-white rounded-lg shadow text-sm text-gray-700">
              "{transcript}"
            </div>
          )}
          {isProcessing && (
            <div className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg shadow text-sm flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>AI Processing...</span>
            </div>
          )}
        </div>
      )}

      {/* Floating Accessibility Button */}
      <button
        onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center z-40"
        aria-label="Toggle accessibility panel"
        title="Accessibility Settings (Press 'A')"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Voice Control Toggle Button */}
      {isEnabled && (
        <button
          onClick={toggleVoiceControl}
          className={`fixed bottom-24 right-6 w-14 h-14 text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center z-40 ${
            isListening 
              ? 'bg-gradient-to-br from-red-500 to-pink-600 animate-pulse' 
              : 'bg-gradient-to-br from-gray-600 to-gray-800'
          }`}
          aria-label={isListening ? 'Stop voice control' : 'Start voice control'}
          title={isListening ? 'Stop Voice Control' : 'Start Voice Control (Say "help" for commands)'}
        >
          {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
        </button>
      )}

      {/* Keyboard Shortcuts Help Button */}
      <button
        onClick={() => setShowKeyboardShortcuts(true)}
        className="fixed bottom-6 right-24 w-14 h-14 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40 border-2 border-gray-200"
        aria-label="Show keyboard shortcuts"
        title="Keyboard Shortcuts (Press '?')"
      >
        <span className="text-xl font-bold">?</span>
      </button>

      {/* Modals */}
      <AccessibilitySettingsPanel
        isOpen={showAccessibilityPanel}
        onClose={() => setShowAccessibilityPanel(false)}
        settings={settings}
        updateSettings={updateSettings}
      />
      
      <KeyboardShortcutsOverlay
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
      />
    </div>
  );
}

export default App;
