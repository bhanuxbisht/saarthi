import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Sparkles,
  CircleDot,
} from 'lucide-react';

const VoiceAssistant = ({ accessibilitySettings }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
  ];

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript('Hello, I would like to apply for the software engineer position.');
        setTranslation('नमस्ते, मैं सॉफ्टवेयर इंजीनियर के पद के लिए आवेदन करना चाहूंगा।');
      }, 2000);
    }
  };

  const handleTextToSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // In real implementation, this would use Web Speech API
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  return (
    <section id="voice" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full mb-6 shadow-md">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              AI-Powered Voice Technology
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Multilingual Voice Assistant
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Speak naturally in your language. Our AI understands and translates
            in real-time with industry-leading accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Voice Control Panel */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Voice Control</h3>
              <p className="text-gray-600">
                Start speaking to interact with the assistant
              </p>
            </div>

            {/* Microphone Visual */}
            <div className="flex flex-col items-center mb-8">
              <div
                className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${
                  isListening
                    ? 'from-red-500 to-pink-500 animate-pulse'
                    : 'from-blue-500 to-purple-500'
                } flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer hover:scale-110`}
                onClick={handleVoiceInput}
              >
                {isListening ? (
                  <>
                    <CircleDot className="w-16 h-16 text-white animate-ping absolute" />
                    <Mic className="w-16 h-16 text-white relative z-10" />
                  </>
                ) : (
                  <Mic className="w-16 h-16 text-white" />
                )}
              </div>
              <p className="mt-4 text-sm font-medium text-gray-600">
                {isListening ? 'Listening...' : 'Tap to speak'}
              </p>
            </div>

            {/* Language Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Translate To
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleVoiceInput}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>Record</span>
                  </>
                )}
              </button>

              <button
                onClick={handleTextToSpeech}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isSpeaking
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-5 h-5" />
                    <span>Mute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span>Speak</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Transcript & Translation Display */}
          <div className="space-y-6">
            {/* Original Transcript */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Mic className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Original Text</h4>
                <span className="text-sm text-gray-500 ml-auto">
                  {languages.find((l) => l.code === selectedLanguage)?.flag}
                </span>
              </div>
              <div className="min-h-[100px] p-4 bg-blue-50 rounded-xl">
                {transcript ? (
                  <p className="text-gray-900 leading-relaxed">{transcript}</p>
                ) : (
                  <p className="text-gray-400 italic">
                    Your speech will appear here...
                  </p>
                )}
              </div>
            </div>

            {/* Translation */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Languages className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Translation</h4>
                <span className="text-sm text-gray-500 ml-auto">
                  {languages.find((l) => l.code === targetLanguage)?.flag}
                </span>
              </div>
              <div className="min-h-[100px] p-4 bg-purple-50 rounded-xl">
                {translation ? (
                  <p className="text-gray-900 leading-relaxed">{translation}</p>
                ) : (
                  <p className="text-gray-400 italic">
                    Translation will appear here...
                  </p>
                )}
              </div>
            </div>

            {/* Features List */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
              <h4 className="font-semibold mb-4">Real-Time Features</h4>
              <ul className="space-y-3">
                {[
                  'Auto-detect language',
                  'Context-aware translation',
                  'Emotion recognition',
                  'Background noise cancellation',
                  'Offline mode available',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceAssistant;
