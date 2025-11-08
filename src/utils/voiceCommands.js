// Voice commands configuration for blind users
// Complete hands-free navigation and control

export const voiceCommands = {
  // Navigation commands
  navigation: [
    {
      patterns: ['go to features', 'show features', 'features section', 'navigate to features'],
      action: 'navigateToSection',
      target: 'features',
      description: 'Navigate to features section'
    },
    {
      patterns: ['go to voice', 'voice assistant', 'show voice', 'navigate to voice'],
      action: 'navigateToSection',
      target: 'voice',
      description: 'Navigate to voice assistant section'
    },
    {
      patterns: ['go to jobs', 'show jobs', 'job matching', 'find jobs', 'navigate to jobs'],
      action: 'navigateToSection',
      target: 'jobs',
      description: 'Navigate to job matching section'
    },
    {
      patterns: ['go to accessibility', 'accessibility settings', 'show accessibility'],
      action: 'navigateToSection',
      target: 'accessibility',
      description: 'Navigate to accessibility section'
    },
    {
      patterns: ['go to integration', 'integrations', 'show integrations'],
      action: 'navigateToSection',
      target: 'integration',
      description: 'Navigate to integrations section'
    },
    {
      patterns: ['go to top', 'scroll to top', 'top of page', 'go home'],
      action: 'scrollToTop',
      description: 'Scroll to top of page'
    },
    {
      patterns: ['go to bottom', 'scroll to bottom', 'bottom of page'],
      action: 'scrollToBottom',
      description: 'Scroll to bottom of page'
    },
    {
      patterns: ['scroll down', 'move down', 'page down'],
      action: 'scrollDown',
      description: 'Scroll down the page'
    },
    {
      patterns: ['scroll up', 'move up', 'page up'],
      action: 'scrollUp',
      description: 'Scroll up the page'
    }
  ],

  // Accessibility commands
  accessibility: [
    {
      patterns: ['open settings', 'show settings', 'accessibility settings', 'open accessibility'],
      action: 'openAccessibilityPanel',
      description: 'Open accessibility settings panel'
    },
    {
      patterns: ['close settings', 'hide settings', 'close accessibility'],
      action: 'closeAccessibilityPanel',
      description: 'Close accessibility settings panel'
    },
    {
      patterns: ['increase text', 'bigger text', 'increase font', 'larger text', 'make text bigger'],
      action: 'increaseTextSize',
      description: 'Increase text size'
    },
    {
      patterns: ['decrease text', 'smaller text', 'decrease font', 'make text smaller'],
      action: 'decreaseTextSize',
      description: 'Decrease text size'
    },
    {
      patterns: ['enable dark mode', 'dark mode on', 'turn on dark mode', 'activate dark mode'],
      action: 'toggleDarkMode',
      value: true,
      description: 'Enable dark mode'
    },
    {
      patterns: ['disable dark mode', 'dark mode off', 'turn off dark mode', 'light mode'],
      action: 'toggleDarkMode',
      value: false,
      description: 'Disable dark mode'
    },
    {
      patterns: ['high contrast', 'enable high contrast', 'high contrast on'],
      action: 'toggleHighContrast',
      value: true,
      description: 'Enable high contrast mode'
    },
    {
      patterns: ['normal contrast', 'disable high contrast'],
      action: 'toggleHighContrast',
      value: false,
      description: 'Disable high contrast mode'
    },
    {
      patterns: ['protanopia', 'protanopia mode', 'red blind mode'],
      action: 'setColorBlindMode',
      value: 'protanopia',
      description: 'Switch to protanopia color blind mode'
    },
    {
      patterns: ['deuteranopia', 'deuteranopia mode', 'green blind mode'],
      action: 'setColorBlindMode',
      value: 'deuteranopia',
      description: 'Switch to deuteranopia color blind mode'
    },
    {
      patterns: ['tritanopia', 'tritanopia mode', 'blue blind mode'],
      action: 'setColorBlindMode',
      value: 'tritanopia',
      description: 'Switch to tritanopia color blind mode'
    },
    {
      patterns: ['normal vision', 'normal mode', 'no color blind'],
      action: 'setColorBlindMode',
      value: 'none',
      description: 'Switch to normal vision mode'
    }
  ],

  // Voice assistant commands
  voiceAssistant: [
    {
      patterns: ['start listening', 'start voice', 'activate microphone', 'begin listening'],
      action: 'startVoiceAssistant',
      description: 'Start voice assistant listening'
    },
    {
      patterns: ['stop listening', 'stop voice', 'deactivate microphone'],
      action: 'stopVoiceAssistant',
      description: 'Stop voice assistant listening'
    },
    {
      patterns: ['translate', 'translate text', 'translate this'],
      action: 'translateText',
      description: 'Translate current text'
    },
    {
      patterns: ['speak faster', 'increase speed', 'faster'],
      action: 'increaseVoiceSpeed',
      description: 'Increase voice speed'
    },
    {
      patterns: ['speak slower', 'decrease speed', 'slower'],
      action: 'decreaseVoiceSpeed',
      description: 'Decrease voice speed'
    }
  ],

  // Profile and jobs commands
  profile: [
    {
      patterns: ['create profile', 'new profile', 'make profile', 'start profile'],
      action: 'openProfileForm',
      description: 'Open profile creation form'
    },
    {
      patterns: ['save profile', 'submit profile'],
      action: 'saveProfile',
      description: 'Save current profile'
    },
    {
      patterns: ['find jobs', 'search jobs', 'match jobs', 'show jobs'],
      action: 'matchJobs',
      description: 'Find matching jobs based on profile'
    },
    {
      patterns: ['show all jobs', 'all jobs', 'view all'],
      action: 'filterJobs',
      value: 'all',
      description: 'Show all jobs'
    },
    {
      patterns: ['remote jobs', 'show remote', 'remote only'],
      action: 'filterJobs',
      value: 'remote',
      description: 'Show remote jobs only'
    },
    {
      patterns: ['accessible jobs', 'accessible workplaces'],
      action: 'filterJobs',
      value: 'accessible',
      description: 'Show accessible workplaces'
    }
  ],

  // Help and system commands
  system: [
    {
      patterns: ['help', 'help me', 'what can you do', 'commands', 'show commands'],
      action: 'showHelp',
      description: 'Show available voice commands'
    },
    {
      patterns: ['where am i', 'current location', 'what section'],
      action: 'announceLocation',
      description: 'Announce current page section'
    },
    {
      patterns: ['repeat', 'say again', 'repeat that'],
      action: 'repeatLast',
      description: 'Repeat last announcement'
    },
    {
      patterns: ['stop talking', 'be quiet', 'silence'],
      action: 'stopSpeaking',
      description: 'Stop current speech'
    },
    {
      patterns: ['read page', 'describe page', 'what is on this page'],
      action: 'describePage',
      description: 'Describe current page content'
    }
  ]
};

// Get all commands as flat list for help
export const getAllCommands = () => {
  const allCommands = [];
  Object.keys(voiceCommands).forEach(category => {
    voiceCommands[category].forEach(cmd => {
      allCommands.push({
        category,
        example: cmd.patterns[0],
        description: cmd.description
      });
    });
  });
  return allCommands;
};

// Match voice input to command
export const matchCommand = (input) => {
  const normalizedInput = input.toLowerCase().trim();
  
  // Check all command categories
  for (const category of Object.keys(voiceCommands)) {
    for (const command of voiceCommands[category]) {
      // Check if input matches any pattern
      for (const pattern of command.patterns) {
        if (normalizedInput.includes(pattern) || pattern.includes(normalizedInput)) {
          return { ...command, category };
        }
      }
    }
  }
  
  return null;
};
