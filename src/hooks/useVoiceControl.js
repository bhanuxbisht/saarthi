import { useState, useEffect, useCallback, useRef } from 'react';
import { matchCommand, getAllCommands } from '../utils/voiceCommands';
import voiceFeedback from '../utils/voiceFeedback';
import aiAgent from '../utils/aiAgent';

export const useVoiceControl = ({
  accessibilitySettings,
  updateAccessibilitySetting,
  jobMatchingRef,
  onAccessibilityPanelToggle,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef(null);
  const shouldAutoRestartRef = useRef(true);
  const isEnabledRef = useRef(true);
  const processCommandRef = useRef(() => {});

  const navigateToSection = useCallback((section) => {
    if (!section) {
      voiceFeedback.announceError('I could not find that section.');
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      voiceFeedback.announceNavigation(section);
    } else {
      voiceFeedback.announceError(`Section ${section} is not available yet.`);
    }
  }, []);

  const processCommand = useCallback(
    async (input) => {
      // Show processing indicator
      setIsProcessing(true);

      try {
        // Use AI Agent to understand natural language
        const aiResponse = await aiAgent.processVoiceInput(input, {
          currentSettings: accessibilitySettings,
          hasProfile: !!jobMatchingRef?.current
        });

        const { action, params, response } = aiResponse;

        // Speak the AI's response first
        if (response) {
          voiceFeedback.speak(response);
        }

        // Execute the action
        if (!action || action === 'none') {
          setIsProcessing(false);
          return;
        }

        switch (action) {
          case 'navigateToSection':
            if (params?.section) {
              navigateToSection(params.section);
            }
            break;

          case 'scrollToTop':
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;

          case 'scrollToBottom':
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            break;

          case 'scrollDown':
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
            break;

          case 'scrollUp':
            window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
            break;

          case 'openAccessibilityPanel':
            if (onAccessibilityPanelToggle) {
              onAccessibilityPanelToggle(true);
            }
            break;

          case 'closeAccessibilityPanel':
            if (onAccessibilityPanelToggle) {
              onAccessibilityPanelToggle(false);
            }
            break;

          case 'increaseTextSize': {
            const currentFontSize = accessibilitySettings?.fontSize ?? 16;
            const newSize = Math.min(32, Number((currentFontSize + 2).toFixed(0)));
            updateAccessibilitySetting('fontSize', newSize);
            break;
          }

          case 'decreaseTextSize': {
            const currentFontSize = accessibilitySettings?.fontSize ?? 16;
            const newSize = Math.max(12, Number((currentFontSize - 2).toFixed(0)));
            updateAccessibilitySetting('fontSize', newSize);
            break;
          }

          case 'toggleDarkMode': {
            const nextValue = params?.value !== undefined ? params.value : !accessibilitySettings?.darkMode;
            updateAccessibilitySetting('darkMode', nextValue);
            break;
          }

          case 'toggleHighContrast': {
            const nextValue = params?.value !== undefined ? params.value : !accessibilitySettings?.highContrast;
            updateAccessibilitySetting('highContrast', nextValue);
            break;
          }

          case 'setColorBlindMode': {
            const mode = params?.mode || 'none';
            updateAccessibilitySetting('colorBlindMode', mode);
            break;
          }

          case 'increaseVoiceSpeed': {
            const currentSpeed = accessibilitySettings?.voiceSpeed ?? 1;
            const newSpeed = Math.min(2, Number((currentSpeed + 0.1).toFixed(1)));
            updateAccessibilitySetting('voiceSpeed', newSpeed);
            break;
          }

          case 'decreaseVoiceSpeed': {
            const currentSpeed = accessibilitySettings?.voiceSpeed ?? 1;
            const newSpeed = Math.max(0.5, Number((currentSpeed - 0.1).toFixed(1)));
            updateAccessibilitySetting('voiceSpeed', newSpeed);
            break;
          }

          case 'openProfileForm':
            if (jobMatchingRef?.current?.openProfileForm) {
              jobMatchingRef.current.openProfileForm();
              navigateToSection('jobs');
            }
            break;

          case 'matchJobs':
            if (jobMatchingRef?.current?.runAIMatch) {
              jobMatchingRef.current.runAIMatch();
            }
            break;

          case 'filterJobs':
            if (jobMatchingRef?.current?.applyFilter && params?.filter) {
              jobMatchingRef.current.applyFilter(params.filter);
            }
            break;

          case 'showHelp':
            voiceFeedback.announceHelp(getAllCommands().slice(0, 8));
            break;

          case 'announceLocation':
            voiceFeedback.announceLocation();
            break;

          case 'describePage':
            voiceFeedback.describePage();
            break;

          default:
            // Action not implemented
            break;
        }
      } catch (error) {
        console.error('Error processing command:', error);
        voiceFeedback.speak('Sorry, I had trouble processing that. Could you try again?');
      } finally {
        setIsProcessing(false);
      }
    },
    [
      accessibilitySettings,
      updateAccessibilitySetting,
      jobMatchingRef,
      onAccessibilityPanelToggle,
      navigateToSection,
    ]
  );

  useEffect(() => {
    processCommandRef.current = processCommand;
  }, [processCommand]);

  useEffect(() => {
    isEnabledRef.current = isEnabled;
  }, [isEnabled]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsEnabled(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);

      // Only restart if we explicitly want to keep listening
      if (shouldAutoRestartRef.current && isEnabledRef.current) {
        setTimeout(() => {
          try {
            if (shouldAutoRestartRef.current) {
              recognition.start();
            }
          } catch (error) {
            console.warn('Voice control restart blocked:', error);
            shouldAutoRestartRef.current = false;
          }
        }, 300);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        // Don't restart on no-speech
        return;
      }

      if (event.error === 'not-allowed' || event.error === 'audio-capture') {
        shouldAutoRestartRef.current = false;
        setIsEnabled(false);
        setIsListening(false);
        return;
      }

      // Stop auto-restart on other errors
      if (event.error !== 'aborted') {
        console.error('Speech recognition error:', event.error);
        shouldAutoRestartRef.current = false;
      }
    };

    recognition.onresult = (event) => {
      const lastIndex = event.results.length - 1;
      const spoken = event.results[lastIndex][0].transcript.toLowerCase().trim();

      setTranscript(spoken);
      processCommandRef.current(spoken);
    };

    recognitionRef.current = recognition;
    shouldAutoRestartRef.current = false; // Don't auto-start

    return () => {
      shouldAutoRestartRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, []);

  const startVoiceControl = useCallback(() => {
    if (!recognitionRef.current || !isEnabled) {
      return;
    }

    if (isListening) {
      return; // Already listening
    }

    shouldAutoRestartRef.current = true;

    try {
      recognitionRef.current.start();
      voiceFeedback.speak('Voice control activated. Say help to hear commands.');
    } catch (error) {
      console.error('Error starting voice control:', error);
      voiceFeedback.announceError('Could not start voice control. Please try again.');
    }
  }, [isEnabled, isListening]);

  const stopVoiceControl = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }

    shouldAutoRestartRef.current = false;

    try {
      recognitionRef.current.stop();
      voiceFeedback.speak('Voice control stopped.');
    } catch (error) {
      console.error('Error stopping voice control:', error);
    }
  }, []);

  const toggleVoiceControl = useCallback(() => {
    if (isListening) {
      stopVoiceControl();
    } else {
      startVoiceControl();
    }
  }, [isListening, startVoiceControl, stopVoiceControl]);

  return {
    isListening,
    isEnabled,
    transcript,
    isProcessing,
    startVoiceControl,
    stopVoiceControl,
    toggleVoiceControl,
    processCommand,
  };
};
