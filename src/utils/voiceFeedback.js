// Voice feedback system for blind users
// Provides audio announcements for all user actions

class VoiceFeedback {
  constructor() {
    this.synth = window.speechSynthesis;
    this.lastAnnouncement = '';
    this.isSpeaking = false;
  }

  // Speak text with configurable options
  speak(text, options = {}) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply options
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;
    utterance.lang = options.lang || 'en-US';

    // Track speaking state
    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      this.isSpeaking = false;
    };

    this.lastAnnouncement = text;
    this.synth.speak(utterance);
  }

  // Stop current speech
  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  // Repeat last announcement
  repeat() {
    if (this.lastAnnouncement) {
      this.speak(this.lastAnnouncement);
    }
  }

  // Navigation announcements
  announceNavigation(section) {
    const announcements = {
      features: 'Navigating to Features section. Here you can explore powerful accessibility features.',
      voice: 'Navigating to Voice Assistant section. You can use voice commands and real-time translation here.',
      jobs: 'Navigating to Job Matching section. Find jobs tailored to your skills and accessibility needs.',
      accessibility: 'Navigating to Accessibility section. Customize your experience with various accessibility options.',
      integration: 'Navigating to Integrations section. Connect with workplace tools like Slack and Teams.'
    };

    const announcement = announcements[section] || `Navigating to ${section} section`;
    this.speak(announcement);
  }

  // Action confirmations
  announceAction(action, success = true, details) {
    let announcement = 'Action completed';

    switch (action) {
      case 'openAccessibilityPanel':
        announcement = 'Accessibility settings panel opened. You can now adjust text size, color modes, and more.';
        break;
      case 'closeAccessibilityPanel':
        announcement = 'Accessibility settings panel closed.';
        break;
      case 'increaseTextSize':
        announcement = details
          ? `Text size increased to ${details}px.`
          : 'Text size increased.';
        break;
      case 'decreaseTextSize':
        announcement = details
          ? `Text size decreased to ${details}px.`
          : 'Text size decreased.';
        break;
      case 'toggleDarkMode':
        announcement = success
          ? 'Dark mode enabled. Interface is now using the dark theme.'
          : 'Dark mode disabled. Interface is now using the light theme.';
        break;
      case 'toggleHighContrast':
        announcement = success
          ? 'High contrast mode enabled.'
          : 'High contrast mode disabled.';
        break;
      case 'setColorBlindMode':
        if (details === 'none') {
          announcement = 'Color blind adjustments disabled. Normal vision mode active.';
        } else {
          announcement = `${details} color blind mode enabled.`;
        }
        break;
      case 'setVoiceSpeed':
        announcement = details
          ? `Voice speed set to ${details.toFixed(1)} times the normal rate.`
          : 'Voice speed updated.';
        break;
      case 'openProfileForm':
        announcement = 'Profile form opened. Please fill in your details.';
        break;
      case 'matchJobs':
        announcement = 'Looking for the best jobs that match your profile.';
        break;
      case 'filterJobs':
        if (details === 'all') {
          announcement = 'Showing all available jobs.';
        } else if (details === 'remote') {
          announcement = 'Showing remote friendly jobs.';
        } else if (details === 'accessible') {
          announcement = 'Showing jobs with accessible workplaces.';
        } else {
          announcement = 'Jobs filter applied.';
        }
        break;
      case 'scrollToTop':
        announcement = 'Scrolled to the top of the page.';
        break;
      case 'scrollToBottom':
        announcement = 'Scrolled to the bottom of the page.';
        break;
      case 'scrollDown':
        announcement = 'Scrolling down.';
        break;
      case 'scrollUp':
        announcement = 'Scrolling up.';
        break;
      default:
        break;
    }

    this.speak(announcement);
  }

  // Welcome announcement
  announceWelcome() {
    this.speak(
      'Welcome to NEXUS, your adaptive workplace assistant. Voice control is active. Say help to hear available commands.',
      { rate: 0.9 }
    );
  }

  // Help announcement
  announceHelp(commands) {
    let helpText = 'Available voice commands: ';
    
    const examples = [
      'Say go to features to navigate to features section.',
      'Say create profile to start creating your profile.',
      'Say enable dark mode to switch to dark theme.',
      'Say start listening to activate voice assistant.',
      'Say help anytime to hear these commands again.'
    ];

    helpText += examples.join(' ');
    
    this.speak(helpText, { rate: 0.85 });
  }

  // Error announcement
  announceError(message) {
    this.speak(`Error: ${message}`, { rate: 0.9 });
  }

  // Location announcement
  announceLocation() {
    const currentSection = this.getCurrentSection();
    this.speak(`You are currently in the ${currentSection} section.`);
  }

  // Get current section based on scroll position
  getCurrentSection() {
    const sections = ['features', 'voice', 'jobs', 'accessibility', 'integration'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          return section;
        }
      }
    }
    
    return 'top of page';
  }

  // Describe current page
  describePage() {
    const description = 
      'You are on the NEXUS homepage. ' +
      'This page contains multiple sections: ' +
      'Features section showcasing accessibility capabilities. ' +
      'Voice Assistant section for speech recognition and translation. ' +
      'Job Matching section powered by AI. ' +
      'Accessibility settings for customizing your experience. ' +
      'And Integrations section for connecting workplace tools. ' +
      'Use voice commands to navigate between sections.';
    
    this.speak(description, { rate: 0.9 });
  }
}

// Create singleton instance
const voiceFeedback = new VoiceFeedback();

export default voiceFeedback;
